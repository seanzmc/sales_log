# Sales Log Pro - Automotive Sales Management System

## Transform Your Sales Tracking with Automated Google Sheets Intelligence

**Sales Log Pro** is a production-ready, performance-optimized Google Apps Script solution designed specifically for automotive dealerships. Eliminate manual sales tracking errors, automate daily reporting, and gain instant insights into your team's performance with our battle-tested system.

### Why Choose Sales Log Pro?

✅ **Zero Learning Curve** - Integrates seamlessly with your existing Google Sheets workflow
✅ **Automated Daily Processing** - Log yesterday's sales with a single click
✅ **Real-Time Performance Tracking** - Live leaderboards with pace indicators
✅ **Error Prevention** - Built-in validation catches mistakes before they impact reports
✅ **Flexible Team Management** - Smart alias system handles name variations automatically
✅ **Month-End Automation** - Archive and rollover in seconds, not hours
✅ **Production-Ready** - Script locking prevents data corruption from concurrent access

## What You Get

**Sales Log Pro** (v7.9.8) delivers enterprise-grade sales tracking capabilities:

- **Intelligent Daily Logging**: Automatically processes TODAY sheet entries to MONTHLY logs with sequential numbering
- **Smart Salesperson Management**: Flexible alias system maps nicknames, codes, and full names seamlessly
- **Visual Error Detection**: Red highlights for non-delivered deals, instant identification of data entry issues
- **Conditional Formatting Suite**: Duplicate detection, deposit tracking, and performance pace indicators
- **Monthly Automation**: One-click month rollover with archiving and average calculations
- **Custom Menu Integration**: All functions accessible through your Google Sheets interface

### Production Features in v7.9.8

- **Precise Row Detection**: Advanced algorithm finds last row in A:N range, avoiding extraneous data issues
- **Font Color Preservation**: Maintains formatting during transfers from TODAY to MONTHLY
- **Intelligent FI Processing**: Processes sales based on single-letter Finance Indicator rules (A-Z for delivered)
- **Background Protection**: Preserves trade column backgrounds even when highlighting non-delivered deals
- **Auto-Clear on Fix**: Removes red highlights automatically when issues are corrected
- **Performance Optimized**: Caching system for salesperson maps and selling days calculations
- **Concurrent Access Protection**: Script locking prevents data corruption

## Who This Is For

**Sales Log Pro** is purpose-built for:

- 🚗 Automotive dealerships managing daily sales logs
- 📊 Sales managers tracking team performance
- 💼 Dealership groups needing consistent reporting across locations
- 📈 Operations teams requiring automated month-end processes
- 👥 Sales teams with varying experience levels (alias system handles input variations)

## Quick Start Guide

### System Requirements

- Google Workspace account with Apps Script access
- Google Sheets with appropriate permissions
- Spreadsheet with these exact sheet names: **TODAY**, **MONTHLY**, **SALESPEOPLE**
- Optional: **DEPOSITS** sheet for deposit tracking

### Installation Steps

1. **Create Your Script Project**
   - Open your Google Sheet
   - Go to Extensions → Apps Script
   - Delete the default `Code.gs` content

2. **Deploy Sales Log Pro**
   - Copy the entire contents of [`7.9.8.js`](7.9.8.js)
   - Paste into the Apps Script editor
   - Click Save (Ctrl+S / Cmd+S)

3. **Configure Required Sheets**

   Ensure your spreadsheet contains:

   - **TODAY**: Daily input sheet (range A2:N51 for data entry)
   - **MONTHLY**: Aggregated logs (auto-populated by script)
   - **SALESPEOPLE**: Alias mapping sheet
     - Column A: Full Name (e.g., "John Doe")
     - Column B: Aliases (comma-separated, e.g., "John,JD,Johnny")
     - Column C: Display Code (e.g., "JD")
   - **DEPOSITS** (optional): For deposit validation

4. **Initial Setup**
   - Populate the SALESPEOPLE sheet with your team roster
   - Format the TODAY sheet for daily data entry
   - Close and reopen your spreadsheet to activate the custom menu

5. **Start Using**
   - Look for the "Sales Tools" menu in your spreadsheet
   - Begin entering sales data on the TODAY sheet
   - Use the menu to log yesterday's sales

## Complete Feature Documentation

### Core Capabilities

#### Daily Sales Processing

[`processDaily()`](7.9.8.js:405) is the heart of Sales Log Pro:

- **Smart Row Selection**: Identifies and logs only active rows from TODAY sheet
- **Sequential Numbering**: Auto-generates sequence numbers in Column A
- **FI-Based Processing**: Counts sales based on Finance Indicator flags (single letters A-Z = delivered)
- **Date Formatting**: Handles weekend logging (Saturday on Monday) automatically
- **Comprehensive Summaries**: Detailed alerts showing new/used/trade counts and salesperson breakdowns

