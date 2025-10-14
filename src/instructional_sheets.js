
/**
 * instructional_sheets.js
 * Creates interactive tutorial sheets for Sales Log Pro application.
 * Based on comprehensive design document at docs/INSTRUCTIONAL_SHEETS_DESIGN.md
 * 
 * Features:
 * - 5 instructional sheets with complete tutorials
 * - Cross-sheet navigation via hyperlinks
 * - Read-only protection on all sheets
 * - Exact formatting per design specifications
 * - Idempotent operation (safe to run multiple times)
 */

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates all instructional sheets for Sales Log Pro.
 * Main entry point - creates all 5 instructional sheets with proper formatting,
 * hyperlinks, and protection. Safe to run multiple times (idempotent).
 * 
 * @returns {void}
 */
function createAllInstructionalSheets() {
  try {
    Logger.log('Starting creation of all instructional sheets...');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('No active spreadsheet found.');
    }

    // Check if sheets already exist
    const existingSheets = [
      'Getting-Started',
      'TODAY-Instructions',
      'MONTHLY-Instructions',
      'SALESPEOPLE-Instructions',
      'DEPOSITS-Instructions'
    ].filter(name => ss.getSheetByName(name));

    if (existingSheets.length > 0) {
      const ui = SpreadsheetApp.getUi();
      const response = ui.alert(
        'Instructional Sheets Exist',
        `The following sheets already exist:\n${existingSheets.join('\n')}\n\nDo you want to recreate them? This will delete and recreate all instructional sheets.`,
        ui.ButtonSet.YES_NO
      );
      
      if (response !== ui.Button.YES) {
        Logger.log('User cancelled recreation of instructional sheets.');
        return;
      }
      
      // Delete existing sheets
      existingSheets.forEach(name => {
        const sheet = ss.getSheetByName(name);
        if (sheet) {
          ss.deleteSheet(sheet);
          Logger.log(`Deleted existing sheet: ${name}`);
        }
      });
    }

    // Create sheets in order
    Logger.log('Creating Getting-Started sheet...');
    createGettingStartedSheet();
    
    Logger.log('Creating TODAY-Instructions sheet...');
    createTodayInstructionsSheet();
    
    Logger.log('Creating MONTHLY-Instructions sheet...');
    createMonthlyInstructionsSheet();
    
    Logger.log('Creating SALESPEOPLE-Instructions sheet...');
    createSalespeopleInstructionsSheet();
    
    Logger.log('Creating DEPOSITS-Instructions sheet...');
    createDepositsInstructionsSheet();

    // Add hyperlinks after all sheets exist
    Logger.log('Adding hyperlinks between sheets...');
    addAllHyperlinks();

    Logger.log('Instructional sheets created successfully!');
    showCreationSummary();

  } catch (e) {
    logError('createAllInstructionalSheets', e);
    SpreadsheetApp.getUi().alert(
      'Error Creating Instructions',
      'An error occurred while creating instructional sheets:\n\n' + e.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Shows a summary dialog after successful creation.
 * @returns {void}
 */
function showCreationSummary() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Instructional Sheets Created',
    '📚 Successfully created all instructional sheets:\n\n' +
    '✓ Getting-Started (navigation hub)\n' +
    '✓ TODAY-Instructions\n' +
    '✓ MONTHLY-Instructions\n' +
    '✓ SALESPEOPLE-Instructions\n' +
    '✓ DEPOSITS-Instructions\n\n' +
    'All sheets are protected from editing and include navigation hyperlinks.\n\n' +
    'Click on "Getting-Started" to begin exploring the tutorials.',
    ui.ButtonSet.OK
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats a header section with consistent styling.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Target sheet
 * @param {string} range - A1 notation range (e.g., "A1:R1")
 * @param {string} text - Text content for the header
 * @param {string} bgColor - Background color (hex)
 * @param {string} textColor - Text color (hex)
 * @param {number} fontSize - Font size in points (default: 14)
 * @param {string} alignment - Horizontal alignment (default: 'center')
 * @returns {GoogleAppsScript.Spreadsheet.Range} The formatted range
 */
function formatHeaderSection(sheet, range, text, bgColor, textColor, fontSize = 14, alignment = 'center') {
  const headerRange = sheet.getRange(range);
  headerRange
    .merge()
    .setValue(text)
    .setFontFamily('Calibri')
    .setFontSize(fontSize)
    .setFontWeight('bold')
    .setBackground(bgColor)
    .setFontColor(textColor)
    .setHorizontalAlignment(alignment)
    .setVerticalAlignment('middle');
  
  return headerRange;
}

/**
 * Formats an instruction cell with text and background.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Target sheet
 * @param {string} range - A1 notation range
 * @param {string} text - Cell content
 * @param {string} bgColor - Background color (hex)
 * @param {boolean} merge - Whether to merge the range (default: true)
 * @param {number} fontSize - Font size (default: 11)
 * @returns {GoogleAppsScript.Spreadsheet.Range} The formatted range
 */
function formatInstructionCell(sheet, range, text, bgColor, merge = true, fontSize = 11) {
  const cellRange = sheet.getRange(range);
  
  if (merge) {
    cellRange.merge();
  }
  
  cellRange
    .setValue(text)
    .setFontFamily('Calibri')
    .setFontSize(fontSize)
    .setBackground(bgColor)
    .setFontColor('#000000')
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    .setVerticalAlignment('top');
  
  return cellRange;
}

/**
 * Adds a hyperlink to a cell linking to another sheet.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Source sheet
 * @param {string} cellAddress - Cell address (e.g., "A1")
 * @param {string} linkText - Display text for the link
 * @param {string} targetSheetName - Name of the target sheet
 * @returns {boolean} Success status
 */
function addHyperlink(sheet, cellAddress, linkText, targetSheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const targetSheet = ss.getSheetByName(targetSheetName);
    
    if (!targetSheet) {
      Logger.log(`Warning: Target sheet "${targetSheetName}" not found for hyperlink`);
      return false;
    }
    
    const gid = targetSheet.getSheetId();
    const url = `#gid=${gid}`;
    
    const richText = SpreadsheetApp.newRichTextValue()
      .setText(linkText)
      .setLinkUrl(url)
      .build();
    
    sheet.getRange(cellAddress)
      .setRichTextValue(richText)
      .setFontColor('#1A73E8')
      .setFontUnderline(true);
    
    return true;
  } catch (e) {
    logError('addHyperlink', e, { cell: cellAddress, target: targetSheetName });
    return false;
  }
}

/**
 * Protects a sheet from editing.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Sheet to protect
 * @param {string} description - Protection description
 * @returns {void}
 */
function protectSheet(sheet, description) {
  try {
    const protection = sheet.protect().setDescription(description);
    
    // Allow current user to edit (for maintenance)
    protection.addEditor(Session.getEffectiveUser());
    
    // Remove all other editors
    protection.removeEditors(protection.getEditors());
    
    // Prevent domain edit if applicable
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }
    
    Logger.log(`Sheet "${sheet.getName()}" protected: ${description}`);
  } catch (e) {
    logError('protectSheet', e, { sheetName: sheet.getName() });
  }
}

/**
 * Sets column widths efficiently using a width map.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Target sheet
 * @param {Object} widthMap - Object mapping column numbers to widths in pixels
 * @returns {void}
 */
