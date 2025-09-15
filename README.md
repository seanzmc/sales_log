# sales_log_7.9.7.js

## Title and Overview

`sales_log_7.9.7.js` is a performance-optimized Google Apps Script (GAS) designed for sales logging in version 7. It provides a robust system for managing daily sales data, with features for flexible salesperson input, automated monthly aggregation, conditional formatting, and error handling.

### Main Capabilities

- **Daily Sales Processing**: Logs active rows from the TODAY sheet to the MONTHLY sheet, generates sequential numbering in Column A, and processes sales based on FI (Finance Indicator) rules.
- **Salesperson Management**: Supports an alias system for flexible name/code input, mapping to full names and display codes.
- **Conditional Formatting**: Applies rules to highlight non-delivered deals, duplicates, deposits, and leaderboard pace indicators.
- **Monthly Recalculation**: Recalculates Month-to-Date (MTD) sales from the MONTHLY sheet, checks formats, and fixes errors.
- **Month Rollover**: Archives the current MONTHLY sheet, clears data for a new month, recalculates averages, and resets MTD.
- **UI Integration**: Provides a custom menu in Google Sheets for easy access to functions.

### Key Features in v7.9.7

- **Alias System**: Flexible handling of salesperson names/codes via a configurable SALESPEOPLE sheet.
- **FI Processing**: Processes sales based on single-letter FI flags (e.g., A-Z for delivered).
- **Formatting Enhancements**: Preserves trade column backgrounds, carries over font colors, clears non-delivered highlights when FI is fixed.
- **Font Color Handling**: Resets and transfers font colors between TODAY and MONTHLY sheets.
- **Clear Non-Delivered on Fix**: Automatically removes red highlights when non-delivered deals are corrected.
- **Cleaned Logs**: Improved logging for better error tracking and performance.
- **Add Today Sheet CF Rules**: New conditional formatting for duplicates and deposits on TODAY sheet.
- **Preserve Trade BG on Non-Delivered**: Maintains original backgrounds in trade columns even when highlighting non-delivered deals.
- **Fix Monthly Col A**: Ensures proper sequencing in monthly logs.
- **Fix Error Clear**: Improved error clearing mechanisms.
- **Log Sat on Mon**: Handles Saturday logging on Mondays.
- **Fix totalErrorsFound Scope**: Resolved scoping issues for error tracking.

## Functions Section

Below is a comprehensive list of all functions in `sales_log_7.9.7.js`, including descriptions, parameters, returns, and notes.

- [`getSheets()`](7.9.7.js:46)
  Retrieves references to key sheets: TODAY, MONTHLY, and SALESPEOPLE.
  **Parameters**: None.
  **Returns**: Object with sheet references `{today, monthly, sales}`.
  **Throws**: Error if required sheets are missing.
  **Notes**: Uses cached SpreadsheetApp.getActive() reference.

- [`memoizedGetSellingDays(year, month)`](7.9.7.js:70)
  Returns cached or computed selling days elapsed and total for a given month/year.
  **Parameters**: `year` (number) - Full year; `month` (number) - Zero-based month index (0-11).
  **Returns**: Object `{daysElapsed: number, totalDays: number}`.
  **Notes**: Excludes Sundays; caches results for performance.

- [`getSalespersonMaps()`](7.9.7.js:102)
  Builds and caches maps for salesperson aliases and display codes from SALESPEOPLE sheet.
  **Parameters**: None.
  **Returns**: Object `{aliasMap: {[alias: string]: string}, displayCodeMap: {[fullName: string]: string}}`.
  **Notes**: Assumes SALESPEOPLE structure: Col A Full Name, Col B Aliases, Col C Display Code.

- [`roundHalf(v)`](7.9.7.js:155)
  Rounds a number to the nearest 0.5.
  **Parameters**: `v` (number) - Value to round.
  **Returns**: Number rounded to half.
  **Notes**: Utility for averaging calculations.

- [`formatDateOffset(offsetDays)`](7.9.7.js:159)
  Formats a date string with offset for logging (handles Saturday logging on Monday).
  **Parameters**: `offsetDays` (number, default 1) - Days to subtract.
  **Returns**: String in MM/DD format.
  **Notes**: Adjusts for weekends.

- [`filterTrafficLightRules(rules)`](7.9.7.js:170)
  Filters conditional formatting rules to keep non-script-managed ones.
  **Parameters**: `rules` - Array of conditional format rules.
  **Returns**: Filtered array.
  **Notes**: Preserves user-defined rules.

- [`setCFRulesSheet(sheet, rules)`](7.9.7.js:182)
  Applies conditional formatting rules to a sheet.
  **Parameters**: `sheet` - Sheet object; `rules` - Array of rules.
  **Returns**: None.
  **Notes**: Wrapper for setConditionalFormatRules.

