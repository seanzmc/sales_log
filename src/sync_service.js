/**
 * Sync Service - Bidirectional Synchronization System
 * Handles sheet-to-Properties synchronization for SALESPEOPLE sheet
 * 
 * Phase 1 & 2 Implementation:
 * - Sheet edit detection and validation
 * - Sheet → Properties synchronization
 * - Sync metadata tracking
 * - Cache coordination
 * 
 * Architecture: Based on 17-section architectural design
 * Source of Truth: Properties Service (SALES_LOG_CONFIG)
 */

// Constants
const SYNC_METADATA_KEY = 'SALES_LOG_SYNC_META';
const SALESPEOPLE_SHEET_NAME = 'SALESPEOPLE';

// Column indices for SALESPEOPLE sheet (0-based)
const COL_FULLNAME = 0;    // Column A
const COL_ALIASES = 1;     // Column B
const COL_DISPLAYCODE = 2; // Column C

// ============================================================================
// MAIN ENTRY POINT - ONEDIT HANDLER
// ============================================================================

/**
 * Main entry point for sheet edit events
 * Called by onEdit trigger when SALESPEOPLE sheet is edited
 *
 * @param {Object} e - onEdit event object
 */
function onEditSalespeopleSheet(e) {
  let backupKey = null;
  let fullNameForBackup = null;
  
  try {
    // Check if event object exists
    if (!e) {
      Logger.log('[Sync] No event object - manual call or testing');
      return;
    }
    
    // Get the edited range
    const range = e.range;
    const sheet = range.getSheet();
    
    // Only process SALESPEOPLE sheet
    if (sheet.getName() !== SALESPEOPLE_SHEET_NAME) {
      return;
    }
    
    const row = range.getRow();
    const col = range.getColumn();
    
    // Only process data rows (row > 1) and columns A-C (1-3)
    if (row <= 1 || col < 1 || col > 3) {
      Logger.log('[Sync] Edit outside data range - ignoring');
      return;
    }
    
    Logger.log('[Sync] Edit detected in SALESPEOPLE sheet - Row: ' + row + ', Col: ' + col);
    
    // Get the complete row data
    const rowData = sheet.getRange(row, 1, 1, 3).getValues()[0];
    
    // Try to identify the salesperson being edited for backup purposes
    try {
      const config = getConfiguration();
      const salespeople = config.salespeople || [];
      const editIndex = row - 2; // row 2 = index 0
      
      if (editIndex >= 0 && editIndex < salespeople.length) {
        fullNameForBackup = salespeople[editIndex].fullName;
        // Create backup before attempting sync
        backupKey = createBackup(fullNameForBackup);
        Logger.log('[Sync] Created pre-edit backup: ' + backupKey);
      }
    } catch (backupError) {
      Logger.log('[Sync] Could not create backup: ' + backupError.toString());
      // Continue without backup
    }
    
    // Validate and sync the row
    const result = syncRowToProperties(row, rowData, e.oldValue);
    
    if (!result.success) {
      // Validation or sync failed - revert the change
      Logger.log('[Sync] Sync failed: ' + result.error);
      
      // Attempt to restore from backup if available
      if (backupKey && fullNameForBackup) {
        try {
          const restored = restoreFromBackup(fullNameForBackup);
          if (restored.restored) {
            Logger.log('[Sync] Restored from backup after sync failure');
          }
        } catch (restoreError) {
          Logger.log('[Sync] Could not restore from backup: ' + restoreError.toString());
        }
      }
      
      // Show error to user
      SpreadsheetApp.getActiveSpreadsheet().toast(
        'Edit rejected: ' + result.error,
        'Sync Error',
        5
      );
      
      // Revert the cell(s) to previous value if available
      if (e.oldValue !== undefined) {
        range.setValue(e.oldValue);
      } else {
        // If no old value, clear the problematic cell
        range.clearContent();
      }
      
      return;
    }
    
    // Check for conflict notification
    if (result.conflictResolution && result.conflictResolution.notify) {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        result.conflictResolution.notify.message,
        'Sync Warning',
        7
      );
    }
    
    // Success - log the event
    logSyncEvent({
      timestamp: new Date().toISOString(),
      action: 'sheet_edit',
      row: row,
      success: true,
      hasConflict: result.conflictResolution ? true : false,
      user: Session.getActiveUser().getEmail()
    });
    
    Logger.log('[Sync] Row ' + row + ' synced successfully to Properties');
    
  } catch (error) {
    Logger.log('[Sync] Error in onEditSalespeopleSheet: ' + error.toString());
    Logger.log('[Sync] Stack: ' + (error.stack || 'No stack trace'));
    
    // Attempt recovery using handleSyncFailure
    const recovery = handleSyncFailure(error, {
      row: row,
      backupKey: backupKey,
      fullName: fullNameForBackup,
      operation: 'sheet_edit'
    });
    
    Logger.log('[Sync] Recovery action: ' + recovery.action);
    
    // Show error to user with recovery info
    SpreadsheetApp.getActiveSpreadsheet().toast(
      recovery.message || 'Sync error occurred. Please check the data and try again.',
      'Sync Error',
      5
    );
  }
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates sheet edit data before syncing
 * Applies same validation rules as sidebar with enhanced checks
 *
 * @param {Array} rowData - [fullName, aliases, displayCode]
 * @param {string|null} existingFullName - Full name of existing salesperson (for updates)
 * @returns {Object} {valid: boolean, errors: Array, sanitized: Object}
 */