function setColumnWidths(sheet, widthMap) {
  try {
    Object.entries(widthMap).forEach(([col, width]) => {
      sheet.setColumnWidth(parseInt(col), width);
    });
  } catch (e) {
    logError('setColumnWidths', e, { sheetName: sheet.getName() });
  }
}

// ============================================================================
// GETTING-STARTED SHEET
// ============================================================================

/**
 * Creates the Getting-Started sheet (central navigation hub).
 * Per design document sections 96-315.
 * 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
 */
function createGettingStartedSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'Getting-Started';
  
  // Create or get sheet
  let sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(sheetName);
  
  // Set column widths (all uniform 100px for 18 columns)
  const widths = {};
  for (let i = 1; i <= 18; i++) {
    widths[i] = 100;
  }
  setColumnWidths(sheet, widths);
  
  // Section 1: Welcome Banner (Rows 1-5)
  formatHeaderSection(sheet, 'A1:R1', '📚 Sales Log Pro - Getting Started Guide', '#4A86E8', '#FFFFFF', 18);
  sheet.setRowHeight(1, 40);
  
  const welcomeText = `Welcome to Sales Log Pro!

This guide will help you get started with the system. Sales Log Pro uses four main sheets to track your dealership's sales:
• TODAY - Daily sales entry with real-time leaderboard
• MONTHLY - Historical sales with analytics dashboard  
• SALESPEOPLE - Team roster with flexible alias mapping
• DEPOSITS - Customer deposit tracking to prevent duplicates

Click any link below to learn more about each sheet.`;
  
  formatInstructionCell(sheet, 'A2:R5', welcomeText, '#E8F0FE', true, 12);
  
  // Section 2: Quick Start Checklist (Rows 7-15)
  formatHeaderSection(sheet, 'A7:R7', '✅ Quick Start Checklist', '#34A853', '#FFFFFF', 14);
  
  const checklistItems = [
    '☐  Run Setup Wizard (Sales Tools → 🚀 Run Setup Wizard)',
    '☐  Add your sales team to SALESPEOPLE sheet (or use Settings sidebar)',
    '☐  Review TODAY-Instructions to understand daily data entry',
    '☐  Enter a test sale on TODAY sheet',
    '☐  Run "Log Yesterday\'s Sales" to see how processing works',
    '☐  Review MONTHLY-Instructions to understand analytics',
    '☐  Check MONTHLY sheet to see your first analytics report',
    '☐  Explore other instructional sheets as needed'
  ];
  
  checklistItems.forEach((item, idx) => {
    const row = 8 + idx;
    formatInstructionCell(sheet, `A${row}:R${row}`, item, '#FFFFFF', true, 11);
    sheet.getRange(`A${row}:R${row}`)
      .setHorizontalAlignment('left')
      .setBorder(false, false, true, false, false, false, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(row, 30);
  });
  
  // Section 3: Instructional Sheet Links (Rows 17-25)
  formatHeaderSection(sheet, 'A17:R17', '📖 Instructional Sheet Reference', '#4A86E8', '#FFFFFF', 14);
  
  // TODAY Link Card (Rows 18-19)
  sheet.getRange('A18:D18').merge().setValue('TODAY Sheet').setFontWeight('bold').setFontSize(12);
  sheet.getRange('E18:R18').merge().setValue('→ Click to view TODAY-Instructions');
  formatInstructionCell(sheet, 'A19:R19', 'Learn how to enter daily sales, understand the leaderboard, and use duplicate detection', '#FFF3E0', true, 10);
  sheet.getRange('A18:R19')
    .setBackground('#FFF3E0')
    .setBorder(true, true, true, true, false, false, '#FF9800', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  
  // MONTHLY Link Card (Rows 20-21)
  sheet.getRange('A20:D20').merge().setValue('MONTHLY Sheet').setFontWeight('bold').setFontSize(12);
  sheet.getRange('E20:R20').merge().setValue('→ Click to view MONTHLY-Instructions');
  formatInstructionCell(sheet, 'A21:R21', 'Understand historical tracking, date headers, error highlights, and the analytics dashboard', '#E3F2FD', true, 10);
  sheet.getRange('A20:R21')
    .setBackground('#E3F2FD')
    .setBorder(true, true, true, true, false, false, '#2196F3', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  
  // SALESPEOPLE Link Card (Rows 22-23)
  sheet.getRange('A22:D22').merge().setValue('SALESPEOPLE Sheet').setFontWeight('bold').setFontSize(12);
  sheet.getRange('E22:R22').merge().setValue('→ Click to view SALESPEOPLE-Instructions');
  formatInstructionCell(sheet, 'A23:R23', 'Set up your team roster, configure aliases, and understand bidirectional sync', '#E8F5E9', true, 10);
  sheet.getRange('A22:R23')
    .setBackground('#E8F5E9')
    .setBorder(true, true, true, true, false, false, '#4CAF50', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  
  // DEPOSITS Link Card (Rows 24-25)
  sheet.getRange('A24:D24').merge().setValue('DEPOSITS Sheet').setFontWeight('bold').setFontSize(12);
  sheet.getRange('E24:R24').merge().setValue('→ Click to view DEPOSITS-Instructions');
  formatInstructionCell(sheet, 'A25:R25', 'Track customer deposits and prevent duplicate entries on TODAY sheet', '#FCE4EC', true, 10);
  sheet.getRange('A24:R25')
    .setBackground('#FCE4EC')
    .setBorder(true, true, true, true, false, false, '#E91E63', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  
  // Section 4: Daily Workflow Overview (Rows 27-38)
  formatHeaderSection(sheet, 'A27:R27', '📅 Typical Daily Workflow', '#9C27B0', '#FFFFFF', 14);
  
  // Three-column layout
  const morningText = `🌅 MORNING
  
Open TODAY sheet
Review leaderboard from yesterday
Check for any deposits in DEPOSITS sheet`;
  
  const dayText = `☀️ THROUGHOUT DAY
  
Enter sales as they occur on TODAY sheet
Use any name format (full name, alias, or display code)
Apply font colors for special deals (optional)
System highlights duplicates automatically`;
  
  const eveningText = `🌙 END OF DAY
  
Run "Log Yesterday's Sales" (Sales Tools menu)
Review processing summary dialog
Check MONTHLY sheet for transferred data
Review analytics in columns S-X
TODAY sheet is cleared and ready for tomorrow`;
  
  formatInstructionCell(sheet, 'A28:F38', morningText, '#F5F5F5', true, 11);
  formatInstructionCell(sheet, 'G28:L38', dayText, '#FFFFFF', true, 11);
  formatInstructionCell(sheet, 'M28:R38', eveningText, '#F5F5F5', true, 11);
  
  // Section 5: Help & Resources (Rows 40-48)
  formatHeaderSection(sheet, 'A40:R40', '❓ Help & Resources', '#607D8B', '#FFFFFF', 14);
  
  const resources = [
    ['Settings Sidebar', 'Access via Sales Tools → ⚙️ Settings to manage team, colors, and pace thresholds'],
    ['Recalculate MTD', 'Use Sales Tools → 🔄 Recalculate MTD if data is edited manually'],
    ['Refresh Analytics', 'Use Sales Tools → 🔄 Refresh Analytics to update MONTHLY analytics on demand'],
    ['Month Rollover', 'Use Sales Tools → 📅 Rollover Month at end of each month to archive and start fresh'],
    ['', ''],
    ['Common Issues', 'See troubleshooting documentation for solutions to common problems'],
    ['Best Practices', 'Review user guide for tips on optimal usage patterns'],
    ['Support', 'Contact your system administrator for assistance']
  ];
  
  resources.forEach((resource, idx) => {
    const row = 41 + idx;
    sheet.getRange(`A${row}:I${row}`).merge().setValue(resource[0]).setFontWeight('bold');
    sheet.getRange(`J${row}:R${row}`).merge().setValue(resource[1]);
    sheet.getRange(`A${row}:R${row}`)
      .setFontFamily('Calibri')
      .setFontSize(10)
      .setBackground('#FFFFFF')
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle')
      .setBorder(false, false, true, false, false, false, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(row, 25);
  });
  
  // Section 6: Footer (Row 50)
  formatInstructionCell(
    sheet,
    'A50:R50',
    '💡 Tip: Keep this sheet open in a separate browser tab for quick reference while working | Sales Log Pro v8.0',
    '#F5F5F5',
    true,
    9
  );
  sheet.getRange('A50:R50').setFontStyle('italic').setFontColor('#666666').setHorizontalAlignment('center');
  sheet.setRowHeight(50, 25);
  
  // Freeze row 1 for navigation
  sheet.setFrozenRows(1);
  
  // Protect sheet
  protectSheet(sheet, 'This is a reference guide. Please do not edit.');
  
  Logger.log('Getting-Started sheet created successfully');
  return sheet;
}

// ============================================================================
// TODAY-INSTRUCTIONS SHEET
// ============================================================================

/**
 * Creates the TODAY-Instructions sheet.
 * Comprehensive guide to daily sales entry and leaderboard.
 * 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
 */
function createTodayInstructionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'TODAY-Instructions';
  
  let sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(sheetName);
  
  // Match TODAY sheet column widths (18 columns A-R)
  const widths = {
    1: 30, 2: 165, 3: 35, 4: 150, 5: 125, 6: 60, 7: 195,
    8: 5, 9: 165, 10: 35, 11: 150, 12: 125, 13: 60, 14: 195,
    15: 5, 16: 170, 17: 70, 18: 80
  };
  setColumnWidths(sheet, widths);
  
  // Navigation Bar
  formatHeaderSection(sheet, 'A1:R1', '📖 TODAY Sheet Instructions | [← Back to Getting-Started]', '#4A86E8', '#FFFFFF', 14, 'left');
  sheet.setRowHeight(1, 35);
  
  // Overview Section
  formatHeaderSection(sheet, 'A3:R3', '📊 OVERVIEW: Daily Sales Entry & Real-Time Leaderboard', '#E8F0FE', '#1A73E8', 13, 'left');
  
  const overviewText = `The TODAY sheet is your daily data entry hub. It features:

✓ Side-by-side NEW and USED car sales entry (columns A-N)
✓ Flexible salesperson entry (use full name, alias, or display code)
✓ Real-time leaderboard with MTD sales and 3-month averages (columns P-R)
✓ Automatic duplicate stock number detection (highlights in lime green)
✓ Deposit check integration (highlights if stock # is in DEPOSITS)
✓ Font color preservation when processing to MONTHLY

At the end of each day, run "Log Yesterday's Sales" from the Sales Tools menu to transfer data to MONTHLY sheet and clear TODAY for the next day.`;
  
  formatInstructionCell(sheet, 'A4:R9', overviewText, '#FFFFFF', true, 11);
  
  // Column Headers Mirror
  formatHeaderSection(sheet, 'A11:R11', 'TODAY SHEET COLUMN LAYOUT', '#E0E0E0', '#000000', 10);
  
  const headers = [
    '#', 'CUSTOMER', 'FI', 'NEW MODEL', 'STOCK #', 'TRADE STK#', 'SALESPERSON',
    '', 'CUSTOMER', 'FI', 'USED MODEL', 'STOCK #', 'TRADE STK#', 'SALESPERSON',
    '', 'LEADERBOARD', 'MTD SALES', '3mo. AVG'
  ];
  
  const headerRange = sheet.getRange('A12:R12');
  headerRange.setValues([headers])
    .setFontFamily('Calibri')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBackground('#E0E0E0');
  
  // Key Features Section
  formatHeaderSection(sheet, 'A14:R14', '💡 KEY FEATURES', '#E8F0FE', '#1A73E8', 12);
  
  const features = [
    ['Duplicate Detection', 'Entire row highlights in LIME GREEN with RED text when same stock # appears twice'],
    ['Deposit Check', 'Row highlights if stock # exists in DEPOSITS sheet (prevents double-counting)'],
    ['Font Color Transfer', 'Any font colors you apply (e.g., red for special deals) transfer to MONTHLY'],
    ['Flexible Salesperson Entry', 'Type full name, alias, or display code - all resolve to same person'],
    ['Automatic Processing', 'Daily processing transfers data, clears TODAY, updates leaderboard automatically']
  ];
  
  features.forEach((feature, idx) => {
    const row = 15 + idx;
    sheet.getRange(`A${row}:D${row}`).merge().setValue(feature[0]).setFontWeight('bold');
    sheet.getRange(`E${row}:R${row}`).merge().setValue(feature[1]);
    sheet.getRange(`A${row}:R${row}`)
      .setFontFamily('Calibri')
      .setFontSize(10)
      .setBackground('#FFFFFF')
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle')
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
      .setBorder(false, false, true, false, false, false, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(row, 30);
  });
  
  // Tips & Best Practices
  formatHeaderSection(sheet, 'A21:R21', '✅ TIPS & BEST PRACTICES', '#34A853', '#FFFFFF', 12);
  
  const tips = [
    ['DO:', 'Enter sales as they occur throughout the day for real-time leaderboard updates'],
    ['DO:', 'Use font colors to mark special deals (red for loser deals, blue for bonuses, etc.)'],
    ['DO:', 'Check for lime green highlights - they indicate duplicates or deposits'],
    ['DON\'T:', 'Skip the FI column - it determines if a deal is delivered (must be single letter A-Z)'],
    ['DON\'T:', 'Manually edit the leaderboard (columns P-R) - it updates automatically']
  ];
  
  tips.forEach((tip, idx) => {
    const row = 22 + idx;
    const bgColor = tip[0].includes('DON\'T') ? '#FFEBEE' : '#E8F5E9';
    sheet.getRange(`A${row}:C${row}`).merge().setValue(tip[0]).setFontWeight('bold');
    sheet.getRange(`D${row}:R${row}`).merge().setValue(tip[1]);
    sheet.getRange(`A${row}:R${row}`)
      .setFontFamily('Calibri')
      .setFontSize(10)
      .setBackground(bgColor)
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle')
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    sheet.setRowHeight(row, 25);
  });
  
  // Related Sheets
  formatHeaderSection(sheet, 'A28:R28', '🔗 RELATED SHEETS', '#607D8B', '#FFFFFF', 12);
  
  const related = [
    '→ MONTHLY-Instructions | See where your data goes after processing',
    '→ SALESPEOPLE-Instructions | Understand flexible salesperson name entry',
    '→ DEPOSITS-Instructions | Learn about deposit tracking and duplicate prevention',
    '→ Getting-Started | Return to main instructions hub'
  ];
  
  related.forEach((link, idx) => {
    const row = 29 + idx;
    formatInstructionCell(sheet, `A${row}:R${row}`, link, '#FFFFFF', true, 10);
    sheet.getRange(`A${row}:R${row}`).setHorizontalAlignment('left');
    sheet.setRowHeight(row, 25);
  });
  
  // Footer
  formatInstructionCell(
    sheet,
    'A34:R34',
    '💡 Tip: The TODAY sheet is designed for speed - enter data quickly and let the system handle the rest | TODAY Instructions v1.0',
    '#F5F5F5',
    true,
    9
  );
  sheet.getRange('A34:R34').setFontStyle('italic').setFontColor('#666666').setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  protectSheet(sheet, 'This is an instructional guide. Please refer to TODAY sheet for data entry.');
  
  Logger.log('TODAY-Instructions sheet created successfully');
  return sheet;
}

// ============================================================================
// MONTHLY-INSTRUCTIONS SHEET
// ============================================================================

/**
 * Creates the MONTHLY-Instructions sheet.
 * Guide to historical sales tracking and analytics dashboard.
 * 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
 */
function createMonthlyInstructionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'MONTHLY-Instructions';
  
  let sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(sheetName);
  
  // Match MONTHLY sheet column widths (24 columns A-X)
  const widths = {
    1: 45, 2: 115, 3: 45, 4: 100, 5: 70, 6: 90, 7: 125,
    8: 5, 9: 115, 10: 45, 11: 100, 12: 70, 13: 90, 14: 125,
    15: 5, 16: 160, 17: 50, 18: 60,
    19: 180, 20: 140, 21: 120, 22: 100, 23: 100, 24: 100
  };
  setColumnWidths(sheet, widths);
  
  // Navigation Bar
  formatHeaderSection(sheet, 'A1:X1', '📖 MONTHLY Sheet Instructions | [← Back to Getting-Started]', '#4A86E8', '#FFFFFF', 14, 'left');
  sheet.setRowHeight(1, 35);
  
  // Overview
  formatHeaderSection(sheet, 'A3:X3', '📊 OVERVIEW: Historical Sales & Analytics Dashboard', '#E8F0FE', '#1A73E8', 13, 'left');
  
  const overviewText = `The MONTHLY sheet is your historical record and analytics center. It contains:

✓ All processed sales from TODAY sheet organized by date (columns A-N)
✓ Date headers separating each day's entries (format: M/D in yellow)
✓ Final leaderboard from month-end (columns P-R)
✓ Comprehensive analytics dashboard (columns S-X)
✓ Error highlighting for non-delivered deals (red) and unknown salespeople (light red)

This sheet grows throughout the month. At month-end, it's archived and cleared for the new month.`;
  
  formatInstructionCell(sheet, 'A4:X8', overviewText, '#FFFFFF', true, 11);
  
  // Date Headers Explanation
  formatHeaderSection(sheet, 'A10:X10', '📅 DATE HEADERS & NAVIGATION', '#FFF3E0', '#000000', 12);
  
  const dateHeaderText = `Each day's sales are grouped under a YELLOW date header (e.g., "5/15").

These headers:
• Separate each day's entries visually
• Are created automatically during daily processing
• Span columns A-N (merged cells)
• Use bold text on yellow background for visibility
• Help you quickly find sales from specific dates

The MONTHLY sheet is READ-ONLY for data columns (A-N). To fix errors, edit the original entry location or use "Recalculate MTD" after manual corrections.`;
  
  formatInstructionCell(sheet, 'A11:X16', dateHeaderText, '#FFFFFF', true, 10);
  
  // Error Highlighting
  formatHeaderSection(sheet, 'A18:X18', '🚨 ERROR HIGHLIGHTING SYSTEM', '#FFEBEE', '#C00000', 12);
  
  const errorText = `The MONTHLY sheet automatically highlights two types of issues:

1. NON-DELIVERED DEALS (RED background):
   • Any row with data but no FI letter (or invalid FI)
   • Highlights the entire sales section (excludes trade column)
   • Action: Verify FI status or remove if not delivered

2. UNKNOWN SALESPERSON (LIGHT RED background):
   • Salesperson name doesn't match anyone in SALESPEOPLE sheet
   • Highlights only the salesperson column
   • Action: Fix typo or add person to SALESPEOPLE sheet, then run "Recalculate MTD"

These highlights update automatically during processing and when running "Recalculate MTD".`;
  
  formatInstructionCell(sheet, 'A19:X26', errorText, '#FFFFFF', true, 10);
  
  // Analytics Dashboard
  formatHeaderSection(sheet, 'A28:X28', '📈 ANALYTICS DASHBOARD (Columns S-X)', '#E3F2FD', '#1976D2', 12);
  
  const analyticsText = `The analytics dashboard (columns S-X) provides comprehensive performance metrics:

TEAM METRICS (Rows 2-6):
• Team Total Units (S2)
• Average per Salesperson (T2)
• Top Performer (U2)
• Team Pace vs Goal (V2)
• Additional metrics (W2-X2)

INDIVIDUAL PERFORMANCE (Row 8+):
Each salesperson gets a row with:
• Display Code (Column S)
• Total Units (Column T)
• New vs Used Split (Columns U-V)
• Performance Indicators (Columns W-X)

The dashboard refreshes automatically during daily processing or when you run "Refresh Analytics" from the menu.`;
  
  formatInstructionCell(sheet, 'A29:X40', analyticsText, '#FFFFFF', true, 10);
  
  // Month Rollover
  formatHeaderSection(sheet, 'A42:X42', '📅 MONTH ROLLOVER PROCESS', '#E8F5E9', '#2E7D32', 12);
  
  const rolloverText = `At the end of each month, use "Start New Month (Rollover)" from Sales Tools menu:

WHAT HAPPENS:
1. Current MONTHLY sheet is archived with date name (e.g., "5/25")
2. Final leaderboard is copied to the archive
3. MONTHLY sheet is cleared for new month
4. MTD sales reset to 0 on TODAY sheet
5. 3-month rolling averages recalculated

TIMING:
• Run on the 1st of the new month
• Before entering any new sales
• After all previous month's sales are processed

The archived sheets are permanent records and should not be deleted.`;
  
  formatInstructionCell(sheet, 'A43:X52', rolloverText, '#FFFFFF', true, 10);
  
  // Related Sheets
  formatHeaderSection(sheet, 'A54:X54', '🔗 RELATED SHEETS', '#607D8B', '#FFFFFF', 12);
  
  const related = [
    '→ TODAY-Instructions | Learn about daily data entry that feeds MONTHLY',
    '→ SALESPEOPLE-Instructions | Fix unknown salesperson errors',
    '→ Getting-Started | Return to main instructions hub'
  ];
  
  related.forEach((link, idx) => {
    const row = 55 + idx;
    formatInstructionCell(sheet, `A${row}:X${row}`, link, '#FFFFFF', true, 10);
    sheet.getRange(`A${row}:X${row}`).setHorizontalAlignment('left');
    sheet.setRowHeight(row, 25);
  });
  
  // Footer
  formatInstructionCell(
    sheet,
    'A59:X59',
    '💡 Tip: MONTHLY is your historical record - treat it as read-only and use tools to recalculate if needed | MONTHLY Instructions v1.0',
    '#F5F5F5',
    true,
    9
  );
  sheet.getRange('A59:X59').setFontStyle('italic').setFontColor('#666666').setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  protectSheet(sheet, 'This is an instructional guide. Please refer to MONTHLY sheet for actual data.');
  
  Logger.log('MONTHLY-Instructions sheet created successfully');
  return sheet;
}

// ============================================================================
// SALESPEOPLE-INSTRUCTIONS SHEET  
// ============================================================================

/**
 * Creates the SALESPEOPLE-Instructions sheet.
 * Comprehensive guide per design document sections 397-822.
 * 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
 */
function createSalespeopleInstructionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'SALESPEOPLE-Instructions';
  
  let sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(sheetName);
  
  // Match SALESPEOPLE sheet column widths (3 columns)
  setColumnWidths(sheet, { 1: 150, 2: 150, 3: 150 });
  
  // Navigation Bar
  formatHeaderSection(sheet, 'A1:C1', '📖 SALESPEOPLE Sheet Instructions | [← Back to Getting-Started]', '#4A86E8', '#FFFFFF', 14, 'left');
  sheet.setRowHeight(1, 35);
  
  // Overview
  formatHeaderSection(sheet, 'A3:C3', '👥 OVERVIEW: Team Roster & Alias Management', '#E8F0FE', '#1A73E8', 13, 'left');
  
  const overviewText = `The SALESPEOPLE sheet is the master roster for your sales team. It serves several critical functions:

✓ Maps full names to shorter aliases and display codes
✓ Enables flexible data entry (type "JS" instead of "John Smith")
✓ Powers salesperson name resolution throughout the system
✓ Syncs bidirectionally with Settings sidebar
✓ Supports multiple aliases per person for maximum flexibility

This 3-column sheet is the foundation of the entire tracking system. All analytics, leaderboards, and reporting depend on accurate SALESPEOPLE data.`;
  
  formatInstructionCell(sheet, 'A4:C9', overviewText, '#FFFFFF', true, 11);
  
  // Column Headers Mirror
  const headers = ['FULL NAME', 'ALIASES', 'DISPLAY CODE'];
  sheet.getRange('A11:C11').setValues([headers])
    .setFontFamily('Calibri')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBackground('#E0E0E0');
  sheet.setRowHeight(11, 25);
  
  formatInstructionCell(sheet, 'A12:C12', 'THREE COLUMNS THAT POWER THE ENTIRE SYSTEM', '#F5F5F5', true, 9);
  sheet.getRange('A12:C12').setFontWeight('bold').setFontStyle('italic').setFontColor('#666666');
  
  // Column-by-Column Guide
  formatHeaderSection(sheet, 'A14:C14', '📝 COLUMN-BY-COLUMN GUIDE', '#E8F0FE', '#1A73E8', 12);
  
  // Column A - Full Name
  formatHeaderSection(sheet, 'A15:C15', 'COLUMN A: FULL NAME', '#FFF3E0', '#000000', 11);
  
  const fullNameText = `The official, complete name of the salesperson used in all reports and analytics.

REQUIREMENTS:
• Required field (cannot be blank)
• Must be 2-100 characters
• Should be unique (no two people with same full name)
• This is how the person appears in leaderboards and analytics

EXAMPLES:
• 'Michael Chen'
• 'Sarah Johnson'
• 'Robert Williams Jr.'

BEST PRACTICE: Use the name as it appears on official documents or payroll. Consistency matters for historical tracking.`;
  
  formatInstructionCell(sheet, 'A16:C17', fullNameText, '#FFFFFF', true, 10);
  
  // Column B - Aliases
  formatHeaderSection(sheet, 'A18:C18', 'COLUMN B: ALIASES', '#E8F5E9', '#000000', 11);
  
  const aliasesText = `Comma-separated list of alternative names that map to this person. This is where the magic happens!

REQUIREMENTS:
• Optional field (can be blank)
• Comma-separated format: "JS, Johnny, John"
• Maximum 200 characters total
• No duplicate aliases across different people
• Case-insensitive matching

HOW ALIASES WORK:
When entering sales data, you can use ANY of these formats:
1. Full name from Column A: 'Michael Chen'
2. Any alias from Column B: 'MC', 'Mike', 'Michael', 'Chen'
3. Display code from Column C: 'MC'

ALL resolve to the same person in analytics!

EXAMPLES:
Person 1: 'Michael Chen' with aliases 'MC, Mike, Michael, Chen'
Person 2: 'Sarah Johnson' with aliases 'SJ, Sarah, Johnson, Sally'

TIPS:
• Include initials (e.g., 'MC')
• Add nicknames (e.g., 'Mike')
• Include last name only (e.g., 'Chen')
• Add common misspellings to prevent errors
• Consider what salespeople actually type`;
  
  formatInstructionCell(sheet, 'A19:C22', aliasesText, '#FFFFFF', true, 10);
  
  // Column C - Display Code
  formatHeaderSection(sheet, 'A23:C23', 'COLUMN C: DISPLAY CODE', '#E3F2FD', '#000000', 11);
  
  const displayCodeText = `Short 2-4 character code used in compact displays like leaderboards and analytics.

REQUIREMENTS:
• Required field (cannot be blank)
• Must be 2-4 alphanumeric characters
• Auto-converts to UPPERCASE
• Must be unique across all salespeople
• Typically initials (e.g., 'MC', 'SJ', 'RW')

WHERE DISPLAY CODES APPEAR:
• MONTHLY analytics dashboard (Column S)
• Leaderboard compact view
• Processing summaries
• Export reports

EXAMPLES:
• 'MC' for Michael Chen
• 'SJ' for Sarah Johnson
• 'RW' for Robert Williams
• 'MJ2' for second Mary Johnson (if duplicate initials)

BEST PRACTICE: Use initials when possible. If two people have same initials, add a number or middle initial.`;
  
  formatInstructionCell(sheet, 'A24:C27', displayCodeText, '#FFFFFF', true, 10);
  
  // Example Entries
  formatHeaderSection(sheet, 'A29:C29', '💡 EXAMPLE ENTRIES', '#E8F0FE', '#1A73E8', 12);
  
  sheet.getRange('A30:C30').setValues([headers])
    .setFontFamily('Calibri')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setBackground('#E0E0E0');
  
  const examples = [
    ['Michael Chen', 'MC, Mike, Michael, Chen', 'MC'],
    ['Sarah Johnson', 'SJ, Sarah, Johnson, Sally', 'SJ'],
    ['Robert Williams Jr.', 'RW', 'RW'],
    ['Emily Taylor', '', 'ET']
  ];
  
  const exampleColors = ['#E8F5E9', '#E1F5FE', '#FFF3E0', '#FCE4EC'];
  const borderColors = ['#4CAF50', '#03A9F4', '#FF9800', '#E91E63'];
  
  examples.forEach((example, idx) => {
    const row = 31 + idx;
    sheet.getRange(`A${row}:C${row}`).setValues([example])
      .setFontFamily('Calibri')
      .setFontSize(10)
      .setHorizontalAlignment('center')
      .setBackground(exampleColors[idx])
      .setBorder(true, true, true, true, false, false, borderColors[idx], SpreadsheetApp.BorderStyle.SOLID);
  });
  
  const explanationText = `✓ Ex1: Maximum flexibility - can enter 'MC', 'Mike', 'Michael', 'Chen', or full name
✓ Ex2: Common aliases including nickname
✓ Ex3: Minimal setup - only initials as alias
✓ Ex4: No aliases - must use full name or display code only`;
  
  formatInstructionCell(sheet, 'A35:C35', explanationText, '#F5F5F5', true, 9);
  
  // Bidirectional Sync
  formatHeaderSection(sheet, 'A37:C37', '🔄 BIDIRECTIONAL SYNC WITH SETTINGS', '#E8F0FE', '#1A73E8', 12);
  
  const syncText = `WHAT IS BIDIRECTIONAL SYNC?
Changes made in EITHER location automatically sync to the other:
• Add person in Settings sidebar → Appears in SALESPEOPLE sheet
• Edit name in SALESPEOPLE sheet → Updates in Settings sidebar
• Delete person in Settings → Removes from SALESPEOPLE sheet

This ensures consistency and allows you to work in whichever interface is most convenient.

METHOD 1: Settings Sidebar (Recommended for most users)
1. Click Sales Tools → ⚙️ Settings
2. Go to 👥 Sales Team tab
3. Click 'Add Salesperson' button
4. Fill in Full Name, Aliases, Display Code
5. Click 'Add' then 'Save Changes'
6. Person appears in SALESPEOPLE sheet immediately

METHOD 2: Direct Sheet Editing (Advanced users)
1. Open SALESPEOPLE sheet
2. Add new row with data in columns A-C
3. Data automatically syncs to Settings sidebar
4. Validation rules enforce formatting requirements
5. Duplicate checking prevents conflicts

SYNC TIMING:
• Sidebar → Sheet: Immediate upon clicking 'Save Changes'
• Sheet → Sidebar: Next time sidebar opens or on next data operation
• Cache: 5-minute cache for performance (getSalespersonMaps function)
• Processing: Always uses most current data from sheet`;
  
  formatInstructionCell(sheet, 'A38:C48', syncText, '#FFFFFF', true, 10);
  
  // Best Practices
  formatHeaderSection(sheet, 'A50:C50', '💡 BEST PRACTICES & PRO TIPS', '#34A853', '#FFFFFF', 12);
  
  const practicesText = `✅ DO: Set up aliases strategically
Think about HOW your team actually types names. Add common variations:
• Initials: 'MC', 'SJ'
• First name only: 'Michael', 'Sarah'
• Last name only: 'Chen', 'Johnson'
• Nicknames: 'Mike', 'Sally'
• Common typos: 'Jon' for 'John', 'Mich' for 'Michael'

✅ DO: Use consistent display codes
Establish a pattern and stick to it:
• Initials: 'MC' for Michael Chen, 'SJ' for Sarah Johnson
• If duplicates: Add number 'MJ1', 'MJ2' OR middle initial 'MJA', 'MJB'
• Keep codes short (2-4 characters) for compact displays

❌ DON'T: Create duplicate aliases
Each alias must be unique:
• Wrong: Two people both have alias 'Mike'
• Right: Use 'Mike' and 'Mikey', OR full names 'Mike S' and 'Mike J'
• System prevents this but good to plan ahead

💎 PRO TIP: Import/Export for bulk changes
Use Settings sidebar Import/Export:
• Export to CSV to review all salespeople
• Edit in spreadsheet for bulk changes
• Re-import to update system
• Faster than one-by-one for large teams`;
  
  formatInstructionCell(sheet, 'A51:C64', practicesText, '#FFFFFF', true, 10);
  
  // Related Sheets
  formatHeaderSection(sheet, 'A66:C66', '🔗 RELATED SHEETS', '#607D8B', '#FFFFFF', 12);
  
  const related = [
    '→ TODAY-Instructions | See how flexible salesperson entry works during daily data entry',
    '→ MONTHLY-Instructions | Understand how names appear in analytics and how to fix errors',
    '→ Getting-Started | Return to main instructions hub'
  ];
  
  related.forEach((link, idx) => {
    const row = 67 + idx;
    formatInstructionCell(sheet, `A${row}:C${row}`, link, '#FFFFFF', true, 10);
    sheet.getRange(`A${row}:C${row}`).setHorizontalAlignment('left');
    sheet.setRowHeight(row, 25);
  });
  
  // Footer
  formatInstructionCell(
    sheet,
    'A71:C71',
    '💡 Tip: Keep SALESPEOPLE current - it\'s the foundation of accurate analytics | SALESPEOPLE Instructions v1.0',
    '#F5F5F5',
    true,
    9
  );
  sheet.getRange('A71:C71').setFontStyle('italic').setFontColor('#666666').setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  protectSheet(sheet, 'This is an instructional guide. Please refer to SALESPEOPLE sheet for team management.');
  
  Logger.log('SALESPEOPLE-Instructions sheet created successfully');
  return sheet;
}

// ============================================================================
// DEPOSITS-INSTRUCTIONS SHEET
// ============================================================================

/**
 * Creates the DEPOSITS-Instructions sheet.
 * Comprehensive guide per design document sections 825-1297.
 * 
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
 */
function createDepositsInstructionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'DEPOSITS-Instructions';
  
  let sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(sheetName);
  
  // Match DEPOSITS sheet column widths (14 columns A-N)
  const widths = {
    1: 100, 2: 80, 3: 60, 4: 120, 5: 120, 6: 100, 7: 120,
    8: 120, 9: 100, 10: 150, 11: 120, 12: 120, 13: 120, 14: 200
  };
  setColumnWidths(sheet, widths);
  
  // Navigation Bar
  formatHeaderSection(sheet, 'A1:N1', '📖 DEPOSITS Sheet Instructions | [← Back to Getting-Started]', '#4A86E8', '#FFFFFF', 14, 'left');
  sheet.setRowHeight(1, 35);
  
  // Overview
  formatHeaderSection(sheet, 'A3:N3', '📋 OVERVIEW: Deposit Tracking & Duplicate Prevention', '#E8F0FE', '#1A73E8', 13, 'left');
  
  const overviewText = `The DEPOSITS sheet tracks customer deposits on vehicles that haven't yet delivered. Its primary purpose:

✓ Record detailed deposit information for customer management
✓ Prevent counting deposited vehicles as delivered sales on TODAY sheet
✓ Automatic highlighting of deposit stock numbers when entered on TODAY
✓ Track delivery status and timeline
✓ Maintain customer contact information

When a stock number from DEPOSITS (Column G) appears on TODAY sheet, it highlights in LIME GREEN with RED text. This visual warning prevents double-counting and alerts you that the vehicle has a deposit.`;
  
  formatInstructionCell(sheet, 'A4:N9', overviewText, '#FFFFFF', true, 11);
  
  // Column Headers Mirror
  const headers = ['DATE', 'NEW/USED', 'YEAR', 'MAKE', 'MODEL', 'ORDER #', 'STOCK #', 
                   'SALESPERSON', 'BDC', 'CUSTOMER', 'DIRECTOR', 'PHONE #', 'EST DELIVERY DATE', 'NOTES'];
  
  sheet.getRange('A11:N11').setValues([headers])
    .setFontFamily('Calibri')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBackground('#E0E0E0');
  sheet.setRowHeight(11, 25);
  
  formatInstructionCell(sheet, 'A12:N12', 'DEPOSIT TRACKING - 14 COLUMNS FOR COMPREHENSIVE INFORMATION', '#F5F5F5', true, 9);
  sheet.getRange('A12:N12').setFontWeight('bold').setFontStyle('italic').setFontColor('#666666');
  
  // Key Column: STOCK # (Column G)
  formatHeaderSection(sheet, 'A14:N14', '⚠️ COLUMN G: STOCK # - CRITICAL FOR DUPLICATE DETECTION', '#FF0000', '#FFFFFF', 11);
  
  const stockColText = `THIS IS THE KEY COLUMN! Stock numbers in this column are used for conditional formatting on TODAY sheet.

HOW IT WORKS:
• When you enter a stock number on TODAY sheet (column E for new, column L for used)
• System checks if that stock number exists in DEPOSITS column G
• If match found → Entire TODAY row highlights in LIME GREEN with RED text
• This prevents counting deposited vehicles as delivered sales

REQUIREMENTS:
• Use same stock number format as TODAY sheet
• Must match EXACTLY for highlighting to work
• Examples: 'N24-1215', 'U24-3301', '12345'
• Update or remove stock number when vehicle delivers

This column powers the duplicate detection system - keep it current!`;
  
  formatInstructionCell(sheet, 'A15:N20', stockColText, '#FFFFFF', true, 10);
  
  // Duplicate Detection System
  formatHeaderSection(sheet, 'A22:N22', '🚨 DUPLICATE DETECTION & CONDITIONAL FORMATTING', '#E8F0FE', '#1A73E8', 12);
  
  const detectionText = `The DEPOSITS sheet integrates with TODAY sheet through conditional formatting:

CONDITIONAL FORMATTING FORMULA:
• NEW cars: =COUNTIF(INDIRECT('DEPOSITS!G:G'),$E2)>0
  Checks if TODAY Column E matches any stock in DEPOSITS Column G
  
• USED cars: =COUNTIF(INDIRECT('DEPOSITS!G:G'),$L2)>0
  Checks if TODAY Column L matches any stock in DEPOSITS Column G

VISUAL HIGHLIGHTING:
• Fill color: #b4ff0c (bright lime green)
• Text color: #ff0000 (red)
• Applies to entire row on TODAY sheet
• Identical highlighting to duplicate stock detection

WHY THIS MATTERS:
Prevents critical error: Counting a vehicle twice

SCENARIO WITHOUT DEPOSITS TRACKING:
1. Customer places deposit on stock N24-1215 (recorded somewhere)
2. Later, vehicle arrives and delivers to customer
3. Salesperson enters N24-1215 on TODAY sheet
4. System counts as delivered sale
5. BUT deposit was already counted in previous month
6. Result: Double-counting inflates sales numbers

SCENARIO WITH DEPOSITS TRACKING:
1. Deposit on N24-1215 recorded in DEPOSITS sheet
2. When entered on TODAY sheet, row highlights in lime green
3. Salesperson sees warning and investigates
4. Realizes it's a deposit delivery, not a new sale
5. Either: Don't enter (already counted) OR note as deposit delivery
6. Result: Accurate sales tracking`;
  
  formatInstructionCell(sheet, 'A23:N42', detectionText, '#FFFFFF', true, 10);
  
  // Workflow Integration
  formatHeaderSection(sheet, 'A44:N44', '🔄 WORKFLOW INTEGRATION', '#E8F0FE', '#1A73E8', 12);
  
  const workflowText = `TAKING A DEPOSIT (Step-by-Step):

STEP 1: Gather information
• Customer name and contact info
• Vehicle details (year, make, model)
• Stock number (if assigned) or order number
• Estimated delivery date
• Salesperson and any special notes

STEP 2: Record in DEPOSITS sheet
• Add new row with all information
• CRITICAL: Enter stock number in Column G
• Double-check stock number is correct
• Add any relevant notes in Column N

STEP 3: System automatically protects
• Stock number now in conditional formatting lookup
• Any attempt to enter on TODAY sheet triggers highlighting
• Protection active until you remove from DEPOSITS

WHEN VEHICLE DELIVERS:

STEP 1: Verify delivery
• Confirm vehicle delivered and funded (has FI letter)
• Check all paperwork complete

STEP 2: Remove from DEPOSITS
• Delete the row from DEPOSITS sheet, OR
• Clear Column G (stock number) only
• This disables the conditional formatting protection

STEP 3: Do NOT enter on TODAY sheet
• Deposit was already counted when taken
• Entering again would double-count the sale
• Keep TODAY sheet for non-deposited sales

WHEN DEPOSIT CANCELS:

STEP 1: Remove from DEPOSITS
• Delete the row entirely
• Vehicle stock available for other sales

STEP 2: Stock available again
• Stock number can now be sold to different customer
• Will no longer trigger highlighting on TODAY sheet`;
  
  formatInstructionCell(sheet, 'A45:N68', workflowText, '#FFFFFF', true, 10);
  
  // Best Practices
  formatHeaderSection(sheet, 'A70:N70', '💡 MAINTENANCE & BEST PRACTICES', '#34A853', '#FFFFFF', 12);
  
  const practicesText = `✅ DO: Keep deposits current
Regularly review and update:
• Weekly cleanup of delivered vehicles
• Remove or update old deposits
• Verify estimated delivery dates
• Update customer contact information as needed
• Active maintenance prevents false positives on TODAY sheet

✅ DO: Use consistent stock number format
Stock number format MUST match TODAY sheet:
• If TODAY uses 'N24-1215', use 'N24-1215' in DEPOSITS
• If TODAY uses '12345', use '12345' in DEPOSITS
• Case doesn't matter (N24-1215 = n24-1215)
• Spaces and special characters must match exactly
• Consistency ensures highlighting works correctly

❌ DON'T: Let deposits accumulate indefinitely
Stale deposits cause problems:
• False positive highlights on TODAY sheet
• Confusion about what's actually pending
• Cluttered deposit tracking
• Regular cleanup (weekly/monthly) keeps system clean
• Archive old deposits if needed for records

💎 PRO TIP: Export for customer follow-up
Use DEPOSITS as customer communication tool:
• Export to CSV for call lists
• Sort by estimated delivery date for proactive outreach
• Filter by salesperson for individual follow-up
• Phone numbers ready for customer updates
• Better customer experience through organization`;
  
  formatInstructionCell(sheet, 'A71:N88', practicesText, '#FFFFFF', true, 10);
  
  // Related Sheets
  formatHeaderSection(sheet, 'A90:N90', '🔗 RELATED SHEETS', '#607D8B', '#FFFFFF', 12);
  
  const related = [
    '→ TODAY-Instructions | Understand how duplicate detection highlighting works on TODAY sheet',
    '→ MONTHLY-Instructions | Not directly related but part of the complete tracking system',
    '→ Getting-Started | Return to main instructions hub'
  ];
  
  related.forEach((link, idx) => {
    const row = 91 + idx;
    formatInstructionCell(sheet, `A${row}:N${row}`, link, '#FFFFFF', true, 10);
    sheet.getRange(`A${row}:N${row}`).setHorizontalAlignment('left');
    sheet.setRowHeight(row, 25);
  });
  
  // Footer
  formatInstructionCell(
    sheet,
    'A95:N95',
    '💡 Tip: Clean DEPOSITS weekly for accurate duplicate detection | DEPOSITS Instructions v1.0',
    '#F5F5F5',
    true,
    9
  );
  sheet.getRange('A95:N95').setFontStyle('italic').setFontColor('#666666').setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  protectSheet(sheet, 'This is an instructional guide. Please refer to DEPOSITS sheet for deposit tracking.');
  
  Logger.log('DEPOSITS-Instructions sheet created successfully');
  return sheet;
}

// ============================================================================
// HYPERLINK MANAGEMENT
// ============================================================================

/**
 * Adds all hyperlinks between instructional sheets.
 * Called after all sheets are created to ensure targets exist.
 * 
 * @returns {void}
 */
function addAllHyperlinks() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Getting-Started → All instruction sheets
    const gettingStarted = ss.getSheetByName('Getting-Started');
    if (gettingStarted) {
      addHyperlink(gettingStarted, 'E18', '→ Click to view TODAY-Instructions', 'TODAY-Instructions');
      addHyperlink(gettingStarted, 'E20', '→ Click to view MONTHLY-Instructions', 'MONTHLY-Instructions');
      addHyperlink(gettingStarted, 'E22', '→ Click to view SALESPEOPLE-Instructions', 'SALESPEOPLE-Instructions');
      addHyperlink(gettingStarted, 'E24', '→ Click to view DEPOSITS-Instructions', 'DEPOSITS-Instructions');
    }
    
    // All instruction sheets → Back to Getting-Started
    ['TODAY-Instructions', 'MONTHLY-Instructions', 'SALESPEOPLE-Instructions', 'DEPOSITS-Instructions'].forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (sheet) {
        // Add "Back to Getting-Started" link in navigation bar (cell varies by sheet width)
        const cell = sheetName === 'SALESPEOPLE-Instructions' ? 'A1' : 
                     sheetName === 'DEPOSITS-Instructions' ? 'A1' : 'A1';
        const currentText = sheet.getRange(cell).getValue();
        const newText = currentText.replace('[← Back to Getting-Started]', '');
        sheet.getRange(cell).setValue(newText + ' ');
        
        // Add hyperlink in a separate approach - append to end of nav bar
        const navRange = sheet.getRange(1, 1);
        const text = navRange.getValue() + '[← Back]';
        navRange.setValue(text);
        
        // Create rich text with hyperlink at the end of the text
        const gettingStartedSheet = ss.getSheetByName('Getting-Started');
        if (gettingStartedSheet) {
          const gid = gettingStartedSheet.getSheetId();
          const url = `#gid=${gid}`;
          
          // Get current value and append back link
          const fullText = sheet.getRange(1, 1).getValue();
          const linkText = '[← Back to Getting-Started]';
          const beforeLink = fullText.replace(linkText, '').trim();
          
          const richTextValue = SpreadsheetApp.newRichTextValue()
            .setText(beforeLink + ' ' + linkText)
            .setLinkUrl(fullText.indexOf(linkText), fullText.indexOf(linkText) + linkText.length, url)
            .build();
          
          sheet.getRange(1, 1).setRichTextValue(richTextValue);
        }
      }
    });
    
    // Cross-references within instruction sheets
    // TODAY-Instructions → Other sheets
    const todayInstr = ss.getSheetByName('TODAY-Instructions');
    if (todayInstr) {
      addHyperlink(todayInstr, 'A29', '→ MONTHLY-Instructions', 'MONTHLY-Instructions');
      addHyperlink(todayInstr, 'A30', '→ SALESPEOPLE-Instructions', 'SALESPEOPLE-Instructions');
      addHyperlink(todayInstr, 'A31', '→ DEPOSITS-Instructions', 'DEPOSITS-Instructions');
      addHyperlink(todayInstr, 'A32', '→ Getting-Started', 'Getting-Started');
    }
    
    // MONTHLY-Instructions → Other sheets
    const monthlyInstr = ss.getSheetByName('MONTHLY-Instructions');
    if (monthlyInstr) {
      addHyperlink(monthlyInstr, 'A55', '→ TODAY-Instructions', 'TODAY-Instructions');
      addHyperlink(monthlyInstr, 'A56', '→ SALESPEOPLE-Instructions', 'SALESPEOPLE-Instructions');
      addHyperlink(monthlyInstr, 'A57', '→ Getting-Started', 'Getting-Started');
    }
    
    // SALESPEOPLE-Instructions → Other sheets
    const salespeopleInstr = ss.getSheetByName('SALESPEOPLE-Instructions');
    if (salespeopleInstr) {
      addHyperlink(salespeopleInstr, 'A67', '→ TODAY-Instructions', 'TODAY-Instructions');
      addHyperlink(salespeopleInstr, 'A68', '→ MONTHLY-Instructions', 'MONTHLY-Instructions');
      addHyperlink(salespeopleInstr, 'A69', '→ Getting-Started', 'Getting-Started');
    }
    
    // DEPOSITS-Instructions → Other sheets
    const depositsInstr = ss.getSheetByName('DEPOSITS-Instructions');
    if (depositsInstr) {
      addHyperlink(depositsInstr, 'A91', '→ TODAY-Instructions', 'TODAY-Instructions');
      addHyperlink(depositsInstr, 'A92', '→ MONTHLY-Instructions', 'MONTHLY-Instructions');
      addHyperlink(depositsInstr, 'A93', '→ Getting-Started', 'Getting-Started');
    }
    
    Logger.log('All hyperlinks added successfully');
    SpreadsheetApp.flush();
    
  } catch (e) {
    logError('addAllHyperlinks', e);
    Logger.log('Warning: Some hyperlinks may not have been created: ' + e.message);
  }
}

