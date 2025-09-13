/**
 * sales_log_v9.0.1.js (Expert Refactor with Fixes)
 * This version addresses syntax errors, improves modularity, enhances error handling,
 * optimizes performance through batching, and boosts robustness with validations.
 *
 * Key Improvements:
 * - Fixed syntax errors for executability.
 * - Enhanced modularity: Broke down long functions into smaller helpers.
 * - Performance: Batched range operations, optimized CF rule management.
 * - Robustness: Added validations for missing data/sheets, improved error handling.
 * - Efficiency: Used Maps for O(1) lookups, reduced redundant processing.
 * - Maintainability: Consistent JSDoc, early returns, and centralized configs.
 */

// =========================================================================================
// SCRIPT CONFIGURATION
// =========================================================================================
const CONFIG = {
  SHEETS: {
    TODAY: "TODAY",
    MONTHLY: "MONTHLY",
    SALESPEOPLE: "SALESPEOPLE",
    DEPOSITS: "DEPOSITS",
  },
  RANGES: {
    dailyData: "A2:N51",
    dailyClear: "B2:N51",
    leaderboard: "P2:R27",
    mtd: "Q2:Q27",
    avg: "R2:R27",
    todayNewCarDataRange: "B2:G101",
    todayUsedCarDataRange: "I2:N101",
    monthlyNewCarDataRange: "B2:G",
    monthlyUsedCarDataRange: "I2:N",
    salespersonNamedRange: "ValidSalespersonAliases",
  },
  COLORS: {
    NON_DELIVERED_DEAL: "#FF0000",
    SALESPERSON_ERROR: "#FFEBEE",
    DUPLICATE_STOCK_FILL: "#B4FF0C",
    DUPLICATE_STOCK_TEXT: "#FF0000",
    LEADERBOARD_ZERO_MTD: "#F0F8FF",
    PACE_GREEN: "#70AD47",
    PACE_YELLOW: "#FFEE32",
    PACE_RED: "#C00000",
    MONTHLY_HEADER: "#FFFF00",
  },
  DEAL_SECTIONS: [
    { name: "New", stockCol: 5, fiCol: 3, salesCol: 7, tradeCol: 6, startCol: 2, endCol: 7, range: "B2:G" },
    { name: "Used", stockCol: 12, fiCol: 10, salesCol: 14, tradeCol: 13, startCol: 9, endCol: 14, range: "I2:N" },
  ],
  CACHE_KEYS: {
    SALESPERSON_MAP: "salespersonMaps_v2",
  },
  CACHE_EXPIRATION_SECONDS: 300,
  NON_SELLING_DAYS: [0],
  CF_RULE_SIGNATURE: "Managed by SalesLogScript",
};

// =========================================================================================
// GLOBAL HELPERS & CACHING
// =========================================================================================
const SS = SpreadsheetApp.getActive();
const SCRIPT_CACHE = CacheService.getScriptCache();
const SCRIPT_LOCK = LockService.getScriptLock();

/**
 * Gets references to key sheets. Caches results for the duration of the script execution.
 * @returns {Object} Sheet objects {today, monthly, sales, deposits}
 */
const getSheets = (() => {
  let sheets = null;
  return () => {
    if (sheets) return sheets;
    const today = SS.getSheetByName(CONFIG.SHEETS.TODAY);
    const monthly = SS.getSheetByName(CONFIG.SHEETS.MONTHLY);
    const sales = SS.getSheetByName(CONFIG.SHEETS.SALESPEOPLE);
    const deposits = SS.getSheetByName(CONFIG.SHEETS.DEPOSITS);
    if (!today || !monthly || !sales || !deposits) {
      throw new Error(`Required sheets missing. Ensure all sheets exist: ${Object.values(CONFIG.SHEETS).join(', ')}.`);
    }
    sheets = { today, monthly, sales, deposits };
    return sheets;
  };
})();

/**
 * Executes a function within a script lock to prevent race conditions.
 * @param {Function} fn The function to execute.
 */
function withScriptLock(fn) {
  if (SCRIPT_LOCK.tryLock(30000)) {
    try {
      return fn();
    } finally {
      SCRIPT_LOCK.releaseLock();
    }
  } else {
    const msg = "Could not acquire script lock. Another instance may be running.";
    Logger.log(msg);
    SpreadsheetApp.getUi()?.alert(msg);
    throw new Error(msg);
  }
}

