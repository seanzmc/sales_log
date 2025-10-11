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
    
    // Prompt for customization
    const customizationSettings = promptForCustomization(ss);
    if (customizationSettings) {
      // Store in properties for use by sheet creation functions
      PropertiesService.getDocumentProperties().setProperty(
        'SETUP_CUSTOMIZATION',
        JSON.stringify(customizationSettings)
      );
    }
    
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
 * Prompts user for customization settings through a sequence of modal dialogs.
 * Allows configuration of header colors and fonts for the setup wizard.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - The active spreadsheet
 * @returns {Object|null} Customization settings object or null if user skips
 */
function promptForCustomization(ss) {
  const ui = SpreadsheetApp.getUi();
  
  try {
    // Step 1: Ask if user wants to customize
    const customizeResponse = ui.alert(
      'Customize Sheet Formatting',
      'Would you like to customize header colors and fonts?\n\n(You can skip and use default formatting)',
      ui.ButtonSet.YES_NO
    );
    
    if (customizeResponse !== ui.Button.YES) {
      Logger.log('User chose to skip customization');
      return null;
    }
    
    // Step 2: NewCar background color
    let newCarBgColor = '#234070'; // Default
    let newCarTextColor = '#FFFFFF';
    
    while (true) {
      const newCarColorResponse = ui.prompt(
        'New Car Header Color',
        'Enter background color for New Car headers (A:G) in hex format (e.g., #234070)\n\nLeave blank to use default (#234070)',
        ui.ButtonSet.OK_CANCEL
      );
      
      if (newCarColorResponse.getSelectedButton() === ui.Button.CANCEL) {
        // Use default
        break;
      }
      
      const inputColor = newCarColorResponse.getResponseText().trim();
      
      if (!inputColor) {
        // Blank - use default
        break;
      }
      
      // Validate hex format
      if (!validateColor(inputColor)) {
        ui.alert(
          'Invalid Color Format',
          'Please enter a valid hex color (e.g., #234070 or #FF5733)',
          ui.ButtonSet.OK
        );
        continue; // Re-prompt
      }
      
      // Calculate WCAG compliant text color
      newCarBgColor = inputColor;
      newCarTextColor = getWcagCompliantTextColor(inputColor);
      
      // Show confirmation
      const confirmResponse = ui.alert(
        'Confirm New Car Colors',
        'New Car headers will use:\n• Background: ' + newCarBgColor + '\n• Text: ' + newCarTextColor + '\n\nContinue?',
        ui.ButtonSet.YES_NO
      );
      
      if (confirmResponse === ui.Button.YES) {
        break;
      }
      // If NO, loop back to re-prompt
    }
    
    // Step 3: UsedCar background color
    let usedCarBgColor = '#424242'; // Default
    let usedCarTextColor = '#FFFFFF';
    
    while (true) {
      const usedCarColorResponse = ui.prompt(
        'Used Car Header Color',
        'Enter background color for Used Car headers (I:N) in hex format (e.g., #424242)\n\nLeave blank to use default (#424242)',
        ui.ButtonSet.OK_CANCEL
      );
      
      if (usedCarColorResponse.getSelectedButton() === ui.Button.CANCEL) {
        // Use default
        break;
      }
      
      const inputColor = usedCarColorResponse.getResponseText().trim();
      
      if (!inputColor) {
        // Blank - use default
        break;
      }
      
      // Validate hex format
      if (!validateColor(inputColor)) {
        ui.alert(
          'Invalid Color Format',
          'Please enter a valid hex color (e.g., #424242 or #FF5733)',
          ui.ButtonSet.OK
        );
        continue; // Re-prompt
      }
      
      // Calculate WCAG compliant text color
      usedCarBgColor = inputColor;
      usedCarTextColor = getWcagCompliantTextColor(inputColor);
      
      // Show confirmation
      const confirmResponse = ui.alert(
        'Confirm Used Car Colors',
        'Used Car headers will use:\n• Background: ' + usedCarBgColor + '\n• Text: ' + usedCarTextColor + '\n\nContinue?',
        ui.ButtonSet.YES_NO
      );
      
      if (confirmResponse === ui.Button.YES) {
        break;
      }
      // If NO, loop back to re-prompt
    }
    
    // Step 4: Font selection
    let headerFont = 'Calibri'; // Default
    
    const fontResponse = ui.prompt(
      'Font Selection',
      'Choose font style:\n1 = Calibri (default)\n2 = Arial\n3 = Times New Roman\n4 = Courier New\n\nEnter 1-4 or leave blank for default',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (fontResponse.getSelectedButton() === ui.Button.OK) {
      const fontChoice = fontResponse.getResponseText().trim();
      
      switch (fontChoice) {
        case '1':
          headerFont = 'Calibri';
          break;
        case '2':
          headerFont = 'Arial';
          break;
        case '3':
          headerFont = 'Times New Roman';
          break;
        case '4':
          headerFont = 'Courier New';
          break;
        default:
          // Invalid or blank - use default (Calibri)
          headerFont = 'Calibri';
      }
    }
    
    // Step 5: Leaderboard color (always default - no prompt)
    const leaderboardBgColor = '#434343';
    const leaderboardTextColor = '#FFFFFF';
    
    // Return customization settings object
    const settings = {
      headerNewCarBgColor: newCarBgColor,
      headerNewCarTextColor: newCarTextColor,
      headerUsedCarBgColor: usedCarBgColor,
      headerUsedCarTextColor: usedCarTextColor,
      headerLeaderboardBgColor: leaderboardBgColor,
      headerLeaderboardTextColor: leaderboardTextColor,
      headerFont: headerFont
    };
    
    Logger.log('Customization settings collected: ' + JSON.stringify(settings));
    return settings;
    
  } catch (e) {
    Logger.log('Error in promptForCustomization: ' + e.toString());
    // Return null to use defaults
    return null;
  }
}

/**
 * Checks for and creates the TODAY sheet if missing.
 * Per setupsheet_headers.md:
 * - Headers: [A:G] #, CUSTOMER, FI, MODEL, STOCK #, TRADE STK#, SALES PERSON
 *           [H] blank separator
 *           [I:N] CUSTOMER, FI, MODEL, STOCK #, TRADE STK#, SALES PERSON
 *           [O] blank separator
 *           [P:R] SALESPERSON, MTD SALES, 3mo. AVERAGE
 * - Font: Calibri, sizes: A:E,G,I:L,N=18pt, F&M=10pt, P:R=14pt
 * - Column widths as specified in documentation
 *
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
    
    // Set up headers (Row 1) - per setupsheet_headers.md
    // New car sales [A:G], separator [H], Used car sales [I:N], separator [O], Leaderboard [P:R]
    const headers = [
      [
        "#", "CUSTOMER", "FI", "MODEL", "STOCK #", "TRADE STK#", "SALES PERSON", // A:G
        "", // H - separator
        "CUSTOMER", "FI", "MODEL", "STOCK #", "TRADE STK#", "SALES PERSON", // I:N
        "", // O - separator
        "SALESPERSON", "MTD SALES", "3mo. AVERAGE" // P, Q, R
      ]
    ];
    sheet.getRange(1, 1, 1, 18).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 18)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set font to Calibri for entire sheet
    sheet.getRange("A:R").setFontFamily("Calibri");
    
    // Set font sizes per documentation
    // A:N = 18pt
    sheet.getRange("A:N").setFontSize(18);
    // F (TRADE STK# for new cars) = 10pt
    sheet.getRange("F:F").setFontSize(10);
    // M (TRADE STK# for used cars) = 10pt
    sheet.getRange("M:M").setFontSize(10);
    // P:R (Leaderboard) = 14pt
    sheet.getRange("P:R").setFontSize(14);
    
    // Set number formats for MTD and Avg columns
    sheet.getRange("P:P").setNumberFormat("0.#");
    sheet.getRange("R:R").setNumberFormat("0.#");
    
    // Set column widths per documentation
    sheet.setColumnWidth(1, 30);   // A: #
    sheet.setColumnWidth(2, 165);  // B: CUSTOMER
    sheet.setColumnWidth(3, 35);   // C: FI
    sheet.setColumnWidth(4, 150);  // D: MODEL
    sheet.setColumnWidth(5, 125);  // E: STOCK #
    sheet.setColumnWidth(6, 60);   // F: TRADE STK#
    sheet.setColumnWidth(7, 150);  // G: SALES PERSON
    sheet.setColumnWidth(8, 5);    // H: separator
    sheet.setColumnWidth(9, 165);  // I: CUSTOMER (used)
    sheet.setColumnWidth(10, 35);  // J: FI (used)
    sheet.setColumnWidth(11, 150); // K: MODEL (used)
    sheet.setColumnWidth(12, 125); // L: STOCK # (used)
    sheet.setColumnWidth(13, 60);  // M: TRADE STK# (used)
    sheet.setColumnWidth(14, 150); // N: SALES PERSON (used)
    sheet.setColumnWidth(15, 5);   // O: separator
    sheet.setColumnWidth(16, 170); // P: MTD SALES
    sheet.setColumnWidth(17, 50);  // Q: (middle column)
    sheet.setColumnWidth(18, 80);  // R: 3mo. AVERAGE
    
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
 * Updated for corrected column layout with FI column:
 * - New car STOCK # is column E
 * - Used car STOCK # is column L
 * - DEPOSITS STOCK # is column G
 *
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
    
    // Rule 1: Duplicate Stock Numbers (New Cars) - A2:G101
    // Stock # is in column E
    const newCarRange = sheet.getRange("A2:G101");
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=COUNTIF($E$2:$E$101,$E2)>1")
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([newCarRange])
        .build()
    );
    
    // Rule 2: Duplicate Stock Numbers (Used Cars) - I2:N101
    // Stock # is in column L
    const usedCarRange = sheet.getRange("I2:N101");
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied("=COUNTIF($L$2:$L$101,$L2)>1")
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([usedCarRange])
        .build()
    );
    
    // Rule 3: Stock in Deposits (New Cars) - A2:G101
    // Check if new car stock (column E) exists in DEPOSITS!G:G (STOCK # column)
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0')
        .setBackground(duplicateFillColor)
        .setFontColor(duplicateTextColor)
        .setRanges([newCarRange])
        .build()
    );
    
    // Rule 4: Stock in Deposits (Used Cars) - I2:N101
    // Check if used car stock (column L) exists in DEPOSITS!G:G (STOCK # column)
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
 * Per setupsheet_headers.md:
 * - Headers: [A:G] #, CUSTOMER, FI, MODEL, STOCK #, TRADE STK#, SALES PERSON
 *           [H] blank separator
 *           [I:N] CUSTOMER, FI, MODEL, STOCK #, TRADE STK#, SALES PERSON
 *           [O] blank separator
 *           [P:R] SALESPERSON, SALES, 3mo. AVERAGE
 *           [S:X] MONTHLY ANALYTICS (merged cells)
 * - Font: Calibri, entire sheet 10pt
 * - Column widths: A:45, B:115, C:45, D:100, E:70, F:90, G:125, etc.
 *
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
    
    // Set up headers (Row 1) - per setupsheet_headers.md
    // New car sales [A:G], separator [H], Used car sales [I:N], separator [O], Leaderboard [P:R], Analytics [S:X]
    const headers = [
      [
        "#", "CUSTOMER", "FI", "MODEL", "STOCK #", "TRADE STK#", "SALES PERSON", // A:G
        "", // H - separator
        "CUSTOMER", "FI", "MODEL", "STOCK #", "TRADE STK#", "SALES PERSON", // I:N
        "", // O - separator
        "SALESPERSON", "SALES", "3mo. AVERAGE", // P:R
        "MONTHLY ANALYTICS", "", "", "", "", "" // S:X (will be merged)
      ]
    ];
    sheet.getRange(1, 1, 1, 24).setValues(headers);
    
    // Merge cells for MONTHLY ANALYTICS header (S1:X1)
    sheet.getRange("S1:X1").merge();
    
    // Format header row
    sheet.getRange(1, 1, 1, 24)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set font to Calibri, 10pt for entire sheet
    sheet.getRange("A:X").setFontFamily("Calibri");
    sheet.getRange("A:X").setFontSize(10);
    
    // Set column widths per documentation
    sheet.setColumnWidth(1, 45);   // A: #
    sheet.setColumnWidth(2, 115);  // B: CUSTOMER
    sheet.setColumnWidth(3, 45);   // C: FI
    sheet.setColumnWidth(4, 100);  // D: MODEL
    sheet.setColumnWidth(5, 70);   // E: STOCK #
    sheet.setColumnWidth(6, 90);   // F: TRADE STK#
    sheet.setColumnWidth(7, 125);  // G: SALES PERSON
    sheet.setColumnWidth(8, 5);    // H: separator
    sheet.setColumnWidth(9, 115);  // I: CUSTOMER (used)
    sheet.setColumnWidth(10, 45);  // J: FI (used)
    sheet.setColumnWidth(11, 100); // K: MODEL (used)
    sheet.setColumnWidth(12, 70);  // L: STOCK # (used)
    sheet.setColumnWidth(13, 90);  // M: TRADE STK# (used)
    sheet.setColumnWidth(14, 125); // N: SALES PERSON (used)
    sheet.setColumnWidth(15, 5);   // O: separator
    sheet.setColumnWidth(16, 160); // P: MTD SALES
    sheet.setColumnWidth(17, 50);  // Q: (middle)
    sheet.setColumnWidth(18, 60);  // R: 3mo. AVERAGE
    sheet.setColumnWidth(19, 180); // S: MONTHLY ANALYTICS
    sheet.setColumnWidth(20, 140); // T: analytics column
    sheet.setColumnWidth(21, 120); // U: analytics column
    sheet.setColumnWidth(22, 100); // V: analytics column
    sheet.setColumnWidth(23, 100); // W: analytics column
    sheet.setColumnWidth(24, 100); // X: analytics column
    
    // Apply borders to first 51 rows for main data area
    sheet.getRange(1, 1, 51, 24)
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
 * Per setupsheet_headers.md:
 * - Headers: [A:C] FULL NAME, ALIASES, DISPLAY CODE
 * - Column widths: All 150
 * - Font: Calibri, 10pt (default)
 *
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
    
    // Set up headers (Row 1) - per setupsheet_headers.md (uppercase)
    const headers = [
      ["FULL NAME", "ALIASES", "DISPLAY CODE"]
    ];
    sheet.getRange(1, 1, 1, 3).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 3)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set font to Calibri, 10pt for entire sheet
    sheet.getRange("A:C").setFontFamily("Calibri");
    sheet.getRange("A:C").setFontSize(10);
    
    // Add example data to help users understand the format
    const exampleData = [
      ["John Smith", "JS, Johnny", "JS"],
      ["Jane Doe", "JD, Jane", "JD"],
      ["Bob Wilson", "BW, Bob, Wilson", "BW"]
    ];
    sheet.getRange(2, 1, 3, 3).setValues(exampleData);
    
    // Set column widths per documentation (all 150)
    sheet.setColumnWidth(1, 150); // FULL NAME
    sheet.setColumnWidth(2, 150); // ALIASES
    sheet.setColumnWidth(3, 150); // DISPLAY CODE
    
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
 * Per setupsheet_headers.md:
 * - Headers: [A:N] DATE, NEW/USED, YEAR, MAKE, MODEL, ORDER #, STOCK #,
 *                  SALESPERSON, BDC, CUSTOMER, DIRECTOR, PHONE #, EST DELIVERY DATE, NOTES
 * - Complete restructure from 7 to 14 columns
 * - Font: Calibri, 10pt (default)
 * - STOCK # column (G) is critical for TODAY sheet conditional formatting
 *
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
    
    // Set up headers (Row 1) - per setupsheet_headers.md
    // Complete restructure: 7 columns -> 14 columns (A:N)
    const headers = [
      [
        "DATE", "NEW/USED", "YEAR", "MAKE", "MODEL", "ORDER #", "STOCK #",
        "SALESPERSON", "BDC", "CUSTOMER", "DIRECTOR", "PHONE #", "EST DELIVERY DATE", "NOTES"
      ]
    ];
    sheet.getRange(1, 1, 1, 14).setValues(headers);
    
    // Format header row
    sheet.getRange(1, 1, 1, 14)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setBackground("#E0E0E0");
    
    // Set font to Calibri, 10pt for entire sheet
    sheet.getRange("A:N").setFontFamily("Calibri");
    sheet.getRange("A:N").setFontSize(10);
    
    // Set column widths for better display
    sheet.setColumnWidth(1, 100);  // A: DATE
    sheet.setColumnWidth(2, 80);   // B: NEW/USED
    sheet.setColumnWidth(3, 60);   // C: YEAR
    sheet.setColumnWidth(4, 120);  // D: MAKE
    sheet.setColumnWidth(5, 120);  // E: MODEL
    sheet.setColumnWidth(6, 100);  // F: ORDER #
    sheet.setColumnWidth(7, 120);  // G: STOCK # (critical for TODAY sheet CF)
    sheet.setColumnWidth(8, 120);  // H: SALESPERSON
    sheet.setColumnWidth(9, 100);  // I: BDC
    sheet.setColumnWidth(10, 150); // J: CUSTOMER
    sheet.setColumnWidth(11, 120); // K: DIRECTOR
    sheet.setColumnWidth(12, 120); // L: PHONE #
    sheet.setColumnWidth(13, 120); // M: EST DELIVERY DATE
    sheet.setColumnWidth(14, 200); // N: NOTES
    
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