// ============================================================================
// MENU INTEGRATION
// ============================================================================

/**
 * Recreates all instructional sheets (deletes and recreates).
 * Useful if sheets become corrupted or need updates.
 *
 * @returns {void}
 */
function recreateInstructionalSheets() {
  try {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'Recreate Instructional Sheets',
      'This will DELETE and recreate all instructional sheets:\n\n' +
      '• Getting-Started\n' +
      '• TODAY-Instructions\n' +
      '• MONTHLY-Instructions\n' +
      '• SALESPEOPLE-Instructions\n' +
      '• DEPOSITS-Instructions\n\n' +
      'Are you sure you want to proceed?',
      ui.ButtonSet.YES_NO
    );
    
    if (response !== ui.Button.YES) {
      Logger.log('User cancelled recreation of instructional sheets.');
      return;
    }
    
    // Force recreation by calling main function (it will detect and delete existing)
    createAllInstructionalSheets();
    
  } catch (e) {
    logError('recreateInstructionalSheets', e);
    SpreadsheetApp.getUi().alert(
      'Error',
      'Failed to recreate instructional sheets:\n\n' + e.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Helper function to add instructional sheets menu items.
 * Called from core_saleslogPro.js onOpen() function.
 *
 * @param {GoogleAppsScript.Base.Menu} menu - The menu object to add items to
 * @returns {void}
 */
function addInstructionalSheetsMenuItems(menu) {
  menu
    .addItem('📚 Create Instructional Sheets', 'createAllInstructionalSheets')
    .addItem('🔄 Recreate Instructional Sheets', 'recreateInstructionalSheets');
}