/**
 * Validates if a sheet exists, throwing an error if not.
 * @param {string} sheetName Name of the sheet to validate.
 */
function validateSheetExists(sheetName) {
  if (!SS.getSheetByName(sheetName)) {
    throw new Error(`Sheet '${sheetName}' does not exist.`);
  }
}

// =========================================================================================
// SALESPERSON & DATA MAPPING
// =========================================================================================

/**
 * Retrieves salesperson alias and display code maps, using a cache to improve performance.
 * Also ensures a named range of valid aliases exists for use in Conditional Formatting.
 * @returns {Object} Maps {aliasMap: Map, displayCodeMap: Map}
 */
function getSalespersonMaps() {
  const cached = SCRIPT_CACHE.get(CONFIG.CACHE_KEYS.SALESPERSON_MAP);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // Convert back to Maps for efficiency
      return {
        aliasMap: new Map(Object.entries(parsed.aliasMap)),
        displayCodeMap: new Map(Object.entries(parsed.displayCodeMap))
      };
    } catch (e) {
      Logger.log(`Cache parse error for getSalespersonMaps: ${e}`);
    }
  }

  const { sales: salesSheet } = getSheets();
  const values = salesSheet.getRange(2, 1, salesSheet.getLastRow() - 1, 3).getValues();
  const aliasMap = new Map();
  const displayCodeMap = new Map();
  const allAliases = new Set();

  values.forEach(row => {
    const [fullName, aliasesStr, displayCode] = row.map(String);
    if (fullName) {
      const displayName = displayCode || fullName;
      displayCodeMap.set(fullName, displayName);

      const mainKeys = [fullName.toUpperCase(), displayName.toUpperCase()];
      mainKeys.forEach(key => {
        if (key) {
          aliasMap.set(key, fullName);
          allAliases.add(key);
        }
      });

      aliasesStr.split(",").forEach(alias => {
        const standardizedAlias = alias.trim().toUpperCase();
        if (standardizedAlias) {
          aliasMap.set(standardizedAlias, fullName);
          allAliases.add(standardizedAlias);
        }
      });
    }
  });

  // Update the named range used for CF validation
  const aliasSheet = SS.getSheetByName(CONFIG.RANGES.salespersonNamedRange) || SS.insertSheet(CONFIG.RANGES.salespersonNamedRange).hideSheet();
  const aliasArray = Array.from(allAliases).map(a => [a]);
  aliasSheet.clearContents();
  if (aliasArray.length > 0) {
    aliasSheet.getRange(1, 1, aliasArray.length, 1).setValues(aliasArray);
    SS.setNamedRange(CONFIG.RANGES.salespersonNamedRange, aliasSheet.getRange(`A1:A${aliasArray.length}`));
  }

  const maps = {
    aliasMap: Object.fromEntries(aliasMap),
    displayCodeMap: Object.fromEntries(displayCodeMap)
  };
  SCRIPT_CACHE.put(CONFIG.CACHE_KEYS.SALESPERSON_MAP, JSON.stringify(maps), CONFIG.CACHE_EXPIRATION_SECONDS);
  return { aliasMap, displayCodeMap };
}

// =========================================================================================
// DATA PROCESSING & TALLYING
// =========================================================================================

/**
 * Tallies delivered sales counts for each salesperson from a set of rows.
 * @param {Array<Array>} rows The data rows to process.
 * @param {Map} aliasMap The map of aliases to full names.
 * @returns {Object} Result {counts: Map, unknownInputs: Set}
 */
function tallyCounts(rows, aliasMap) {
  const counts = new Map();
  const unknownInputs = new Set();

  rows.forEach(row => {
    CONFIG.DEAL_SECTIONS.forEach(({ fiCol, salesCol }) => {
      const fiFlag = String(row[fiCol - 1] || "").trim().toUpperCase();
      const salespersonInput = String(row[salesCol - 1] || "").trim();
      if (!/^[A-Z]$/.test(fiFlag) || !salespersonInput) return;

      const parts = salespersonInput.split("/").map(s => s.trim().toUpperCase());
      const increment = parts.length > 1 ? 0.5 : 1;

      parts.forEach(part => {
        if (!part) return;
        const fullName = aliasMap.get(part);
        if (fullName) {
          counts.set(fullName, (counts.get(fullName) || 0) + increment);
        } else {
          unknownInputs.add(part);
        }
      });
    });
  });

  return { counts, unknownInputs };
}