function validateSheetEdit(rowData, existingFullName) {
  const errors = [];
  const fullName = rowData[COL_FULLNAME] ? String(rowData[COL_FULLNAME]).trim() : '';
  const aliases = rowData[COL_ALIASES] ? String(rowData[COL_ALIASES]).trim() : '';
  const displayCode = rowData[COL_DISPLAYCODE] ? String(rowData[COL_DISPLAYCODE]).trim() : '';
  
  // Check if row is being deleted (all cells empty)
  if (!fullName && !aliases && !displayCode) {
    return {
      valid: true,
      isDelete: true,
      errors: [],
      sanitized: null
    };
  }
  
  // Validate fullName - required
  if (!fullName) {
    errors.push('Full Name: field is required');
  } else if (fullName.length < 2) {
    errors.push('Full Name: must be at least 2 characters');
  } else if (fullName.length > 100) {
    errors.push('Full Name: must be less than 100 characters');
  } else if (!/^[A-Za-z\s\-']+$/.test(fullName)) {
    errors.push('Full Name: can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  // Validate aliases - optional but must be valid if provided
  if (aliases && aliases.length > 200) {
    errors.push('Aliases: must be less than 200 characters');
  }
  if (aliases && !/^[A-Za-z0-9\s,\-']+$/.test(aliases)) {
    errors.push('Aliases: can only contain letters, numbers, spaces, commas, hyphens, and apostrophes');
  }
  
  // Validate displayCode - required
  if (!displayCode) {
    errors.push('Display Code: field is required');
  } else if (!/^[A-Za-z0-9]{2,4}$/.test(displayCode)) {
    errors.push('Display Code: must be 2-4 alphanumeric characters');
  }
  
  // If validation passed, create sanitized data and perform context-aware validation
  let sanitized = null;
  if (errors.length === 0) {
    sanitized = {
      fullName: fullName,
      aliases: aliases,
      displayCode: displayCode.toUpperCase() // Normalize to uppercase
    };
    
    // Get current configuration for duplicate checks
    try {
      const config = getConfiguration();
      const salespeople = config.salespeople || [];
      
      // Check for duplicate display codes (excluding current if update)
      const duplicateCode = salespeople.find(sp =>
        sp.displayCode.toUpperCase() === sanitized.displayCode &&
        (!existingFullName || sp.fullName !== existingFullName)
      );
      
      if (duplicateCode) {
        errors.push('Display Code: "' + sanitized.displayCode + '" is already used by "' + duplicateCode.fullName + '"');
      }
      
    } catch (configError) {
      Logger.log('[Sync] Error checking duplicates during validation: ' + configError.toString());
      // Don't fail validation on config read error - will be caught in syncRowToProperties
    }
  }
  
  return {
    valid: errors.length === 0,
    isDelete: false,
    errors: errors,
    sanitized: sanitized
  };
}

// ============================================================================
// SYNC TO PROPERTIES
// ============================================================================

/**
 * Syncs a single row from sheet to Properties Service
 * Handles add, update, and delete operations with conflict detection
 *
 * @param {number} row - Row number (1-indexed)
 * @param {Array} rowData - [fullName, aliases, displayCode]
 * @param {string} oldValue - Previous value (for conflict detection)
 * @returns {Object} {success: boolean, error: string, operation: string, conflictResolution: Object}
 */
function syncRowToProperties(row, rowData, oldValue) {
  const lock = LockService.getScriptLock();
  let backupKey = null;
  
  try {
    // Wait up to 30 seconds for lock
    if (!lock.tryLock(30000)) {
      return {
        success: false,
        error: 'Could not acquire lock. Please try again.'
      };
    }
    
    // Get current configuration
    const config = getConfiguration();
    const salespeople = config.salespeople || [];
    
    // Determine if this is an add or update
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SALESPEOPLE_SHEET_NAME);
    const allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
    
    let existingSalesperson = null;
    let operation = 'add';
    
    // Find the salesperson at this row position
    const editIndex = row - 2; // row 2 = index 0
    if (editIndex >= 0 && editIndex < salespeople.length) {
      existingSalesperson = salespeople[editIndex];
      operation = 'update';
      
      // Create backup before making changes
      backupKey = createBackup(existingSalesperson.fullName);
    }
    
    // Validate the data with context
    const validation = validateSheetEdit(rowData, existingSalesperson ? existingSalesperson.fullName : null);
    
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors.join('; ')
      };
    }
    
    // Handle delete operation
    if (validation.isDelete) {
      return handleRowDeletion(row);
    }
    
    const sanitized = validation.sanitized;
    
    // Check for duplicate full name (excluding current if update)
    const duplicateName = salespeople.find(sp =>
      sp.fullName === sanitized.fullName &&
      (!existingSalesperson || sp.fullName !== existingSalesperson.fullName)
    );
    
    if (duplicateName) {
      return {
        success: false,
        error: 'A salesperson with the name "' + sanitized.fullName + '" already exists'
      };
    }
    
    // Check for alias conflicts
    const aliasConflict = checkAliasConflictForSync(
      sanitized.aliases,
      existingSalesperson ? existingSalesperson.fullName : null
    );
    
    if (aliasConflict) {
      return {
        success: false,
        error: aliasConflict
      };
    }
    
    // CONFLICT DETECTION: Check if Properties data differs from sheet edit
    let conflictResolution = null;
    if (operation === 'update' && existingSalesperson) {
      const resolution = resolveConflict(
        existingSalesperson.fullName,
        sanitized,
        existingSalesperson
      );
      
      if (resolution.action === 'resolved') {
        conflictResolution = resolution;
        
        // If Properties wins, use Properties data instead of sheet data
        if (resolution.winner === 'properties') {
          Logger.log('[Sync] Conflict resolved - Properties wins. Reverting sheet to Properties data.');
          
          // Update the sheet to match Properties
          sheet.getRange(row, 1, 1, 3).setValues([[
            existingSalesperson.fullName,
            existingSalesperson.aliases,
            existingSalesperson.displayCode
          ]]);
          
          // Don't update Properties since it already has the correct data
          // Just update sync metadata
          updateSyncMetadata(existingSalesperson.fullName, 'sheet');
          invalidateAllCaches();
          
          return {
            success: true,
            operation: 'conflict_resolved',
            conflictResolution: resolution,
            error: null
          };
        }
        
        // If sheet wins, continue with normal update
        Logger.log('[Sync] Conflict resolved - Sheet wins. Updating Properties.');
      }
    }
    
    // Perform the operation
    if (operation === 'update' && existingSalesperson) {
      // Update existing salesperson
      const index = salespeople.indexOf(existingSalesperson);
      salespeople[index] = sanitized;
      Logger.log('[Sync] Updating salesperson at index ' + index + ': ' + sanitized.fullName);
    } else {
      // Add new salesperson
      const insertIndex = row - 2; // row 2 = index 0
      if (insertIndex <= salespeople.length) {
        salespeople.splice(insertIndex, 0, sanitized);
      } else {
        salespeople.push(sanitized);
      }
      Logger.log('[Sync] Adding new salesperson: ' + sanitized.fullName);
    }
    
    // Update configuration
    const updatedConfig = updateConfiguration({ salespeople: salespeople });
    
    // Check data integrity after update
    const integrityCheck = checkDataIntegrity(updatedConfig);
    if (!integrityCheck.valid) {
      Logger.log('[Sync] Data integrity issues detected after update:');
      integrityCheck.issues.forEach(issue => {
        Logger.log('[Sync]   - ' + issue.message);
      });
      
      // Attempt automatic repair
      const repair = repairDataIntegrity(integrityCheck.issues);
      if (repair.repaired) {
        Logger.log('[Sync] Auto-repaired ' + repair.actions.length + ' issues');
      }
    }
    
    // Update sync metadata
    updateSyncMetadata(sanitized.fullName, 'sheet');
    
    // Invalidate all caches
    invalidateAllCaches();
    
    Logger.log('[Sync] Successfully synced row ' + row + ' - Operation: ' + operation);
    
    return {
      success: true,
      operation: operation,
      conflictResolution: conflictResolution,
      error: null
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in syncRowToProperties: ' + error.toString());
    
    // Attempt recovery
    const recovery = handleSyncFailure(error, {
      row: row,
      backupKey: backupKey,
      fullName: rowData[COL_FULLNAME],
      operation: 'sync'
    });
    
    return {
      success: false,
      error: recovery.message || ('Sync failed: ' + error.message),
      recovery: recovery
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles row deletion by removing salesperson from configuration
 * 
 * @param {number} row - Row number being deleted
 * @returns {Object} {success: boolean, error: string}
 */
function handleRowDeletion(row) {
  try {
    const config = getConfiguration();
    const salespeople = config.salespeople || [];
    
    // Determine which salesperson to delete based on row position
    const deleteIndex = row - 2; // row 2 = index 0
    
    if (deleteIndex < 0 || deleteIndex >= salespeople.length) {
      // Row is outside current salespeople range - might be adding blank row
      return {
        success: true,
        operation: 'no-op'
      };
    }
    
    const deletedPerson = salespeople[deleteIndex];
    Logger.log('[Sync] Deleting salesperson: ' + deletedPerson.fullName);
    
    // Remove from array
    salespeople.splice(deleteIndex, 1);
    
    // Update configuration
    updateConfiguration({ salespeople: salespeople });
    
    // Clean up sync metadata
    const metadata = getSyncMetadataFromProperties();
    if (metadata[deletedPerson.fullName]) {
      delete metadata[deletedPerson.fullName];
      saveSyncMetadata(metadata);
    }
    
    // Invalidate caches
    invalidateAllCaches();
    
    return {
      success: true,
      operation: 'delete'
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in handleRowDeletion: ' + error.toString());
    return {
      success: false,
      error: 'Delete failed: ' + error.message
    };
  }
}

/**
 * Checks for alias conflicts (version for sync service)
 * Similar to checkAliasConflict in config_service.js but adapted for sync
 * 
 * @param {string} aliasesStr - Comma-separated aliases
 * @param {string|null} excludeFullName - Full name to exclude from check
 * @returns {string|null} Conflict description or null
 */
function checkAliasConflictForSync(aliasesStr, excludeFullName) {
  try {
    if (!aliasesStr || !aliasesStr.trim()) {
      return null;
    }
    
    const newAliases = aliasesStr.split(',').map(a => a.trim().toUpperCase()).filter(a => a);
    const config = getConfiguration();
    const salespeople = config.salespeople || [];
    
    for (const sp of salespeople) {
      // Skip the salesperson being updated
      if (excludeFullName && sp.fullName === excludeFullName) {
        continue;
      }
      
      // Check against full name
      if (newAliases.includes(sp.fullName.toUpperCase())) {
        return 'Alias "' + sp.fullName + '" conflicts with existing salesperson name';
      }
      
      // Check against display code
      if (newAliases.includes(sp.displayCode.toUpperCase())) {
        return 'Alias "' + sp.displayCode + '" conflicts with existing display code for ' + sp.fullName;
      }
      
      // Check against existing aliases
      const existingAliases = sp.aliases.split(',').map(a => a.trim().toUpperCase()).filter(a => a);
      for (const newAlias of newAliases) {
        if (existingAliases.includes(newAlias)) {
          return 'Alias "' + newAlias + '" is already used by ' + sp.fullName;
        }
      }
    }
    
    return null;
  } catch (error) {
    Logger.log('[Sync] Error in checkAliasConflictForSync: ' + error.toString());
    return 'Error checking aliases: ' + error.message;
  }
}

// ============================================================================
// CACHE COORDINATION
// ============================================================================

/**
 * Coordinates cache invalidation across all layers
 * Ensures all caches are cleared after sheet edits
 */
function invalidateAllCaches() {
  try {
    const cache = CacheService.getScriptCache();
    
    // Invalidate config cache
    cache.remove('config_cache');
    
    // Invalidate salesperson maps cache
    cache.remove('salespersonMaps');
    
    // Invalidate visual config cache
    cache.remove('visualConfig');
    
    // Note: sync_metadata is not cached, stored directly in Properties
    
    Logger.log('[Sync] All caches invalidated');
    
  } catch (error) {
    Logger.log('[Sync] CRITICAL: Error invalidating caches: ' + error.toString());
    // IMPORTANT: Throw error - callers must know cache invalidation failed
    // to prevent stale data from being used after config changes
    throw new Error('Cache invalidation failed: ' + error.message);
  }
}

// ============================================================================
// SYNC METADATA MANAGEMENT
// ============================================================================

/**
 * Creates or updates sync metadata for tracking
 * 
 * @param {string} fullName - Salesperson full name
 * @param {string} source - 'sheet' or 'sidebar'
 */
function updateSyncMetadata(fullName, source) {
  try {
    const metadata = getSyncMetadataFromProperties();
    
    // Create or update entry for this salesperson
    metadata[fullName] = {
      lastModified: new Date().toISOString(),
      modifiedBy: Session.getActiveUser().getEmail(),
      source: source,
      version: (metadata[fullName] && metadata[fullName].version) ? metadata[fullName].version + 1 : 1
    };
    
    // Save back to Properties
    saveSyncMetadata(metadata);
    
    Logger.log('[Sync] Updated metadata for ' + fullName + ' (source: ' + source + ')');
    
  } catch (error) {
    Logger.log('[Sync] Error updating sync metadata: ' + error.toString());
    // Don't throw - metadata tracking failure shouldn't break sync
  }
}

/**
 * Gets sync metadata for a salesperson
 * 
 * @param {string} fullName - Salesperson full name
 * @returns {Object|null} Metadata or null
 */
function getSyncMetadata(fullName) {
  try {
    const metadata = getSyncMetadataFromProperties();
    return metadata[fullName] || null;
  } catch (error) {
    Logger.log('[Sync] Error getting sync metadata: ' + error.toString());
    return null;
  }
}

/**
 * Gets all sync metadata from Properties Service
 * 
 * @returns {Object} Sync metadata structure
 */
function getSyncMetadataFromProperties() {
  try {
    const props = PropertiesService.getDocumentProperties();
    const metadataJson = props.getProperty(SYNC_METADATA_KEY);
    
    if (metadataJson) {
      return JSON.parse(metadataJson);
    } else {
      return {}; // Empty metadata
    }
  } catch (error) {
    Logger.log('[Sync] Error reading sync metadata: ' + error.toString());
    return {};
  }
}

/**
 * Saves sync metadata to Properties Service
 * 
 * @param {Object} metadata - Sync metadata to save
 */
function saveSyncMetadata(metadata) {
  try {
    const props = PropertiesService.getDocumentProperties();
    props.setProperty(SYNC_METADATA_KEY, JSON.stringify(metadata));
  } catch (error) {
    Logger.log('[Sync] Error saving sync metadata: ' + error.toString());
    throw error;
  }
}

// ============================================================================
// CONFLICT DETECTION AND RESOLUTION
// ============================================================================

/**
 * Detects if there's a conflict between sheet and Properties data
 * @param {string} fullName - Salesperson full name
 * @param {Object} sheetData - Data from sheet {fullName, aliases, displayCode}
 * @param {Object} propsData - Data from Properties {fullName, aliases, displayCode}
 * @returns {Object} {hasConflict: boolean, sheetModTime, propsModTime, timeDiff}
 */
function detectConflict(fullName, sheetData, propsData) {
  try {
    // Get sync metadata for this salesperson
    const metadata = getSyncMetadata(fullName);
    
    if (!metadata) {
      // No metadata = first time sync, no conflict
      return {
        hasConflict: false,
        sheetModTime: null,
        propsModTime: null,
        timeDiff: null
      };
    }
    
    // Check if data actually differs
    if (dataEquals(sheetData, propsData)) {
      // Data is identical, no conflict even if both modified recently
      return {
        hasConflict: false,
        sheetModTime: metadata.lastModified,
        propsModTime: metadata.lastModified,
        timeDiff: 0,
        reason: 'data_identical'
      };
    }
    
    // Data differs - check timing of modifications
    const now = new Date();
    const lastModTime = new Date(metadata.lastModified);
    const timeDiffSeconds = (now - lastModTime) / 1000;
    
    // Conflict if modified within last 60 seconds and data differs
    const CONFLICT_WINDOW_SECONDS = 60;
    const hasConflict = timeDiffSeconds <= CONFLICT_WINDOW_SECONDS;
    
    return {
      hasConflict: hasConflict,
      sheetModTime: now.toISOString(),
      propsModTime: metadata.lastModified,
      timeDiff: timeDiffSeconds,
      source: metadata.source,
      reason: hasConflict ? 'recent_modification' : 'stale_data'
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in detectConflict: ' + error.toString());
    // On error, assume no conflict to allow operation to proceed
    return {
      hasConflict: false,
      error: error.message
    };
  }
}

/**
 * Resolves conflict between sheet and Properties data
 * @param {string} fullName - Salesperson full name
 * @param {Object} sheetData - Data from sheet
 * @param {Object} propsData - Data from Properties
 * @returns {Object} {action: string, winner: string, data: Object, notify: Object}
 */
function resolveConflict(fullName, sheetData, propsData) {
  try {
    // Check if there's actually a conflict
    const conflictInfo = detectConflict(fullName, sheetData, propsData);
    
    if (!conflictInfo.hasConflict) {
      return {
        action: 'no_conflict',
        winner: null,
        data: sheetData,
        notify: null
      };
    }
    
    // Get metadata to determine winner
    const metadata = getSyncMetadata(fullName);
    
    // Determine winner based on timing and source
    let winner = 'sheet'; // Default to sheet (current edit)
    let winnerData = sheetData;
    
    // If timestamps are very close (within 1 second), Properties wins
    // because sidebar has better validation
    if (conflictInfo.timeDiff <= 1) {
      winner = 'properties';
      winnerData = propsData;
    } else {
      // Otherwise, most recent modification wins
      // Since we're in a sheet edit context, sheet is the most recent
      winner = 'sheet';
      winnerData = sheetData;
    }
    
    // Log the conflict resolution
    logConflict({
      fullName: fullName,
      timestamp: new Date().toISOString(),
      sheetData: sheetData,
      propsData: propsData,
      winner: winner,
      timeDiff: conflictInfo.timeDiff,
      source: metadata ? metadata.source : 'unknown'
    });
    
    return {
      action: 'resolved',
      winner: winner,
      data: winnerData,
      notify: {
        message: 'Conflict detected and resolved. ' +
                 (winner === 'properties' ? 'Sidebar changes preserved.' : 'Sheet changes applied.'),
        severity: 'warning'
      }
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in resolveConflict: ' + error.toString());
    // On error, default to accepting sheet data
    return {
      action: 'error',
      winner: 'sheet',
      data: sheetData,
      notify: {
        message: 'Error resolving conflict. Sheet changes applied.',
        severity: 'error'
      }
    };
  }
}

/**
 * Compares two data objects for equality
 * @param {Object} data1 - First data object
 * @param {Object} data2 - Second data object
 * @returns {boolean} True if data is identical
 */
function dataEquals(data1, data2) {
  try {
    if (!data1 || !data2) {
      return false;
    }
    
    // Normalize and compare fullName
    const name1 = (data1.fullName || '').trim();
    const name2 = (data2.fullName || '').trim();
    if (name1 !== name2) {
      return false;
    }
    
    // Normalize and compare aliases
    const aliases1 = (data1.aliases || '').trim();
    const aliases2 = (data2.aliases || '').trim();
    if (aliases1 !== aliases2) {
      return false;
    }
    
    // Normalize and compare displayCode (case-insensitive)
    const code1 = (data1.displayCode || '').trim().toUpperCase();
    const code2 = (data2.displayCode || '').trim().toUpperCase();
    if (code1 !== code2) {
      return false;
    }
    
    return true;
    
  } catch (error) {
    Logger.log('[Sync] Error in dataEquals: ' + error.toString());
    return false;
  }
}

/**
 * Logs conflict resolution for monitoring
 * @param {Object} conflictInfo - Conflict details
 */
function logConflict(conflictInfo) {
  try {
    // Log to Apps Script logger
    const logMessage = '[CONFLICT] ' + JSON.stringify({
      timestamp: conflictInfo.timestamp,
      fullName: conflictInfo.fullName,
      winner: conflictInfo.winner,
      timeDiff: conflictInfo.timeDiff + 's',
      previousSource: conflictInfo.source
    });
    Logger.log(logMessage);
    
    // Optionally increment conflict counter in sync metadata
    try {
      const metadata = getSyncMetadataFromProperties();
      if (!metadata._stats) {
        metadata._stats = { conflicts: 0 };
      }
      metadata._stats.conflicts = (metadata._stats.conflicts || 0) + 1;
      metadata._stats.lastConflict = conflictInfo.timestamp;
      saveSyncMetadata(metadata);
    } catch (e) {
      Logger.log('[Sync] Could not update conflict stats: ' + e.toString());
    }
    
  } catch (error) {
    Logger.log('[Sync] Error in logConflict: ' + error.toString());
    // Don't throw - logging failure shouldn't break sync
  }
}

// ============================================================================
// DATA INTEGRITY CHECKS
// ============================================================================

/**
 * Performs comprehensive data integrity check
 * @param {Object} config - Configuration object
 * @returns {Object} {valid: boolean, issues: Array}
 */
function checkDataIntegrity(config) {
  const issues = [];
  
  try {
    const salespeople = config.salespeople || [];
    const metadata = getSyncMetadataFromProperties();
    
    // Check for duplicate full names
    const nameMap = {};
    salespeople.forEach((sp, index) => {
      const name = sp.fullName.trim();
      if (nameMap[name]) {
        issues.push({
          type: 'duplicate_name',
          severity: 'error',
          message: 'Duplicate full name: "' + name + '" at positions ' + nameMap[name] + ' and ' + index,
          data: { name: name, positions: [nameMap[name], index] }
        });
      } else {
        nameMap[name] = index;
      }
    });
    
    // Check for duplicate display codes
    const codeMap = {};
    salespeople.forEach((sp, index) => {
      const code = sp.displayCode.trim().toUpperCase();
      if (codeMap[code]) {
        issues.push({
          type: 'duplicate_code',
          severity: 'error',
          message: 'Duplicate display code: "' + code + '" used by "' +
                   salespeople[codeMap[code]].fullName + '" and "' + sp.fullName + '"',
          data: { code: code, positions: [codeMap[code], index] }
        });
      } else {
        codeMap[code] = index;
      }
    });
    
    // Check for alias conflicts
    const allIdentifiers = new Set();
    salespeople.forEach((sp, index) => {
      // Add full name and display code to identifier set
      allIdentifiers.add(sp.fullName.toUpperCase());
      allIdentifiers.add(sp.displayCode.toUpperCase());
      
      // Check aliases
      const aliases = sp.aliases.split(',').map(a => a.trim().toUpperCase()).filter(a => a);
      aliases.forEach(alias => {
        if (allIdentifiers.has(alias)) {
          issues.push({
            type: 'alias_conflict',
            severity: 'error',
            message: 'Alias "' + alias + '" for "' + sp.fullName +
                     '" conflicts with another salesperson\'s name or code',
            data: { salesperson: sp.fullName, alias: alias }
          });
        }
      });
    });
    
    // Check for invalid data formats
    salespeople.forEach((sp, index) => {
      // Validate fullName format
      if (!sp.fullName || sp.fullName.length < 2) {
        issues.push({
          type: 'invalid_format',
          severity: 'error',
          message: 'Invalid full name at position ' + index,
          data: { position: index, field: 'fullName' }
        });
      }
      
      // Validate displayCode format
      if (!sp.displayCode || !/^[A-Z0-9]{2,4}$/.test(sp.displayCode)) {
        issues.push({
          type: 'invalid_format',
          severity: 'error',
          message: 'Invalid display code "' + sp.displayCode + '" for "' + sp.fullName + '"',
          data: { position: index, field: 'displayCode', value: sp.displayCode }
        });
      }
    });
    
    // Check for orphaned sync metadata
    const salespersonNames = new Set(salespeople.map(sp => sp.fullName));
    Object.keys(metadata).forEach(key => {
      if (key === '_stats') return; // Skip stats object
      
      if (!salespersonNames.has(key)) {
        issues.push({
          type: 'orphaned_metadata',
          severity: 'warning',
          message: 'Metadata exists for deleted salesperson: "' + key + '"',
          data: { fullName: key }
        });
      }
    });
    
    return {
      valid: issues.filter(i => i.severity === 'error').length === 0,
      issues: issues
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in checkDataIntegrity: ' + error.toString());
    return {
      valid: false,
      issues: [{
        type: 'check_error',
        severity: 'error',
        message: 'Error performing integrity check: ' + error.message,
        data: { error: error.toString() }
      }]
    };
  }
}

/**
 * Repairs data integrity issues if possible
 * @param {Array} issues - List of issues from checkDataIntegrity
 * @returns {Object} {repaired: boolean, actions: Array}
 */
function repairDataIntegrity(issues) {
  const actions = [];
  let repaired = false;
  
  try {
    // Only attempt to repair orphaned metadata automatically
    const orphanedIssues = issues.filter(i => i.type === 'orphaned_metadata');
    
    if (orphanedIssues.length > 0) {
      const metadata = getSyncMetadataFromProperties();
      
      orphanedIssues.forEach(issue => {
        const fullName = issue.data.fullName;
        if (metadata[fullName]) {
          delete metadata[fullName];
          actions.push({
            type: 'removed_orphaned_metadata',
            message: 'Removed metadata for deleted salesperson: "' + fullName + '"',
            success: true
          });
        }
      });
      
      // Save cleaned metadata
      saveSyncMetadata(metadata);
      repaired = true;
      
      Logger.log('[Sync] Repaired ' + orphanedIssues.length + ' orphaned metadata entries');
    }
    
    // Log other issues that need manual resolution
    const manualIssues = issues.filter(i => i.type !== 'orphaned_metadata');
    manualIssues.forEach(issue => {
      actions.push({
        type: 'manual_resolution_required',
        message: issue.message,
        success: false,
        severity: issue.severity
      });
      Logger.log('[Sync] Manual resolution required: ' + issue.message);
    });
    
    return {
      repaired: repaired,
      actions: actions
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in repairDataIntegrity: ' + error.toString());
    return {
      repaired: false,
      actions: [{
        type: 'repair_error',
        message: 'Error during repair: ' + error.message,
        success: false
      }]
    };
  }
}

// ============================================================================
// BACKUP AND RECOVERY
// ============================================================================

/**
 * Creates a backup of salesperson data before risky operations
 * @param {string} fullName - Salesperson full name
 * @returns {string} Backup key
 */
function createBackup(fullName) {
  try {
    const config = getConfiguration();
    const salespeople = config.salespeople || [];
    
    // Find the salesperson
    const salesperson = salespeople.find(sp => sp.fullName === fullName);
    
    if (!salesperson) {
      Logger.log('[Sync] No salesperson found to backup: ' + fullName);
      return null;
    }
    
    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      fullName: fullName,
      data: JSON.parse(JSON.stringify(salesperson)), // Deep copy
      user: Session.getActiveUser().getEmail()
    };
    
    // Store in Script Cache with 1-hour TTL
    const cache = CacheService.getScriptCache();
    const backupKey = 'backup_' + fullName + '_' + Date.now();
    cache.put(backupKey, JSON.stringify(backup), 3600); // 1 hour TTL
    
    // Store backup key in sync metadata for reliable retrieval
    try {
      const metadata = getSyncMetadataFromProperties();
      if (!metadata[fullName]) {
        metadata[fullName] = {};
      }
      metadata[fullName].lastBackupKey = backupKey;
      metadata[fullName].lastBackupTime = backup.timestamp;
      saveSyncMetadata(metadata);
      Logger.log('[Sync] Stored backup key in metadata for ' + fullName);
    } catch (metadataError) {
      Logger.log('[Sync] Warning: Could not store backup key in metadata: ' + metadataError.toString());
      // Continue - backup is still in cache, just not referenced in metadata
    }
    
    Logger.log('[Sync] Created backup for ' + fullName + ': ' + backupKey);
    
    return backupKey;
    
  } catch (error) {
    Logger.log('[Sync] Error in createBackup: ' + error.toString());
    return null;
  }
}

/**
 * Restores salesperson from backup
 * @param {string} fullName - Salesperson full name
 * @returns {Object} {restored: boolean, backup: Object}
 */
function restoreFromBackup(fullName) {
  try {
    const cache = CacheService.getScriptCache();
    let backup = null;
    let backupKey = null;
    
    // Try to retrieve backup key from metadata (reliable method)
    try {
      const metadata = getSyncMetadataFromProperties();
      if (metadata[fullName] && metadata[fullName].lastBackupKey) {
        backupKey = metadata[fullName].lastBackupKey;
        const cached = cache.get(backupKey);
        
        if (cached) {
          backup = JSON.parse(cached);
          Logger.log('[Sync] Retrieved backup from metadata-stored key: ' + backupKey);
        } else {
          Logger.log('[Sync] Backup key found in metadata but cache expired: ' + backupKey);
        }
      }
    } catch (metadataError) {
      Logger.log('[Sync] Could not retrieve backup key from metadata: ' + metadataError.toString());
    }
    
    // Fallback: Try timestamp guessing (for backward compatibility with old backups)
    if (!backup) {
      Logger.log('[Sync] Attempting fallback timestamp guessing for backup');
      const now = Date.now();
      const lookbackMs = 3600000; // 1 hour
      
      // Try to find backup from last hour (check every 5 seconds)
      for (let i = 0; i < lookbackMs / 5000; i++) {
        const timestamp = now - (i * 5000);
        const key = 'backup_' + fullName + '_' + timestamp;
        const cached = cache.get(key);
        
        if (cached) {
          backup = JSON.parse(cached);
          backupKey = key;
          Logger.log('[Sync] Found backup via timestamp guessing: ' + backupKey);
          break;
        }
      }
    }
    
    if (!backup) {
      Logger.log('[Sync] No backup found for ' + fullName);
      return {
        restored: false,
        backup: null,
        error: 'No backup found'
      };
    }
    
    // Restore the data
    const config = getConfiguration();
    const salespeople = config.salespeople || [];
    const index = salespeople.findIndex(sp => sp.fullName === fullName);
    
    if (index !== -1) {
      salespeople[index] = backup.data;
      updateConfiguration({ salespeople: salespeople });
      
      Logger.log('[Sync] Restored ' + fullName + ' from backup: ' + backupKey);
      
      return {
        restored: true,
        backup: backup
      };
    } else {
      return {
        restored: false,
        backup: backup,
        error: 'Salesperson not found in current config'
      };
    }
    
  } catch (error) {
    Logger.log('[Sync] Error in restoreFromBackup: ' + error.toString());
    return {
      restored: false,
      backup: null,
      error: error.message
    };
  }
}

/**
 * Handles sync failure with appropriate recovery action
 * @param {Error} error - The error that occurred
 * @param {Object} context - Context about the failed operation
 * @returns {Object} Recovery result
 */
function handleSyncFailure(error, context) {
  try {
    const errorType = classifyError(error);
    
    Logger.log('[Sync] Handling sync failure - Type: ' + errorType + ', Context: ' + JSON.stringify(context));
    
    switch (errorType) {
      case 'lock_timeout':
        // Retry with exponential backoff
        return {
          action: 'retry',
          delay: Math.min(1000 * Math.pow(2, context.retryCount || 0), 10000),
          message: 'Lock timeout. Will retry...',
          recoverable: true
        };
        
      case 'validation_error':
        // Revert to last known good state
        if (context.backupKey) {
          const restored = restoreFromBackup(context.fullName);
          if (restored.restored) {
            return {
              action: 'reverted',
              message: 'Validation failed. Reverted to previous state.',
              recoverable: true
            };
          }
        }
        return {
          action: 'failed',
          message: 'Validation error: ' + error.message,
          recoverable: false
        };
        
      case 'conflict_error':
        // Force resolution using conflict resolution logic
        return {
          action: 'force_resolve',
          message: 'Conflict detected. Resolving...',
          recoverable: true
        };
        
      case 'network_error':
        // Queue for retry
        return {
          action: 'queue_retry',
          message: 'Network error. Will retry later.',
          recoverable: true
        };
        
      default:
        // Unknown error - log and fail gracefully
        return {
          action: 'failed',
          message: 'Sync failed: ' + error.message,
          recoverable: false
        };
    }
    
  } catch (recoveryError) {
    Logger.log('[Sync] Error in handleSyncFailure: ' + recoveryError.toString());
    return {
      action: 'failed',
      message: 'Recovery failed: ' + recoveryError.message,
      recoverable: false
    };
  }
}

/**
 * Classifies error type for appropriate recovery action
 * @param {Error} error - The error to classify
 * @returns {string} Error type
 */
function classifyError(error) {
  const message = error.message || error.toString();
  
  if (message.includes('lock') || message.includes('Lock')) {
    return 'lock_timeout';
  }
  if (message.includes('validation') || message.includes('Validation')) {
    return 'validation_error';
  }
  if (message.includes('conflict') || message.includes('Conflict')) {
    return 'conflict_error';
  }
  if (message.includes('network') || message.includes('Network') ||
      message.includes('timeout') || message.includes('Timeout')) {
    return 'network_error';
  }
  
  return 'unknown';
}

// ============================================================================
// SHEET → PROPERTIES SYNC (FOR SIDEBAR INITIALIZATION)
// ============================================================================

/**
 * Reads all salespeople from SALESPEOPLE sheet
 * Used when sidebar opens to get current sheet state
 *
 * @returns {Array} Array of salesperson objects from sheet
 */
function readSalespeopleFromSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SALESPEOPLE_SHEET_NAME);
    
    if (!sheet) {
      Logger.log('[Sync] SALESPEOPLE sheet not found');
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log('[Sync] No data rows in SALESPEOPLE sheet');
      return []; // No data rows (only header or empty)
    }
    
    // Read all data rows (skip header row 1)
    const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
    
    const salespeople = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const fullName = String(row[COL_FULLNAME] || '').trim();
      const aliases = String(row[COL_ALIASES] || '').trim();
      const displayCode = String(row[COL_DISPLAYCODE] || '').trim();
      
      // Skip completely empty rows
      if (!fullName && !aliases && !displayCode) {
        continue;
      }
      
      // Skip rows without required fields
      if (!fullName || !displayCode) {
        Logger.log('[Sync] Skipping invalid row ' + (i + 2) + ': missing required fields');
        continue;
      }
      
      salespeople.push({
        fullName: fullName,
        aliases: aliases,
        displayCode: displayCode.toUpperCase() // Normalize to uppercase
      });
    }
    
    Logger.log('[Sync] Read ' + salespeople.length + ' salespeople from SALESPEOPLE sheet');
    return salespeople;
    
  } catch (error) {
    Logger.log('[Sync] Error in readSalespeopleFromSheet: ' + error.toString());
    return [];
  }
}

/**
 * Syncs SALESPEOPLE sheet data to Properties Service
 * Called when sidebar opens to ensure Properties matches sheet
 *
 * @param {Array} sheetSalespeople - Salespeople from sheet
 * @returns {Object} Result with success status
 */
function syncFromSheetToProperties(sheetSalespeople) {
  const lock = LockService.getScriptLock();
  
  try {
    // Wait up to 30 seconds for lock
    if (!lock.tryLock(30000)) {
      Logger.log('[Sync] Could not acquire lock for sheet→Properties sync');
      return {
        success: false,
        error: 'Could not acquire lock'
      };
    }
    
    // Get current config
    const config = getConfiguration();
    
    // Update salespeople
    config.salespeople = sheetSalespeople;
    
    // Save to Properties using updateConfiguration for proper validation
    updateConfiguration({ salespeople: sheetSalespeople });
    
    Logger.log('[Sync] Synced ' + sheetSalespeople.length + ' salespeople from sheet to Properties');
    
    // Update sync metadata for all salespeople
    sheetSalespeople.forEach(sp => {
      updateSyncMetadata(sp.fullName, 'sheet');
    });
    
    // Invalidate caches
    invalidateAllCaches();
    
    return {
      success: true,
      count: sheetSalespeople.length
    };
    
  } catch (error) {
    Logger.log('[Sync] Error in syncFromSheetToProperties: ' + error.toString());
    return {
      success: false,
      error: error.message
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Checks if sheet data differs from Properties data
 * Deep comparison to determine if sync is needed
 *
 * @param {Array} sheetData - Data from sheet
 * @param {Array} propsData - Data from Properties
 * @returns {boolean} True if sync is needed
 */
function needsSync(sheetData, propsData) {
  try {
    // If no Properties data, sync is needed
    if (!propsData || propsData.length === 0) {
      return sheetData && sheetData.length > 0;
    }
    
    // If no sheet data but Properties has data, don't sync
    // (Properties is source of truth for deletions via sidebar)
    if (!sheetData || sheetData.length === 0) {
      return false;
    }
    
    // If different lengths, sync is needed
    if (sheetData.length !== propsData.length) {
      Logger.log('[Sync] Length mismatch - Sheet: ' + sheetData.length + ', Properties: ' + propsData.length);
      return true;
    }
    
    // Deep comparison of each salesperson
    for (let i = 0; i < sheetData.length; i++) {
      const sheet = sheetData[i];
      const props = propsData[i];
      
      if (!props) {
        Logger.log('[Sync] Missing Properties entry at index ' + i);
        return true;
      }
      
      // Compare each field
      if (sheet.fullName !== props.fullName) {
        Logger.log('[Sync] fullName mismatch at index ' + i + ': "' + sheet.fullName + '" vs "' + props.fullName + '"');
        return true;
      }
      
      if (sheet.aliases !== props.aliases) {
        Logger.log('[Sync] aliases mismatch for "' + sheet.fullName + '": "' + sheet.aliases + '" vs "' + props.aliases + '"');
        return true;
      }
      
      if (sheet.displayCode !== props.displayCode) {
        Logger.log('[Sync] displayCode mismatch for "' + sheet.fullName + '": "' + sheet.displayCode + '" vs "' + props.displayCode + '"');
        return true;
      }
    }
    
    // No differences found
    return false;
    
  } catch (error) {
    Logger.log('[Sync] Error in needsSync: ' + error.toString());
    // On error, don't sync to avoid data corruption
    return false;
  }
}

// ============================================================================
// LOGGING AND MONITORING
// ============================================================================

/**
 * Logs sync events for debugging and monitoring
 * 
 * @param {Object} event - Event data
 */
function logSyncEvent(event) {
  try {
    // Log to Apps Script logger
    const logMessage = '[Sync Event] ' + JSON.stringify(event);
    Logger.log(logMessage);
    
    // Could optionally log to a dedicated sheet for monitoring
    // For Phase 1 & 2, console logging is sufficient
    
  } catch (error) {
    Logger.log('[Sync] Error logging sync event: ' + error.toString());
    // Don't throw - logging failure shouldn't break sync
  }
}