#### Salesperson Management System

Our intelligent alias system ([`getSalespersonMaps()`](7.9.8.js:101)) handles:

- **Multiple Input Formats**: Full names, display codes, or custom aliases
- **Case-Insensitive Matching**: "john", "JOHN", and "John" all work
- **Split Sales Support**: "John/Jane" automatically counts as 0.5 for each
- **Performance Caching**: 5-minute cache for instant lookups
- **Unknown Detection**: Alerts when unrecognized inputs are found

#### Visual Indicators & Formatting

**Non-Delivered Deal Highlighting**
Red highlights (NON_DELIVERED_DEAL_COLOR: `#FF0000`) automatically applied to:
- Rows with data but invalid/missing Finance Indicator
- Trade columns (F, M) maintain original backgrounds
- Auto-clears when FI is corrected

**Salesperson Code Errors**
Light red highlights (SALESPERSON_CODE_ERROR_COLOR: `#FFEBEE`) flag:
- Delivered deals with unrecognized salesperson inputs
- Column G (new) or Column N (used) salesperson fields

**TODAY Sheet Detection**
- **Duplicate Stocks**: Yellow-green fill with red text
- **Deposit Matches**: Highlights stocks found in DEPOSITS sheet
- **Leaderboard Pace**: Color-coded performance indicators
  - Green: Pace ≥10 units/month
  - Yellow: Pace 8-10 units/month
  - Red: Pace <8 units/month
  - Blue: All MTD zero (fresh month start)

#### Font Color Transfer

Font colors set on the TODAY sheet are automatically preserved and transferred to MONTHLY during processing, allowing for custom visual coding systems.

### Automated Functions

#### Monthly Recalculation

[`recalcMtdFromMonthly()`](7.9.8.js:647) provides:

- **MTD Recalculation**: Rebuilds Month-to-Date totals from MONTHLY sheet
- **Format Checking**: Applies formatting fixes to existing MONTHLY data
- **Error Highlighting**: Identifies and marks salesperson code errors
- **Leaderboard Updates**: Sorts by MTD, then by average

#### Month Rollover Process

[`rolloverMonth()`](7.9.8.js:732) automates month-end tasks:

1. **Archives Current Month**: Creates dated sheet (e.g., "5/25")
2. **Copies Final Leaderboard**: Preserves formatting and values
3. **Clears MONTHLY**: Resets for new month while maintaining structure
4. **Resets MTD**: Clears Month-to-Date counts
5. **Recalculates Averages**: 3-month rolling averages based on archives
6. **Confirmation Required**: Prevents accidental execution

## Function Reference Guide

### Core Utilities

- [`getSheets()`](7.9.8.js:46)
  Retrieves TODAY, MONTHLY, and SALESPEOPLE sheet references with error checking

- [`memoizedGetSellingDays(year, month)`](7.9.8.js:70)
  Returns cached selling days (Mon-Sat, excludes Sundays) for pace calculations

- [`getSalespersonMaps()`](7.9.8.js:101)
  Builds and caches alias and display code mappings from SALESPEOPLE sheet

### Data Processing

- [`tallyCounts(rows, aliasMap, sides)`](7.9.8.js:221)
  Counts salesperson sales from row data, handles split sales, identifies unknowns

- [`summarizeRows(rows)`](7.9.8.js:248)
  Summarizes new/used/trade counts for reporting

- [`applyMonthlyRowFormatting(sheet, rowsData, startSheetRow, aliasMap)`](7.9.8.js:303)
  Applies conditional formatting to MONTHLY rows, returns error row numbers

- [`findLastRowInCols(sheet, startCol, endCol)`](7.9.8.js:392)
  **NEW in 7.9.8**: Accurately finds last data row within column range, ignores extraneous data

### Formatting & Display

- [`reapplyCF()`](7.9.8.js:541)
  Reapplies all conditional formatting rules to TODAY sheet

- [`filterTrafficLightRules(rules)`](7.9.8.js:169)
  Filters script-managed CF rules for clean replacement

- [`setCFRulesSheet(sheet, rules)`](7.9.8.js:179)
  Applies CF rule array to specified sheet

### Helper Functions

- [`roundHalf(v)`](7.9.8.js:154)
  Rounds numbers to nearest 0.5 for averaging

- [`formatDateOffset(offsetDays)`](7.9.8.js:158)
  Formats dates for logging, handles weekend adjustments

- [`withScriptLock(fn)`](7.9.8.js:184)
  Executes functions with script lock protection

- [`toastInfo(msg, title)`](7.9.8.js:205)
  Displays toast notifications

- [`showCustomAlert(title, msg)`](7.9.8.js:209)
  Shows custom alert dialogs

- [`alertError(msg, title)`](7.9.8.js:216)
  Displays error alerts

