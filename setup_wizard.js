/**
 * Sales Log Setup Wizard
 * Automatically configures the spreadsheet for first-time use
 */

// Configuration constants
const SETUP_CONFIG = {
  version: '7.9.7',
  productName: 'Sales Log Pro',
  requiredSheets: ['TODAY', 'MONTHLY', 'SALESPEOPLE', 'DEPOSITS', 'LEADERBOARD'],
  setupPropertyKey: 'SALES_LOG_SETUP_COMPLETE'
};

/**
 * Runs on spreadsheet installation
 */
function onInstall(e) {
  onOpen(e);
  // Show welcome dialog after a brief delay
  SpreadsheetApp.getActiveSpreadsheet().toast(
    'Welcome! Click "Sales Tools > Run Setup Wizard" to get started.',
    'Setup Required',
    10
  );
}

/**
 * Main setup wizard entry point
 */
function runSetupWizard() {
  const ui = SpreadsheetApp.getUi();

  // Check if already set up
  const props = PropertiesService.getDocumentProperties();
  const isSetup = props.getProperty(SETUP_CONFIG.setupPropertyKey);

  if (isSetup === 'true') {
    const response = ui.alert(
      'Setup Already Complete',
      'This spreadsheet has already been configured. Do you want to run setup again? This will overwrite existing sheets.',
      ui.ButtonSet.YES_NO
    );

    if (response !== ui.Button.YES) {
      return;
    }
  }

  // Show welcome dialog
  const welcomeResponse = ui.alert(
    '🎉 Welcome to ' + SETUP_CONFIG.productName,
    'This wizard will set up your sales tracking system in 3 easy steps:\n\n' +
    '1. Create required sheets\n' +
    '2. Configure your sales team\n' +
    '3. Set up formatting and rules\n\n' +
    'Ready to begin?',
    ui.ButtonSet.YES_NO
  );

  if (welcomeResponse !== ui.Button.YES) {
    return;
  }

  try {
    // Step 1: Create sheets
    showProgress('Creating sheets...');
    createRequiredSheets();

    // Step 2: Get salesperson info
    const salespeople = collectSalespeopleInfo();
    if (!salespeople) {
      ui.alert('Setup Cancelled', 'Setup was cancelled. You can run it again from the Sales Tools menu.', ui.ButtonSet.OK);
      return;
    }

    // Step 3: Configure sheets
    showProgress('Configuring sheets...');
    configureTodaySheet();
    configureMonthlySheet();
    configureSalespeopleSheet(salespeople);
    configureDepositsSheet();
    configureLeaderboardSheet(salespeople);

    // Step 4: Set up example data
    showProgress('Adding example data...');
    addExampleData();

    // Mark setup as complete
    props.setProperty(SETUP_CONFIG.setupPropertyKey, 'true');
    props.setProperty('SETUP_DATE', new Date().toISOString());
    props.setProperty('SETUP_VERSION', SETUP_CONFIG.version);

    // Success message
    ui.alert(
      '✅ Setup Complete!',
      'Your sales log is ready to use!\n\n' +
      '📋 Next Steps:\n' +
      '1. Review the TODAY sheet - this is where you enter daily sales\n' +
      '2. Check the LEADERBOARD sheet to see your team\n' +
      '3. Use "Log Yesterday\'s Sales" from the menu when ready\n\n' +
      '💡 Tip: The TODAY sheet has example data you can clear when ready.',
      ui.ButtonSet.OK
    );

    // Navigate to TODAY sheet
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TODAY').activate();

  } catch (error) {
    ui.alert('Setup Error', 'An error occurred during setup: ' + error.message, ui.ButtonSet.OK);
    Logger.log('Setup error: ' + error);
  }
}

/**
 * Creates all required sheets
 */
function createRequiredSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  SETUP_CONFIG.requiredSheets.forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);

    if (sheet) {
      // Clear existing sheet
      sheet.clear();
      sheet.clearFormats();
    } else {
      // Create new sheet
      sheet = ss.insertSheet(sheetName);
    }
  });

  // Delete default "Sheet1" if it exists and is empty
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getMaxRows() === 1000 && sheet1.getLastRow() === 0) {
    ss.deleteSheet(sheet1);
  }
}

/**
 * Collects salesperson information from user
 */
function collectSalespeopleInfo() {
  const ui = SpreadsheetApp.getUi();

  // Ask for number of salespeople
  const countResponse = ui.prompt(
    'Sales Team Setup',
    'How many salespeople are on your team? (Enter a number 1-20)',
    ui.ButtonSet.OK_CANCEL
  );

  if (countResponse.getSelectedButton() !== ui.Button.OK) {
    return null;
  }

  const count = parseInt(countResponse.getResponseText());

  if (isNaN(count) || count < 1 || count > 20) {
    ui.alert('Invalid Input', 'Please enter a number between 1 and 20.', ui.ButtonSet.OK);
    return null;
  }

  const salespeople = [];

  // Collect info for each salesperson
  for (let i = 1; i <= count; i++) {
    const nameResponse = ui.prompt(
      `Salesperson ${i} of ${count}`,
      'Enter full name (e.g., "John Smith"):',
      ui.ButtonSet.OK_CANCEL
    );

    if (nameResponse.getSelectedButton() !== ui.Button.OK) {
      return null;
    }

    const fullName = nameResponse.getResponseText().trim();

    if (!fullName) {
      ui.alert('Invalid Input', 'Name cannot be empty.', ui.ButtonSet.OK);
      i--; // Retry this person
      continue;
    }

    // Auto-generate display code (initials)
    const nameParts = fullName.split(' ');
    const displayCode = nameParts.map(part => part.charAt(0).toUpperCase()).join('');

    // Ask for aliases
    const aliasResponse = ui.prompt(
      `Aliases for ${fullName}`,
      `Enter common aliases/nicknames (comma-separated).\nExample: "John, JS, Johnny"\n\nLeave blank to use: ${nameParts[0]}, ${displayCode}`,
      ui.ButtonSet.OK_CANCEL
    );

    if (aliasResponse.getSelectedButton() !== ui.Button.OK) {
      return null;
    }

    let aliases = aliasResponse.getResponseText().trim();

    // Use defaults if blank
    if (!aliases) {
      aliases = `${nameParts[0]}, ${displayCode}`;
    }

    salespeople.push({
      fullName: fullName,
      aliases: aliases,
      displayCode: displayCode
    });
  }

  return salespeople;
}

/**
 * Configures the TODAY sheet
 */
function configureTodaySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('TODAY');

  // Set up headers
  const headers = [
    '#', 'Date', 'New FI', 'New Stock', 'New Sale', 'New Gross',
    'Trade', 'Trade ACV', 'Trade Gross', 'Used FI', 'Used Stock',
    'Used Sale', 'Used Gross', 'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#4a86e8')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Set column widths
  const widths = [50, 80, 60, 100, 100, 100, 100, 100, 100, 60, 100, 100, 100, 200];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Add data validation for FI columns (C and J)
  const fiRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                         'U', 'V', 'W', 'X', 'Y', 'Z'], true)
    .setAllowInvalid(true)
    .build();

  sheet.getRange('C2:C51').setDataValidation(fiRule);
  sheet.getRange('J2:J51').setDataValidation(fiRule);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Add gridlines
  sheet.getRange('A2:N51').setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);
}

/**
 * Configures the MONTHLY sheet
 */
function configureMonthlySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MONTHLY');

  // Set up headers (same as TODAY)
  const headers = [
    '#', 'Date', 'New FI', 'New Stock', 'New Sale', 'New Gross',
    'Trade', 'Trade ACV', 'Trade Gross', 'Used FI', 'Used Stock',
    'Used Sale', 'Used Gross', 'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#6aa84f')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Set column widths (same as TODAY)
  const widths = [50, 80, 60, 100, 100, 100, 100, 100, 100, 60, 100, 100, 100, 200];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Configures the SALESPEOPLE sheet
 */