/**
 * Summarizes total new, used, and trade counts from a set of rows.
 * @param {Array<Array>} rows The data rows to process.
 * @returns {Object} Summary {newCount, usedCount, tradeCount}
 */
function summarizeRows(rows) {
  return rows.reduce((summary, row) => {
    CONFIG.DEAL_SECTIONS.forEach(section => {
      const fiFlag = String(row[section.fiCol - 1] || "").trim().toUpperCase();
      const hasContent = row.slice(section.startCol - 1, section.endCol).some(val => String(val).trim());
      const isDelivered = /^[A-Z]$/.test(fiFlag) && hasContent;

      if (isDelivered) {
        if (section.name === "New") summary.newCount++;
        else summary.usedCount++;
        const tradeValue = String(row[section.tradeCol - 1] || "").trim().toUpperCase();
        if (tradeValue && tradeValue !== "NT") summary.tradeCount++;
      }
    });
    return summary;
  }, { newCount: 0, usedCount: 0, tradeCount: 0 });
}

// =========================================================================================
// SPREADSHEET FORMATTING
// =========================================================================================

/**
 * Ensures the 'MONTHLY' sheet has the correct conditional formatting rules.
 * This is idempotent; it removes old script-managed rules before adding new ones.
 */
function ensureMonthlyCF() {
  const { monthly: sheet } = getSheets();
  const rules = sheet.getConditionalFormatRules();

  // Filter out rules previously created by this script to prevent duplication
  const newRules = rules.filter(rule => {
    try {
      return !rule.getRuleId()?.includes(CONFIG.CF_RULE_SIGNATURE);
    } catch (e) {
      // Handle cases where getRuleId might fail
      return true;
    }
  });

  CONFIG.DEAL_SECTIONS.forEach(section => {
    const range = sheet.getRange(section.range);
    const nonDeliveredFormula = `=AND(COUNTA($${String.fromCharCode(64 + section.startCol)}2:$${String.fromCharCode(64 + section.endCol)}2)>0, $${String.fromCharCode(64 + section.fiCol)}2="")`;

    newRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(nonDeliveredFormula)
      .setBackground(CONFIG.COLORS.NON_DELIVERED_DEAL)
      .setRanges([range])
      .setRuleId(CONFIG.CF_RULE_SIGNATURE + '_nonDelivered_' + section.name)
      .build());

    const salesRange = sheet.getRange(`${String.fromCharCode(64 + section.salesCol)}2:${String.fromCharCode(64 + section.salesCol)}`);
    const salespersonErrorFormula = `=AND($${String.fromCharCode(64 + section.salesCol)}2<>"", $${String.fromCharCode(64 + section.fiCol)}2<>"", SUMPRODUCT(--ISNA(VLOOKUP(UPPER(TRIM(SPLIT($${String.fromCharCode(64 + section.salesCol)}2, "/"))), INDIRECT("${CONFIG.RANGES.salespersonNamedRange}"), 1, FALSE)))>0)`;

    newRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(salespersonErrorFormula)
      .setBackground(CONFIG.COLORS.SALESPERSON_ERROR)
      .setRanges([salesRange])
      .setRuleId(CONFIG.CF_RULE_SIGNATURE + '_salespersonError_' + section.name)
      .build());
  });

  sheet.setConditionalFormatRules(newRules);
}

/**
 * Helper function to calculate selling days passed and total in a month.
 * @returns {Object} Pace info {elapsed, total}
 */
function _getPaceInfo() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let elapsed = 0, total = 0;

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    if (!CONFIG.NON_SELLING_DAYS.includes(d.getDay())) {
      total++;
      if (d <= now) elapsed++;
    }
  }
  return { elapsed: Math.max(elapsed, 1), total };
}

/**
 * Reapplies all dynamic conditional formatting rules to the TODAY sheet.
 */
