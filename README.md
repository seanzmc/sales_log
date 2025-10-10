# Sales Log Pro - Automotive Sales Management System

## Transform Your Sales Tracking with Automated Google Sheets Intelligence

**Sales Log Pro** is a production-ready, performance-optimized Google Apps Script solution designed specifically for automotive dealerships. Eliminate manual sales tracking errors, automate daily reporting, and gain instant insights into your team's performance with our battle-tested system.

### Why Choose Sales Log Pro?

✅ **Zero Learning Curve** - Integrates seamlessly with your existing Google Sheets workflow  
✅ **5-Minute Setup** - One-click wizard creates everything you need  
✅ **Automated Daily Processing** - Log yesterday's sales with a single click  
✅ **Real-Time Performance Tracking** - Live leaderboards with pace indicators  
✅ **Advanced Analytics Dashboard** - Comprehensive sales metrics and rankings  
✅ **User-Friendly Configuration** - No code editing required  
✅ **Error Prevention** - Built-in validation catches mistakes before they impact reports  
✅ **Flexible Team Management** - Smart alias system handles name variations automatically  
✅ **Month-End Automation** - Archive and rollover in seconds, not hours  
✅ **Production-Ready** - Script locking prevents data corruption from concurrent access

## What's New in Latest Release

### ✨ Easy Setup Wizard
- **One-Click Installation**: Creates all required sheets automatically
- **Smart Configuration**: Pre-configured formatting and formulas
- **Safe to Re-run**: Idempotent design won't overwrite existing data
- **Menu Access**: Sales Tools → 🚀 Run Setup Wizard

### ⚙️ Settings Sidebar Interface
- **No More Code Editing**: User-friendly configuration UI
- **Three-Tab Organization**: Sales Team, Visual Customization, Date Settings
- **Live Preview**: See changes before applying
- **Auto-Migration**: Seamlessly upgrades from hardcoded constants
- **Menu Access**: Sales Tools → ⚙️ Settings

### 📊 Analytics Dashboard
- **Automatic Calculation**: Updates after each daily processing
- **Comprehensive Metrics**: Total sales, new/used breakdown, per-day averages
- **Team Rankings**: Salesperson performance with percentages and ranks
- **Historical Preservation**: Analytics included in monthly archives
- **Manual Refresh**: Sales Tools → 🔄 Refresh Analytics

## What You Get

**Sales Log Pro** delivers enterprise-grade sales tracking capabilities:

- **Intelligent Daily Logging**: Automatically processes TODAY sheet entries to MONTHLY logs with sequential numbering
- **Smart Salesperson Management**: Flexible alias system maps nicknames, codes, and full names seamlessly
- **Visual Error Detection**: Red highlights for non-delivered deals, instant identification of data entry issues
- **Conditional Formatting Suite**: Duplicate detection, deposit tracking, and performance pace indicators
- **Monthly Automation**: One-click month rollover with archiving and average calculations
- **Analytics Integration**: Comprehensive sales metrics with team and individual breakdowns
- **Custom Menu Integration**: All functions accessible through your Google Sheets interface

### Production Features

- **Precise Row Detection**: Advanced algorithm finds last row in A:N range, avoiding extraneous data issues
- **Font Color Preservation**: Maintains formatting during transfers from TODAY to MONTHLY
- **Intelligent FI Processing**: Processes sales based on single-letter Finance Indicator rules (A-Z for delivered)
- **Background Protection**: Preserves trade column backgrounds even when highlighting non-delivered deals
- **Auto-Clear on Fix**: Removes red highlights automatically when issues are corrected
- **Performance Optimized**: Caching system for salesperson maps and selling days calculations
- **Concurrent Access Protection**: Script locking prevents data corruption
- **Event-Driven Automation**: All automation triggered by user actions (no time-based triggers)

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
- Web browser (Chrome, Firefox, Safari, or Edge recommended)

### Installation: The Easy Way (Recommended)

