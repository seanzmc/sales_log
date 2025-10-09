/**
 * sales_log_v7.9.8.js (Find last row in A:N, Font Color Handling, etc.)
 * Performance-optimized Google Apps Script for sales logging (v7).
 * Handles flexible salesperson name/code input via an alias system.
 * Copies active rows to MONTHLY, generates sequence in Col A, counts/processes based on single-letter FI rule.
 * Highlights non-delivered deals in red on the MONTHLY sheet, preserving trade column backgrounds, and clears this red if FI is fixed.
 * Applies specified conditional formatting rules to TODAY sheet for duplicate and deposit checks.
 * Resets font color on TODAY clear range and carries over font colors to MONTHLY.
 */

// Module-scope constants & caches
const CACHE = CacheService.getScriptCache();
const CACHE_KEY_NAME_MAP = "salespersonMaps"; // Updated cache key name
const sellingDaysCache = {};
// Cached global reference for SpreadsheetApp's active spreadsheet
const SS = SpreadsheetApp.getActive();
const RANGES = {
  dailyData: "A2:N51", // Range on TODAY sheet for daily input
  dailyClear: "B2:N51", // Range on TODAY sheet to clear after processing (excludes Col A)
  leaderboard: "P2:R28", // Range on TODAY sheet for the leaderboard (Name, MTD, Avg) - UPDATED
  mtd: "Q2:Q28", // MTD column on TODAY leaderboard - UPDATED
  avg: "R2:R28", // Average column on TODAY leaderboard - UPDATED
  // Ranges for new CF rules on TODAY sheet
  todayNewCarDataRange: "B2:G101", // For rules 1 & 3
  todayUsedCarDataRange: "I2:N101", // For rules 2 & 4
};

const NON_DELIVERED_DEAL_COLOR = "#FF0000"; // Standard Red
const NON_DELIVERED_DEAL_COLOR_UPPER = NON_DELIVERED_DEAL_COLOR.toUpperCase();
const SALESPERSON_CODE_ERROR_COLOR = "#FFEBEE"; // Light Red
const SALESPERSON_CODE_ERROR_COLOR_UPPER = SALESPERSON_CODE_ERROR_COLOR.toUpperCase();
const DUPLICATE_STOCK_FILL_COLOR = "#b4ff0c"; // Light green/yellow for duplicates
const DUPLICATE_STOCK_TEXT_COLOR = "#ff0000"; // Red text for duplicates

// New color for leaderboard when MTD is all zero - MAKE SURE THESE ARE HERE
const LEADERBOARD_ZERO_MTD_BG_COLOR = "#F0F8FF"; // AliceBlue (a faint light powder blue)
const LEADERBOARD_ZERO_MTD_BG_COLOR_UPPER = LEADERBOARD_ZERO_MTD_BG_COLOR.toUpperCase();

// Utility: get sheet references once
/**
 * Retrieves references to key sheets: TODAY, MONTHLY, and SALESPEOPLE.
 *
 * @returns {{today: GoogleAppsScript.Spreadsheet.Sheet, monthly: GoogleAppsScript.Spreadsheet.Sheet, sales: GoogleAppsScript.Spreadsheet.Sheet}} Object mapping sheet keys to Sheet instances.
 * @throws {Error} If any of the required sheets are missing.
 */
function getSheets() {
  if (!SS) {
    Logger.log("Error: SpreadsheetApp.getActive() returned null. Cannot get sheets.");
    throw new Error("SpreadsheetApp.getActive() returned null. Script might not be properly bound or accessed.");
  }
  const today = SS.getSheetByName("TODAY");
  const monthly = SS.getSheetByName("MONTHLY");
  const sales = SS.getSheetByName("SALESPEOPLE");
  if (!today || !monthly || !sales) {
    Logger.log("Error: Required sheets missing. Ensure 'TODAY', 'MONTHLY', and 'SALESPEOPLE' sheets exist.");
    throw new Error("Required sheets missing. Ensure 'TODAY', 'MONTHLY', and 'SALESPEOPLE' sheets exist.");
  }
  return { today, monthly, sales };
}

// cacheOps
/**
 * Returns cached or newly computed selling days elapsed and total for a given month/year.
 * Counts weekdays and Saturdays (excludes Sunday).
 *
 * @param {number} year Full year number (e.g., 2025).
 * @param {number} month Zero-based month index (0-11).
 * @returns {{daysElapsed: number, totalDays: number}} Selling days counts.
 */
function memoizedGetSellingDays(year, month) {
  const key = `${year}-${month}`;
  if (sellingDaysCache[key]) return sellingDaysCache[key];
  const todayDate = new Date();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  let elapsed = 0,
    total = 0;
  // Calculate elapsed selling days (Mon-Sat) up to today within the month
  for (let d = new Date(first); d <= todayDate && d <= last; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0) elapsed++; // Count if day is not Sunday (0)
  }
  elapsed = Math.max(elapsed, 1); // Ensure at least 1 day elapsed

  // Calculate total selling days (Mon-Sat) in the month
  for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0) total++; // Count if day is not Sunday (0)
  }
  sellingDaysCache[key] = { daysElapsed: elapsed, totalDays: total };
  return sellingDaysCache[key];
}

/**
 * Retrieves and builds maps for salesperson aliases and display codes.
 * Assumes 'SALESPEOPLE' sheet structure: Col A: Full Name, Col B: Aliases (comma-separated), Col C: Preferred Display Code.
 * Caches the result.
 *
 * @returns {{aliasMap: {[alias: string]: string}, displayCodeMap: {[fullName: string]: string}}}
 * - aliasMap: Maps standardized alias to Full Name.
 * - displayCodeMap: Maps Full Name to Display Code (or Full Name if Display Code is blank).
 */