function reapplyCF() {
  try {
    const { today: todaySheet, deposits: depositsSheet } = getSheets();
    const rules = todaySheet.getConditionalFormatRules();

    const managedRanges = [
      CONFIG.RANGES.leaderboard,
      CONFIG.RANGES.todayNewCarDataRange,
      CONFIG.RANGES.todayUsedCarDataRange
    ];
    const newRules = rules.filter(rule => {
      const ruleRanges = rule.getRanges().map(r => r.getA1Notation());
      return !ruleRanges.some(rr => managedRanges.includes(rr));
    });

    // Leaderboard Pace Rules
    const mtdValues = todaySheet.getRange(CONFIG.RANGES.mtd).getValues();
    const allMtdAreZero = mtdValues.every(row => !Number(row[0]));
    const cfLeaderboardRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);

    if (allMtdAreZero) {
      newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=1=1")
        .setBackground(CONFIG.COLORS.LEADERBOARD_ZERO_MTD)
        .setRanges([cfLeaderboardRange]).build());
    } else {
      const { elapsed, total } = _getPaceInfo();
      const paceBase = `($Q2/${elapsed}*${total})`;

      newRules.push(
        SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}>=10`).setBackground(CONFIG.COLORS.PACE_GREEN).setRanges([cfLeaderboardRange]).build(),
        SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=AND(${paceBase}>=8,${paceBase}<10)`).setBackground(CONFIG.COLORS.PACE_YELLOW).setRanges([cfLeaderboardRange]).build(),
        SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}<8`).setBackground(CONFIG.COLORS.PACE_RED).setRanges([cfLeaderboardRange]).build()
      );
    }

    // Data Validation/Duplicate Rules
    const newCarRange = todaySheet.getRange(CONFIG.RANGES.todayNewCarDataRange);
    const usedCarRange = todaySheet.getRange(CONFIG.RANGES.todayUsedCarDataRange);
    const commonFormatting = (ruleBuilder) => ruleBuilder.setFontColor(CONFIG.COLORS.DUPLICATE_STOCK_TEXT).setBackground(CONFIG.COLORS.DUPLICATE_STOCK_FILL);

    const newStockCol = `$${String.fromCharCode(64 + CONFIG.DEAL_SECTIONS[0].stockCol)}`;
    const usedStockCol = `$${String.fromCharCode(64 + CONFIG.DEAL_SECTIONS[1].stockCol)}`;

    newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(${newStockCol}$2:${newStockCol}$101,${newStockCol}2)>1`)).setRanges([newCarRange]).build());
    newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(${usedStockCol}$2:${usedStockCol}$101,${usedStockCol}2)>1`)).setRanges([usedCarRange]).build());
    newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(INDIRECT("'${CONFIG.SHEETS.DEPOSITS}'!G:G"),${newStockCol}2)>0`)).setRanges([newCarRange]).build());
    newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(INDIRECT("'${CONFIG.SHEETS.DEPOSITS}'!G:G"),${usedStockCol}2)>0`)).setRanges([usedCarRange]).build());

    todaySheet.setConditionalFormatRules(newRules);
    SS.toast("Conditional formatting updated.", "CF Updated");
  } catch (e) {
    Logger.log(`Error in reapplyCF: ${e.stack}`);
    SpreadsheetApp.getUi()?.alert(`Error updating conditional formatting: ${e.message}`);
  }
}

// =========================================================================================
// MAIN WORKFLOWS (MENU ITEMS)
// =========================================================================================

/**
 * Logs daily sales from TODAY to MONTHLY, updates leaderboard, and clears the input range.
 */
function processDaily() {
  withScriptLock(() => {
    if (CONFIG.NON_SELLING_DAYS.includes(new Date().getDay())) {
      Logger.log("Today is a non-selling day. Skipping daily processing.");
      return;
    }

    SS.toast("Processing daily sales...", "Working");
    try {
      const { today: todaySheet, monthly: monthlySheet } = getSheets();
      const dailyRange = todaySheet.getRange(CONFIG.RANGES.dailyData);
      const [dailyValues, dailyFontColors] = [dailyRange.getValues(), dailyRange.getFontColors()]; // Batched read

      const activeRows = dailyValues.reduce((acc, row, index) => {
        const hasActivity = row.slice(1).some(cell => String(cell).trim() !== "");
        if (hasActivity) {
          acc.data.push(row.map((val, i) => i === 0 ? acc.data.length + 1 : val));
          acc.fontColors.push(dailyFontColors[index]);
        }
        return acc;
      }, { data: [], fontColors: [] });

      if (activeRows.data.length === 0) {
        SS.toast("No sales activity found to log.", "Process Complete");
        return;
      }

      const dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "M/d");
      const lastRowMonthly = monthlySheet.getLastRow();
      const headerInsertRow = lastRowMonthly + 1;
      const dataInsertRow = headerInsertRow + 1;

      // Insert and format date header
      monthlySheet.insertRowBefore(headerInsertRow);
      monthlySheet.getRange(headerInsertRow, 1, 1, 14).merge()
        .setValue(dateStr)
        .setHorizontalAlignment("center")
        .setFontWeight("bold")
        .setBackground(CONFIG.COLORS.MONTHLY_HEADER);

      // Insert data and formatting
      const monthlyDataRange = monthlySheet.getRange(dataInsertRow, 1, activeRows.data.length, 14);
      monthlyDataRange.setValues(activeRows.data);
      monthlyDataRange.setFontColors(activeRows.fontColors);

      ensureMonthlyCF();

      const { aliasMap, displayCodeMap } = getSalespersonMaps();
      const { counts, unknownInputs } = tallyCounts(activeRows.data, aliasMap);

      // Update Leaderboard
      const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
      const lbValues = lbRange.getValues();
      lbValues.forEach(row => row[1] = (Number(row[1]) || 0) + (counts.get(row[0]) || 0));
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0));
      lbRange.setValues(lbValues);

      reapplyCF();

      // Clear Today Sheet
      const dailyClearRange = todaySheet.getRange(CONFIG.RANGES.dailyClear);
      dailyClearRange.clearContent();
      dailyClearRange.setBackground(null).setFontColor(null);

      // Display Summary
      const summary = summarizeRows(activeRows.data);
      const repLines = Array.from(counts.entries()).map(([name, count]) => `  - ${displayCodeMap.get(name) || name}: ${count}`);
      let summaryMsg = `NEW DELIVERED: ${summary.newCount}\nUSED DELIVERED: ${summary.usedCount}\nTOTAL UNITS: ${summary.newCount + summary.usedCount}\nTRADES: ${summary.tradeCount}\n\nSALESPERSON COUNTS:\n${repLines.join("\n") || "  - None"}`;
      if (unknownInputs.size > 0) summaryMsg += `\n\nUnknown inputs: ${Array.from(unknownInputs).join(", ")}`;
      SpreadsheetApp.getUi().alert(`Daily Sales Logged: ${dateStr}`, summaryMsg, SpreadsheetApp.getUi().ButtonSet.OK);

    } catch (e) {
      Logger.log(`Error in processDaily: ${e.stack}`);
      SpreadsheetApp.getUi()?.alert(`Processing Failed: ${e.message}`);
    }
  });
}

/**
 * Recalculates MTD counts from the MONTHLY sheet and ensures formatting is correct.
 */
function recalcMtdFromMonthly() {
  withScriptLock(() => {
    SS.toast("Recalculating MTD & checking formats...", "Working");
    try {
      const { today: todaySheet, monthly: monthlySheet } = getSheets();

      getSalespersonMaps();
      ensureMonthlyCF();

      const lastRow = monthlySheet.getLastRow();
      if (lastRow < 2) {
        todaySheet.getRange(CONFIG.RANGES.mtd).clearContent();
        reapplyCF();
        SS.toast("MTD Cleared. 'MONTHLY' sheet is empty.", "Recalc Info");
        return;
      }

      const allMonthlyData = monthlySheet.getRange(2, 1, lastRow - 1, 14).getValues();
      const dataRows = allMonthlyData.filter(row => !(row[0] && !row[1] && !row[2]));

      const { aliasMap } = getSalespersonMaps();
      const { counts, unknownInputs } = tallyCounts(dataRows, aliasMap);

      const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
      const lbValues = lbRange.getValues();
      lbValues.forEach(row => row[1] = counts.get(row[0]) || 0);
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0));
      lbRange.setValues(lbValues);

      reapplyCF();

      let toastMsg = "MTD recalculated successfully.";
      if (unknownInputs.size > 0) {
        toastMsg = `Recalculated, but found unknown salesperson codes: ${Array.from(unknownInputs).slice(0, 3).join(", ")}...`;
      }
      SS.toast(toastMsg, "Recalc Complete", 10);

    } catch (e) {
      Logger.log(`Error in recalcMtdFromMonthly: ${e.stack}`);
      SpreadsheetApp.getUi()?.alert(`Recalc Failed: ${e.message}`);
    }
  });
}

/**
 * Archives the current MONTHLY sheet, clears it, resets MTD, and calculates 3-month rolling average.
 */
function rolloverMonth() {
  withScriptLock(() => {
    const ui = SpreadsheetApp.getUi();
    const confirm = ui.alert("Confirm Month Rollover", "This will archive 'MONTHLY', clear MTD, and recalculate averages. Proceed?", ui.ButtonSet.YES_NO);
    if (confirm !== ui.Button.YES) return;

    SS.toast("Starting month rollover...", "Working");
    try {
      const { today: todaySheet, monthly: monthlySheet } = getSheets();

      // 1. Archive MONTHLY sheet
      const now = new Date();
      const archiveDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const archiveSheetName = Utilities.formatDate(archiveDate, Session.getScriptTimeZone(), "M/yy");
      if (SS.getSheetByName(archiveSheetName)) throw new Error(`Archive sheet "${archiveSheetName}" already exists.`);

      const archiveSheet = monthlySheet.copyTo(SS);
      archiveSheet.setName(archiveSheetName);
      archiveSheet.setTabColor(null);
      SS.toast(`Archived as "${archiveSheetName}"`, "Rollover Step 1/4");

      // 2. Copy final leaderboard to archive
      const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
      lbRange.copyTo(archiveSheet.getRange(CONFIG.RANGES.leaderboard));
      [16, 17, 18].forEach(col => archiveSheet.autoResizeColumn(col));
      SS.toast("Leaderboard copied to archive", "Rollover Step 2/4");

      // 3. Clear MONTHLY sheet and MTD on TODAY
      const lastRowMonthly = monthlySheet.getLastRow();
      if (lastRowMonthly > 1) monthlySheet.getRange(2, 1, lastRowMonthly - 1, 14).clear();
      todaySheet.getRange(CONFIG.RANGES.mtd).clearContent();
      SS.toast("'MONTHLY' & MTD cleared", "Rollover Step 3/4");

      // 4. Recalculate 3-Month Rolling Averages
      const lbData = lbRange.getValues();
      const historicalSales = new Map();

      for (let i = 1; i <= 3; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const name = Utilities.formatDate(d, Session.getScriptTimeZone(), "M/yy");
        const sheet = SS.getSheetByName(name);
        if (sheet) {
          const values = sheet.getRange("P2:Q" + sheet.getLastRow()).getValues();
          values.forEach(([salesperson, mtd]) => {
            if (salesperson && typeof mtd === 'number') {
              if (!historicalSales.has(salesperson)) historicalSales.set(salesperson, { total: 0, months: 0 });
              historicalSales.get(salesperson).total += mtd;
              historicalSales.get(salesperson).months++;
            }
          });
        }
      }

      const avgValues = lbData.map(row => {
        const name = row[0];
        const history = historicalSales.get(name);
        const avg = history ? Math.round(history.total / history.months * 2) / 2 : 0;
        return [avg];
      });

      todaySheet.getRange(CONFIG.RANGES.avg).setValues(avgValues).setNumberFormat("0.#");
      SS.toast("Averages recalculated", "Rollover Step 4/4");

      reapplyCF();
      ui.alert("Month Rollover Complete!", `"${archiveSheetName}" created. 'MONTHLY' & MTD have been reset.`, ui.ButtonSet.OK);

    } catch (e) {
      Logger.log(`Error in rolloverMonth: ${e.stack}`);
      ui.alert(`Rollover Failed: ${e.message}`);
    }
  });
}

/**
 * Creates the custom menu in the spreadsheet UI when the file is opened.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Sales Tools")
    .addItem("Log Yesterday's Sales", "processDaily")
    .addSeparator()
    .addItem("Recalculate MTD & Check Formats", "recalcMtdFromMonthly")
    .addSeparator()
    .addItem("Start New Month (Rollover)", "rolloverMonth")
    .addToUi();
}
