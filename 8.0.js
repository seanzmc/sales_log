/**
 * sales_log_v8.0.0.js (Refactored & Optimized)
 * This version introduces a centralized CONFIG object, refactors repetitive logic into helper functions,
 * and significantly optimizes the month-end rollover process to reduce API calls and improve performance.
 *
 * Key Improvements:
 * - DRY Principle: A single `processDealSection` handles formatting for both New and Used car sections.
 * - Performance: `rolloverMonth` now fetches archive data in a batch, avoiding slow loops.
 * - Maintainability: All settings are in the CONFIG object. Code is more modular and readable.
 * - Robustness: Less fragile logic for parsing sheets and handling conditional formatting.
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
    },
    COLORS: {
        NON_DELIVERED_DEAL: "#FF0000",
        SALESPERSON_ERROR: "#FFEBEE",
        DUPLICATE_STOCK_FILL: "#B4FF0C",
        DUPLICATE_STOCK_TEXT: "#FF0000",
        LEADERBOARD_ZERO_MTD: "#F0F8FF", // AliceBlue
        PACE_GREEN: "#70AD47",
        PACE_YELLOW: "#FFEE32",
        PACE_RED: "#C00000",
        MONTHLY_HEADER: "#FFFF00",
    },
    // Column indices (0-based) relative to a full A:N data row
    DEAL_SECTIONS: [
        { name: "New", fiIdx: 2, salesIdx: 6, tradeIdx: 5, startCol: 2, endCol: 7 }, // B:G
        { name: "Used", fiIdx: 9, salesIdx: 13, tradeIdx: 12, startCol: 9, endCol: 14 }, // I:N
    ],
    CACHE_KEYS: {
        SALESPERSON_MAP: "salespersonMaps_v2",
    },
    CACHE_EXPIRATION_SECONDS: 300, // 5 minutes
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

    const maps = values.reduce(
        (acc, row) => {
            const [fullName, aliasesStr, displayCode] = row.map(String);
            if (fullName) {
                const displayName = displayCode || fullName;
                acc.displayCodeMap[fullName] = displayName;
                acc.aliasMap[fullName.toUpperCase()] = fullName;
                if (displayName.toUpperCase() !== fullName.toUpperCase()) {
                    acc.aliasMap[displayName.toUpperCase()] = fullName;
                }
                aliasesStr.split(",").forEach((alias) => {
                    const standardizedAlias = alias.trim().toUpperCase();
                    if (standardizedAlias) acc.aliasMap[standardizedAlias] = fullName;
                });
            }
            return acc;
        },
        { aliasMap: {}, displayCodeMap: {} }
    );

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

    rows.forEach((row) => {
        CONFIG.DEAL_SECTIONS.forEach(({ fiIdx, salesIdx }) => {
            const fiFlag = String(row[fiIdx] || "")
                .trim()
                .toUpperCase();
            const salespersonInput = String(row[salesIdx] || "").trim();

            if (!/^[A-Z]$/.test(fiFlag) || !salespersonInput) return;

            const parts = salespersonInput.split("/").map((s) => s.trim().toUpperCase());
            const increment = parts.length > 1 ? 0.5 : 1;

            parts.forEach((part) => {
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
    return rows.reduce(
        (summary, row) => {
            let deliveredToday = { newDelivered: false, usedDelivered: false };

            CONFIG.DEAL_SECTIONS.forEach((section) => {
                const fiFlag = String(row[section.fiIdx] || "")
                    .trim()
                    .toUpperCase();
                const hasContent = row.slice(section.startCol - 1, section.endCol).some((val) => String(val).trim());
                const isDelivered = /^[A-Z]$/.test(fiFlag) && hasContent;

                if (isDelivered) {
                    if (section.name === "New") {
                        summary.newCount++;
                        deliveredToday.newDelivered = true;
                    } else {
                        summary.usedCount++;
                        deliveredToday.usedDelivered = true;
                    }

                    const tradeValue = String(row[section.tradeIdx] || "")
                        .trim()
                        .toUpperCase();
                    if (tradeValue && tradeValue !== "NT") {
                        summary.tradeCount++;
                    }
                }
            });
            return summary;
        },
        { newCount: 0, usedCount: 0, tradeCount: 0 }
    );
}

// =========================================================================================
// SPREADSHEET FORMATTING
// =========================================================================================

/**
 * Applies conditional background colors to deal sections on the MONTHLY sheet.
 * Handles non-delivered deals and salesperson code errors.
 * REFACTOR: This function now iterates through deal sections defined in CONFIG to avoid repetition.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The 'MONTHLY' sheet object.
 * @param {any[][]} rowsData The 2D array of data from the sheet.
 * @param {number} startSheetRow The 1-indexed starting row number.
 * @param {{[alias: string]: string}} aliasMap A map of salesperson aliases to full names.
 * @returns {number[]} An array of row numbers with salesperson code errors.
 */