1. **Create Your Spreadsheet**
   - Open Google Sheets
   - Create a new spreadsheet or open an existing one

2. **Deploy Sales Log Pro**
   - Go to Extensions → Apps Script
   - Delete the default `Code.gs` content
   - Copy the entire contents of [`saleslogPro.js`](saleslogPro.js), [`config_service.js`](config_service.js), [`sales_analytics.js`](sales_analytics.js), and [`setup_wizard.js`](setup_wizard.js)
   - Create files for [`config_sidebar.html`](config_sidebar.html) (HTML file)
   - Update [`appsscript.json`](appsscript.json) with required OAuth scopes
   - Click Save (Ctrl+S / Cmd+S)

3. **Run the Setup Wizard**
   - Close and reopen your spreadsheet
   - Click **Sales Tools** → **🚀 Run Setup Wizard**
   - Review the summary dialog showing created sheets
   - Your system is ready to use!

4. **Configure Your Team (Optional)**
   - Click **Sales Tools** → **⚙️ Settings**
   - Go to **👥 Sales Team** tab
   - Replace example salespeople with your actual team
   - Click **Save Changes**

### What the Setup Wizard Creates

The wizard automatically creates four essential sheets:

#### TODAY Sheet
- Daily sales entry and leaderboard tracking
- Data entry area for new and used car sales (columns A-N)
- Leaderboard with salesperson names, MTD sales, and 3-month averages (columns P-R)
- Conditional formatting for duplicate stock numbers and deposits
- Automatically configured for daily processing

#### MONTHLY Sheet
- Historical record of all sales for the current month
- Stores processed daily entries with date headers
- Tracks delivered vs. non-delivered deals
- Highlights errors (non-delivered deals, invalid salesperson codes)
- **Analytics columns S-X**: Comprehensive sales metrics and team rankings

#### SALESPEOPLE Sheet
- Salesperson name/alias management
- Maps full names to aliases and display codes
- Enables flexible data entry (enter "JS" instead of "John Smith")
- Includes example data to guide setup
- Syncs with Properties Service configuration

#### DEPOSITS Sheet
- Track customer deposits to prevent duplicate entries
- Records deposit information including stock numbers
- Conditional formatting flags stock numbers with deposits
- **Columns**: Date, Customer, Amount, Type, Notes, Salesperson, Stock Number

## Complete Feature Documentation

### Setup & Configuration

#### 🚀 Easy Setup Wizard

The Setup Wizard ([`setup_wizard.js`](setup_wizard.js:12)) provides a streamlined installation experience:

**How to Use:**
1. Open your spreadsheet
2. Click **Sales Tools** → **🚀 Run Setup Wizard**
3. Review the summary dialog

**What It Does:**
- Creates all four required sheets (TODAY, MONTHLY, SALESPEOPLE, DEPOSITS)
- Applies proper formatting and conditional formatting rules
- Sets up headers and column configurations
- Includes example data in SALESPEOPLE sheet
- **Idempotent Design**: Safe to run multiple times - only creates missing sheets

**Example Output:**
```
SHEETS CREATED:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

Setup complete! Your sales log spreadsheet is ready to use.
```

#### ⚙️ Settings Sidebar Interface

The Settings Sidebar ([`config_service.js`](config_service.js:1), [`config_sidebar.html`](config_sidebar.html)) replaces manual code editing with a user-friendly UI:

**Access:** Sales Tools → ⚙️ Settings

**Tab 1: 👥 Sales Team Management**
- **Add Salespeople**: Full name, aliases (comma-separated), display code
- **Edit Salespeople**: Click edit button to modify existing team members
- **Delete Salespeople**: Remove team members with confirmation dialog
- **Alias Validation**: Prevents duplicate aliases across team
- **Auto-Sync**: Changes sync to SALESPEOPLE sheet for backward compatibility

