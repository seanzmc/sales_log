/**
 * setup_wizard.js
 * Setup wizard to help new users configure required sheets for the sales log application.
 * Creates TODAY, MONTHLY, SALESPEOPLE, and DEPOSITS sheets with proper formatting.
 */

/**
 * Main setup wizard function that checks for and creates missing sheets.
 * Can be called from the menu or directly.
 * Safe to run multiple times (idempotent).
 */
function runSetupWizard() {
  try {
    Logger.log("Starting setup wizard...");
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("No active spreadsheet found. Please open a spreadsheet first.");
    }
    
    const results = {
      existed: [],
      created: [],
      errors: []
    };
    
    // Check and create each required sheet
    checkAndCreateTodaySheet(ss, results);
    checkAndCreateMonthlySheet(ss, results);
    checkAndCreateSalespeopleSheet(ss, results);
    checkAndCreateDepositsSheet(ss, results);
    
    // Show summary dialog
    showSetupSummary(results);
    
    Logger.log("Setup wizard completed successfully.");
    
  } catch (e) {
    Logger.log("Error in runSetupWizard: " + e.toString() + (e.stack ? "\nStack: " + e.stack : ""));
    const ui = SpreadsheetApp.getUi();
    ui.alert("Setup Error", "An error occurred during setup:\n\n" + e.message, ui.ButtonSet.OK);
  }
}

/**
 * Checks for and creates the TODAY sheet if missing.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - The active spreadsheet
 * @param {Object} results - Results object to track created/existing sheets
 */
function checkAndCreateTodaySheet(ss, results) {
  const sheetName = "TODAY";
  try {
    let sheet = ss.getSheetByName(sheetName);
    
    if (sheet) {
      results.existed.push(sheetName);
      Logger.log(sheetName + " sheet already exists.");
      return;
    }
    
    // Create the sheet
    sheet = ss.insertSheet(sheetName);
    Logger.log("Creating " + sheetName + " sheet...");
    
    // Set up headers (Row 1)
    const headers = [
      ["Seq", "", "FI", "", "Stock", "Trade", "SP", "", "", "FI", "", "Stock", "Trade", "SP", "", "Salesperson", "MTD", "Avg"]
    ];
    sheet.getRange(1, 1, 1, 18).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 18)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set number formats for MTD and Avg columns
    sheet.getRange("Q:Q").setNumberFormat("0.#");
    sheet.getRange("R:R").setNumberFormat("0.#");
    
    // Set column widths for better display
    sheet.setColumnWidth(1, 40);  // Seq column
    sheet.setColumnWidth(8, 20);  // Separator column
    sheet.setColumnWidth(15, 20); // Separator column
    
    // Apply conditional formatting rules
    applyTodayConditionalFormatting(sheet);
    
    results.created.push(sheetName);
    Logger.log(sheetName + " sheet created successfully.");
    
  } catch (e) {
    const error = sheetName + ": " + e.message;
    results.errors.push(error);
    Logger.log("Error creating " + sheetName + " sheet: " + e.toString());
  }
}

/**
 * Applies conditional formatting rules to the TODAY sheet.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The TODAY sheet
 */
function applyTodayConditionalFormatting(sheet) {
  try {
    const rules = [];
    
    // Get colors from configuration, fallback to defaults
    let duplicateFillColor = "#b4ff0c";
    let duplicateTextColor = "#ff0000";
    
    try {
      const config = getVisualConfig();
      if (config) {
        duplicateFillColor = config.duplicateStockFillColor || duplicateFillColor;
        duplicateTextColor = config.duplicateStockTextColor || duplicateTextColor;
      }
    } catch (configError) {
      Logger.log("Using default colors for CF: " + configError);
    }
    
    // Rule 1: Duplicate Stock Numbers (New Cars) - B2:G101
    const newCarRange = sheet.getRange("B2:G101");
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=COUNTIF($E$2:$E$101,$E2)>1")
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([newCarRange])
        .build()
    );
    
    // Rule 2: Duplicate Stock Numbers (Used Cars) - I2:N101
    const usedCarRange = sheet.getRange("I2:N101");
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=COUNTIF($L$2:$L$101,$L2)>1")
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([usedCarRange])
        .build()
    );
    
    // Rule 3: Stock in Deposits (New Cars) - B2:G101
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0')
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([newCarRange])
        .build()
    );
    
    // Rule 4: Stock in Deposits (Used Cars) - I2:N101
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=COUNTIF(INDIRECT("DEPOSITS!G:G"),$L2)>0')
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([usedCarRange])
        .build()
    );
    
    sheet.setConditionalFormatRules(rules);
    Logger.log("Conditional formatting applied to TODAY sheet.");
    
  } catch (e) {
    Logger.log("Error applying conditional formatting to TODAY: " + e.toString());
  }
}

/**
 * Checks for and creates the MONTHLY sheet if missing.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - The active spreadsheet
 * @param {Object} results - Results object to track created/existing sheets
 */