function applyMonthlyRowFormatting(sheet, rowsData, startSheetRow, aliasMap) {
    if (!rowsData || rowsData.length === 0) return [];

    const numRows = rowsData.length;
    const salespersonErrorRows = new Set();

    CONFIG.DEAL_SECTIONS.forEach((section) => {
        const originalBgs = sheet.getRange(startSheetRow, section.startCol, numRows, section.endCol - section.startCol + 1).getBackgrounds();
        const newBgs = originalBgs.map((r) => [...r]); // Create a mutable copy

        for (let i = 0; i < numRows; i++) {
            const rowData = rowsData[i];
            const fiFlag = String(rowData[section.fiIdx] || "")
                .trim()
                .toUpperCase();
            const salespersonInput = String(rowData[section.salesIdx] || "").trim();
            const hasContent = rowData.slice(section.startCol - 1, section.endCol).some((val) => String(val).trim());
            const isDelivered = /^[A-Z]$/.test(fiFlag);

            // Indices for the background array (0-based)
            const tradeBgIdx = section.tradeIdx - (section.startCol - 1);
            const salesBgIdx = section.salesIdx - (section.startCol - 1);

            if (hasContent && !isDelivered) {
                // Case 1: Non-delivered with data -> Mark red (preserving trade)
                newBgs[i] = newBgs[i].map((bg, k) => (k === tradeBgIdx ? bg : CONFIG.COLORS.NON_DELIVERED_DEAL));
            } else {
                // Case 2: Is delivered or has no data -> Clear red formatting
                newBgs[i] = newBgs[i].map((bg) => (bg.toUpperCase() === CONFIG.COLORS.NON_DELIVERED_DEAL ? null : bg));

                // Sub-case: If delivered, check for salesperson errors
                if (isDelivered && salespersonInput) {
                    const parts = salespersonInput.split("/").map((s) => s.trim().toUpperCase());
                    if (parts.some((part) => part && !aliasMap[part])) {
                        newBgs[i][salesBgIdx] = CONFIG.COLORS.SALESPERSON_ERROR;
                        salespersonErrorRows.add(startSheetRow + i);
                    }
                }
            }
        }
        sheet.getRange(startSheetRow, section.startCol, numRows, newBgs[0].length).setBackgrounds(newBgs);
    });

    return [...salespersonErrorRows].sort((a, b) => a - b);
}

/**
 * Reapplies all dynamic conditional formatting rules to the TODAY sheet.
 */
