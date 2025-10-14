# Sales Log Pro - API Reference

## Table of Contents

1. [Overview](#overview)
2. [Core Functions](#core-functions)
3. [Configuration API](#configuration-api)
4. [Analytics Functions](#analytics-functions)
5. [Setup & Migration](#setup--migration)
6. [Utility Functions](#utility-functions)
7. [Data Structures](#data-structures)
8. [Error Handling](#error-handling)
9. [Extensibility & Customization](#extensibility--customization)
10. [Code Examples](#code-examples)

---

## Overview

Sales Log Pro provides a comprehensive JavaScript API for programmatic interaction with the sales tracking system. This reference documents all public functions, their signatures, parameters, and usage patterns.

### Architecture

```typescript
┌─────────────────────────────────────────────────┐
│           Google Sheets Interface               │
│  (User interactions via TODAY/MONTHLY sheets)   │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│              Core Functions                     │
│  processDaily() | rolloverMonth()               │
│  recalcMtdFromMonthly()                        │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│         Configuration Service                   │
│  Properties Service + SALESPEOPLE Sheet         │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│         Analytics Engine                        │
│  calculateMonthlyAnalytics()                   │
└─────────────────────────────────────────────────┘
```

### Module Organization

- **`core_saleslogPro.js`**: Main processing logic, formatting, menu
- **`config_service.js`**: Configuration management, validation
- **`sales_analytics.js`**: Analytics calculation and display
- **`setup_wizard.js`**: Initial setup and sheet creation

---

## Core Functions

### processDaily()

Processes daily sales from TODAY sheet to MONTHLY sheet with sequential numbering, validation, and analytics calculation.

**Source**: [`src/core_saleslogPro.js:1081`](../../src/core_saleslogPro.js#L1081)

**Signature**:

```javascript
function processDaily(): void
```

**Parameters**: None

**Returns**: `void`

**Behavior**:

1. Checks if current day is Sunday (skips if configured)
2. Reads TODAY sheet data (A2:N51)
3. Filters rows with activity (new or used sections)
4. Generates sequential numbers in Column A
5. Inserts date header in MONTHLY
6. Transfers data with font color preservation
7. Applies formatting and error highlighting
8. Updates leaderboard with new counts
9. Calculates and writes analytics
10. Clears TODAY sheet
11. Reapplies conditional formatting

**Error Handling**:

- Validates required sheets exist
- Uses script lock to prevent concurrent execution
- Shows user-friendly error dialogs
- Logs detailed errors to Apps Script Logger

**Side Effects**:

- Modifies MONTHLY sheet (inserts rows)
- Updates TODAY leaderboard (columns P-R)
- Clears TODAY data area (B2:N51)
- Writes analytics to MONTHLY (columns S-X)
- Reapplies conditional formatting rules

**Example Usage**:

```javascript
// Called from menu: Sales Tools → Log Yesterday's Sales
function processDaily() {
  withScriptLock(() => {
    // Check Sunday skip setting
    if (shouldSkipSundays() && new Date().getDay() === 0) {
      toastInfo("Sunday is configured as a non-sales day.", "Sunday Skip");
      return;
    }

    // Process sales...
    const sheets = getSheets();
    const dailyData = sheets.today.getRange(RANGES.dailyData).getValues();

    // Filter active rows, transfer to MONTHLY, update analytics...
  });
}
```

**Configuration Dependencies**:

- [`shouldSkipSundays()`](#shouldskipsundays): Sunday handling
- [`shouldMondayLogSaturday()`](#shouldmondaylogsaturday): Monday date behavior
- [`getVisualConfig()`](#getvisualconfig): Color configuration

---

### rolloverMonth()

Archives current month and prepares system for new month with confirmation dialog.

**Source**: [`src/core_saleslogPro.js:1494`](../../src/core_saleslogPro.js#L1494)

**Signature**:

```javascript
function rolloverMonth(): void
```

**Parameters**: None

**Returns**: `void`

**Behavior**:

1. Shows confirmation dialog to user
2. Recalculates final analytics for accuracy
3. Creates archive sheet with configured name format
4. Copies MONTHLY data (including analytics)
5. Copies final leaderboard with formatting
6. Clears MONTHLY sheet for new month
7. Resets MTD column on TODAY
8. Recalculates 3-month rolling averages
9. Reapplies conditional formatting
10. Shows completion dialog

**Error Handling**:

- Checks if archive sheet already exists
- Validates sheet creation
- Handles archive naming conflicts
- Uses script lock for atomic operation

**Side Effects**:

- Creates new archive sheet (e.g., "5/25")
- Clears MONTHLY sheet (rows 2+)
- Clears TODAY MTD column (Q2:Q28)
- Updates TODAY averages (R2:R28)
- Preserves all analytics in archive

**Example Usage**:

```javascript
// Called from menu: Sales Tools → Start New Month (Rollover)
function rolloverMonth() {
  withScriptLock(() => {
    // Show confirmation
    const response = SpreadsheetApp.getUi().alert(
      "Confirm Month Rollover",
      "This will archive the current month...",
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );

    if (response !== SpreadsheetApp.getUi().Button.YES) {
      return;
    }

    // Calculate archive name based on previous month
    const archiveSheetName = formatArchiveName();

    // Recalculate final analytics
    const finalAnalytics = calculateMonthlyAnalytics();
    writeAnalyticsToMonthly(finalAnalytics, sheets.monthly);

    // Copy MONTHLY to archive
    const archiveSheet = sheets.monthly.copyTo(SS);
    archiveSheet.setName(archiveSheetName);

    // Clear and reset...
  });
}
```

**Configuration Dependencies**:

- Archive format from date settings (M/YY, MM/YY, MMM/YY)
- Rolling average calculation parameters

---

### recalcMtdFromMonthly()

Recalculates MTD totals from MONTHLY sheet data and checks formatting.

**Source**: [`src/core_saleslogPro.js:1403`](../../src/core_saleslogPro.js#L1403)

**Signature**:

```javascript
function recalcMtdFromMonthly(): number
```

**Parameters**: None

**Returns**: `number` - Count of salesperson errors found

**Behavior**:

1. Reads all MONTHLY sheet data
2. Identifies date headers (merged cells)
3. Extracts data rows (excludes headers)
4. Counts delivered sales by salesperson
5. Updates TODAY leaderboard MTD column
6. Sorts leaderboard by MTD then average
7. Applies formatting to MONTHLY rows
8. Highlights errors (salesperson codes)
9. Reapplies conditional formatting

**Error Handling**:

- Validates MONTHLY sheet has minimum 14 columns
- Handles empty MONTHLY sheet gracefully
- Shows error count in completion message

**Side Effects**:

- Updates TODAY MTD column (Q2:Q28)
- Applies error highlighting to MONTHLY
- Sorts TODAY leaderboard
- Reapplies conditional formatting

**Example Usage**:

```javascript
// Called from menu: Sales Tools → Recalculate MTD & Check Monthly Errors/Formats
function recalcMtdFromMonthly() {
  withScriptLock(() => {
    const sheets = getSheets();
    const monthlySheet = sheets.monthly;
    const todaySheet = sheets.today;

    // Read all MONTHLY data
    const monthlyValues = monthlySheet
      .getRange(2, 1, lastRow - 1, 14)
      .getValues();

    // Apply formatting and get error count
    const errorRows = applyMonthlyRowFormatting(
      monthlySheet,
      monthlyValues,
      2,
      aliasMap
    );

    // Count by salesperson
    const { counts } = tallyCounts(actualDataRows, aliasMap, sidesToTally);

    // Update leaderboard
    const lbValues = todaySheet.getRange(RANGES.leaderboard).getValues();
    lbValues.forEach((r) => {
      r[1] = counts[r[0]] || 0;
    });

    // Sort and apply
    lbValues.sort((a, b) => (b[1] || 0) - (a[1] || 0));
    lbRange.setValues(lbValues);
  });
}
```

**Use Cases**:

- After manual MONTHLY data edits
- To verify MTD calculations
- To reapply formatting after corruption
- To identify salesperson code errors

---

## Configuration API

### getConfiguration()

Retrieves complete configuration from Properties Service with caching.

**Source**: [`src/config_service.js:142`](../../src/config_service.js#L142)

**Signature**:

```javascript
function getConfiguration(): Object
```

**Parameters**: None

**Returns**:

```javascript
{
  version: string,              // Configuration version number
  salespeople: Array<Object>,   // Salesperson roster
  visual: Object,               // Color and threshold settings
  dates: Object,                // Date handling settings
  lastModified: string,         // ISO timestamp
  modifiedBy: string            // User email
}
```

**Behavior**:

1. Checks script cache (10-minute TTL)
2. Reads from Properties Service if cache miss
3. Merges with defaults to ensure all fields present
4. Caches result for future calls
5. Returns complete configuration object

**Example**:

```javascript
const config = getConfiguration();

console.log(config.version); // "5"
console.log(config.salespeople.length); // 12
console.log(config.visual.nonDeliveredColor); // "#FF0000"
console.log(config.dates.skipSundays); // true
```

---

### updateConfiguration()

Atomically updates configuration with validation and locking.

**Source**: [`src/config_service.js:189`](../../src/config_service.js#L189)

**Signature**:

```javascript
function updateConfiguration(updates: Object): Object
```

**Parameters**:

- `updates` (Object): Partial configuration object with changes
  - Can include any subset of configuration properties
  - Deep merged with existing configuration

**Returns**: Updated configuration object

**Throws**: `Error` if validation fails or lock timeout

**Behavior**:

1. Acquires script lock (30-second timeout)
2. Retrieves current configuration
3. Deep merges updates with current config
4. Updates metadata (version, timestamp, user)
5. Validates complete configuration
6. Saves to Properties Service
7. Invalidates relevant caches
8. Syncs to SALESPEOPLE sheet if applicable
9. Releases lock

**Example**:

```javascript
// Update visual settings
const updated = updateConfiguration({
  visual: {
    nonDeliveredColor: "#FF6B6B",
    paceThresholds: {
      green: 12,
      yellow: 9,
      red: 0,
    },
  },
});

// Update date settings
const updated = updateConfiguration({
  dates: {
    skipSundays: false,
    mondayLogsSaturday: true,
  },
});
```

**Validation**:

- Color codes must match `#RRGGBB` format
- Thresholds must be positive numbers
- Date settings must be booleans
- Total size must be under 8KB

**Side Effects**:

- Writes to Properties Service
- Invalidates caches
- Syncs to SALESPEOPLE sheet
- Increments version number

---

### Salesperson Management Functions

#### getSalespeople()

Returns array of all salespeople from configuration.

**Source**: [`src/config_service.js:312`](../../src/config_service.js#L312)

**Signature**:

```javascript
function getSalespeople(): Array<Object>
```

**Returns**:

```javascript
[
  {
    fullName: string, // "John Smith"
    aliases: string, // "JS, Johnny, John"
    displayCode: string, // "JS"
  },
  // ...
];
```

**Example**:

```javascript
const team = getSalespeople();

team.forEach((person) => {
  console.log(`${person.displayCode}: ${person.fullName}`);
  console.log(`  Aliases: ${person.aliases}`);
});

// Output:
// JS: John Smith
//   Aliases: JS, Johnny, John
// SJ: Sarah Johnson
//   Aliases: SJ, Sarah, Johnson
```

---

#### addSalesperson()

Adds new salesperson with validation and duplicate checking.

**Source**: [`src/config_service.js:330`](../../src/config_service.js#L330)

**Signature**:

```javascript
function addSalesperson(data: Object): Object
```

**Parameters**:

```javascript
{
  fullName: string,      // Required, 2-100 chars
  aliases: string,       // Optional, comma-separated
  displayCode: string    // Required, 2-4 alphanumeric
}
```

**Returns**: Updated configuration object

**Throws**: `Error` if validation fails or duplicate found

**Validation Rules**:

- Full name: 2-100 characters, letters/spaces/hyphens/apostrophes only
- Aliases: 0-200 characters, alphanumeric/commas allowed
- Display code: 2-4 alphanumeric characters
- No duplicate full names
- No conflicting aliases

**Example**:

```javascript
try {
  const result = addSalesperson({
    fullName: "Michael Chen",
    aliases: "MC, Mike, Michael",
    displayCode: "MC",
  });

  console.log("Salesperson added successfully");
} catch (error) {
  console.error("Failed to add salesperson:", error.message);
}
```

---

#### updateSalesperson()

Updates existing salesperson with validation.

**Source**: [`src/config_service.js:385`](../../src/config_service.js#L385)

**Signature**:

```javascript
function updateSalesperson(fullName: string, data: Object): Object
```

**Parameters**:

- `fullName` (string): Current full name of person to update
- `data` (Object): New salesperson data (same structure as `addSalesperson`)

**Returns**: Updated configuration object

**Throws**: `Error` if person not found or validation fails

**Example**:

```javascript
// Update display code and add alias
const result = updateSalesperson("John Smith", {
  fullName: "John Smith",
  aliases: "JS, Johnny, John, Smitty", // Added "Smitty"
  displayCode: "JSM", // Changed code
});
```

---

#### deleteSalesperson()

Removes salesperson from configuration.

**Source**: [`src/config_service.js:447`](../../src/config_service.js#L447)

**Signature**:

```javascript
function deleteSalesperson(fullName: string): Object
```

**Parameters**:

- `fullName` (string): Full name of person to delete

**Returns**: Updated configuration object

**Throws**: `Error` if person not found

**Example**:

```javascript
const result = deleteSalesperson("John Smith");
console.log("John Smith removed from roster");
```

**Warning**: Deleting a salesperson does not affect historical data in MONTHLY or archives. Their sales remain attributed to them in past records.

---

### Date Settings Functions

#### shouldSkipSundays()

Checks if Sundays should be excluded from selling day calculations.

**Source**: [`src/config_service.js:91`](../../src/config_service.js#L91)

**Signature**:

```javascript
function shouldSkipSundays(): boolean
```

**Returns**: `true` if Sundays should be skipped, `false` otherwise

**Default**: `true`

**Example**:

```javascript
if (shouldSkipSundays() && today.getDay() === 0) {
  console.log("Sunday - no processing");
  return;
}
```

**Used By**:

- [`processDaily()`](#processdaily): Skip Sunday processing
- [`memoizedGetSellingDays()`](#memoizedgetsellingdays): Selling day calculations

---

#### shouldMondayLogSaturday()

Checks if Monday processing should default to Saturday's date.

**Source**: [`src/config_service.js:106`](../../src/config_service.js#L106)

**Signature**:

```javascript
function shouldMondayLogSaturday(): boolean
```

**Returns**: `true` if Monday should log Saturday, `false` for Sunday

**Default**: `true`

**Example**:

```javascript
function formatDateOffset(offsetDays = 1) {
  const d = new Date();
  const dayOfWeek = d.getDay();
  let daysToSubtract = offsetDays;

  if (shouldMondayLogSaturday() && dayOfWeek === 1 && offsetDays === 1) {
    daysToSubtract = 2; // Log Saturday instead of Sunday
  }

  d.setDate(d.getDate() - daysToSubtract);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
```

---

### Visual Configuration Functions

#### getVisualConfig()

Loads visual configuration (colors and thresholds) with caching.

**Source**: [`src/core_saleslogPro.js:90`](../../src/core_saleslogPro.js#L90)

**Signature**:

```javascript
function getVisualConfig(): Object
```

**Returns**:

```javascript
{
  nonDeliveredColor: string,          // "#FF0000"
  salespersonErrorColor: string,      // "#FFEBEE"
  duplicateStockFillColor: string,    // "#b4ff0c"
  duplicateStockTextColor: string,    // "#ff0000"
  leaderboardZeroMtdBgColor: string,  // "#F0F8FF"
  paceThresholds: {
    green: number,   // 10
    yellow: number,  // 8
    red: number      // 0
  }
}
```

**Example**:

```javascript
const visual = getVisualConfig();

// Use in conditional formatting
const rule = SpreadsheetApp.newConditionalFormatRule()
  .whenFormulaSatisfied("=COUNTIF($E$2:$E$101,$E2)>1")
  .setBackground(visual.duplicateStockFillColor)
  .setFontColor(visual.duplicateStockTextColor)
  .setRanges([range])
  .build();
```

**Cache**: 5-minute TTL in script cache

---

## Analytics Functions

### calculateMonthlyAnalytics()

Calculates comprehensive sales analytics from MONTHLY sheet data.

**Source**: [`src/sales_analytics.js:41`](../../src/sales_analytics.js#L41)

**Signature**:

```javascript
function calculateMonthlyAnalytics(): Object | null
```

**Parameters**: None

**Returns**: Analytics object or `null` on error

**Return Structure**:

```javascript
{
  version: "1.0",
  timestamp: string,  // ISO timestamp
  totals: {
    delivered: number,      // Total delivered units
    newDelivered: number,   // New units
    usedDelivered: number   // Used units
  },
  teamMetrics: {
    sellingDays: number,    // Days elapsed
    newPerDay: number,      // New units per day
    usedPerDay: number      // Used units per day
  },
  salespersonMetrics: [
    {
      fullName: string,
      displayCode: string,
      newSales: number,
      usedSales: number,
      totalSales: number,
      percentOfTeam: number,  // 0-100
      rank: number            // 1-based ranking
    },
    // ... sorted by totalSales descending
  ],
  dataQuality: {
    unknownSalespeople: Array<string>,
    totalRowsProcessed: number,
    deliveredRowsProcessed: number,
    errorCount: number
  }
}
```

**Behavior**:

1. Checks cache (5-minute TTL)
2. Validates MONTHLY sheet structure
3. Reads all MONTHLY data (columns A-N)
4. Filters for delivered deals (FI = A-Z)
5. Separates new vs. used sales
6. Counts by salesperson (handles splits)
7. Calculates team totals and metrics
8. Ranks salespeople by performance
9. Validates results
10. Caches output

**Example**:

```javascript
const analytics = calculateMonthlyAnalytics();

if (analytics) {
  console.log(`Total Delivered: ${analytics.totals.delivered}`);
  console.log(`Selling Days: ${analytics.teamMetrics.sellingDays}`);
  console.log(`New Per Day: ${analytics.teamMetrics.newPerDay}`);

  analytics.salespersonMetrics.forEach((person, index) => {
    console.log(
      `${index + 1}. ${person.displayCode}: ${
        person.totalSales
      } units (${person.percentOfTeam.toFixed(1)}%)`
    );
  });
}
```

**Edge Cases**:

- Empty MONTHLY sheet returns zero counts
- Split sales ("John/Jane") count as 0.5 each
- Unknown salespeople tracked in `dataQuality`
- Selling days counted where Column A = 1

---

### writeAnalyticsToMonthly()

Writes analytics data to MONTHLY sheet columns S-X.

**Source**: [`src/sales_analytics.js:124`](../../src/sales_analytics.js#L124)

**Signature**:

```javascript
function writeAnalyticsToMonthly(
  analyticsData: Object,
  monthlySheet: GoogleAppsScript.Spreadsheet.Sheet
): void
```

**Parameters**:

- `analyticsData`: Output from [`calculateMonthlyAnalytics()`](#calculatemonthl yanalytics)
- `monthlySheet`: MONTHLY sheet reference

**Returns**: `void`

**Throws**: `Error` if sheet has insufficient columns or data malformed

**Behavior**:

1. Clears existing analytics (columns S-X)
2. Builds summary section (rows 1-8)
3. Writes summary with formatting
4. Builds salesperson data array
5. Writes salesperson data (rows 9+)
6. Applies formatting to both sections
7. Flushes changes to sheet

**Summary Section Layout** (Rows 1-8):

```ruby
Row 1: "MONTHLY ANALYTICS" (merged S1:X1)
Row 2: Headers ["Metric", "Value", "Metric", "Value", "", ""]
Row 3: ["Total Delivered", 45, "Selling Days", 15, "", ""]
Row 4: ["New Delivered", 28, "New Sold per Day", 1.87, "", ""]
Row 5: ["Used Delivered", 17, "Used Sold per Day", 1.13, "", ""]
Row 6: ["Last Updated", "10/10/2025 2:00 PM", "", "", "", ""]
Row 7: Blank
Row 8: ["Salesperson", "New", "Used", "Total", "% of Team", "Rank"]
```

**Salesperson Data Layout** (Rows 9+):

```ruby
Row 9+: [displayCode, newSales, usedSales, totalSales, percentOfTeam, rank]
```

**Example**:

```javascript
const analytics = calculateMonthlyAnalytics();
const sheets = getSheets();

if (analytics) {
  writeAnalyticsToMonthly(analytics, sheets.monthly);
  console.log("Analytics written to MONTHLY columns S-X");
}
```

**Formatting Applied**:

- Header: Bold, centered, blue background (#4A86E8)
- Column headers: Bold, light blue background (#E8F0FE)
- Data: Calibri font, 10pt, centered
- Numbers: Appropriate formats (0.#, 0.0"%")

---

### refreshAnalyticsManually()

Manual analytics refresh callable from menu with user confirmation.

**Source**: [`src/sales_analytics.js:650`](../../src/sales_analytics.js#L650)

**Signature**:

```javascript
function refreshAnalyticsManually(): void
```

**Parameters**: None

**Returns**: `void`

**Behavior**:

1. Shows confirmation dialog
2. Displays "Refreshing..." toast
3. Invalidates analytics cache
4. Recalculates all analytics
5. Writes to MONTHLY sheet
6. Shows summary dialog with results

**Summary Dialog Content**:

```bash
Total Delivered: 45
New: 28
Used: 17

Top Performer: JS (20.5 units)
```

**Example**:

```javascript
// Called from menu: Sales Tools → 🔄 Refresh Analytics
function refreshAnalyticsManually() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "Refresh Analytics",
    "This will recalculate all monthly analytics...",
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    invalidateAnalyticsCache();
    const analytics = calculateMonthlyAnalytics();
    writeAnalyticsToMonthly(analytics, getSheets().monthly);

    // Show results...
  }
}
```

**Use Cases**:

- After manual data edits
- To verify calculations
- After correcting salesperson errors
- Before month rollover

---

## Setup & Migration

### runSetupWizard()

Creates all required sheets with proper structure and formatting.

**Source**: [`src/setup_wizard.js:12`](../../src/setup_wizard.js#L12)

**Signature**:

```javascript
function runSetupWizard(): void
```

**Parameters**: None

**Returns**: `void`

**Behavior**:

1. Validates active spreadsheet exists
2. Checks and creates TODAY sheet
3. Checks and creates MONTHLY sheet
4. Checks and creates SALESPEOPLE sheet
5. Checks and creates DEPOSITS sheet
6. Shows summary dialog with results

**Summary Dialog**:

```bash
SHEETS CREATED:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

Setup complete! Your sales log spreadsheet is ready to use.
```

**Idempotent**: Safe to run multiple times - only creates missing sheets

**Example**:

```javascript
// Called from menu: Sales Tools → 🚀 Run Setup Wizard
function runSetupWizard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const results = {
    existed: [],
    created: [],
    errors: [],
  };

  checkAndCreateTodaySheet(ss, results);
  checkAndCreateMonthlySheet(ss, results);
  checkAndCreateSalespeopleSheet(ss, results);
  checkAndCreateDepositsSheet(ss, results);

  showSetupSummary(results);
}
```

**Sheet Specifications**:

- **TODAY**: Data entry + leaderboard, 18 columns (A-R)
- **MONTHLY**: Historical data + analytics, 24 columns (A-X)
- **SALESPEOPLE**: Team roster, 3 columns (A-C), includes examples
- **DEPOSITS**: Deposit tracking, 14 columns (A-N)

---

### migrateToConfigUI()

Auto-migration from hardcoded constants to Properties Service configuration.

**Source**: [`src/config_service.js:1010`](../../src/config_service.js#L1010)

**Signature**:

```javascript
function migrateToConfigUI(): Object
```

**Parameters**: None

**Returns**:

```javascript
{
  success: boolean,
  alreadyMigrated: boolean,
  message: string,
  salespeopleCount: number  // Only if migration performed
}
```

**Behavior**:

1. Checks if configuration already exists
2. If exists, returns early (idempotent)
3. Creates default configuration structure
4. Migrates salespeople from SALESPEOPLE sheet
5. Sets metadata (version, timestamp, user)
6. Saves to Properties Service
7. Shows success toast notification

**Idempotent**: Safe to call multiple times - only migrates once

**Example**:

```javascript
// Called automatically on first Settings open
const result = migrateToConfigUI();

if (result.success) {
  if (result.alreadyMigrated) {
    console.log("Configuration already migrated");
  } else {
    console.log(
      `Migration complete: ${result.salespeopleCount} salespeople migrated`
    );
  }
}
```

**Migration Source**:

- SALESPEOPLE sheet data → `config.salespeople`
- Hardcoded constants → `config.visual`
- Default values → `config.dates`

---

## Utility Functions

### findLastRowInCols()

Finds the last row containing data within specific columns using efficient chunked reading.

**Source**: [`src/core_saleslogPro.js:772`](../../src/core_saleslogPro.js#L772)

**Signature**:

```javascript
function findLastRowInCols(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  startCol: number,
  endCol: number
): number
```

**Parameters**:

- `sheet`: The sheet object to inspect
- `startCol`: 1-based starting column index (e.g., 1 for column A)
- `endCol`: 1-based ending column index (e.g., 14 for column N)

**Returns**: `number` - Last row number with data, or 0 if empty

**Behavior**:

Uses chunked reading (100 rows at a time) from bottom-up to efficiently find the last row with data in specified columns. This prevents memory issues with large sheets and is more reliable than `getLastRow()` when extraneous data exists in other columns.

**Example**:

```javascript
const sheets = getSheets();
const lastRow = findLastRowInCols(sheets.monthly, 1, 14); // A:N
Logger.log("Last data row: " + lastRow);
```

---

### getSheets()

Retrieves references to required sheets with validation.

**Source**: [`src/core_saleslogPro.js:214`](../../src/core_saleslogPro.js#L214)

**Signature**:

```javascript
function getSheets(): Object
```

**Returns**:

```javascript
{
  today: GoogleAppsScript.Spreadsheet.Sheet,
  monthly: GoogleAppsScript.Spreadsheet.Sheet,
  sales: GoogleAppsScript.Spreadsheet.Sheet
}
```

**Throws**: `Error` if any required sheet is missing

**Example**:

```javascript
try {
  const sheets = getSheets();

  const todayData = sheets.today.getRange("A2:N51").getValues();
  const monthlyLastRow = sheets.monthly.getLastRow();
  const salespersonCount = sheets.sales.getLastRow() - 1;
} catch (error) {
  console.error("Required sheets missing:", error.message);
}
```

---

### getSalespersonMaps()

Builds and caches alias and display code mappings.

**Source**: [`src/core_saleslogPro.js:281`](../../src/core_saleslogPro.js#L281)

**Signature**:

```javascript
function getSalespersonMaps(): Object
```

**Returns**:

```javascript
{
  aliasMap: {[alias: string]: string},      // Alias → Full Name
  displayCodeMap: {[fullName: string]: string}  // Full Name → Display Code
}
```

**Example**:

```javascript
const { aliasMap, displayCodeMap } = getSalespersonMaps();

// Resolve alias to full name
const fullName = aliasMap["JS"]; // "John Smith"

// Get display code
const code = displayCodeMap["John Smith"]; // "JS"

// Handle unknown
const unknown = aliasMap["XYZ"]; // undefined
if (!unknown) {
  console.log("Unknown salesperson code: XYZ");
}
```

**Cache**: 5-minute TTL in script cache

**Mapping Logic**:

1. Full name → Full name
2. Display code → Full name
3. Each alias → Full name
4. Case-insensitive matching (all uppercase)

---

### tallyCounts()

Counts salesperson sales from row data with split sale handling.

**Source**: [`src/core_saleslogPro.js:458`](../../src/core_saleslogPro.js#L458)

**Signature**:

```javascript
function tallyCounts(
  rows: Array<Array>,
  aliasMap: Object,
  sides: Array<Object>
): Object
```

**Parameters**:

- `rows`: 2D array of row data
- `aliasMap`: Alias to full name mapping
- `sides`: Array of `{fiIdx, saleIdx}` objects defining columns to check

**Returns**:

```javascript
{
  counts: {[fullName: string]: number},  // Sales counts
  unknownInputs: Array<string>           // Unrecognized inputs
}
```

**Example**:

```javascript
const rows = [
  ["1", "Customer A", "F", "Camry", "12345", "T-789", "JS"],
  ["2", "Customer B", "F", "Accord", "67890", "NT", "SJ/MC"], // Split sale
];

const { aliasMap } = getSalespersonMaps();
const sides = [
  { fiIdx: 2, saleIdx: 6 }, // New car columns
  { fiIdx: 9, saleIdx: 13 }, // Used car columns
];

const { counts, unknownInputs } = tallyCounts(rows, aliasMap, sides);

console.log(counts);
// {
//   "John Smith": 1,
//   "Sarah Johnson": 0.5,
//   "Michael Chen": 0.5
// }

console.log(unknownInputs); // []
```

**Split Sale Handling**:

- "John/Jane" splits credit 0.5 each
- "John/Jane/Bob" not supported (use two salespersons max)

---

### applyMonthlyRowFormatting()

Applies conditional formatting to MONTHLY rows with error detection.

**Source**: [`src/core_saleslogPro.js:687`](../../src/core_saleslogPro.js#L687)

**Signature**:

```javascript
function applyMonthlyRowFormatting(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  rowsData: Array<Array>,
  startSheetRow: number,
  aliasMap: Object
): Array<number>
```

**Parameters**:

- `sheet`: MONTHLY sheet reference
- `rowsData`: 2D array of row data to format
- `startSheetRow`: 1-indexed starting row number
- `aliasMap`: Alias to full name mapping

**Returns**: `Array<number>` - Array of 1-indexed row numbers with salesperson errors

**Formatting Logic**:

**Non-Delivered Deals** (Red):

- Applied when FI flag not single letter A-Z
- Highlights columns B-G or I-N (excluding trade columns)
- Auto-clears when FI corrected

**Salesperson Errors** (Light Red):

- Applied when salesperson not in alias map
- Highlights column G or N
- Auto-clears when corrected

**Example**:

```javascript
const sheets = getSheets();
const { aliasMap } = getSalespersonMaps();
const rowsData = sheets.monthly.getRange(2, 1, 10, 14).getValues();

const errorRows = applyMonthlyRowFormatting(
  sheets.monthly,
  rowsData,
  2,
  aliasMap
);

if (errorRows.length > 0) {
  console.log(`Salesperson errors found in rows: ${errorRows.join(", ")}`);
}
```

---

### reapplyCF()

Reapplies all conditional formatting rules to TODAY sheet.

**Source**: [`src/core_saleslogPro.js:1290`](../../src/core_saleslogPro.js#L1290)

**Signature**:

```javascript
function reapplyCF(): void
```

**Parameters**: None

**Returns**: `void`

**Behavior**:

1. Loads visual configuration
2. Calculates selling days for pace
3. Filters existing rules (keeps non-managed)
4. Determines leaderboard state (all MTD zero?)
5. Builds new rule set:
   - Duplicate stocks (new section)
   - Duplicate stocks (used section)
   - Deposit matches (new section)
   - Deposit matches (used section)
   - Leaderboard pace indicators
6. Applies rules to TODAY sheet

**Rules Created**:

```javascript
// Rule 1: New duplicate stocks
Range: A2:G101
Formula: =COUNTIF($E$2:$E$101,$E2)>1

// Rule 2: Used duplicate stocks
Range: I2:N101
Formula: =COUNTIF($L$2:$L$101,$L2)>1

// Rule 3: New stocks in deposits
Range: A2:G101
Formula: =COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0

// Rule 4: Used stocks in deposits
Range: I2:N101
Formula: =COUNTIF(INDIRECT("DEPOSITS!G:G"),$L2)>0

// Rule 5-7: Leaderboard pace (if MTD > 0)
Range: P2:R28
Formulas: Pace >= Green, Yellow <= Pace < Green, Pace < Yellow
```

**Example**:

```javascript
// Called automatically after processDaily()
reapplyCF();

// Can also call manually after configuration changes
updateConfiguration({ visual: { paceThresholds: { green: 12 } } });
reapplyCF(); // Reapply with new thresholds
```

---

### withScriptLock()

Executes function with script lock protection to prevent concurrent execution.

**Source**: [`src/core_saleslogPro.js:414`](../../src/core_saleslogPro.js#L414)

**Signature**:

```javascript
function withScriptLock(fn: Function): any
```

**Parameters**:

- `fn`: Function to execute with lock protection

**Returns**: Return value of `fn`

**Throws**: `Error` if lock cannot be acquired within 30 seconds

**Example**:

```javascript
function criticalOperation() {
  withScriptLock(() => {
    // This code is protected from concurrent execution
    const sheets = getSheets();
    const data = sheets.monthly.getRange("A2:N100").getValues();

    // Process data...

    sheets.monthly.getRange("A2:N100").setValues(modifiedData);
  });
}
```

**Use Cases**:

- [`processDaily()`](#processdaily): Prevent concurrent daily processing
- [`rolloverMonth()`](#rollovermonth): Atomic month rollover
- [`recalcMtdFromMonthly()`](#recalcmtdfrommonthly): MTD recalculation
- [`updateConfiguration()`](#updateconfiguration): Config updates

---

### acquireScriptLockWithRetry()

Acquires a script lock with automatic retry using exponential backoff.

**Source**: [`src/utilities_locks.js:197`](../../src/utilities_locks.js#L197)

**Signature**:

```javascript
function acquireScriptLockWithRetry(
  maxRetries: number = 5,
  initialDelayMs: number = 100,
  backoffMultiplier: number = 2,
  timeoutMs: number = 30000
): Object
```

**Parameters**:

- `maxRetries` (number, optional): Maximum number of retry attempts (default: 5)
- `initialDelayMs` (number, optional): Initial retry delay in milliseconds (default: 100)
- `backoffMultiplier` (number, optional): Backoff multiplier for each retry (default: 2)
- `timeoutMs` (number, optional): Maximum time to wait for lock in milliseconds per attempt (default: 30000)

**Returns**:

```javascript
{
  success: boolean,        // Whether lock was acquired
  lock: Lock|null,        // Lock object if successful, null otherwise
  attempts: number,        // Number of attempts made
  totalWaitMs: number,    // Total time waited for lock (excluding timeout periods)
  error: string|null      // Error message if failed, null if successful
}
```

**Behavior**:

1. Attempts to acquire script lock immediately
2. If fails, waits initialDelayMs before retry
3. Each subsequent retry doubles wait time (exponential backoff)
4. Each attempt has timeoutMs to acquire lock
5. Returns after success or maxRetries exhausted
6. Logs each retry attempt with timing information

**Retry Schedule** (with defaults):

```cs
Attempt 1: Immediate (0ms delay)
Attempt 2: 100ms delay
Attempt 3: 200ms delay
Attempt 4: 400ms delay
Attempt 5: 800ms delay
Attempt 6: 1600ms delay

Total max wait: ~3.1 seconds (plus 30s lock timeout per attempt)
Maximum total time: ~3.1s + (6 × 30s) = ~183s worst case
```

**Example**:

```javascript
// Basic usage with defaults
const lockResult = acquireScriptLockWithRetry();
if (lockResult.success) {
  try {
    // Protected operations
    const config = getConfiguration();
    config.version = String(Number(config.version) + 1);
    saveConfiguration(config);
  } finally {
    lockResult.lock.releaseLock();
  }
} else {
  Logger.log("Lock acquisition failed: " + lockResult.error);
  throw new Error(
    "Could not acquire lock after " + lockResult.attempts + " attempts"
  );
}

// Custom retry parameters
const customResult = acquireScriptLockWithRetry(
  3, // maxRetries: only 3 attempts
  200, // initialDelayMs: start with 200ms
  1.5, // backoffMultiplier: slower growth
  10000 // timeoutMs: 10 second timeout per attempt
);
```

**Use Cases**:

- [`updateConfiguration()`](#updateconfiguration): Prevents concurrent config updates
- [`withScriptLock()`](#withscriptlock): Daily processing protection
- [`syncRowToProperties()`](../../src/sync_service.js#L392): Sheet sync operations
- Any operation requiring atomic execution

**Error Handling**:

- Returns `{success: false}` instead of throwing
- Caller responsible for handling failure
- Logs all retry attempts for debugging
- Includes detailed error message in result

**Performance**:

- No overhead when lock available immediately
- 100-3100ms overhead during typical retries
- Prevents indefinite blocking
- Provides visibility into contention patterns

---

### cleanupOldMetadata()

Cleans up old sync metadata entries to reduce storage size in Properties Service.

**Source**: [`src/config_service.js:854`](../../src/config_service.js#L854) and [`src/sync_service.js:838`](../../src/sync_service.js#L838)

**Signature**:

```javascript
function cleanupOldMetadata(metadata: Object): Object
```

**Parameters**:

- `metadata` (Object): Current metadata object from Properties Service

**Returns**: Cleaned metadata object with old entries removed

**Behavior**:

1. Identifies current timestamp
2. Calculates retention cutoff (30 days ago)
3. Iterates through metadata entries
4. Removes entries with `lastModified` older than cutoff
5. Preserves special keys (e.g., `_stats`)
6. Returns cleaned metadata object
7. Defensive: Returns original if cleanup fails

**Retention Policy**:

```javascript
Retention Period: 30 days
Calculation: Current time - (30 × 24 × 60 × 60 × 1000) ms

Preserved:
- Entries with lastModified within 30 days
- Special keys starting with underscore (_stats, etc.)
- Entries without lastModified field (kept for safety)

Removed:
- Entries with lastModified > 30 days old
- No impact on current operations
```

**Example**:

```javascript
// In saveSyncMetadata()
const metadata = getMetadata();
const dataSize = JSON.stringify(metadata).length;

if (dataSize > SIZE_THRESHOLD) {
  Logger.log(`[saveSyncMetadata] Size threshold exceeded: ${dataSize} bytes`);
  Logger.log("[saveSyncMetadata] Running cleanup...");

  metadata = cleanupOldMetadata(metadata);

  const newSize = JSON.stringify(metadata).length;
  Logger.log(
    `[saveSyncMetadata] Cleanup complete. Size reduced: ${dataSize} → ${newSize} bytes`
  );
}

// Save cleaned metadata
PropertiesService.getScriptProperties().setProperty(
  KEY,
  JSON.stringify(metadata)
);
```

**Logging**:

```javascript
// Typical log output
[cleanupOldMetadata] Starting cleanup. Current entries: 45
[cleanupOldMetadata] Retention cutoff: 2025-09-13T15:00:00.000Z
[cleanupOldMetadata] Removed 12 entries older than 30 days
[cleanupOldMetadata] Kept 33 recent entries
[cleanupOldMetadata] Cleanup complete
```

**Use Cases**:

- Called automatically when metadata size exceeds 8KB
- Prevents Properties Service quota errors
- Maintains optimal performance
- No manual intervention required

**Safety Features**:

- Defensive programming: Returns original on error
- Comprehensive logging for audit trail
- Only removes truly old data
- Preserves special/system keys
- Does not affect current operations

**Performance**:

- Fast: O(n) where n = number of entries
- Typical cleanup: <50ms for 50 entries
- Rare operation: Only when size threshold exceeded
- Minimal impact on normal operations

---

### Validation Functions

#### validateName()

Validates full name field.

**Source**: [`src/validation_rules.js:17`](../../src/validation_rules.js#L17)

**Signature**:

```javascript
function validateName(name: string): {valid: boolean, error?: string}
```

**Parameters**:

- `name` (string): Full name to validate

**Returns**: Validation result object with `valid` boolean and optional `error` message

**Validation Rules**:

- Required field
- Must be 2-100 characters
- Can only contain letters, spaces, hyphens, and apostrophes

---

#### validateAliases()

Validates aliases field (optional).

**Source**: [`src/validation_rules.js:44`](../../src/validation_rules.js#L44)

**Signature**:

```javascript
function validateAliases(aliases: string): {valid: boolean, error?: string}
```

**Parameters**:

- `aliases` (string): Comma-separated aliases (can be empty)

**Returns**: Validation result object

**Validation Rules**:

- Optional field (empty is valid)
- Maximum 200 characters
- Can contain letters, numbers, spaces, commas, hyphens, apostrophes

---

#### validateDisplayCode()

Validates display code field.

**Source**: [`src/validation_rules.js:69`](../../src/validation_rules.js#L69)

**Signature**:

```javascript
function validateDisplayCode(code: string): {valid: boolean, error?: string}
```

**Parameters**:

- `code` (string): Display code to validate

**Returns**: Validation result object

**Validation Rules**:

- Required field
- Must be 2-4 alphanumeric characters

---

#### validateSalesperson()

Validates complete salesperson data object.

**Source**: [`src/validation_rules.js:94`](../../src/validation_rules.js#L94)

**Signature**:

```javascript
function validateSalesperson(data: Object): Array<string>
```

**Parameters**:

- `data` (Object): Salesperson data `{fullName, aliases, displayCode}`

**Returns**: `Array<string>` - Array of error messages (empty if valid)

**Example**:

```javascript
const errors = validateSalesperson({
  fullName: "John Smith",
  aliases: "JS, Johnny",
  displayCode: "JS",
});

if (errors.length > 0) {
  console.log("Validation failed:", errors.join("; "));
}
```

---

#### validateSheetRowData()

Validates sheet row data with enhanced error context for sync operations.

**Source**: [`src/validation_rules.js:130`](../../src/validation_rules.js#L130)

**Signature**:

```javascript
function validateSheetRowData(rowData: Array): Object
```

**Parameters**:

- `rowData` (Array): Row data array `[fullName, aliases, displayCode]`

**Returns**: Object with structure:

```javascript
{
  valid: boolean,
  isDelete: boolean,
  errors: Array<Object>  // [{field, message, value, column}]
}
```

**Example**:

```javascript
const result = validateSheetRowData(["John Smith", "JS", "JS"]);
if (!result.valid) {
  result.errors.forEach((err) => {
    console.log(`Column ${err.column} (${err.field}): ${err.message}`);
  });
}
```

---

### Sync Service Functions

#### onEditSalespeopleSheet()

Main entry point for sheet edit events on SALESPEOPLE sheet.

**Source**: [`src/sync_service.js:34`](../../src/sync_service.js#L34)

**Signature**:

```javascript
function onEditSalespeopleSheet(e: Event): void
```

**Parameters**:

- `e` (Event): onEdit event object from Google Sheets trigger

**Returns**: `void`

**Behavior**:

- Validates edit is in SALESPEOPLE sheet
- Only processes data rows (row > 1) and columns A-C
- Skips formatting-only changes
- Creates backup before sync
- Handles validation failures with revert
- Shows user-friendly error messages

**Note**: This function is automatically called by the onEdit trigger. Manual invocation is not recommended.

---

#### syncRowToProperties()

Syncs a single row from SALESPEOPLE sheet to Properties Service with comprehensive conflict resolution.

**Source**: [`src/sync_service.js:392`](../../src/sync_service.js#L392)

**Signature**:

```javascript
function syncRowToProperties(
  row: number,
  rowData: Array<string>,
  oldValue: string|undefined
): Object
```

**Parameters**:

- `row` (number): 1-indexed row number in sheet (row 2 = first data row)
- `rowData` (Array): Row data `[fullName, aliases, displayCode]`
- `oldValue` (string|undefined): Previous cell value before edit

**Returns**: Object with structure:

```javascript
{
  success: boolean,
  error: string|null,
  operation: string,  // 'add', 'update', 'delete', 'conflict_resolved'
  conflictResolution: Object|null,
  recovery: Object|null
}
```

**Behavior**:

1. Acquires script lock with retry
2. Determines operation type (add/update/delete)
3. Creates pre-operation backup
4. Validates input data
5. Detects and resolves conflicts
6. Performs operation
7. Runs data integrity checks
8. Updates sync metadata
9. Invalidates all caches

**Conflict Resolution**:

- If modified within 1 second: Properties wins (sidebar has better validation)
- Otherwise: Sheet wins (most recent edit)

**Example** (typically called internally):

```javascript
// Called by onEditSalespeopleSheet
const result = syncRowToProperties(2, ["Jane Doe", "JD", "JD"], undefined);
if (result.success) {
  Logger.log("Sync successful: " + result.operation);
}
```

---

#### readSalespeopleFromSheet()

Reads all salespeople from SALESPEOPLE sheet.

**Source**: [`src/sync_service.js:1632`](../../src/sync_service.js#L1632)

**Signature**:

```javascript
function readSalespeopleFromSheet(): Array<Object>
```

**Parameters**: None

**Returns**: `Array<Object>` - Array of salesperson objects from sheet

**Example**:

```javascript
const salespeople = readSalespeopleFromSheet();
Logger.log("Found " + salespeople.length + " salespeople");
```

---

#### needsSync()

Determines if sheet data differs from Properties data using deep comparison.

**Source**: [`src/sync_service.js:1756`](../../src/sync_service.js#L1756)

**Signature**:

```javascript
function needsSync(sheetData: Array, propsData: Array): boolean
```

**Parameters**:

- `sheetData` (Array): Salespeople from sheet
- `propsData` (Array): Salespeople from Properties

**Returns**: `boolean` - True if sync is needed

---

### Error Logging Functions

#### logError()

Logs an error with comprehensive details and context.

**Source**: [`src/error_logger.js:20`](../../src/error_logger.js#L20)

**Signature**:

```javascript
function logError(
  context: string,
  error: Error|string,
  additionalData?: Object
): Object
```

**Parameters**:

- `context` (string): Context information (function name, operation)
- `error` (Error|string): Error object or message
- `additionalData` (Object, optional): Additional data to log

**Returns**: Object with structure:

```javascript
{
  message: string,        // User-friendly message
  fullLog: string,        // Complete technical log
  timestamp: string,
  context: string
}
```

**Example**:

```javascript
try {
  // risky operation
} catch (e) {
  const result = logError("myFunction", e, { userId: 123 });
  alertError(result.message);
}
```

---

#### logWarning()

Logs a non-critical warning with context.

**Source**: [`src/error_logger.js:109`](../../src/error_logger.js#L109)

**Signature**:

```javascript
function logWarning(
  context: string,
  message: string,
  additionalData?: Object
): string
```

**Parameters**:

- `context` (string): Context information
- `message` (string): Warning message
- `additionalData` (Object, optional): Additional data

**Returns**: `string` - The warning message

---

#### logInfo()

Logs informational message for tracking successful operations.

**Source**: [`src/error_logger.js:141`](../../src/error_logger.js#L141)

**Signature**:

```javascript
function logInfo(
  context: string,
  message: string,
  additionalData?: Object
): void
```

**Parameters**:

- `context` (string): Context information
- `message` (string): Info message
- `additionalData` (Object, optional): Additional data

**Returns**: `void`

---

## Data Structures

### Configuration Object

**Structure**:

```javascript
{
  version: string,              // "5"
  salespeople: [
    {
      fullName: string,         // "John Smith"
      aliases: string,          // "JS, Johnny, John"
      displayCode: string       // "JS"
    }
  ],
  visual: {
    nonDeliveredColor: string,          // "#FF0000"
    salespersonErrorColor: string,      // "#FFEBEE"
    duplicateStockFillColor: string,    // "#b4ff0c"
    duplicateStockTextColor: string,    // "#ff0000"
    leaderboardZeroMtdBgColor: string,  // "#F0F8FF"
    paceThresholds: {
      green: number,   // 10
      yellow: number,  // 8
      red: number      // 0
    }
  },
  dates: {
    skipSundays: boolean,           // true
    mondayLogsSaturday: boolean,    // true
    archiveFormat: string           // "M/YY" | "MM/YY" | "MMM/YY"
  },
  lastModified: string,   // "2025-10-10T12:00:00.000Z"
  modifiedBy: string      // "user@example.com"
}
```

**Storage**: Properties Service (primary) + SALESPEOPLE sheet (sync)

**Size Limit**: 8KB (enforced by validation)

---

### Analytics Object

**Structure**:

```javascript
{
  version: string,        // "1.0"
  timestamp: string,      // "2025-10-10T12:00:00.000Z"
  totals: {
    delivered: number,      // 45
    newDelivered: number,   // 28
    usedDelivered: number   // 17
  },
  teamMetrics: {
    sellingDays: number,    // 15
    newPerDay: number,      // 1.87
    usedPerDay: number      // 1.13
  },
  salespersonMetrics: [
    {
      fullName: string,        // "John Smith"
      displayCode: string,     // "JS"
      newSales: number,        // 12.5
      usedSales: number,       // 8.0
      totalSales: number,      // 20.5
      percentOfTeam: number,   // 45.6
      rank: number             // 1
    }
  ],
  dataQuality: {
    unknownSalespeople: Array<string>,
    totalRowsProcessed: number,
    deliveredRowsProcessed: number,
    errorCount: number
  }
}
```

**Cache**: 5-minute TTL in script cache

**Display**: MONTHLY sheet columns S-X

---

## Error Handling

### Error Patterns

**Validation Errors**:

```javascript
try {
  addSalesperson({ fullName: "A" }); // Too short
} catch (error) {
  console.error("Validation failed:", error.message);
  // "Validation failed: Full name must be at least 2 characters"
}
```

**Lock Timeouts**:

```javascript
try {
  processDaily();
} catch (error) {
  if (error.message.includes("acquire script lock")) {
    console.log("Another process is running. Please wait.");
  }
}
```

**Missing Sheets**:

```javascript
try {
  const sheets = getSheets();
} catch (error) {
  console.error("Required sheets missing");
  // User should run setup wizard
}
```

### Logging

**Apps Script Logger**:

```javascript
Logger.log("Daily processing started");
Logger.log(`Processed ${rowCount} rows`);
Logger.log("Error: " + error.toString());
if (error.stack) {
  Logger.log("Stack: " + error.stack);
}
```

**View Logs**: Apps Script Editor → View → Executions

---

## Extensibility & Customization

### Adding Custom Metrics

**Extend Analytics Calculation**:

```javascript
// In sales_analytics.js
function processMonthlyDataForAnalytics(monthlyData, aliasMap) {
  const metrics = {
    totalNew: 0,
    totalUsed: 0,
    // Add custom metric
    totalWithTrades: 0,
    sellingDays: 0,
    salespersonAccumulator: {},
  };

  monthlyData.forEach((row, index) => {
    // Existing logic...

    // Custom: Count deals with trades
    const newTrade = String(row[5] || "").trim();
    const usedTrade = String(row[12] || "").trim();

    if (newTrade && newTrade !== "NT") {
      metrics.totalWithTrades++;
    }
    if (usedTrade && usedTrade !== "NT") {
      metrics.totalWithTrades++;
    }
  });

  return metrics;
}

// Update display formatting
function buildSummarySection(analyticsData) {
  return [
    ["MONTHLY ANALYTICS", "", "", "", "", ""],
    ["Metric", "Value", "Metric", "Value", "", ""],
    [
      "Total Delivered",
      analyticsData.totals.delivered,
      "Selling Days",
      analyticsData.teamMetrics.sellingDays,
      "",
      "",
    ],
    // Add custom metric
    [
      "Deals with Trades",
      analyticsData.totals.withTrades,
      "Trade Percentage",
      `${(
        (analyticsData.totals.withTrades / analyticsData.totals.delivered) *
        100
      ).toFixed(1)}%`,
      "",
      "",
    ],
    // ...
  ];
}
```

### Adding Custom Validation

**Extend Salesperson Validation**:

```javascript
// In config_service.js
function validateSalesperson(data) {
  const errors = [];

  // Existing validation...

  // Custom: Require display code to match initials
  if (data.fullName && data.displayCode) {
    const initials = data.fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    if (data.displayCode !== initials) {
      errors.push(`Display code should be ${initials} based on name`);
    }
  }

  return errors;
}
```

### Adding Custom Conditional Formatting

**Extend TODAY Sheet Rules**:

```javascript
// In setup_wizard.js or core_saleslogPro.js
function applyCustomRules(sheet) {
  const existingRules = sheet.getConditionalFormatRules();

  // Add rule: Highlight high-gross deals (> $5000)
  const highGrossRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(5000)
    .setBackground("#90EE90") // Light green
    .setRanges([sheet.getRange("H2:H101")]) // Gross column
    .build();

  existingRules.push(highGrossRule);
  sheet.setConditionalFormatRules(existingRules);
}
```

### Event Hooks

**Post-Processing Hook**:

```javascript
// In core_saleslogPro.js
function processDaily() {
  withScriptLock(() => {
    // Standard processing...

    try {
      // Existing logic...

      // Hook: Custom post-processing
      onDailyProcessComplete({
        date: dateStr,
        rowsProcessed: rowsToLogToMonthly.length,
        salespeople: countsByFullName,
      });
    } catch (e) {
      // Error handling...
    }
  });
}

// Custom hook implementation
function onDailyProcessComplete(context) {
  Logger.log(
    `Post-processing hook: ${context.rowsProcessed} rows on ${context.date}`
  );

  // Example: Send email summary
  if (context.rowsProcessed > 0) {
    sendDailySummaryEmail(context);
  }

  // Example: Update external system
  updateCRMDashboard(context.salespeople);
}
```

---

## Code Examples

### Example 1: Custom Daily Report

```javascript
/**
 * Generates custom daily report with additional insights
 */
function generateDailyReport() {
  const sheets = getSheets();
  const analytics = calculateMonthlyAnalytics();

  if (!analytics) {
    console.log("No analytics available");
    return;
  }

  // Build report
  const report = [];
  report.push("=== DAILY SALES REPORT ===");
  report.push(`Date: ${new Date().toLocaleDateString()}`);
  report.push("");

  // Team totals
  report.push("TEAM PERFORMANCE:");
  report.push(`  Total Delivered: ${analytics.totals.delivered}`);
  report.push(
    `  New: ${analytics.totals.newDelivered} | Used: ${analytics.totals.usedDelivered}`
  );
  report.push(`  Selling Days: ${analytics.teamMetrics.sellingDays}`);
  report.push(
    `  Daily Average: ${(
      analytics.totals.delivered / analytics.teamMetrics.sellingDays || 0
    ).toFixed(2)}`
  );
  report.push("");

  // Top performers
  report.push("TOP PERFORMERS:");
  analytics.salespersonMetrics.slice(0, 5).forEach((person, index) => {
    report.push(
      `  ${index + 1}. ${person.displayCode}: ${
        person.totalSales
      } units (${person.percentOfTeam.toFixed(1)}%)`
    );
  });

  // Log or email
  console.log(report.join("\n"));

  // Optional: Email to manager
  MailApp.sendEmail({
    to: "manager@dealership.com",
    subject: `Daily Sales Report - ${new Date().toLocaleDateString()}`,
    body: report.join("\n"),
  });
}
```

### Example 2: Bulk Salesperson Import

```javascript
/**
 * Imports salespeople from CSV data
 * CSV format: fullName,aliases,displayCode
 */
function importSalespeopleFromCSV(csvData) {
  const lines = csvData.split("\n");
  const results = {
    success: [],
    errors: [],
  };

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [fullName, aliases, displayCode] = line.split(",");

    try {
      addSalesperson({
        fullName: fullName.trim(),
        aliases: aliases.trim(),
        displayCode: displayCode.trim(),
      });

      results.success.push(fullName.trim());
    } catch (error) {
      results.errors.push({
        name: fullName.trim(),
        error: error.message,
      });
    }
  }

  // Report results
  console.log(`Successfully imported: ${results.success.length}`);
  console.log(`Errors: ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log("\nErrors:");
    results.errors.forEach((err) => {
      console.log(`  ${err.name}: ${err.error}`);
    });
  }

  return results;
}

// Usage:
const csvData = `fullName,aliases,displayCode
John Smith,JS,Johnny,John,JS
Sarah Johnson,SJ,Sarah,Johnson,SJ
Michael Chen,MC,Mike,Michael,MC`;

importSalespeopleFromCSV(csvData);
```

### Example 3: Custom Analytics Dashboard

```javascript
/**
 * Creates custom analytics dashboard in separate sheet
 */
function createAnalyticsDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const analytics = calculateMonthlyAnalytics();

  if (!analytics) {
    console.log("No analytics data available");
    return;
  }

  // Create or get dashboard sheet
  let dashboard = ss.getSheetByName("Dashboard");
  if (!dashboard) {
    dashboard = ss.insertSheet("Dashboard");
  } else {
    dashboard.clear();
  }

  // Header
  dashboard
    .getRange("A1")
    .setValue("SALES DASHBOARD")
    .setFontSize(16)
    .setFontWeight("bold");
  dashboard
    .getRange("A2")
    .setValue(`Last Updated: ${new Date().toLocaleString()}`)
    .setFontSize(10);

  // Team metrics
  let row = 4;
  dashboard
    .getRange(`A${row}`)
    .setValue("TEAM PERFORMANCE")
    .setFontWeight("bold");
  row++;

  const metrics = [
    ["Total Delivered", analytics.totals.delivered],
    ["New Units", analytics.totals.newDelivered],
    ["Used Units", analytics.totals.usedDelivered],
    ["Selling Days", analytics.teamMetrics.sellingDays],
    [
      "Units/Day",
      analytics.teamMetrics.newPerDay + analytics.teamMetrics.usedPerDay,
    ],
  ];

  dashboard.getRange(row, 1, metrics.length, 2).setValues(metrics);
  row += metrics.length + 2;

  // Salesperson rankings
  dashboard
    .getRange(`A${row}`)
    .setValue("SALESPERSON RANKINGS")
    .setFontWeight("bold");
  row++;

  const headers = [["Rank", "Name", "New", "Used", "Total", "% Team"]];
  dashboard.getRange(row, 1, 1, 6).setValues(headers).setFontWeight("bold");
  row++;

  const salespersonData = analytics.salespersonMetrics.map((p) => [
    p.rank,
    p.displayCode,
    p.newSales,
    p.usedSales,
    p.totalSales,
    `${p.percentOfTeam.toFixed(1)}%`,
  ]);

  dashboard
    .getRange(row, 1, salespersonData.length, 6)
    .setValues(salespersonData);

  // Formatting
  dashboard.autoResizeColumns(1, 6);
  dashboard.setFrozenRows(3);

  console.log("Analytics dashboard created");
}
```

### Example 4: Configuration Backup & Restore

```javascript
/**
 * Backs up current configuration to a JSON file
 */
function backupConfiguration() {
  const config = getConfiguration();
  const backup = {
    timestamp: new Date().toISOString(),
    version: "8.0.0",
    configuration: config,
  };

  const json = JSON.stringify(backup, null, 2);

  // Option 1: Log to console (copy manually)
  console.log("=== CONFIGURATION BACKUP ===");
  console.log(json);

  // Option 2: Create in Drive folder
  const folder = DriveApp.getFolderById("YOUR_FOLDER_ID");
  const fileName = `SalesLogPro_Config_${
    new Date().toISOString().split("T")[0]
  }.json`;
  folder.createFile(fileName, json, MimeType.PLAIN_TEXT);

  console.log(`Configuration backed up to: ${fileName}`);
}

/**
 * Restores configuration from JSON backup
 */
function restoreConfiguration(jsonString) {
  try {
    const backup = JSON.parse(jsonString);
    const config = backup.configuration;

    // Validate before restoring
    const errors = validateConfiguration(config);
    if (errors.length > 0) {
      throw new Error("Invalid configuration: " + errors.join("; "));
    }

    // Restore
    updateConfiguration(config);

    console.log("Configuration restored successfully");
  } catch (error) {
    console.error("Restore failed:", error.message);
    throw error;
  }
}
```

---

## API Best Practices

### Performance

1. **Use Caching**: Most APIs cache results - leverage this
2. **Batch Operations**: Read/write in bulk when possible
3. **Minimize API Calls**: Combine operations where appropriate
4. **Lock Protection**: Always use [`withScriptLock()`](#withscriptlock) for mutations

### Error Handling

1. **Try-Catch Blocks**: Wrap API calls in error handlers
2. **User-Friendly Messages**: Show meaningful errors to users
3. **Detailed Logging**: Log full errors to Apps Script Logger
4. **Graceful Degradation**: Continue where possible on non-critical errors

### Validation

1. **Server-Side Only**: Never trust client input
2. **Early Validation**: Check parameters before processing
3. **Clear Error Messages**: Help users fix issues
4. **Constraint Checking**: Enforce limits (size, format, etc.)

### Security

1. **Input Sanitization**: Use [`sanitizeText()`](../../src/config_service.js#L745)
2. **XSS Prevention**: Escape output in HTML contexts
3. **Lock Service**: Prevent race conditions
4. **Permissions**: Verify user has required access

---

_Sales Log Pro API Reference v8.0 | Last Updated: 2025-10-10_
