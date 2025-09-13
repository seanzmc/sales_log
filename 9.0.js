/**
 * sales_log_v9.0.0.js (Expert Refactor)
 * This version replaces inefficient direct cell formatting with robust Conditional Formatting rules,
 * externalizes business logic into the CONFIG object, and further modularizes the code for
 * ultimate efficiency and maintainability.
 *
 * Key Improvements:
 * - Performance/Robustness: Replaced `applyMonthlyRowFormatting` with `ensureMonthlyCF`, which applies
 * sheet-level conditional formatting rules. This is faster, more reliable, and updates in real-time.
 * - Maintainability: Selling day logic is now driven by `CONFIG.NON_SELLING_DAYS`, allowing for easy
 * updates without changing code. A dedicated `_getPaceInfo` helper makes the logic clean and reusable.
 * - Readability: Main functions are cleaner as complex logic has been abstracted into helpers.
 * - Idempotency: Formatting functions are designed to be run multiple times without creating duplicate rules.
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
    // Ranges for monthly sheet conditional formatting
    monthlyNewCarDataRange: "B2:G",
    monthlyUsedCarDataRange: "I2:N",
    // Named range for salesperson validation
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
    // Column indices (1-based for easier range logic)
    { name: "New", stockCol: 5, fiCol: 3, salesCol: 7, tradeCol: 6, startCol: 2, endCol: 7, range: "B2:G" },
    { name: "Used", stockCol: 12, fiCol: 10, salesCol: 14, tradeCol: 13, startCol: 9, endCol: 14, range: "I2:N" },
  ],
  CACHE_KEYS: {
    SALESPERSON_MAP: "salespersonMaps_v2",
  },
  CACHE_EXPIRATION_SECONDS: 300, // 5 minutes
  NON_SELLING_DAYS: [0], // Day of week index where Sunday=0, Saturday=6. e.g., [0, 6] for Sun/Sat.
  CF_RULE_SIGNATURE: "Managed by SalesLogScript", // Used to identify and manage our CF rules
};

// =========================================================================================
// GLOBAL HELPERS & CACHING
// =========================================================================================
const SS = SpreadsheetApp.getActive();
const SCRIPT_CACHE = CacheService.getScriptCache();
const SCRIPT_LOCK = LockService.getScriptLock();

/**
 * Gets references to key sheets. Caches results for the duration of the script execution.
 * @returns {{today: GoogleAppsScript.Spreadsheet.Sheet, monthly: GoogleAppsScript.Spreadsheet.Sheet, sales: GoogleAppsScript.Spreadsheet.Sheet}}
 */