function reapplyCF() {
    try {
        const { today: todaySheet } = getSheets();
        const existingRules = todaySheet.getConditionalFormatRules();

        // Filter out all rules managed by this script to prevent duplication
        const managedRanges = [CONFIG.RANGES.leaderboard, CONFIG.RANGES.todayNewCarDataRange, CONFIG.RANGES.todayUsedCarDataRange];
        const userRules = existingRules.filter((rule) => {
            const ruleRanges = rule.getRanges().map((r) => r.getA1Notation());
            return !ruleRanges.some((rr) => managedRanges.includes(rr));
        });

        const newRules = [...userRules];

        // 1. Leaderboard Pace Rules
        const mtdValues = todaySheet.getRange(CONFIG.RANGES.mtd).getValues();
        const allMtdAreZero = mtdValues.every((row) => !Number(row[0]));
        const cfLeaderboardRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);

        if (allMtdAreZero) {
            newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=1=1").setBackground(CONFIG.COLORS.LEADERBOARD_ZERO_MTD).setRanges([cfLeaderboardRange]).build());
        } else {
            const now = new Date();
            // This logic for selling days can be abstracted if needed elsewhere
            const first = new Date(now.getFullYear(), now.getMonth(), 1);
            const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            let elapsed = 0,
                total = 0;
            for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
                if (d.getDay() !== 0) {
                    // Not Sunday
                    total++;
                    if (d <= now) elapsed++;
                }
            }
            elapsed = Math.max(elapsed, 1);
            const paceBase = `($Q2/${elapsed}*${total})`;

            newRules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}>=10`).setBackground(CONFIG.COLORS.PACE_GREEN).setRanges([cfLeaderboardRange]).build(), SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=AND(${paceBase}>=8,${paceBase}<10)`).setBackground(CONFIG.COLORS.PACE_YELLOW).setRanges([cfLeaderboardRange]).build(), SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=${paceBase}<8`).setBackground(CONFIG.COLORS.PACE_RED).setRanges([cfLeaderboardRange]).build());
        }

        // 2. Data Validation/Duplicate Rules
        const newCarRange = todaySheet.getRange(CONFIG.RANGES.todayNewCarDataRange);
        const usedCarRange = todaySheet.getRange(CONFIG.RANGES.todayUsedCarDataRange);
        const commonFormatting = (ruleBuilder) => ruleBuilder.setFontColor(CONFIG.COLORS.DUPLICATE_STOCK_TEXT).setBackground(CONFIG.COLORS.DUPLICATE_STOCK_FILL);

        newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=COUNTIF($E$2:$E$101,$E2)>1")).setRanges([newCarRange]).build());
        newRules.push(commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied("=COUNTIF($L$2:$L$101,$L2)>1")).setRanges([usedCarRange]).build());
        newRules.push(
            commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(INDIRECT("'${CONFIG.SHEETS.DEPOSITS}'!G:G"),$E2)>0`))
                .setRanges([newCarRange])
                .build()
        );
        newRules.push(
            commonFormatting(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`=COUNTIF(INDIRECT("'${CONFIG.SHEETS.DEPOSITS}'!G:G"),$L2)>0`))
                .setRanges([usedCarRange])
                .build()
        );

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
        if (new Date().getDay() === 0) {
            // 0 = Sunday
            Logger.log("Today is Sunday. Skipping daily processing.");
            return;
        }

        SS.toast("Processing daily sales...", "Working");
        try {
            const { today: todaySheet, monthly: monthlySheet } = getSheets();
            const dailyRange = todaySheet.getRange(CONFIG.RANGES.dailyData);
            const dailyValues = dailyRange.getValues();
            const dailyFontColors = dailyRange.getFontColors();

            const activeRows = dailyValues.reduce(
                (acc, row, index) => {
                    const hasActivity = row.slice(1, 14).some((cell) => String(cell).trim() !== "");
                    if (hasActivity) {
                        acc.data.push(row.map((val, i) => (i === 0 ? acc.data.length + 1 : val))); // Add sequence number
                        acc.fontColors.push(dailyFontColors[index]);
                    }
                    return acc;
                },
                { data: [], fontColors: [] }
            );

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
            monthlySheet.getRange(headerInsertRow, 1, 1, 14).merge().setValue(dateStr).setHorizontalAlignment("center").setFontWeight("bold").setBackground(CONFIG.COLORS.MONTHLY_HEADER);

            // Insert data and formatting
            const monthlyDataRange = monthlySheet.getRange(dataInsertRow, 1, activeRows.data.length, 14);
            monthlyDataRange.setValues(activeRows.data);
            monthlyDataRange.setFontColors(activeRows.fontColors);
            SpreadsheetApp.flush(); // Apply values before further formatting

            const { aliasMap, displayCodeMap } = getSalespersonMaps();
            const errorSheetRows = applyMonthlyRowFormatting(monthlySheet, activeRows.data, dataInsertRow, aliasMap);

            // Update Leaderboard
            const { counts, unknownInputs } = tallyCounts(activeRows.data, aliasMap);
            const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
            const lbValues = lbRange.getValues();
            lbValues.forEach((row) => (row[1] = (Number(row[1]) || 0) + (counts[row[0]] || 0)));
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
            let summaryMsg = `NEW DELIVERED: ${newCount}\nUSED DELIVERED: ${usedCount}\nTOTAL UNITS: ${newCount + usedCount}\nTRADES: ${tradeCount}\n\n` + `SALESPERSON COUNTS:\n${repLines.join("\n") || "  - None"}`;
            if (errorSheetRows.length > 0) summaryMsg += `\n\nSalesperson code errors found on rows: ${errorSheetRows.join(", ")}`;
            if (unknownInputs.length > 0) summaryMsg += `\n\nUnknown inputs: ${unknownInputs.join(", ")}`;
            SpreadsheetApp.getUi().alert(`Daily Sales Logged: ${dateStr}`, summaryMsg, SpreadsheetApp.getUi().ButtonSet.OK);
        } catch (e) {
            Logger.log(`Error in processDaily: ${e.stack}`);
            SpreadsheetApp.getUi()?.alert(`Processing Failed: ${e.message}`);
        }
    });
}