- [`withScriptLock(fn)`](7.9.7.js:185)
  Executes a function with script lock to prevent concurrent runs.
  **Parameters**: `fn` - Function to execute.
  **Returns**: Result of fn.
  **Throws**: Error if lock not acquired.
  **Notes**: Uses LockService.getScriptLock().

- [`toastInfo(msg, title)`](7.9.7.js:206)
  Shows a toast notification or logs if UI unavailable.
  **Parameters**: `msg` (string); `title` (string).
  **Returns**: None.
  **Notes**: Uses SpreadsheetApp.SS.toast().

- [`showCustomAlert(title, msg)`](7.9.7.js:210)
  Shows a custom alert dialog.
  **Parameters**: `title` (string); `msg` (string).
  **Returns**: None.
  **Notes**: Uses SpreadsheetApp.getUi().alert().

- [`alertError(msg, title)`](7.9.7.js:217)
  Shows an error alert.
  **Parameters**: `msg` (string); `title` (string, default "Error").
  **Returns**: None.
  **Notes**: Wrapper for showCustomAlert.

- [`tallyCounts(rows, aliasMap, sides)`](7.9.7.js:222)
  Tallys salesperson sales counts from rows based on FI and sides.
  **Parameters**: `rows` - 2D array; `aliasMap` - Alias mapping; `sides` - Array of {fiIdx, saleIdx}.
  **Returns**: Object `{counts: {[name: string]: number}, unknownInputs: string[]}`.
  **Notes**: Handles split sales (e.g., "John/Doe").

- [`summarizeRows(rows)`](7.9.7.js:249)
  Summarizes row data for new/used/trade counts.
  **Parameters**: `rows` - 2D array.
  **Returns**: Object `{newCount, usedCount, tradeCount}`.
  **Notes**: Checks FI and content presence.

- [`applyMonthlyRowFormatting(sheet, rowsData, startSheetRow, aliasMap)`](7.9.7.js:309)
  Applies formatting to MONTHLY rows: highlights non-delivered, salesperson errors.
  **Parameters**: `sheet` - Sheet object; `rowsData` - 2D array; `startSheetRow` - Starting row; `aliasMap` - Alias mapping.
  **Returns**: Array of error row numbers.
  **Notes**: Preserves trade backgrounds; clears highlights when fixed.

- [`processDaily()`](7.9.7.js:442)
  Main function to process daily sales: logs to MONTHLY, updates leaderboard, reapplies CF.
  **Parameters**: None.
  **Returns**: None.
  **Notes**: Skips on Sundays; uses script lock.

- [`reapplyCF()`](7.9.7.js:583)
  Reapplies conditional formatting rules for leaderboard pace and data validation.
  **Parameters**: None.
  **Returns**: None.
  **Notes**: Handles zero MTD with blue background.

- [`recalcMtdFromMonthly()`](7.9.7.js:716)
  Recalculates MTD from MONTHLY data, checks formats, updates leaderboard.
  **Parameters**: None.
  **Returns**: None.
  **Notes**: Applies formatting fixes.

- [`rolloverMonth()`](7.9.7.js:803)
  Performs month rollover: archives MONTHLY, clears data, recalculates averages.
  **Parameters**: None.
  **Returns**: None.
  **Notes**: Requires user confirmation.

- [`onOpen()`](7.9.7.js:919)
  Creates custom menu on spreadsheet open.
  **Parameters**: None.
  **Returns**: None.
  **Notes**: Adds "Sales Tools" menu with items.

## Features Section

### Alias System

The script supports a flexible alias system for salesperson input. Users can enter names, codes, or aliases in sales fields. The system maps these to full names and display codes via the SALESPEOPLE sheet (Col A: Full Name, Col B: Comma-separated aliases, Col C: Display Code). This allows for variations like "John" mapping to "John Doe" with code "JD".

### FI Processing

Sales are processed based on FI (Finance Indicator) flags in Columns C and J. Only single letters (A-Z) indicate delivered deals. Non-delivered deals (with data but no valid FI) are highlighted in red on MONTHLY, preserving trade column backgrounds.

### Formatting and Highlighting

- **Non-Delivered Deals**: Red highlight on MONTHLY for deals with data but invalid FI.
- **Salesperson Errors**: Light red highlight for delivered deals with invalid salesperson codes.
- **Duplicates/Deposits**: Yellow/green highlights on TODAY for stock duplicates or deposits from DEPOSITS sheet.
- **Leaderboard Pace**: Color-coded pace indicators (green >=10, yellow 8-10, red <8) or blue if all MTD zero.
- **Font Color Carryover**: Font colors from TODAY are preserved and applied to MONTHLY.

### Performance Optimizations

