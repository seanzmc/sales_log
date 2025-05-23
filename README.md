# sales_log_7.9.3.js

## Overview
Performance-optimized Google Apps Script for sales logging (v7.9.3). It handles salesperson alias management, logging daily sales to a monthly sheet, conditional formatting, and month rollover operations.

## Functions

### [`sales_log_7.9.3.js/getSheets()`](sales_log_7.9.3.js:43)
Retrieves references to the `TODAY`, `MONTHLY`, and `SALESPEOPLE` sheets.

**Parameters:** None  
**Returns:** Object mapping sheet keys to Sheet instances.

### [`sales_log_7.9.3.js/memoizedGetSellingDays()`](sales_log_7.9.3.js:67)
Returns cached or newly computed selling days elapsed and total for a given month/year.

**Parameters:**
- `year` (_number_): Full year (e.g., 2025).
- `month` (_number_): Zero-based month index (0–11).

**Returns:** Object `{ daysElapsed: number, totalDays: number }`.

### [`sales_log_7.9.3.js/getSalespersonMaps()`](sales_log_7.9.3.js:99)
Builds maps for salesperson aliases and display codes, caching the result.

**Parameters:** None  
**Returns:** Object with `aliasMap` and `displayCodeMap`.

### [`sales_log_7.9.3.js/roundHalf()`](sales_log_7.9.3.js:152)
Rounds a numeric value to the nearest half (0.5 increments).

**Parameters:**  
- `v` (_any_): Value to round.  

**Returns:** Rounded number.

### [`sales_log_7.9.3.js/formatDateOffset()`](sales_log_7.9.3.js:156)
Returns a date string offset by a specified number of days, adjusting for weekends.

**Parameters:**  
- `offsetDays` (_number_, default `1`): Days to subtract.  

**Returns:** Formatted date string `"M/D"`.

### [`sales_log_7.9.3.js/filterTrafficLightRules()`](sales_log_7.9.3.js:167)
Filters out old script-managed custom formula conditional format rules.

**Parameters:**  
- `rules` (_ConditionalFormatRule[]_): Array of existing rules.  

**Returns:** Filtered array of rules.

### [`sales_log_7.9.3.js/setCFRulesSheet()`](sales_log_7.9.3.js:177)
Applies conditional formatting rules to a sheet.

**Parameters:**
- `sheet` (_Sheet_): Target sheet.
- `rules` (_ConditionalFormatRule[]_): Rules to apply.

**Returns:** None.

### [`sales_log_7.9.3.js/withScriptLock()`](sales_log_7.9.3.js:182)
Ensures exclusive execution of a function using a script lock.

**Parameters:**  
- `fn` (_Function_): Function to execute.  

**Returns:** Result of `fn()`.

### [`sales_log_7.9.3.js/toastInfo()`](sales_log_7.9.3.js:195)
Shows a toast notification in the spreadsheet UI.

**Parameters:**
- `msg` (_string_): Message to display.
- `title` (_string_, optional): Toast title.

**Returns:** None.

### [`sales_log_7.9.3.js/showCustomAlert()`](sales_log_7.9.3.js:199)
Displays a custom alert dialog in the spreadsheet UI.

**Parameters:**
- `title` (_string_): Alert title.
- `msg` (_string_): Message content.

**Returns:** None.

### [`sales_log_7.9.3.js/alertError()`](sales_log_7.9.3.js:203)
Convenience wrapper to show an error alert.

**Parameters:**
- `msg` (_string_): Error message.
- `title` (_string_, optional): Alert title.

**Returns:** None.

### [`sales_log_7.9.3.js/tallyCounts()`](sales_log_7.9.3.js:206)
Tallies delivered sales counts per salesperson and collects unknown inputs.

**Parameters:**
- `rows` (_any[][]_): Sales data rows.
- `aliasMap` (_object_): Maps aliases to full names.
- `sides` (_{fiIdx:number, saleIdx:number}[]_): Indices for FI and salesperson columns.

**Returns:** `{ counts: object, unknownInputs: string[] }`.

### [`sales_log_7.9.3.js/summarizeRows()`](sales_log_7.9.3.js:231)
Summarizes new, used, and trade counts from logged rows.

**Parameters:**  
- `rows` (_any[][]_): Data rows.  

**Returns:** `{ newCount:number, usedCount:number, tradeCount:number }`.

### [`sales_log_7.9.3.js/applyMonthlyRowFormatting()`](sales_log_7.9.3.js:269)
Applies background color formatting to `MONTHLY` sheet rows, highlighting non-delivered deals and code errors.

**Parameters:**
- `sheet` (_Sheet_): `MONTHLY` sheet.
- `rowsData` (_any[][]_): Data rows to format.
- `startSheetRow` (_number_): First row number in sheet to apply.
- `aliasMap` (_object_): Alias map for salesperson codes.

**Returns:** Array of sheet row numbers with code errors.

### [`sales_log_7.9.3.js/processDaily()`](sales_log_7.9.3.js:391)
Main flow to log daily sales from `TODAY` sheet to `MONTHLY`, apply formatting, update leaderboard, and clear inputs.

**Parameters:** None  
**Returns:** None.

### [`sales_log_7.9.3.js/reapplyCF()`](sales_log_7.9.3.js:538)
Reapplies conditional formatting rules on `TODAY` sheet for data entry and leaderboard pace.

**Parameters:** None  
**Returns:** None.

### [`sales_log_7.9.3.js/recalcMtdFromMonthly()`](sales_log_7.9.3.js:672)
Recalculates month-to-date sales and refreshes formats based on `MONTHLY` sheet.

**Parameters:** None  
**Returns:** None.

### [`sales_log_7.9.3.js/rolloverMonth()`](sales_log_7.9.3.js:754)
Archives and resets the `MONTHLY` sheet and recalculates rolling averages and MTD.

**Parameters:** None  
**Returns:** None.

### [`sales_log_7.9.3.js/onOpen()`](sales_log_7.9.3.js:856)
Adds custom "Sales Tools" menu to the spreadsheet UI on open.

**Parameters:** None  
**Returns:** None.