### Menu Integration

- [`onOpen()`](7.9.8.js:843)
  Creates "Sales Tools" custom menu on spreadsheet open

## User Guide

### Daily Workflow

1. **Enter Sales Data**
   - Open TODAY sheet
   - Enter sales information in columns B-N
   - Use any configured salesperson name/alias format

2. **Log Yesterday's Sales**
   - Click **Sales Tools** → **Log Yesterday's Sales**
   - Review summary dialog
   - Verify MONTHLY sheet updates

3. **Handle Errors**
   - Red highlights = missing/invalid FI flags
   - Light red highlights = unrecognized salesperson codes
   - Fix data and rerun recalculation

### Monthly Workflow

1. **Monitor Progress**
   - Check leaderboard on TODAY sheet
   - Color-coded pace indicators show performance

2. **End of Month**
   - Click **Sales Tools** → **Start New Month (Rollover)**
   - Confirm action
   - Verify archive creation
   - Start fresh with cleared MTD

### Menu Commands

**Sales Tools Menu** provides three core functions:

1. **Log Yesterday's Sales**
   - Executes [`processDaily()`](7.9.8.js:405)
   - Logs TODAY data to MONTHLY
   - Updates leaderboard
   - Reapplies conditional formatting

2. **Recalculate MTD & Check Monthly Errors/Formats**
   - Executes [`recalcMtdFromMonthly()`](7.9.8.js:647)
   - Rebuilds MTD from MONTHLY data
   - Checks and fixes formatting
   - Identifies errors

3. **Start New Month (Rollover)**
   - Executes [`rolloverMonth()`](7.9.8.js:732)
   - Archives previous month
   - Resets for new month
   - Recalculates averages

## Configuration Guide

### Customizable Constants

Located at the top of [`7.9.8.js`](7.9.8.js:11-38):

**Range Definitions** (RANGES object)
```javascript
dailyData: "A2:N51"        // TODAY sheet input range
dailyClear: "B2:N51"       // Range to clear after processing
leaderboard: "P2:R28"      // Leaderboard range
mtd: "Q2:Q28"              // MTD column
avg: "R2:R28"              // Average column
todayNewCarDataRange: "B2:G101"   // New car CF range
todayUsedCarDataRange: "I2:N101"  // Used car CF range
```

**Color Customization**
```javascript
NON_DELIVERED_DEAL_COLOR = "#FF0000"      // Red for non-delivered
SALESPERSON_CODE_ERROR_COLOR = "#FFEBEE"  // Light red for errors
DUPLICATE_STOCK_FILL_COLOR = "#b4ff0c"    // Yellow-green for duplicates
DUPLICATE_STOCK_TEXT_COLOR = "#ff0000"    // Red text for duplicates
LEADERBOARD_ZERO_MTD_BG_COLOR = "#F0F8FF" // Blue for zero MTD
```

**Pace Thresholds**

Modify in [`reapplyCF()`](7.9.8.js:541):
- Green: `>= 10` units/month pace
- Yellow: `8-10` units/month pace
- Red: `< 8` units/month pace

### SALESPEOPLE Sheet Structure

| Column | Purpose | Example |
|--------|---------|---------|
| A | Full Name | John Doe |
| B | Aliases | John,JD,Johnny,j.doe |
| C | Display Code | JD |

**Best Practices:**
- Use consistent full names (this becomes the key)
- Include common variations in aliases
- Keep display codes short (2-3 characters)
- Separate aliases with commas, no spaces needed

## Technical Specifications

### Google Sheets API Integration

Sales Log Pro interacts with Google Sheets via SpreadsheetApp:

- **getActive()**: Retrieves active spreadsheet reference
- **getSheetByName()**: Accesses sheets by exact name
- **getRange()**: Reads/writes cell ranges and formatting
- **setConditionalFormatRules()**: Manages conditional formatting
- **getUi()**: Creates alerts and custom menus
- **LockService**: Prevents concurrent execution conflicts
- **CacheService**: Optimizes performance with 5-minute caching
- **Logger**: Provides execution logging

### Performance Optimizations

- **Caching Strategy**: Salesperson maps and selling days cached for 5 minutes
- **Batch Operations**: Reads/writes performed in bulk to minimize API calls
- **Script Locking**: 30-second timeout prevents concurrent execution
- **Lazy Loading**: Sheet references loaded only when needed
- **Range Optimization**: Uses precise ranges instead of full sheet access

### Error Handling

- **Sheet Validation**: Verifies required sheets exist before execution
- **Lock Timeouts**: Prevents conflicts with clear error messaging
- **Unknown Input Tracking**: Collects and reports unrecognized salesperson codes
- **Format Recovery**: Automatically corrects highlighting when issues resolved

## Frequently Asked Questions

