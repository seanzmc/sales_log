# Script Architecture: Daily Sales Automation

## Overview
Description: Automate Google Sheets 'board' daily sales log. Manual trigger function to copy daily sales to the monthly tab, tally totals, and clear the 'today' sheet.

## Sheets and Structure
- **today** sheet: holds daily sales data.
- **monthly** sheet: accumulates all daily entries.

## Components
1. **Main Function**: `transferDailySales()`
2. **Helper Functions**:
   - `copySalesData(data, monthlySheet)`
   - `tallySalesTotals(monthlySheet)`
   - `clearTodaySheet(todaySheet)`

## Data Flow
1. User invokes manual trigger via custom menu.
2. `transferDailySales()` reads all rows from the **today** sheet.
3. Appends data rows to the **monthly** sheet.
4. Recalculates totals as needed.
5. Clears the **today** sheet to reset for the next day.

## Triggers and Deployment
- Deploy as a container-bound Apps Script.
- Add a custom menu on spreadsheet open:
```js
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Sales Log')
    .addItem('Run Automation', 'transferDailySales')
    .addToUi();
}
```

## Error Handling
- Verify **today** sheet is not empty before proceeding.
- Wrap operations in try/catch and log errors to the console.

## Pseudocode Example
```js
function transferDailySales() {
  const ss = SpreadsheetApp.getActive();
  const todaySheet = ss.getSheetByName('today');
  const monthlySheet = ss.getSheetByName('monthly');
  const data = todaySheet.getDataRange().getValues();
  if (data.length <= 1) return;
  copySalesData(data, monthlySheet);
  tallySalesTotals(monthlySheet);
  clearTodaySheet(todaySheet);
}
```

*End of specification*