function checkAndCreateMonthlySheet(ss, results) {
  const sheetName = "MONTHLY";
  try {
    let sheet = ss.getSheetByName(sheetName);
    
    if (sheet) {
      results.existed.push(sheetName);
      Logger.log(sheetName + " sheet already exists.");
      return;
    }
    
    // Create the sheet
    sheet = ss.insertSheet(sheetName);
    Logger.log("Creating " + sheetName + " sheet...");
    
    // Set up headers (Row 1)
    const headers = [
      ["Seq", "", "FI", "", "Stock", "Trade", "SP", "", "", "FI", "", "Stock", "Trade", "SP"]
    ];
    sheet.getRange(1, 1, 1, 14).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 14)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Apply borders to first 51 rows
    sheet.getRange(1, 1, 51, 14)
      .setBorder(
        true, true, true, true, true, true,
        "#000000", SpreadsheetApp.BorderStyle.SOLID
      );
    
    results.created.push(sheetName);
    Logger.log(sheetName + " sheet created successfully.");
    
  } catch (e) {
    const error = sheetName + ": " + e.message;
    results.errors.push(error);
    Logger.log("Error creating " + sheetName + " sheet: " + e.toString());
  }
}

/**
 * Checks for and creates the SALESPEOPLE sheet if missing.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - The active spreadsheet
 * @param {Object} results - Results object to track created/existing sheets
 */
function checkAndCreateSalespeopleSheet(ss, results) {
  const sheetName = "SALESPEOPLE";
  try {
    let sheet = ss.getSheetByName(sheetName);
    
    if (sheet) {
      results.existed.push(sheetName);
      Logger.log(sheetName + " sheet already exists.");
      return;
    }
    
    // Create the sheet
    sheet = ss.insertSheet(sheetName);
    Logger.log("Creating " + sheetName + " sheet...");
    
    // Set up headers (Row 1)
    const headers = [
      ["Full Name", "Aliases", "Preferred Display Code"]
    ];
    sheet.getRange(1, 1, 1, 3).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 3)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Add example data to help users understand the format
    const exampleData = [
      ["John Smith", "JS, Johnny", "JS"],
      ["Jane Doe", "JD, Jane", "JD"],
      ["Bob Wilson", "BW, Bob, Wilson", "BW"]
    ];
    sheet.getRange(2, 1, 3, 3).setValues(exampleData);
    
    // Set column widths for better display
    sheet.setColumnWidth(1, 150); // Full Name
    sheet.setColumnWidth(2, 200); // Aliases
    sheet.setColumnWidth(3, 180); // Preferred Display Code
    
    results.created.push(sheetName);
    Logger.log(sheetName + " sheet created successfully.");
    
  } catch (e) {
    const error = sheetName + ": " + e.message;
    results.errors.push(error);
    Logger.log("Error creating " + sheetName + " sheet: " + e.toString());
  }
}

/**
 * Checks for and creates the DEPOSITS sheet if missing.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - The active spreadsheet
 * @param {Object} results - Results object to track created/existing sheets
 */
function checkAndCreateDepositsSheet(ss, results) {
  const sheetName = "DEPOSITS";
  try {
    let sheet = ss.getSheetByName(sheetName);
    
    if (sheet) {
      results.existed.push(sheetName);
      Logger.log(sheetName + " sheet already exists.");
      return;
    }
    
    // Create the sheet
    sheet = ss.insertSheet(sheetName);
    Logger.log("Creating " + sheetName + " sheet...");
    
    // Set up headers (Row 1)
    const headers = [
      ["Date", "Customer", "Amount", "Type", "Notes", "Salesperson", "Stock Number"]
    ];
    sheet.getRange(1, 1, 1, 7).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 7)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set column widths for better display
    sheet.setColumnWidth(1, 100);  // Date
    sheet.setColumnWidth(2, 150);  // Customer
    sheet.setColumnWidth(3, 100);  // Amount
    sheet.setColumnWidth(4, 100);  // Type
    sheet.setColumnWidth(5, 200);  // Notes
    sheet.setColumnWidth(6, 120);  // Salesperson
    sheet.setColumnWidth(7, 120);  // Stock Number (critical for TODAY sheet CF)
    
    results.created.push(sheetName);
    Logger.log(sheetName + " sheet created successfully.");
    
  } catch (e) {
    const error = sheetName + ": " + e.message;
    results.errors.push(error);
    Logger.log("Error creating " + sheetName + " sheet: " + e.toString());
  }
}

/**
 * Shows a summary dialog to the user with setup results.
 * @param {Object} results - Results object containing existed, created, and errors arrays
 */
function showSetupSummary(results) {
  const ui = SpreadsheetApp.getUi();
  let message = "";
  
  // Build summary message
  if (results.created.length === 0 && results.errors.length === 0) {
    message = "All required sheets already exist:\n\n";
    message += results.existed.map(name => "✓ " + name).join("\n");
    message += "\n\nNo setup needed. Your spreadsheet is ready to use!";
    
    ui.alert("Setup Complete", message, ui.ButtonSet.OK);
    return;
  }
  
  if (results.created.length > 0) {
    message += "SHEETS CREATED:\n";
    message += results.created.map(name => "✓ " + name).join("\n");
    message += "\n\n";
  }
  
  if (results.existed.length > 0) {
    message += "SHEETS ALREADY EXISTED:\n";
    message += results.existed.map(name => "• " + name).join("\n");
    message += "\n\n";
  }
  
  if (results.errors.length > 0) {
    message += "ERRORS ENCOUNTERED:\n";
    message += results.errors.map(error => "✗ " + error).join("\n");
    message += "\n\n";
  }
  
  if (results.errors.length > 0) {
    message += "Some sheets could not be created. Please check the errors above.";
    ui.alert("Setup Completed with Errors", message, ui.ButtonSet.OK);
  } else {
    message += "Setup complete! Your sales log spreadsheet is ready to use.";
    ui.alert("Setup Successful", message, ui.ButtonSet.OK);
  }
}