/**
 * Recalculates MTD counts from the MONTHLY sheet and reapplies formatting.
 */
function recalcMtdFromMonthly() {
    withScriptLock(() => {
        SS.toast("Recalculating MTD & checking formats...", "Working");
        try {
            const { today: todaySheet, monthly: monthlySheet } = getSheets();
            const lastRow = monthlySheet.getLastRow();
            if (lastRow < 2) {
                todaySheet.getRange(CONFIG.RANGES.mtd).clearContent();
                reapplyCF();
                SS.toast("MTD Cleared. 'MONTHLY' sheet is empty.", "Recalc Info");
                return;
            }

            const allMonthlyData = monthlySheet.getRange(2, 1, lastRow - 1, 14).getValues();
            // A more robust way to find data rows: filter out rows that look like date headers.
            // A date header has a value in column A and is blank in B, C, etc.
            const dataRows = allMonthlyData.filter((row) => !(row[0] && !row[1] && !row[2]));

            const { aliasMap } = getSalespersonMaps();
            const errorRows = applyMonthlyRowFormatting(monthlySheet, allMonthlyData, 2, aliasMap);

            const { counts } = tallyCounts(dataRows, aliasMap);
            const lbRange = todaySheet.getRange(CONFIG.RANGES.leaderboard);
            const lbValues = lbRange.getValues();
            lbValues.forEach((row) => (row[1] = counts[row[0]] || 0));
            lbValues.sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0));
            lbRange.setValues(lbValues);

            reapplyCF();
            SS.toast(`MTD recalculated. Found ${errorRows.length} salesperson errors on 'MONTHLY'.`, "Recalc Complete");
        } catch (e) {
            Logger.log(`Error in recalcMtdFromMonthly: ${e.stack}`);
            SpreadsheetApp.getUi()?.alert(`Recalc Failed: ${e.message}`);
        }
    });
}

/**
 * Archives the current MONTHLY sheet, clears it, resets MTD, and calculates 3-month rolling average.
 * OPTIMIZED: Fetches all archive data in a batch to avoid excessive API calls in a loop.
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
            [16, 17, 18].forEach((col) => archiveSheet.autoResizeColumn(col));
            SS.toast("Leaderboard copied to archive", "Rollover Step 2/4");

            // 3. Clear MONTHLY sheet and MTD on TODAY
            const lastRowMonthly = monthlySheet.getLastRow();
            if (lastRowMonthly > 1) monthlySheet.getRange(2, 1, lastRowMonthly - 1, 14).clear();
            todaySheet.getRange(CONFIG.RANGES.mtd).clearContent();
            SS.toast("'MONTHLY' & MTD cleared", "Rollover Step 3/4");

            // 4. Recalculate 3-Month Rolling Averages (Optimized)
            const lbData = lbRange.getValues();
            const historicalSales = {}; // { "John Doe": { total: 40, months: 3 } }

            // Pre-fetch data from the last 3 archives
            for (let i = 1; i <= 3; i++) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const name = Utilities.formatDate(d, Session.getScriptTimeZone(), "M/yy");
                const sheet = SS.getSheetByName(name);
                if (sheet) {
                    const lastRow = sheet.getLastRow();
                    if (lastRow > 1) {
                        const values = sheet.getRange("P2:Q" + lastRow).getValues();
                        values.forEach(([salesperson, mtd]) => {
                            if (salesperson && typeof mtd === "number") {
                                if (!historicalSales[salesperson]) historicalSales[salesperson] = { total: 0, months: 0 };
                                historicalSales[salesperson].total += mtd;
                                historicalSales[salesperson].months++;
                            }
                        });
                    }
                }
            }

            const avgValues = lbData.map((row) => {
                const name = row[0];
                const history = historicalSales[name];
                const avg = history && history.months > 0 ? Math.round((history.total / history.months) * 2) / 2 : 0;
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
    SpreadsheetApp.getUi().createMenu("Sales Tools").addItem("Log Yesterday's Sales", "processDaily").addSeparator().addItem("Recalculate MTD & Check Formats", "recalcMtdFromMonthly").addSeparator().addItem("Start New Month (Rollover)", "rolloverMonth").addToUi();
}