**Tab 2: 🎨 Visual Customization**
- **Color Settings**:
  - Non-Delivered Deal Color (default: #FF0000)
  - Salesperson Error Color (default: #FFEBEE)
  - Duplicate Stock Fill/Text Colors (default: #b4ff0c/#ff0000)
  - Leaderboard Zero MTD Background (default: #F0F8FF)
- **Pace Thresholds**:
  - Green (Excellent): ≥10 units/month
  - Yellow (Good): 8-10 units/month
  - Red (Needs Attention): <8 units/month
- **Reset to Defaults**: One-click restore of original settings

**Tab 3: 📅 Date Settings**
- **Skip Sundays**: Exclude Sundays from selling day calculations
- **Monday Logs Saturday**: When enabled, Monday defaults to logging Saturday sales
- **Archive Format**: Choose from M/YY, MM/YY, or MMM/YY formats

**Technical Details:**
- **Storage**: Properties Service (primary) + SALESPEOPLE sheet (sync)
- **Auto-Migration**: First settings open migrates from hardcoded constants
- **Performance**: <300ms for all operations, 10-minute cache TTL
- **Security**: Server-side validation, XSS prevention, LockService for atomic updates

#### Configuration Functions

Key configuration functions in [`config_service.js`](config_service.js):

- [`getConfiguration()`](config_service.js:120) - Retrieves full configuration from Properties Service
- [`updateConfiguration(updates)`](config_service.js:167) - Atomic updates with validation
- [`getSalespeople()`](config_service.js:257) - Returns salesperson array
- [`addSalesperson(data)`](config_service.js:275) - Adds new salesperson with validation
- [`updateSalesperson(fullName, data)`](config_service.js:325) - Updates existing salesperson
- [`deleteSalesperson(fullName)`](config_service.js:382) - Removes salesperson
- [`migrateToConfigUI()`](config_service.js:609) - Auto-migration from hardcoded constants
- [`syncToSalespeopleSheet(config)`](config_service.js:694) - Syncs to SALESPEOPLE sheet

### Core Capabilities

#### Daily Sales Processing

[`processDaily()`](saleslogPro.js:511) is the heart of Sales Log Pro:

- **Smart Row Selection**: Identifies and logs only active rows from TODAY sheet
- **Sequential Numbering**: Auto-generates sequence numbers in Column A
- **FI-Based Processing**: Counts sales based on Finance Indicator flags (single letters A-Z = delivered)
- **Date Formatting**: Handles weekend logging (Saturday on Monday) based on configuration
- **Font Color Transfer**: Preserves font colors from TODAY to MONTHLY
- **Comprehensive Summaries**: Detailed alerts showing new/used/trade counts and salesperson breakdowns
- **Auto-Analytics**: Triggers analytics calculation after processing

**Configuration Integration:**
- Respects [`shouldSkipSundays()`](config_service.js:69) setting
- Uses [`shouldMondayLogSaturday()`](config_service.js:84) for date handling
- Applies configured colors via [`getVisualConfig()`](saleslogPro.js:52)

#### Salesperson Management System

Our intelligent alias system ([`getSalespersonMaps()`](saleslogPro.js:192)) handles:

- **Multiple Input Formats**: Full names, display codes, or custom aliases
- **Case-Insensitive Matching**: "john", "JOHN", and "John" all work
- **Split Sales Support**: "John/Jane" automatically counts as 0.5 for each
- **Performance Caching**: 5-minute cache for instant lookups
- **Unknown Detection**: Alerts when unrecognized inputs are found
- **UI Management**: Add/edit/delete through Settings sidebar

#### Visual Indicators & Formatting

**Non-Delivered Deal Highlighting**
- Red highlights (configurable via Settings) automatically applied to:
  - Rows with data but invalid/missing Finance Indicator
  - Trade columns (F, M) maintain original backgrounds
  - Auto-clears when FI is corrected

**Salesperson Code Errors**
- Light red highlights (configurable) flag:
  - Delivered deals with unrecognized salesperson inputs
  - Column G (new) or Column N (used) salesperson fields

**TODAY Sheet Detection**
- **Duplicate Stocks**: Yellow-green fill with red text (configurable)
- **Deposit Matches**: Highlights stocks found in DEPOSITS sheet
- **Leaderboard Pace**: Color-coded performance indicators (configurable thresholds)

#### Font Color Transfer

Font colors set on the TODAY sheet are automatically preserved and transferred to MONTHLY during processing, allowing for custom visual coding systems.

### Analytics & Reporting

#### 📊 Analytics Dashboard

The Analytics system ([`sales_analytics.js`](sales_analytics.js:41)) provides comprehensive sales insights:

**Automatic Calculation:**
- Triggered after each [`processDaily()`](saleslogPro.js:511) execution
- Updates MONTHLY sheet columns S-X with latest metrics
- No manual intervention required

**Metrics Tracked:**

**Team-Level Totals:**
- Total Delivered Units
- New Delivered Count
- Used Delivered Count
- Selling Days Elapsed
- New Units per Selling Day
- Used Units per Selling Day

**Per-Salesperson Analytics:**
- Individual new/used sales counts
- Total sales per person
- Percentage of team total
- Performance ranking (1st, 2nd, 3rd, etc.)

**Storage Location:**
- **MONTHLY Sheet Columns S-X**:
  - Column S: Salesperson Display Code
  - Column T: New Sales Count
  - Column U: Used Sales Count
  - Column V: Total Sales Count
  - Column W: Percentage of Team Total
  - Column X: Rank

**Display Format:**
```
MONTHLY ANALYTICS
Metric              Value    Metric              Value
Total Delivered     42       Selling Days        15
New Delivered       28       New Sold per Day    1.87
Used Delivered      14       Used Sold per Day   0.93
Last Updated        10/10/2025 2:00:00 PM

Salesperson    New    Used    Total    % of Team    Rank
JS             12     8       20       47.6%        1
JD             10     4       14       33.3%        2
BW             6      2       8        19.0%        3
```

**Analytics Functions:**

- [`calculateMonthlyAnalytics()`](sales_analytics.js:41) - Processes MONTHLY data for metrics
- [`writeAnalyticsToMonthly(analyticsData, sheet)`](sales_analytics.js:124) - Writes to columns S-X
- [`getMonthlyAnalyticsSummary()`](sales_analytics.js:173) - Reads existing analytics
- [`refreshAnalyticsManually()`](sales_analytics.js:650) - Manual refresh via menu

**Manual Refresh:**
- Menu: **Sales Tools** → **🔄 Refresh Analytics**
- Clears cache and recalculates all metrics
- Shows summary dialog with totals and top performer

**Month Rollover Preservation:**
- Analytics automatically calculated before archiving
- Preserved in archived month sheets (e.g., "5/25", "6/25")
- Historical analytics retained for trending analysis

### Automated Functions

#### Monthly Recalculation

[`recalcMtdFromMonthly()`](saleslogPro.js:778) provides:

- **MTD Recalculation**: Rebuilds Month-to-Date totals from MONTHLY sheet
- **Format Checking**: Applies formatting fixes to existing MONTHLY data
- **Error Highlighting**: Identifies and marks salesperson code errors
- **Leaderboard Updates**: Sorts by MTD, then by average

#### Month Rollover Process

[`rolloverMonth()`](saleslogPro.js:863) automates month-end tasks:

1. **Pre-Rollover Analytics**: Calculates final analytics for accuracy
2. **Archives Current Month**: Creates dated sheet (format from Settings)
3. **Copies Final Leaderboard**: Preserves formatting and values
4. **Includes Analytics**: Archives columns S-X with final month metrics
5. **Clears MONTHLY**: Resets for new month while maintaining structure
6. **Resets MTD**: Clears Month-to-Date counts
7. **Recalculates Averages**: 3-month rolling averages based on archives
8. **Confirmation Required**: Prevents accidental execution

### Automation & Integration

#### Event-Driven Automation

Sales Log Pro uses **smart automation** without time-based triggers:

**Auto-Migration:**
- Triggered on first Settings sidebar open
- Migrates hardcoded constants to Properties Service
- Safe to run multiple times (idempotent)
- Function: [`migrateToConfigUI()`](config_service.js:609)

**Auto-Analytics:**
- Triggered after [`processDaily()`](saleslogPro.js:511) completion
- Calculates comprehensive sales metrics
- Writes to MONTHLY columns S-X
- Function: [`calculateMonthlyAnalytics()`](sales_analytics.js:41)

**Configuration Sync:**
- Bidirectional sync between Properties Service and SALESPEOPLE sheet
- Updates SALESPEOPLE sheet when Settings saved
- Maintains backward compatibility
- Function: [`syncToSalespeopleSheet()`](config_service.js:694)

**Analytics in Rollover:**
- Pre-archive analytics calculation for accuracy
- Ensures final month metrics preserved
- Triggered during [`rolloverMonth()`](saleslogPro.js:863)

**Why Event-Driven?**
- ✅ No quota consumption from time-based triggers
- ✅ Runs only when users take action
- ✅ Predictable and controllable behavior
- ✅ Better performance and resource usage

## Function Reference Guide

### Core Utilities

- [`getSheets()`](saleslogPro.js:125)
  Retrieves TODAY, MONTHLY, and SALESPEOPLE sheet references with error checking

- [`memoizedGetSellingDays(year, month)`](saleslogPro.js:149)
  Returns cached selling days (respects Sunday configuration) for pace calculations

- [`getSalespersonMaps()`](saleslogPro.js:192)
  Builds and caches alias and display code mappings from SALESPEOPLE sheet

### Configuration Management

- [`getConfiguration()`](config_service.js:120)
  Returns full configuration from Properties Service with caching

- [`updateConfiguration(updates)`](config_service.js:167)
  Atomic updates with LockService protection and validation

- [`getVisualConfig()`](saleslogPro.js:52)
  Loads visual configuration (colors, thresholds) with caching

- [`getDateSettings()`](config_service.js:54)
  Gets date configuration settings (Sunday skip, Monday behavior, archive format)

### Data Processing

- [`tallyCounts(rows, aliasMap, sides)`](saleslogPro.js:320)
  Counts salesperson sales from row data, handles split sales, identifies unknowns

- [`summarizeRows(rows)`](saleslogPro.js:347)
  Summarizes new/used/trade counts for reporting

- [`applyMonthlyRowFormatting(sheet, rowsData, startSheetRow, aliasMap)`](saleslogPro.js:402)
  Applies conditional formatting to MONTHLY rows, returns error row numbers

- [`findLastRowInCols(sheet, startCol, endCol)`](saleslogPro.js:498)
  Accurately finds last data row within column range, ignores extraneous data

### Analytics Functions

- [`calculateMonthlyAnalytics()`](sales_analytics.js:41)
  Processes MONTHLY data for comprehensive analytics

- [`writeAnalyticsToMonthly(analyticsData, monthlySheet)`](sales_analytics.js:124)
  Writes analytics to MONTHLY sheet columns S-X

- [`refreshAnalyticsManually()`](sales_analytics.js:650)
  Manual analytics refresh callable from menu

- [`invalidateAnalyticsCache()`](sales_analytics.js:226)
  Clears analytics cache after data changes

### Formatting & Display

- [`reapplyCF()`](saleslogPro.js:665)
  Reapplies all conditional formatting rules to TODAY sheet

- [`formatDateOffset(offsetDays)`](saleslogPro.js:249)
  Formats dates for logging, handles weekend adjustments based on configuration

### Helper Functions

- [`roundHalf(v)`](saleslogPro.js:245)
  Rounds numbers to nearest 0.5 for averaging

- [`withScriptLock(fn)`](saleslogPro.js:283)
  Executes functions with script lock protection

- [`toastInfo(msg, title)`](saleslogPro.js:304)
  Displays toast notifications

- [`showCustomAlert(title, msg)`](saleslogPro.js:308)
  Shows custom alert dialogs

- [`alertError(msg, title)`](saleslogPro.js:315)
  Displays error alerts

### Menu Integration

- [`onOpen()`](saleslogPro.js:1023)
  Creates "Sales Tools" custom menu on spreadsheet open, runs migration check

- [`runSetupWizard()`](setup_wizard.js:12)
  Executes the Easy Setup Wizard

- [`openConfigurationSidebar()`](saleslogPro.js:996)
  Opens the Settings sidebar interface

## User Guide

### Daily Workflow

1. **Enter Sales Data**
   - Open TODAY sheet
   - Enter sales information in columns B-N
   - Use any configured salesperson name/alias format
   - Font colors applied here transfer to MONTHLY

2. **Log Yesterday's Sales**
   - Click **Sales Tools** → **Log Yesterday's Sales**
   - Review summary dialog showing:
     - New/Used/Total delivered counts
     - Trade counts
     - Salesperson breakdowns
     - Any errors detected
   - Verify MONTHLY sheet updates
   - Check analytics in columns S-X

3. **Handle Errors**
   - Red highlights = missing/invalid FI flags
   - Light red highlights = unrecognized salesperson codes
   - Fix data and rerun recalculation

4. **View Analytics**
   - Check MONTHLY sheet columns S-X
   - Review team totals and individual rankings
   - Use manual refresh if needed: **Sales Tools** → **🔄 Refresh Analytics**

### Configuration Workflow

1. **Open Settings**
   - Click **Sales Tools** → **⚙️ Settings**
   - First-time: Auto-migration runs automatically

2. **Manage Sales Team**
   - Go to **👥 Sales Team** tab
   - Add/edit/delete salespeople as needed
   - Configure aliases for flexible data entry
   - Click **Save Changes**

3. **Customize Appearance**
   - Go to **🎨 Visual Customization** tab
   - Adjust colors using color pickers
   - Set pace thresholds for leaderboard
   - Preview changes before saving

4. **Configure Dates**
   - Go to **📅 Date Settings** tab
   - Enable/disable Sunday counting
   - Configure Monday behavior
   - Choose archive format
   - Click **Save Changes**

### Monthly Workflow

1. **Monitor Progress**
   - Check leaderboard on TODAY sheet
   - Color-coded pace indicators show performance
   - Review analytics in MONTHLY columns S-X

2. **End of Month**
   - Click **Sales Tools** → **Start New Month (Rollover)**
   - Confirm action
   - Verify archive creation (includes analytics)
   - Start fresh with cleared MTD

### Menu Commands

**Sales Tools Menu** provides comprehensive functions:

1. **🚀 Run Setup Wizard**
   - Executes [`runSetupWizard()`](setup_wizard.js:12)
   - Creates all required sheets
   - Safe to run multiple times

2. **Log Yesterday's Sales**
   - Executes [`processDaily()`](saleslogPro.js:511)
   - Logs TODAY data to MONTHLY
   - Updates leaderboard and analytics
   - Reapplies conditional formatting

3. **Recalculate MTD & Check Monthly Errors/Formats**
   - Executes [`recalcMtdFromMonthly()`](saleslogPro.js:778)
   - Rebuilds MTD from MONTHLY data
   - Checks and fixes formatting
   - Identifies errors

4. **🔄 Refresh Analytics**
   - Executes [`refreshAnalyticsManually()`](sales_analytics.js:650)
   - Recalculates all analytics
   - Updates MONTHLY columns S-X
   - Shows summary dialog

5. **Start New Month (Rollover)**
   - Executes [`rolloverMonth()`](saleslogPro.js:863)
   - Archives previous month (with analytics)
   - Resets for new month
   - Recalculates averages

6. **⚙️ Settings**
   - Executes [`openConfigurationSidebar()`](saleslogPro.js:996)
   - Opens configuration UI
   - Manages team, colors, and dates

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
- **PropertiesService**: Stores user configuration
- **Logger**: Provides execution logging

### Performance Optimizations

- **Caching Strategy**: Salesperson maps and selling days cached for 5 minutes
- **Configuration Cache**: Visual config cached for 10 minutes
- **Analytics Cache**: Results cached to reduce recalculation
- **Batch Operations**: Reads/writes performed in bulk to minimize API calls
- **Script Locking**: 30-second timeout prevents concurrent execution
- **Lazy Loading**: Sheet references loaded only when needed
- **Range Optimization**: Uses precise ranges instead of full sheet access

### Error Handling

- **Sheet Validation**: Verifies required sheets exist before execution
- **Lock Timeouts**: Prevents conflicts with clear error messaging
- **Unknown Input Tracking**: Collects and reports unrecognized salesperson codes
- **Format Recovery**: Automatically corrects highlighting when issues resolved
- **Configuration Validation**: Server-side validation prevents invalid settings
- **Graceful Degradation**: Non-critical errors logged but don't stop execution

## Frequently Asked Questions

**Q: How do I get started?**
A: Use the Easy Setup Wizard! Click **Sales Tools** → **🚀 Run Setup Wizard**. It creates everything you need in seconds.

**Q: Do I need to edit code to configure the system?**
A: No! Use the Settings sidebar (**Sales Tools** → **⚙️ Settings**) to configure everything through a user-friendly interface.

**Q: Why does the script skip on Sundays?**
A: By default, yes. Change this in **Settings** → **📅 Date Settings** → uncheck "Skip Sundays".

**Q: How do I add a new salesperson?**
A: Click **Sales Tools** → **⚙️ Settings** → **👥 Sales Team** tab → Add new salesperson → Save. Changes sync automatically.

**Q: What are analytics and where are they stored?**
A: Analytics are comprehensive sales metrics (totals, averages, rankings) calculated automatically and stored in MONTHLY sheet columns S-X.

**Q: How often are analytics updated?**
A: Automatically after each daily processing. Manual refresh available via **Sales Tools** → **🔄 Refresh Analytics**.

**Q: What if I have duplicate stock numbers?**
A: Duplicates are highlighted in yellow-green with red text on the TODAY sheet. Colors are configurable in Settings.

**Q: Can I customize the highlight colors?**
A: Yes! Click **Sales Tools** → **⚙️ Settings** → **🎨 Visual Customization** tab. Use color pickers to adjust all colors.

**Q: The script says it can't acquire a lock. What does this mean?**
A: Another process is running. Wait 30 seconds and try again. This prevents data corruption from simultaneous executions.

**Q: How do I handle split sales (two salespersons)?**
A: Use the format "John/Jane" in the salesperson field. The system automatically counts 0.5 for each person.

**Q: What happens to analytics during month rollover?**
A: Analytics are automatically calculated before archiving and preserved in the archived month sheet for historical tracking.

**Q: Can I change the leaderboard pace thresholds?**
A: Yes. Go to **Settings** → **🎨 Visual Customization** → adjust Green/Yellow/Red pace thresholds → Save.

**Q: Why aren't my font colors transferring to MONTHLY?**
A: Font colors only transfer during [`processDaily()`](saleslogPro.js:511). Manually added colors won't transfer retroactively.

**Q: How many salespersons can the system handle?**
A: Tested with 50+ salespersons. Performance remains excellent due to caching system.

**Q: How do I export my configuration?**
A: Configuration is stored in Properties Service and syncs to SALESPEOPLE sheet. The sheet serves as a backup/export format.

**Q: What if I delete an archived month sheet?**
A: Rolling averages will recalculate without that month's data. Analytics history for that month is lost - keep backups!

## Known Limitations

- **Configuration Storage**: Properties Service has 9KB limit per property (adequate for typical deployments)
- **Sheet Names**: Case-sensitive exact matches required (TODAY, MONTHLY, SALESPEOPLE, DEPOSITS)
- **Column Requirements**: Minimum 14 columns (A-N) required on MONTHLY sheet
- **Analytics Columns**: Requires 26 columns (A-Z) for full analytics (columns S-X)
- **Archive Naming**: Uses configured format - manual sheets with same names will conflict
- **Font Color Direction**: Only TODAY → MONTHLY during processDaily
- **Offline Mode**: Configuration UI requires online connectivity

## Advanced Customization

### Modifying Date Behavior

Date settings are now configurable in the Settings sidebar:
- **Skip Sundays**: Enable/disable Sunday counting
- **Monday Logs Saturday**: Configure Monday behavior
- **Archive Format**: Choose M/YY, MM/YY, or MMM/YY

Or programmatically via [`config_service.js`](config_service.js:54):
```javascript
const dateSettings = getDateSettings();
// Returns: {skipSundays: true, mondayLogsSaturday: true, archiveFormat: "M/YY"}
```

### Custom Validation Rules

Add validation in [`applyMonthlyRowFormatting()`](saleslogPro.js:402) to implement custom business rules.

### Extending Analytics

Analytics can be extended by modifying [`sales_analytics.js`](sales_analytics.js):
- Add new metrics in [`processMonthlyDataForAnalytics()`](sales_analytics.js:251)
- Update display format in [`buildSummarySection()`](sales_analytics.js:446)
- Adjust storage columns as needed (currently S-X)

## Support & Updates

### What's New in Latest Release

- ✨ **Easy Setup Wizard**: One-click installation creating all required sheets
- ⚙️ **Settings Sidebar**: User-friendly configuration UI replacing code editing
- 📊 **Analytics Dashboard**: Comprehensive sales metrics with team rankings
- 🔄 **Auto-Migration**: Seamless upgrade from hardcoded constants
- 📈 **Analytics Preservation**: Historical metrics retained in archives
- 🎨 **Visual Customization**: All colors and thresholds configurable via UI
- 📅 **Date Configuration**: Sunday counting and archive formats now user-configurable
- 🔐 **Enhanced Security**: Server-side validation and XSS prevention

### Version History

- **v8.0.0** (Current): Configuration UI, Analytics Dashboard, Setup Wizard
- **v7.9.8**: Enhanced row detection, font color handling
- **v7.9.7**: Foundation release with core functionality

### Getting Help

For technical support:

1. Check this documentation first
2. Review the FAQ section
3. Examine error messages in the Apps Script logs (View → Logs)
4. Verify sheet names and structure match requirements
5. Try the Setup Wizard to recreate missing sheets
6. Check Settings sidebar for configuration issues

## Architecture Overview

### Storage Architecture

**Hybrid Storage Pattern:**
```
Properties Service (Primary Source of Truth)
    ↕ Bidirectional Sync
SALESPEOPLE Sheet (Backward Compatible Display)
    ↓ Cached Access
CacheService (5-10 minute TTL)
```

### Data Flow

1. **User Input** → TODAY sheet
2. **Daily Processing** → MONTHLY sheet + Analytics (S-X)
3. **Configuration** → Properties Service + SALESPEOPLE sheet
4. **Month Rollover** → Archive sheet (with analytics)

### Key Integrations

- **Setup Wizard**: [`setup_wizard.js`](setup_wizard.js:12)
- **Configuration Service**: [`config_service.js`](config_service.js:1)
- **Analytics Engine**: [`sales_analytics.js`](sales_analytics.js:41)
- **Main Processing**: [`saleslogPro.js`](saleslogPro.js:1)

## License & Terms

**Sales Log Pro** is provided as-is for use in automotive dealership environments. Ensure compliance with your organization's data handling policies when managing sales information.

---

**Ready to transform your sales tracking?** Install **Sales Log Pro** today and experience the difference that automation makes.

*Current Version: 8.0.0 | Production-Ready | Battle-Tested*

**New in v8.0**: Easy Setup Wizard • Settings Sidebar • Analytics Dashboard • Auto-Migration • No Code Editing Required