**Q: Why does the script skip on Sundays?**
A: To prevent weekend logging issues. Modify [`processDaily()`](7.9.8.js:405) line 410 if your dealership has Sunday hours.

**Q: How do I add a new salesperson?**
A: Add a row to the SALESPEOPLE sheet with their full name (Col A), aliases (Col B), and display code (Col C). Cache updates automatically within 5 minutes.

**Q: What if I have duplicate stock numbers?**
A: Duplicates are highlighted in yellow-green with red text on the TODAY sheet. This is a warning, not an error - verify if intentional.

**Q: Can I customize the highlight colors?**
A: Yes! Modify the color constants at the top of [`7.9.8.js`](7.9.8.js:28-37). Use hex color codes.

**Q: The script says it can't acquire a lock. What does this mean?**
A: Another process is running. Wait 30 seconds and try again. This prevents data corruption from simultaneous executions.

**Q: How do I handle split sales (two salespersons)?**
A: Use the format "John/Jane" in the salesperson field. The system automatically counts 0.5 for each person.

**Q: What happens if I delete an archived month sheet?**
A: Rolling averages will recalculate without that month's data. The archive won't be recreated - keep backups of archived sheets.

**Q: Can I change the leaderboard pace thresholds?**
A: Yes. Edit the pace formulas in [`reapplyCF()`](7.9.8.js:622-625). Current thresholds: ≥10 green, 8-10 yellow, <8 red.

**Q: Why aren't my font colors transferring to MONTHLY?**
A: Font colors only transfer during [`processDaily()`](7.9.8.js:405). Manually added colors won't transfer retroactively.

**Q: How many salespersons can the system handle?**
A: Tested with 50+ salespersons. Performance remains excellent due to caching system.

**Q: What if I need to log multiple days at once?**
A: Run [`processDaily()`](7.9.8.js:405) multiple times with different data sets. The script processes whatever is currently on TODAY sheet.

## Known Limitations

- **Sunday Execution**: Script skips Sunday runs by design (line 410 check)
- **Sheet Names**: Case-sensitive exact matches required (TODAY, MONTHLY, SALESPEOPLE)
- **Column Requirements**: Minimum 14 columns (A-N) required on MONTHLY sheet
- **Archive Naming**: Uses MM/YY format - manual sheets with same names will conflict
- **Font Color Direction**: Only TODAY → MONTHLY during processDaily
- **Weekend Dates**: Saturday logging occurs on Monday (configurable in formatDateOffset)

## Advanced Customization

### Modifying Date Behavior

In [`formatDateOffset()`](7.9.8.js:158), adjust the weekend logic:

```javascript
if (dayOfWeek === 1 && offsetDays === 1) daysToSubtract = 2; // Monday logs Saturday
```

### Extending Selling Days Logic

Modify [`memoizedGetSellingDays()`](7.9.8.js:70) to exclude additional days:

```javascript
if (d.getDay() !== 0 && d.getDay() !== 6) elapsed++; // Exclude Sundays AND Saturdays
```

### Custom Validation Rules

Add validation in [`applyMonthlyRowFormatting()`](7.9.8.js:303) to implement custom business rules.

## Code Examples

### Manual Daily Processing

```javascript
processDaily();
```

### Manual MTD Recalculation

```javascript
recalcMtdFromMonthly();
```

### Custom Date Formatting

```javascript
const dateStr = formatDateOffset(1); // Returns "1/15" format
```

### Accessing Salesperson Data

```javascript
const { aliasMap, displayCodeMap } = getSalespersonMaps();
const fullName = aliasMap["JD"];  // Returns "John Doe"
const displayCode = displayCodeMap["John Doe"];  // Returns "JD"
```

## Support & Updates

### What's New in v7.9.8

- ✨ **Enhanced Row Detection**: New [`findLastRowInCols()`](7.9.8.js:392) function accurately finds last row in A:N range
- 🎨 **Font Color Preservation**: Full font color transfer from TODAY to MONTHLY
- 🔧 **Improved Performance**: Optimized range detection algorithms
- 📝 **Better Documentation**: Comprehensive inline code comments
- 🛡️ **Robust Error Handling**: Enhanced validation and error recovery

### Version History

- **v7.9.8** (Current): Enhanced row detection, font color handling
- **v7.9.7**: Foundation release with core functionality

### Getting Help

For technical support:

1. Check this documentation first
2. Review the FAQ section
3. Examine error messages in the Apps Script logs (View → Logs)
4. Verify sheet names and structure match requirements

## License & Terms

**Sales Log Pro** is provided as-is for use in automotive dealership environments. Ensure compliance with your organization's data handling policies when managing sales information.

---

**Ready to transform your sales tracking?** Install **Sales Log Pro** today and experience the difference that automation makes.

*Current Version: 7.9.8 | Production-Ready | Battle-Tested*