function getSalespersonMaps() {
  const cached = CACHE.get(CACHE_KEY_NAME_MAP);
  if (cached) {
    try {
      const parsedCache = JSON.parse(cached);
      if (parsedCache && typeof parsedCache.aliasMap === "object" && typeof parsedCache.displayCodeMap === "object") {
        return parsedCache;
      } else {
        Logger.log("Cached salesperson map has invalid structure. Rebuilding.");
      }
    } catch (e) {
      Logger.log("Cache parse error for getSalespersonMaps: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
    }
  }

  const sheets = getSheets();
  const salesSheet = sheets.sales;
  const lastRow = salesSheet.getLastRow();
  const range = salesSheet.getRange(2, 1, Math.max(0, lastRow - 1), 3);
  const values = range.getValues();
  const aliasMap = {};
  const displayCodeMap = {};

  values.forEach((row) => {
    const fullName = String(row[0] || "").trim();
    const aliasesStr = String(row[1] || "").trim();
    const displayCode = String(row[2] || "").trim();
    if (fullName) {
      const displayName = displayCode || fullName;
      displayCodeMap[fullName] = displayName;
      aliasMap[fullName.toUpperCase()] = fullName;
      if (displayName && displayName.toUpperCase() !== fullName.toUpperCase()) {
        aliasMap[displayName.toUpperCase()] = fullName;
      }
      if (aliasesStr) {
        aliasesStr.split(",").forEach((alias) => {
          const standardizedAlias = alias.trim().toUpperCase();
          if (standardizedAlias) {
            if (aliasMap[standardizedAlias] && aliasMap[standardizedAlias] !== fullName) {
              Logger.log(`Warning: Duplicate alias '${standardizedAlias}' mapped to '${aliasMap[standardizedAlias]}' and now also to '${fullName}'. Using mapping to '${fullName}'.`);
            }
            aliasMap[standardizedAlias] = fullName;
          }
        });
      }
    }
  });
  const mapsToCache = { aliasMap, displayCodeMap };
  CACHE.put(CACHE_KEY_NAME_MAP, JSON.stringify(mapsToCache), 300); // Cache for 5 minutes
  return mapsToCache;
}

// Basic utilities
function roundHalf(v) {
  return Math.round((Number(v) || 0) * 2) / 2;
}

function formatDateOffset(offsetDays = 1) {
  const d = new Date();
  const dayOfWeek = d.getDay();
  let daysToSubtract = offsetDays;
  if (dayOfWeek === 1 && offsetDays === 1) daysToSubtract = 2; // Monday, log Saturday
  else if (dayOfWeek === 0 && offsetDays === 1) daysToSubtract = 2; // Sunday, log Friday
  d.setDate(d.getDate() - daysToSubtract);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// cfOps - Conditional Formatting Operations
function filterTrafficLightRules(rules) {
  // This function is intended to filter out old script-managed custom formula rules
  // so they can be replaced. It should NOT filter out non-custom-formula rules.
  return rules.filter((r) => {
    const bc = r.getBooleanCondition();
    // Keep if it's not a boolean condition or if it is, it's not a custom formula.
    return !bc || bc.getCriteriaType() !== SpreadsheetApp.BooleanCriteria.CUSTOM_FORMULA;
  });
}

function setCFRulesSheet(sheet, rules) {
  sheet.setConditionalFormatRules(rules);
}

// lockOps
function withScriptLock(fn) {
  const lock = LockService.getScriptLock();
  if (lock.tryLock(30000)) {
    try {
      return fn();
    } finally {
      lock.releaseLock();
    }
  } else {
    const msg = "Could not acquire script lock. Another instance may be running.";
    Logger.log(msg);
    try {
      SpreadsheetApp.getUi()?.alert(msg);
    } catch (e) {
      Logger.log("UI alert failed for lock: " + e);
    }
    throw new Error(msg);
  }
}

// alertOps
function toastInfo(msg, title) {
  if (SS) SS.toast(msg, title || "Info");
  else Logger.log(`Toast (SS not avail): ${title ? title + ": " : ""}${msg}`);
}
function showCustomAlert(title, msg) {
  try {
    SpreadsheetApp.getUi().alert(title, msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    Logger.log(`Alert not shown (UI not avail): ${title}: ${msg}. Error: ${e}`);
  }
}
function alertError(msg, title = "Error") {
  showCustomAlert(title, msg);
}

// Data transforms
function tallyCounts(rows, aliasMap, sides) {
  const counts = {};
  const unknownInputs = [];
  rows.forEach((row) => {
    sides.forEach(({ fiIdx, saleIdx }) => {
      if (fiIdx >= row.length || saleIdx >= row.length) return;
      const fiFlag = String(row[fiIdx] || "")
        .trim()
        .toUpperCase();
      if (!/^[A-Z]$/.test(fiFlag)) return; // Only delivered
      const salespersonInput = String(row[saleIdx] || "").trim();
      if (!salespersonInput) return;
      const parts = salespersonInput.split("/").map((s) => s.trim().toUpperCase());
      const inc = parts.length > 1 ? 0.5 : 1;
      parts.forEach((part) => {
        if (!part) return;
        const fullName = aliasMap[part];
        if (fullName) counts[fullName] = (counts[fullName] || 0) + inc;
        else if (!unknownInputs.includes(salespersonInput.split("/").find((p) => p.trim().toUpperCase() === part) || part)) {
          unknownInputs.push(salespersonInput.split("/").find((p) => p.trim().toUpperCase() === part) || part);
        }
      });
    });
  });
  return { counts, unknownInputs };
}

function summarizeRows(rows) {
  let newCount = 0,
    usedCount = 0,
    tradeCount = 0;
  rows.forEach((row) => {
    const newFi =
      row.length > 2
        ? String(row[2] || "")
          .trim()
          .toUpperCase()
        : "";
    const usedFi =
      row.length > 9
        ? String(row[9] || "")
          .trim()
          .toUpperCase()
        : "";
    const newHasContent = row.length > 1 && row.slice(1, Math.min(7, row.length)).some((val) => val && String(val).trim() !== "");
    const usedHasContent = row.length > 8 && row.slice(8, Math.min(14, row.length)).some((val) => val && String(val).trim() !== "");
    let newDelivered = /^[A-Z]$/.test(newFi) && newHasContent;
    let usedDelivered = /^[A-Z]$/.test(usedFi) && usedHasContent;
    if (newDelivered) {
      newCount++;
      const tradeNew =
        row.length > 5
          ? String(row[5] || "")
            .trim()
            .toUpperCase()
          : "";
      if (tradeNew && tradeNew !== "NT") tradeCount++;
    }
    if (usedDelivered) {
      usedCount++;
      const tradeUsed =
        row.length > 12
          ? String(row[12] || "")
            .trim()
            .toUpperCase()
          : "";
      if (tradeUsed && tradeUsed !== "NT") tradeCount++;
    }
  });
  return { newCount, usedCount, tradeCount };
}

/**
 * Applies formatting to rows in the 'MONTHLY' sheet.
 * Highlights non-delivered deals and salesperson code errors.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The 'MONTHLY' sheet object.
 * @param {any[][]} rowsData The 2D array of row data to process.
 * @param {number} startSheetRow The 1-indexed sheet row number corresponding to the first row in rowsData.
 * @param {{[alias: string]: string}} aliasMap Maps standardized alias to Full Name.
 * @returns {number[]} Array of 1-indexed sheet row numbers where salesperson code errors were found.
 */
function applyMonthlyRowFormatting(sheet, rowsData, startSheetRow, aliasMap) {
  if (!rowsData || rowsData.length === 0) {
    return []; // No data to process
  }
  const salespersonErrorSheetRows = [];
  const numRows = rowsData.length;

  const originalBackgroundsNew = sheet.getRange(startSheetRow, 2, numRows, 6).getBackgrounds(); // B:G
  const originalBackgroundsUsed = sheet.getRange(startSheetRow, 9, numRows, 6).getBackgrounds(); // I:N

  const backgroundsNewSection = [];
  const backgroundsUsedSection = [];

  for (let i = 0; i < numRows; i++) {
    const rowData = rowsData[i];
    const currentRowInSheet = startSheetRow + i;

    const newSectionBgRow = [...originalBackgroundsNew[i]];
    const usedSectionBgRow = [...originalBackgroundsUsed[i]];

    // --- Process New Car Section ---
    const newFiFlag = rowData.length > 2 ? String(rowData[2] || "").trim().toUpperCase() : "";
    const newSalespersonInput = rowData.length > 6 ? String(rowData[6] || "").trim() : "";
    const isNewActuallyDeliveredByFI = /^[A-Z]$/.test(newFiFlag);
    const newSectionHasAnyData = rowData.length > 1 && rowData.slice(1, 7).some((cell) => cell && String(cell).trim() !== "");

    if (newSectionHasAnyData && !isNewActuallyDeliveredByFI) {
      for (let k = 0; k < 6; k++) { if (k !== 4) { newSectionBgRow[k] = NON_DELIVERED_DEAL_COLOR; } }
    } else if (isNewActuallyDeliveredByFI) {
      for (let k = 0; k < 6; k++) { if (k !== 4 && originalBackgroundsNew[i][k] && originalBackgroundsNew[i][k].toUpperCase() === NON_DELIVERED_DEAL_COLOR_UPPER) { newSectionBgRow[k] = null; } }
      if (newSalespersonInput) {
        const newSalespersonParts = newSalespersonInput.split("/").map((s) => s.trim().toUpperCase());
        if (newSalespersonParts.some((part) => part && !aliasMap[part])) {
          newSectionBgRow[5] = SALESPERSON_CODE_ERROR_COLOR;
          if (!salespersonErrorSheetRows.includes(currentRowInSheet)) { salespersonErrorSheetRows.push(currentRowInSheet); }
        } else if (originalBackgroundsNew[i][5] && originalBackgroundsNew[i][5].toUpperCase() === SALESPERSON_CODE_ERROR_COLOR_UPPER) {
          newSectionBgRow[5] = null;
        }
      }
    } else {
      for (let k = 0; k < 6; k++) { if (k !== 4 && originalBackgroundsNew[i][k] && originalBackgroundsNew[i][k].toUpperCase() === NON_DELIVERED_DEAL_COLOR_UPPER) { newSectionBgRow[k] = null; } }
      if (originalBackgroundsNew[i][5] && originalBackgroundsNew[i][5].toUpperCase() === SALESPERSON_CODE_ERROR_COLOR_UPPER) { newSectionBgRow[5] = null; }
    }
    backgroundsNewSection.push(newSectionBgRow);

    // --- Process Used Car Section ---
    const usedFiFlag = rowData.length > 9 ? String(rowData[9] || "").trim().toUpperCase() : "";
    const usedSalespersonInput = rowData.length > 13 ? String(rowData[13] || "").trim() : "";
    const isUsedActuallyDeliveredByFI = /^[A-Z]$/.test(usedFiFlag);
    const usedSectionHasAnyData = rowData.length > 8 && rowData.slice(8, 14).some((cell) => cell && String(cell).trim() !== "");

    if (usedSectionHasAnyData && !isUsedActuallyDeliveredByFI) {
      for (let k = 0; k < 6; k++) { if (k !== 4) { usedSectionBgRow[k] = NON_DELIVERED_DEAL_COLOR; } }
    } else if (isUsedActuallyDeliveredByFI) {
      for (let k = 0; k < 6; k++) { if (k !== 4 && originalBackgroundsUsed[i][k] && originalBackgroundsUsed[i][k].toUpperCase() === NON_DELIVERED_DEAL_COLOR_UPPER) { usedSectionBgRow[k] = null; } }
      if (usedSalespersonInput) {
        const usedSalespersonParts = usedSalespersonInput.split("/").map((s) => s.trim().toUpperCase());
        if (usedSalespersonParts.some((part) => part && !aliasMap[part])) {
          usedSectionBgRow[5] = SALESPERSON_CODE_ERROR_COLOR;
          if (!salespersonErrorSheetRows.includes(currentRowInSheet)) { salespersonErrorSheetRows.push(currentRowInSheet); }
        } else if (originalBackgroundsUsed[i][5] && originalBackgroundsUsed[i][5].toUpperCase() === SALESPERSON_CODE_ERROR_COLOR_UPPER) {
          usedSectionBgRow[5] = null;
        }
      }
    } else {
      for (let k = 0; k < 6; k++) { if (k !== 4 && originalBackgroundsUsed[i][k] && originalBackgroundsUsed[i][k].toUpperCase() === NON_DELIVERED_DEAL_COLOR_UPPER) { usedSectionBgRow[k] = null; } }
      if (originalBackgroundsUsed[i][5] && originalBackgroundsUsed[i][5].toUpperCase() === SALESPERSON_CODE_ERROR_COLOR_UPPER) { usedSectionBgRow[5] = null; }
    }
    backgroundsUsedSection.push(usedSectionBgRow);
  }

  // Apply all backgrounds at once
  if (numRows > 0) {
    sheet.getRange(startSheetRow, 2, numRows, 6).setBackgrounds(backgroundsNewSection); // Columns B:G
    sheet.getRange(startSheetRow, 9, numRows, 6).setBackgrounds(backgroundsUsedSection); // Columns I:N
  }
  return salespersonErrorSheetRows.sort((a, b) => a - b);
}

// NEW FUNCTION: To accurately find the last row within a specific range of columns.
/**
 * Finds the last row containing data within a specific range of columns, ignoring content outside this range.
 * This is more reliable than getLastRow() when extraneous data exists in other columns.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet object to inspect.
 * @param {number} startCol The 1-based index of the starting column for the check (e.g., 1 for A).
 * @param {number} endCol The 1-based index of the ending column for the check (e.g., 14 for N).
 * @returns {number} The row number of the last row with data in the specified columns. Returns 0 if the sheet is empty.
 */
function findLastRowInCols(sheet, startCol, endCol) {
  const values = sheet.getRange(1, startCol, sheet.getMaxRows(), endCol - startCol + 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    // Check if any cell in the current row has content
    if (values[i].some(cell => cell.toString().trim() !== '')) {
      return i + 1; // Return the 1-based row number
    }
  }
  return 0; // No data found in the specified columns
}


// Main flows
function processDaily() {
  withScriptLock(() => {
    // ADD THIS CHECK FOR SUNDAY
    const today = new Date();
    // In Google Apps Script, Sunday is 0, Monday is 1, ..., Saturday is 6
    if (today.getDay() === 0) {
      // 0 represents Sunday
      Logger.log("Today is Sunday. Skipping processDaily execution.");
      return; // Exit the function if it's Sunday
    }
    // END OF SUNDAY CHECK

    toastInfo("Processing daily sales...", "Working");
    let errorSheetRows = [];
    let unknownInputs = [];
    let countsByFullName = {};

    try {
      const sheets = getSheets();
      const dailyRange = sheets.today.getRange(RANGES.dailyData); // A2:N51
      const allDailyData = dailyRange.getValues();
      const allDailyFontColors = dailyRange.getFontColors(); // *** NEW: Get font colors ***

      let rowsToLogToMonthly = [];
      let fontColorsToLogToMonthly = []; // *** NEW: Array for corresponding font colors ***

      allDailyData.forEach((row, index) => {
        const hasNewActivity = row.slice(1, 7).some((cell) => cell && String(cell).trim() !== "");
        const hasUsedActivity = row.slice(8, 14).some((cell) => cell && String(cell).trim() !== "");
        if (hasNewActivity || hasUsedActivity) {
          rowsToLogToMonthly.push([...row]); // Push a copy of the row
          fontColorsToLogToMonthly.push([...allDailyFontColors[index]]); // Push a copy of the font color row
        }
      });

      if (!rowsToLogToMonthly.length) {
        showCustomAlert("Process Complete", "No sales activity found on the TODAY sheet to log to monthly.");
        sheets.today.getRange(RANGES.dailyClear).setBackground(null).setFontColor(null); // Reset font color here too
        return;
      }

      // Modify Column A
      rowsToLogToMonthly = rowsToLogToMonthly.map((row, index) => {
        row[0] = index + 1;
        return row;
      });
      // Note: fontColorsToLogToMonthly does not need Column A modified, it's just colors.

      const dateStr = formatDateOffset(1);

      // MODIFIED: Use the new function to find the last row specifically within columns A:N
      const lastRowMonthly = findLastRowInCols(sheets.monthly, 1, 14);
      const headerInsertRow = lastRowMonthly + 1;
      const dataInsertRow = headerInsertRow + 1;

      sheets.monthly.insertRowBefore(headerInsertRow);
      sheets.monthly.getRange(headerInsertRow, 1, 1, 14).merge().setValue(dateStr).setHorizontalAlignment("center").setFontFamily("Calibri").setFontSize(10).setFontWeight("bold").setBackground("#FFFF00").setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

      const numRowsToInsert = rowsToLogToMonthly.length;
      const numColsToInsert = 14;

      const monthlyDataRange = sheets.monthly.getRange(dataInsertRow, 1, numRowsToInsert, numColsToInsert);
      monthlyDataRange.setValues(rowsToLogToMonthly);
      SpreadsheetApp.flush();

      // Apply general formatting (font family, size, borders) to B:N
      sheets.monthly.getRange(dataInsertRow, 2, numRowsToInsert, 13).setFontFamily("Calibri").setFontWeight("bold").setFontSize(10).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);

      // Specific formatting for Column A on monthly
      sheets.monthly.getRange(dataInsertRow, 1, numRowsToInsert, 1).setNumberFormat("0").setFontFamily("Calibri").setFontWeight("bold").setFontSize(10).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);

      sheets.monthly.getRange(dataInsertRow, 6, numRowsToInsert, 1).setFontSize(7); // Col F
      sheets.monthly.getRange(dataInsertRow, 13, numRowsToInsert, 1).setFontSize(7); // Col M

      // *** NEW: Apply font colors to the new rows on monthly sheet ***
      if (fontColorsToLogToMonthly.length > 0) {
        monthlyDataRange.setFontColors(fontColorsToLogToMonthly);
        SpreadsheetApp.flush(); // Ensure font colors are applied before next formatting
      }

      const { aliasMap, displayCodeMap } = getSalespersonMaps();

      errorSheetRows = applyMonthlyRowFormatting(sheets.monthly, rowsToLogToMonthly, dataInsertRow, aliasMap);

      const sidesToTally = [
        { fiIdx: 2, saleIdx: 6 },
        { fiIdx: 9, saleIdx: 13 },
      ];
      const tallyResult = tallyCounts(rowsToLogToMonthly, aliasMap, sidesToTally);
      countsByFullName = tallyResult.counts;
      unknownInputs = tallyResult.unknownInputs;

      const lbRange = sheets.today.getRange(RANGES.leaderboard);
      const lbValues = lbRange.getValues();
      lbValues.forEach((r) => {
        if (countsByFullName[r[0]]) r[1] = (Number(r[1]) || 0) + countsByFullName[r[0]];
      });
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0) || (Number(b[2]) || 0) - (Number(a[2]) || 0));
      lbRange.setValues(lbValues);

      sheets.today.getRange(RANGES.mtd).setNumberFormat("0.#");
      sheets.today.getRange(RANGES.avg).setNumberFormat("0.#");
      reapplyCF();

      const { newCount, usedCount, tradeCount } = summarizeRows(rowsToLogToMonthly);
      const repLines = Object.entries(countsByFullName)
        .filter(([, c]) => c > 0)
        .map(([name, count]) => `  - ${displayCodeMap[name] || name}: ${count}`);

      let summaryTitle = `Daily Sales Logged: ${dateStr}`;
      let summaryMsg = `NEW DELIVERED SALES: ${newCount}\n` + `USED DELIVERED SALES: ${usedCount}\n` + `TOTAL DELIVERED UNITS: ${newCount + usedCount}\n` + `DELIVERED DEALS WITH TRADES: ${tradeCount}\n\n` + `SALESPERSON DELIVERED COUNTS:\n` + (repLines.length > 0 ? repLines.join("\n") : "  - No specific salesperson counts for delivered deals today.") + `\n\nSALESPERSON CODE ERRORS (on delivered deals): ${errorSheetRows.length}`;

      if (errorSheetRows.length > 0) {
        summaryMsg += `\n(Salesperson code errors for delivered deals are highlighted on 'MONTHLY' in rows ${dataInsertRow}-${dataInsertRow + numRowsToInsert - 1}.)`;
      }
      if (unknownInputs.length > 0) {
        summaryMsg += `\n\nUNKNOWN SALESPEOPLE INPUTS: ${[...new Set(unknownInputs)].join(", ")}\n(Check spelling or add to 'SALESPEOPLE' sheet.)`;
      }
      showCustomAlert(summaryTitle, summaryMsg);

      // --- Clean Up TODAY Sheet ---
      const dailyClearRange = sheets.today.getRange(RANGES.dailyClear);
      dailyClearRange.clearContent();
      dailyClearRange.setBackground(null);
      dailyClearRange.setFontColor(null); // *** NEW: Reset font color to default ***
      Logger.log("Daily processing complete.");
    } catch (e) {
      Logger.log("Error in processDaily: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
      alertError("Error during daily processing: " + e.toString(), "Processing Failed");
    }
  });
}