function configureSalespeopleSheet(salespeople) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SALESPEOPLE');

  // Set up headers
  const headers = ['Full Name', 'Aliases', 'Display Code'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#e69138')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Add salesperson data
  const data = salespeople.map(sp => [sp.fullName, sp.aliases, sp.displayCode]);
  sheet.getRange(2, 1, data.length, 3).setValues(data);

  // Set column widths
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 100);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Add border
  sheet.getRange(1, 1, data.length + 1, 3)
    .setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);
}

/**
 * Configures the DEPOSITS sheet
 */
function configureDepositsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('DEPOSITS');

  // Set up headers
  const headers = ['Stock Number', 'Customer', 'Deposit Amount', 'Date'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#8e7cc3')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Set column widths
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 100);

  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Configures the LEADERBOARD sheet
 */
function configureLeaderboardSheet(salespeople) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('LEADERBOARD');

  // Set up headers
  const headers = ['Rank', 'Salesperson', 'MTD', 'Average', 'Pace', 'Status'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#cc0000')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setFontSize(12);

  // Add salesperson rows
  const data = salespeople.map((sp, i) => [
    i + 1,
    sp.displayCode,
    0,
    0,
    0,
    '—'
  ]);

  sheet.getRange(2, 1, data.length, 6).setValues(data);

  // Set column widths
  sheet.setColumnWidth(1, 60);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 80);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 80);
  sheet.setColumnWidth(6, 120);

  // Center align numbers
  sheet.getRange(2, 1, data.length, 6).setHorizontalAlignment('center');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Add alternating row colors
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      sheet.getRange(i + 2, 1, 1, 6).setBackground('#f3f3f3');
    }
  }
}

/**
 * Adds example data to TODAY sheet
 */
function addExampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('TODAY');
  const salespeople = ss.getSheetByName('SALESPEOPLE').getRange('C2:C').getValues().flat().filter(String);

  if (salespeople.length === 0) return;

  // Add a few example rows
  const today = new Date();
  const dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'MM/dd');

  const exampleData = [
    [1, dateStr, 'A', 'ABC123', salespeople[0] || 'SP1', 2500, '', '', '', '', '', '', '', 'Example sale'],
    [2, dateStr, 'A', 'XYZ789', salespeople[0] || 'SP1', 3200, 'TRADE1', 5000, 1000, '', '', '', '', 'New with trade'],
    [3, dateStr, '', 'DEF456', salespeople[1] || 'SP2', 2800, '', '', '', 'A', 'USED1', salespeople[1] || 'SP2', 1500, 'Used sale']
  ];

  sheet.getRange(2, 1, exampleData.length, 14).setValues(exampleData);

  // Add note about example data
  sheet.getRange('A52').setValue('⬆️ Example data above - clear when ready to use');
  sheet.getRange('A52').setFontStyle('italic').setFontColor('#666666');
}

/**
 * Shows a progress toast
 */
function showProgress(message) {
  SpreadsheetApp.getActiveSpreadsheet().toast(message, 'Setup in Progress...', 3);
  Utilities.sleep(500); // Brief pause for user experience
}

/**
 * Adds setup wizard to menu
 */
function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Sales Tools');

  // Check if setup is complete
  const props = PropertiesService.getDocumentProperties();
  const isSetup = props.getProperty(SETUP_CONFIG.setupPropertyKey);

  if (isSetup !== 'true') {
    menu.addItem('▶️ Run Setup Wizard', 'runSetupWizard')
        .addSeparator();
  }

  menu.addItem('Log Yesterday\'s Sales', 'processDaily')
      .addItem('Recalculate MTD & Check Errors', 'recalcMtdFromMonthly')
      .addItem('Start New Month (Rollover)', 'rolloverMonth')
      .addSeparator()
      .addItem('⚙️ Run Setup Again', 'runSetupWizard')
      .addToUi();
}