- Caching for salesperson maps and selling days.
- Script lock to prevent concurrent executions.
- Batched operations for efficiency.

## Usage Examples Section

### Menu Usage

Upon opening the spreadsheet, the script creates a "Sales Tools" menu:

- **Log Yesterday's Sales**: Runs [`processDaily()`](7.9.7.js:442) to log TODAY data to MONTHLY.
- **Recalculate MTD & Check Monthly Errors/Formats**: Runs [`recalcMtdFromMonthly()`](7.9.7.js:716).
- **Start New Month (Rollover)**: Runs [`rolloverMonth()`](7.9.7.js:803).

### Workflows

1. **Daily Logging**: Enter sales data on TODAY sheet. Click "Log Yesterday's Sales" to process and log to MONTHLY.
2. **Error Correction**: Fix FI or salesperson codes; rerun recalc to clear highlights.
3. **Month End**: Use "Start New Month" to archive and reset.

### Code Snippets

To manually process daily (e.g., in script editor):

```javascript
processDaily();
```

To recalculate MTD:

```javascript
recalcMtdFromMonthly();
```

Custom date formatting:

```javascript
const dateStr = formatDateOffset(1); // Yesterday or Saturday on Monday
```

## Installation and Requirements Section

### GAS Deployment

1. Create a new Google Apps Script project or open an existing one.
2. Copy the entire `7.9.7.js` content into the script file.
3. Save and deploy as a web app or bound script.

### Required Sheets

Ensure the spreadsheet has these sheets with exact names:

- **TODAY**: For daily input (A2:N51 range for data).
- **MONTHLY**: For aggregated logs.
- **SALESPEOPLE**: For alias mapping (A1: Full Name, B1: Aliases, C1: Display Code).
- (Optional) **DEPOSITS**: For deposit checks (referenced in CF rules).

### Prerequisites

- Google Workspace account with Apps Script access.
- Spreadsheet with sufficient columns (at least N).
- SALESPEOPLE sheet populated with data.

## Configuration Options Section

### Constants

- **RANGES**: Defines sheet ranges (e.g., `dailyData: "A2:N51"`). Customize for different layouts.
- **Colors**: `NON_DELIVERED_DEAL_COLOR` (red), `SALESPERSON_CODE_ERROR_COLOR` (light red), etc. Change hex values for customization.
- **Cache Settings**: `CACHE_KEY_NAME_MAP` for cache key; adjust timeout in `getSalespersonMaps()`.

### How to Customize

- **Ranges**: Modify `RANGES` object for different row/column counts.
- **Colors**: Update color constants (e.g., `NON_DELIVERED_DEAL_COLOR = "#FF0000"`).
- **Pace Thresholds**: In [`reapplyCF()`](7.9.7.js:583), adjust pace formulas (>=10 green, etc.).
- **Selling Days**: [`memoizedGetSellingDays()`](7.9.7.js:70) excludes Sundays; modify for custom exclusions.

## API Endpoints/Interactions Section

The script interacts with Google Sheets API via SpreadsheetApp:

- **getActive()**: Gets active spreadsheet.
- **getSheetByName()**: Retrieves sheets by name.
- **getRange()**: Accesses cell ranges for reading/writing values, formats, CF rules.
- **setConditionalFormatRules()**: Applies CF rules.
- **getUi()**: For alerts and menus.
- **LockService**: Prevents concurrent runs.
- **CacheService**: Caches data for performance.
- **Logger**: Logs errors and info.

## Known Limitations and FAQs Section

### Limitations

- Skips execution on Sundays to avoid logging issues.
- Requires exact sheet names; case-sensitive.
- CF rules may conflict with user-defined ones (filtered to preserve).
- Font color carryover only from TODAY to MONTHLY during processDaily.
- Archive naming assumes MM/YY format; may conflict if manual sheets exist.

### FAQs

**Q: Why does the script skip on Sundays?**
A: To prevent logging weekend data incorrectly. Modify [`processDaily()`](7.9.7.js:442) if needed.

**Q: How to handle unknown salesperson inputs?**
A: Add to SALESPEOPLE sheet or aliases. Unknowns are logged in alerts.

**Q: CF not applying?**
A: Ensure TODAY sheet range matches `RANGES.todayNewCarDataRange` etc. Check for permission issues.

**Q: Errors in recalc?**
A: Verify MONTHLY has at least 14 columns (A:N). Check SALESPEOPLE data format.

**Q: How to change pace colors?**
A: Update pace formulas in [`reapplyCF()`](7.9.7.js:583), e.g., change `>=10` to different thresholds.

**Q: Script lock issues?**
A: Wait for previous run to complete or increase lock timeout (default 30s).

**Q: Font colors not carrying over?**
A: Ensure TODAY clear range is reset properly in [`processDaily()`](7.9.7.js:442).