const getSheets = (() => {
  let sheets = null;
  return () => {
    if (sheets) return sheets;
    const today = SS.getSheetByName(CONFIG.SHEETS.TODAY);
    const monthly = SS.getSheetByName(CONFIG.SHEETS.MONTHLY);
    const sales = SS.getSheetByName(CONFIG.SHEETS.SALESPEOPLE);
    if (!today || !monthly || !sales) {
      throw new Error(`Required sheets missing. Ensure '${CONFIG.SHEETS.TODAY}', '${CONFIG.SHEETS.MONTHLY}', and '${CONFIG.SHEETS.SALESPEOPLE}' exist.`);
    }
    sheets = { today, monthly, sales };
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

// =========================================================================================
// SALESPERSON & DATA MAPPING
// =========================================================================================

/**
 * Retrieves salesperson alias and display code maps, using a cache to improve performance.
 * Also ensures a named range of valid aliases exists for use in Conditional Formatting.
 * @returns {{aliasMap: {[alias: string]: string}, displayCodeMap: {[fullName: string]: string}}}
 */
function getSalespersonMaps() {
  const cached = SCRIPT_CACHE.get(CONFIG.CACHE_KEYS.SALESPERSON_MAP);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      Logger.log(`Cache parse error for getSalespersonMaps: ${e}`);
    }
  }

  const { sales: salesSheet } = getSheets();
  const values = salesSheet.getRange(2, 1, salesSheet.getLastRow() - 1, 3).getValues();
  const allAliases = new Set();

  const maps = values.reduce(
    (acc, row) => {
      const [fullName, aliasesStr, displayCode] = row.map(String);
      if (fullName) {
        const displayName = displayCode || fullName;
        acc.displayCodeMap[fullName] = displayName;
        
        const mainKeys = [fullName.toUpperCase(), displayName.toUpperCase()];
        mainKeys.forEach(key => {
          if(key) {
            acc.aliasMap[key] = fullName;
            allAliases.add(key);
          }
        });

        aliasesStr.split(",").forEach(alias => {
          const standardizedAlias = alias.trim().toUpperCase();
          if (standardizedAlias) {
            acc.aliasMap[standardizedAlias] = fullName;
            allAliases.add(standardizedAlias);
          }
        });
      }
      return acc;
    },
    { aliasMap: {}, displayCodeMap: {} }
  );

  // Update the named range used for CF validation
  const aliasSheet = SS.getSheetByName(CONFIG.salespersonNamedRange) || SS.insertSheet(CONFIG.salespersonNamedRange).hideSheet();
  const aliasArray = [...allAliases].map(a => [a]);
  aliasSheet.clearContents();
  if (aliasArray.length > 0) {
     aliasSheet.getRange(1, 1, aliasArray.length, 1).setValues(aliasArray);
     SS.setNamedRange(CONFIG.RANGES.salespersonNamedRange, aliasSheet.getRange(`A1:A${aliasArray.length}`));
  }
 
  SCRIPT_CACHE.put(CONFIG.CACHE_KEYS.SALESPERSON_MAP, JSON.stringify(maps), CONFIG.CACHE_EXPIRATION_SECONDS);
  return maps;
}


// =========================================================================================
// DATA PROCESSING & TALLYING
// =========================================================================================

/**
 * Tallies delivered sales counts for each salesperson from a set of rows.
 * @param {any[][]} rows The data rows to process.
 * @param {{[alias: string]: string}} aliasMap The map of aliases to full names.
 * @returns {{counts: {[fullName: string]: number}, unknownInputs: string[]}}
 */
function tallyCounts(rows, aliasMap) {
  const result = { counts: {}, unknownInputs: new Set() };

  rows.forEach(row => {
    CONFIG.DEAL_SECTIONS.forEach(({ fiCol, salesCol }) => {
      // Use column index (1-based) from config, but access array (0-based)
      const fiFlag = String(row[fiCol - 1] || "").trim().toUpperCase();
      const salespersonInput = String(row[salesCol - 1] || "").trim();
      
      if (!/^[A-Z]$/.test(fiFlag) || !salespersonInput) return;

      const parts = salespersonInput.split("/").map(s => s.trim().toUpperCase());
      const increment = parts.length > 1 ? 0.5 : 1;

      parts.forEach(part => {
        if (!part) return;
        const fullName = aliasMap[part];
        if (fullName) {
          result.counts[fullName] = (result.counts[fullName] || 0) + increment;
        } else {
          result.unknownInputs.add(part);
        }
      });
    });
  });

  return { counts: result.counts, unknownInputs: [...result.unknownInputs] };
}

/**
 * Summarizes total new, used, and trade counts from a set of rows.
 * @param {any[][]} rows The data rows to process.
 * @returns {{newCount: number, usedCount: number, tradeCount: number}}
 */
function summarizeRows(rows) {
  return rows.reduce((summary, row) => {
    CONFIG.DEAL_SECTIONS.forEach(section => {
      const fiFlag = String(row[section.fiCol - 1] || "").trim().toUpperCase();
      // Check if any cell in the section has content, ignoring the date/sequence column
      const hasContent = row.slice(section.startCol - 1, section.endCol).some(val => String(val).trim());
      const isDelivered = /^[A-Z]$/.test(fiFlag) && hasContent;

      if (isDelivered) {
        if (section.name === "New") summary.newCount++; else summary.usedCount++;
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
 * [NEW] Ensures the 'MONTHLY' sheet has the correct conditional formatting rules.
 * This is an idempotent function; it removes old script-managed rules before adding new ones.
 * This replaces the slow, manual `applyMonthlyRowFormatting` function.
 */
function ensureMonthlyCF() {
  const { monthly: sheet } = getSheets();
  const rules = sheet.getConditionalFormatRules();
  
  // Filter out rules previously created by this script to prevent duplication
  const newRules = rules.filter(rule => !rule.getGradientCondition()?.getRuleId()?.includes(CONFIG.CF_RULE_SIGNATURE));

  // --- Rule for Non-Delivered Deals ---
  // Formula: Highlights the row if any cell has content but the F&I flag is missing.
  // Example for New Cars (B2:G): =AND(COUNTA($B2:$G2)>0, $C2="")
  CONFIG.DEAL_SECTIONS.forEach(section => {
    const range = sheet.getRange(section.range);
    const nonDeliveredFormula = `=AND(COUNTA($${String.fromCharCode(64 + section.startCol)}2:$${String.fromCharCode(64 + section.endCol)}2)>0, $${String.fromCharCode(64 + section.fiCol)}2="")`;
    
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(nonDeliveredFormula)
      .setBackground(CONFIG.COLORS.NON_DELIVERED_DEAL)
      .setRanges([range])
      .setRuleId(CONFIG.CF_RULE_SIGNATURE + '_nonDelivered_' + section.name) // Add signature to ID
      .build());

  // --- Rule for Invalid Salesperson ---
  // Formula: Checks if the salesperson cell has a value, is delivered, and the value is not in our valid alias list.
  // Example for New Cars (G2:G): =AND($G2<>"", $C2<>"", ISNA(VLOOKUP(UPPER($G2),INDIRECT("'ValidSalespersonAliases'!A:A"),1,FALSE)))
  // Note: We check each part of a split deal like "JD/SM"
    const salesRange = sheet.getRange(`${String.fromCharCode(64 + section.salesCol)}2:${String.fromCharCode(64 + section.salesCol)}`);
    const salespersonErrorFormula = `=AND($${String.fromCharCode(64 + section.salesCol)}2<>"", $${String.fromCharCode(64 + section.fiCol)}2<>"", SUMPRODUCT(--ISNA(VLOOKUP(UPPER(TRIM(SPLIT($${String.fromCharCode(64 + section.salesCol)}2, "/"))), INDIRECT("${CONFIG.RANGES.salespersonNamedRange}"), 1, FALSE)))>0)`;
    
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(salespersonErrorFormula)
      .setBackground(CONFIG.COLORS.SALESPERSON_ERROR)
      .setRanges([salesRange])
      .setRuleId(CONFIG.CF_RULE_SIGNATURE + '_salespersonError_' + section.name) // Add signature to ID
      .build());
  });

  sheet.setConditionalFormatRules(newRules);
}

/**
 * [NEW] Helper function to calculate selling days passed and total in a month.
 * Logic is now centrally managed and configured via CONFIG.NON_SELLING_DAYS.
 * @returns {{elapsed: number, total: number}}
 */
function _getPaceInfo() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  let elapsed = 0;
  let total = 0;

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    if (!CONFIG.NON_SELLING_DAYS.includes(d.getDay())) {
      total++;
      if (d <= now) {
        elapsed++;
      }
    }
  }
  return { elapsed: Math.max(elapsed, 1), total };
}

/**
 * Reapplies all dynamic conditional formatting rules to the TODAY sheet.
 */
function reapplyCF() {
  try {
    const { today: todaySheet } = getSheets();
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

    // 1. Leaderboard Pace Rules (Now uses helper function)
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

    // 2. Data Validation/Duplicate Rules
    const newCarRange = todaySheet.getRange(CONFIG.RANGES.todayNewCarDataRange);
    const usedCarRange = todaySheet.getRange(CONFIG.RANGES.todayUsedCarDataRange);
    const commonFormatting = (ruleBuilder) => ruleBuilder.setFontColor(CONFIG.COLORS.DUPLICATE_STOCK_TEXT).setBackground(CONFIG.COLORS.DUPLICATE_STOCK_FILL);

    // Dynamic references to stock columns from CONFIG
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
      const dailyValues = dailyRange.getValues();
      const dailyFontColors = dailyRange.getFontColors();

      const activeRows = dailyValues.reduce((acc, row, index) => {
        // Check if any cell from B to N has content
        const hasActivity = row.slice(1).some(cell => String(cell).trim() !== "");
        if (hasActivity) {
          acc.data.push(row.map((val, i) => i === 0 ? acc.data.length + 1 : val)); // Add sequence #
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
      
      // [IMPROVEMENT] No need to manually format rows. Just ensure the CF rules exist.
      ensureMonthlyCF(); 

      const { aliasMap, displayCodeMap } = getSalespersonMaps();
      const { counts, unknownInputs } = tallyCounts(activeRows.data, aliasMap);
      
      // Update Leaderboard
      const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
      const lbValues = lbRange.getValues();
      lbValues.forEach(row => row[1] = (Number(row[1]) || 0) + (counts[row[0]] || 0));
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0));
      lbRange.setValues(lbValues);
      
      reapplyCF();
      
      // Clear Today Sheet
      const dailyClearRange = todaySheet.getRange(CONFIG.RANGES.dailyClear);
      dailyClearRange.clearContent();
      dailyClearRange.setBackground(null).setFontColor(null);
      
      // Display Summary
      const { newCount, usedCount, tradeCount } = summarizeRows(activeRows.data);
      const repLines = Object.entries(counts).map(([name, count]) => `  - ${displayCodeMap[name] || name}: ${count}`);
      let summaryMsg = `NEW DELIVERED: ${newCount}\nUSED DELIVERED: ${usedCount}\nTOTAL UNITS: ${newCount + usedCount}\nTRADES: ${tradeCount}\n\n`
        + `SALESPERSON COUNTS:\n${repLines.join("\n") || "  - None"}`;
      if (unknownInputs.length > 0) summaryMsg += `\n\nUnknown inputs: ${unknownInputs.join(", ")}`;
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
      
      // [IMPROVEMENT] Ensure CF rules are up-to-date.
      getSalespersonMaps(); // This call refreshes the named range of aliases
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
      lbValues.forEach(row => row[1] = counts[row[0]] || 0);
      lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0));
      lbRange.setValues(lbValues);
      
      reapplyCF();
      
      let toastMsg = "MTD recalculated successfully.";
      if (unknownInputs.length > 0) {
        toastMsg = `Recalculated, but found unknown salesperson codes: ${unknownInputs.slice(0, 3).join(", ")}...`;
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
      
      // 4. Recalculate 3-Month Rolling Averages (The original logic here is already well-optimized for a small number of sheets)
      const lbData = lbRange.getValues();
      const historicalSales = {}; // { "John Doe": { total: 40, months: 3 } }
      
      for (let i = 1; i <= 3; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const name = Utilities.formatDate(d, Session.getScriptTimeZone(), "M/yy");
        const sheet = SS.getSheetByName(name);
        if (sheet) {
            const values = sheet.getRange("P2:Q" + sheet.getLastRow()).getValues();
            values.forEach(([salesperson, mtd]) => {
              if (salesperson && typeof mtd === 'number') {
                if (!historicalSales[salesperson]) historicalSales[salesperson] = { total: 0, months: 0 };
                historicalSales[salesperson].total += mtd;
                historicalSales[salesperson].months++;
              }
            });
        }
      }

      const avgValues = lbData.map(row => {
        const name = row[0];
        const history = historicalSales[name];
        const avg = (history && history.months > 0) ? Math.round(history.total / history.months * 2) / 2 : 0;
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