/**
 * Reapplies conditional formatting rules to the TODAY sheet.
 */
function reapplyCF() {
  try {
    const sheets = getSheets();
    const todaySheet = sheets.today;

    let existingRules = todaySheet.getConditionalFormatRules();
    let rulesToKeep = [];

    const now = new Date();
    const { daysElapsed, totalDays } = memoizedGetSellingDays(now.getFullYear(), now.getMonth());
    const paceBase = totalDays > 0 ? `($Q2/${daysElapsed}*${totalDays})` : null;

    const managedDataRulesSignatures = [ /* ... keep as is ... */ ];
    const managedLeaderboardBlueRuleSignature = {
      formula: "=1=1",
      rangeA1: RANGES.leaderboard,
      background: LEADERBOARD_ZERO_MTD_BG_COLOR_UPPER,
    };
    const PACE_COLORS_UPPER = ["#70AD47", "#FFEE32", "#C00000"].map((c) => c.toUpperCase());

    existingRules.forEach((rule) => {
      const bc = rule.getBooleanCondition();
      let isManagedByThisScript = false;
      if (bc && bc.getCriteriaType() === SpreadsheetApp.BooleanCriteria.CUSTOM_FORMULA) {
        const currentFormulaFull = bc.getCriteriaValues()[0].toString();
        const currentFormulaNormalized = currentFormulaFull.replace(/\s+/g, "");
        const ranges = rule.getRanges();
        if (ranges.length === 1) {
          const currentRangeA1 = ranges[0].getA1Notation();
          const ruleBg = bc.getBackground() ? bc.getBackground().toUpperCase() : null;
          for (const sig of managedDataRulesSignatures) {
            if (sig.formula.replace(/\s+/g, "") === currentFormulaNormalized && sig.rangeA1 === currentRangeA1) {
              isManagedByThisScript = true;
              break;
            }
          }
          if (!isManagedByThisScript && currentRangeA1 === RANGES.leaderboard) {
            if (currentFormulaNormalized === managedLeaderboardBlueRuleSignature.formula && ruleBg === managedLeaderboardBlueRuleSignature.background) { isManagedByThisScript = true; }
            if (!isManagedByThisScript && PACE_COLORS_UPPER.includes(ruleBg)) {
              if (currentFormulaNormalized.includes("$Q")) {
                isManagedByThisScript = true;
                Logger.log(`Identified old/current pace rule for removal on ${currentRangeA1} (color: ${ruleBg}, formula: ${currentFormulaFull})`);
              }
            }
          }
        }
      }
      if (!isManagedByThisScript) { rulesToKeep.push(rule.copy().build()); }
    });

    let newRules = [...rulesToKeep];

    let allMtdAreZero = true;
    try {
      if (RANGES.mtd && RANGES.mtd.match(/^[A-Z]+\d+:[A-Z]+\d+$/)) {
        const mtdRangeValues = todaySheet.getRange(RANGES.mtd).getValues();
        for (const row of mtdRangeValues) {
          const value = Number(row[0]);
          if (!isNaN(value) && value > 0) {
            allMtdAreZero = false;
            break;
          }
        }
      } else {
        Logger.log(`RANGES.mtd ("${RANGES.mtd}") is not defined or invalid. Defaulting to standard pace rules.`);
        allMtdAreZero = false;
      }
    } catch (e) {
      Logger.log("Error reading MTD values for CF logic: " + e.toString() + ". Defaulting to standard pace rules.");
      allMtdAreZero = false;
    }

    const cfLeaderboardRange = todaySheet.getRange(RANGES.leaderboard);

    if (allMtdAreZero) {
      Logger.log("All MTD are zero. Applying faint powder blue background to leaderboard.");
      newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(managedLeaderboardBlueRuleSignature.formula).setBackground(LEADERBOARD_ZERO_MTD_BG_COLOR).setRanges([cfLeaderboardRange]).build());
    } else {
      Logger.log("MTD sales detected or error in MTD check. Applying standard pace conditional formatting.");
      if (totalDays > 0 && paceBase) {
        newRules.push(
          SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}>=10`).setBackground(PACE_COLORS_UPPER[0]).setRanges([cfLeaderboardRange]).build(), // Green
          SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=AND(${paceBase}>=8,${paceBase}<10)`).setBackground(PACE_COLORS_UPPER[1]).setRanges([cfLeaderboardRange]).build(), // Yellow
          SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}<8`).setBackground(PACE_COLORS_UPPER[2]).setRanges([cfLeaderboardRange]).build() // Red
        );
      } else {
        Logger.log("Cannot apply leaderboard pace CF: Total selling days is zero or paceBase is null.");
      }
    }

    const todayNewCarRange = todaySheet.getRange(RANGES.todayNewCarDataRange);
    const todayUsedCarRange = todaySheet.getRange(RANGES.todayUsedCarDataRange);

    newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=COUNTIF($E$2:$E$101,$E2)>1").setFontColor(DUPLICATE_STOCK_TEXT_COLOR).setBackground(DUPLICATE_STOCK_FILL_COLOR).setRanges([todayNewCarRange]).build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=COUNTIF($L$2:$L$101,$L2)>1").setFontColor(DUPLICATE_STOCK_TEXT_COLOR).setBackground(DUPLICATE_STOCK_FILL_COLOR).setRanges([todayUsedCarRange]).build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0').setFontColor(DUPLICATE_STOCK_TEXT_COLOR).setBackground(DUPLICATE_STOCK_FILL_COLOR).setRanges([todayNewCarRange]).build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=COUNTIF(INDIRECT("DEPOSITS!G:G"),$L2)>0').setFontColor(DUPLICATE_STOCK_TEXT_COLOR).setBackground(DUPLICATE_STOCK_FILL_COLOR).setRanges([todayUsedCarRange]).build());

    setCFRulesSheet(todaySheet, newRules);
    toastInfo("Conditional formatting updated for Leaderboard and Data Entry.", "CF Updated");
  } catch (e) {
    Logger.log("Error reapplying CF: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
    alertError("Error reapplying CF: " + e.toString(), "CF Error");
  }
}

function recalcMtdFromMonthly() {
  withScriptLock(() => {
    toastInfo("Recalculating MTD & checking 'MONTHLY' sheet formats...", "Working");
    let totalSalespersonErrors = 0;

    try {
      const sheets = getSheets();
      const monthlySheet = sheets.monthly;
      const todaySheet = sheets.today;
      const lastRowMonthly = monthlySheet.getLastRow();
      const maxColsMonthly = monthlySheet.getMaxColumns();

      if (maxColsMonthly < 14) {
        alertError('"MONTHLY" sheet needs at least 14 columns (A:N).');
        return;
      }
      if (lastRowMonthly < 2) {
        todaySheet.getRange(RANGES.mtd).clearContent();
        reapplyCF();
        toastInfo("MTD Cleared. No data in 'MONTHLY' to recalculate.", "Recalc Info");
        return;
      }

      const { aliasMap } = getSalespersonMaps();
      const monthlyValues = monthlySheet.getRange(2, 1, lastRowMonthly - 1, maxColsMonthly).getValues();

      const salespersonErrorRowsFound = applyMonthlyRowFormatting(monthlySheet, monthlyValues, 2, aliasMap);
      totalSalespersonErrors = salespersonErrorRowsFound.length;

      const allMonthlyContent = monthlySheet.getRange(1, 1, lastRowMonthly, maxColsMonthly).getValues();
      const mergedRanges = monthlySheet.getRange(1, 1, lastRowMonthly, 1).getMergedRanges();
      let actualDataRows = [];
      const dateHeaderRows = mergedRanges
        .filter((mr) => mr.getRow() > 0 && mr.getColumn() === 1 && mr.getWidth() >= 14)
        .map((mr) => mr.getRow())
        .sort((a, b) => a - b);

      if (dateHeaderRows.length > 0) {
        let startDataRowIdx = dateHeaderRows[0];
        for (let i = 1; i < dateHeaderRows.length; i++) {
          let endDataRowIdx = dateHeaderRows[i] - 1;
          if (startDataRowIdx < endDataRowIdx) {
            actualDataRows = actualDataRows.concat(allMonthlyContent.slice(startDataRowIdx, endDataRowIdx));
          }
          startDataRowIdx = dateHeaderRows[i];
        }
        if (startDataRowIdx < lastRowMonthly) {
          actualDataRows = actualDataRows.concat(allMonthlyContent.slice(startDataRowIdx));
        }
      } else {
        Logger.log("No distinct date headers found. Reading all rows from row 2 for MTD.");
        if (lastRowMonthly > 1) actualDataRows = monthlyValues;
      }

      if (!actualDataRows.length) {
        todaySheet.getRange(RANGES.mtd).clearContent();
        reapplyCF();
        toastInfo("MTD Cleared. No data rows found in 'MONTHLY' after filtering headers.", "Recalc Info");
        return;
      }

      const sidesToTally = [
        { fiIdx: 2, saleIdx: 6 },
        { fiIdx: 9, saleIdx: 13 },
      ];
      const { counts: countsByFullName } = tallyCounts(actualDataRows, aliasMap, sidesToTally);

      const lbRange = todaySheet.getRange(RANGES.leaderboard);
      const lbValues = lbRange.getValues();
      lbValues.forEach((r) => {
        r[1] = countsByFullName[r[0]] || 0;
      });
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0) || (Number(b[2]) || 0) - (Number(a[2]) || 0));
      lbRange.setValues(lbValues);
      todaySheet.getRange(RANGES.mtd).setNumberFormat("0.#");
      reapplyCF();

      toastInfo(`MTD recalculated. Found ${totalSalespersonErrors} salesperson code errors in 'MONTHLY'. Non-delivered deals also highlighted.`, "Recalc & Format Complete");
    } catch (e) {
      Logger.log("Error in recalcMtdFromMonthly: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
      alertError("Error during MTD recalculation: " + e.toString(), "Recalc Failed");
    }
  });
}

function rolloverMonth() {
  withScriptLock(() => {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert("Confirm Month Rollover", "This will:\n" + '1. Archive the current "MONTHLY" sheet (e.g., as "5/25").\n' + "2. Copy the final leaderboard to the archive.\n" + '3. Clear the "MONTHLY" sheet for the new month.\n' + '4. Clear MTD sales (Column Q) on the "TODAY" sheet.\n' + '5. Recalculate 3-Month Rolling Averages (Column R) on "TODAY".\n\n' + "Are you sure you want to proceed?", ui.ButtonSet.YES_NO);
    if (response !== ui.Button.YES) {
      toastInfo("Rollover cancelled.", "Cancelled");
      return;
    }

    toastInfo("Starting month rollover...", "Working (1/5)");
    try {
      const sheets = getSheets();
      const currentDate = new Date();
      let archiveYear = currentDate.getFullYear();
      let archiveMonth = currentDate.getMonth() - 1;
      if (archiveMonth < 0) {
        archiveMonth = 11;
        archiveYear--;
      }
      const archiveSheetName = `${archiveMonth + 1}/${String(archiveYear % 100).padStart(2, "0")}`;

      if (SS.getSheetByName(archiveSheetName)) {
        alertError(`Archive "${archiveSheetName}" already exists. Rollover aborted.`);
        return;
      }
      const archiveSheet = sheets.monthly.copyTo(SS);
      try {
        archiveSheet.setName(archiveSheetName);
        archiveSheet.setTabColor(null);
        SpreadsheetApp.flush();
        toastInfo(`"MONTHLY" archived as "${archiveSheetName}".`, "Working (2/5)");
      } catch (e) {
        Logger.log(`Error renaming archive: ${e}`);
        alertError(`Error renaming archive: ${e}. Try deleting partial archive.`);
        try {
          SS.deleteSheet(archiveSheet);
        } catch (delErr) {
          Logger.log(`Failed to delete partial: ${delErr}`);
        }
        return;
      }

      const lbRangeToday = sheets.today.getRange(RANGES.leaderboard);
      archiveSheet
        .getRange(RANGES.leaderboard)
        .setValues(lbRangeToday.getValues())
        .setBackgrounds(lbRangeToday.getBackgrounds())
        .setFontWeights(lbRangeToday.getFontWeights())
        .setFontSizes(lbRangeToday.getFontSizes())
        .setFontFamilies(lbRangeToday.getFontFamilies())
        .setFontColors(lbRangeToday.getFontColors());
      [16, 17, 18].forEach((col) => archiveSheet.autoResizeColumn(col));
      toastInfo("Leaderboard copied to archive.", "Working (3/5)");

      const lastRowMonthly = sheets.monthly.getLastRow();
      if (lastRowMonthly > 1) {
        sheets.monthly.getRange(2, 1, lastRowMonthly - 1, sheets.monthly.getMaxColumns()).clear();
        sheets.monthly.setRowHeights(2, lastRowMonthly - 1, 21);
      }
      sheets.monthly.getRange(1, 1, 51, 14).setBorder(null, null, null, null, null, null).setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);
      toastInfo(`"MONTHLY" sheet cleared.`, "Working (4/5)");

      sheets.today.getRange(RANGES.mtd).clearContent();
      const leaderboardData = sheets.today.getRange(RANGES.leaderboard).getValues();
      const avgValues = Array(leaderboardData.length).fill(null).map(() => [0]);
      let tempDate = new Date(currentDate);
      for (let i = 0; i < leaderboardData.length; i++) {
        const currentFullName = leaderboardData[i][0];
        let totalSales = 0, months = 0;
        let cursorDate = new Date(tempDate);
        for (let j = 0; j < 3; j++) {
          let loopYear = cursorDate.getFullYear();
          let loopM = cursorDate.getMonth() - 1;
          if (loopM < 0) {
            loopM = 11;
            loopYear--;
          }
          const prevArchiveName = `${loopM + 1}/${String(loopYear % 100).padStart(2, "0")}`;
          const prevSheet = SS.getSheetByName(prevArchiveName);
          if (prevSheet) {
            try {
              const lastRowInArchive = prevSheet.getLastRow();
              if (lastRowInArchive > 1) {
                const prevLbVals = prevSheet.getRange("P2:R" + lastRowInArchive).getValues();
                const personRow = prevLbVals.find((row) => row[0] === currentFullName);
                if (personRow && typeof personRow[1] === "number") {
                  totalSales += personRow[1];
                  months++;
                }
              }
            } catch (e) {
              Logger.log(`Error reading archive ${prevArchiveName}: ${e}`);
            }
          }
          cursorDate.setMonth(cursorDate.getMonth() - 1);
        }
        avgValues[i][0] = months > 0 ? roundHalf(totalSales / months) : 0;
      }
      sheets.today.getRange(RANGES.avg).setValues(avgValues).setNumberFormat("0.#");
      toastInfo("MTD cleared & Averages recalculated.", "Working (5/5)");
      reapplyCF();
      SpreadsheetApp.flush();
      ui.alert("Month Rollover Complete!", `"${archiveSheetName}" created. "MONTHLY" & MTD reset. Averages updated.`, ui.ButtonSet.OK);
    } catch (e) {
      Logger.log("Error in rolloverMonth: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
      alertError("Error during month rollover: " + e.toString(), "Rollover Failed");
    }
  });
}

// ============================================================================
// CONFIGURATION UI FUNCTIONS
// ============================================================================

/**
 * Opens the configuration sidebar
 * Initializes migration if needed on first open
 */
function openConfigurationSidebar() {
  try {
    // Check if migration is needed (first time opening settings)
    const props = PropertiesService.getDocumentProperties();
    if (!props.getProperty('SALES_LOG_CONFIG')) {
      // Auto-migrate from hardcoded constants
      migrateToConfigUI();
    }
    
    // Create and show sidebar
    const html = HtmlService.createHtmlOutputFromFile('config_sidebar')
      .setTitle('Sales Log Settings')
      .setWidth(350);
    
    SpreadsheetApp.getUi().showSidebar(html);
  } catch (e) {
    Logger.log('Error opening configuration sidebar: ' + e.toString() + (e.stack ? '\nStack: ' + e.stack : ''));
    alertError('Failed to open settings: ' + e.message, 'Configuration Error');
  }
}

// ============================================================================
// MENU & INITIALIZATION
// ============================================================================

// onOpen
function onOpen() {
  try {
    // Run migration check silently (safe to call multiple times)
    try {
      migrateToConfigUI();
    } catch (migrationError) {
      Logger.log('Migration check failed (non-critical): ' + migrationError);
      // Continue with menu creation even if migration fails
    }
    
    // Create menu with configuration option
    SpreadsheetApp.getUi()
      .createMenu("Sales Tools")
      .addItem("Log Yesterday's Sales", "processDaily")
      .addSeparator()
      .addItem("Recalculate MTD & Check Monthly Errors/Formats", "recalcMtdFromMonthly")
      .addSeparator()
      .addItem("Start New Month (Rollover)", "rolloverMonth")
      .addSeparator()
      .addItem("⚙️ Settings", "openConfigurationSidebar")
      .addToUi();
  } catch (e) {
    Logger.log("Failed to create menu in onOpen: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
  }
}
