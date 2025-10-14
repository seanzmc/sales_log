# Sales Log Pro - User Guide

## Table of Contents

1. [Overview](#overview)
2. [Understanding the Four Main Sheets](#understanding-the-four-main-sheets)
3. [Getting Started](#getting-started)
4. [Daily Workflow](#daily-workflow)
5. [Settings & Configuration](#settings--configuration)
6. [Understanding Analytics](#understanding-analytics)
7. [Month-End Workflow](#month-end-workflow)
8. [Advanced Features](#advanced-features)
9. [Best Practices](#best-practices)
10. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Overview

Sales Log Pro is an automated sales tracking system for automotive dealerships built on Google Sheets. It eliminates manual tracking errors, automates daily reporting, and provides real-time performance insights for your sales team.

### Key Features

- **🚀 One-Click Setup**: Automated wizard creates all required sheets
- **📊 Real-Time Analytics**: Automatic calculation of sales metrics and team rankings
- **👥 Smart Team Management**: Flexible alias system handles name variations
- **🎨 Visual Error Detection**: Color-coded highlights for duplicates and errors
- **📅 Month-End Automation**: Archive and rollover with one click
- **⚙️ User-Friendly Configuration**: No code editing required

### System Requirements

- Google Workspace account with Apps Script access
- Web browser (Chrome, Firefox, Safari, or Edge recommended)
- Basic familiarity with Google Sheets

---

## Understanding the Four Main Sheets

Sales Log Pro uses four main sheets, each serving a specific purpose in your sales tracking workflow.

### TODAY Sheet

**Purpose**: Daily sales entry and live leaderboard

[Screenshot: TODAY sheet showing data entry area and leaderboard]

**Layout**:

- **Columns A-G**: New car sales entry

  - A: Sequence # (auto-generated during processing)
  - B: Customer Name
  - C: Finance Indicator (FI) - single letter A-Z for delivered
  - D: Model
  - E: Stock Number
  - F: Trade Stock Number
  - G: Salesperson

- **Column H**: Blank separator

- **Columns I-N**: Used car sales entry (same structure as new)

- **Column O**: Blank separator

- **Columns P-R**: Live Leaderboard
  - P: Salesperson Name
  - Q: MTD Sales (Month-to-Date)
  - R: 3-Month Average

**Key Features**:

- Conditional formatting highlights duplicate stock numbers
- Deposit matches flagged automatically
- Pace indicators show performance (green/yellow/red)
- Font colors transfer to MONTHLY during processing

### MONTHLY Sheet

**Purpose**: Historical record of all sales for current month

[Screenshot: MONTHLY sheet showing date headers and analytics columns]

**Layout**:

- **Columns A-N**: Same structure as TODAY sheet
- **Column O**: Blank separator
- **Columns P-R**: Final leaderboard (copied during rollover)
- **Columns S-X**: Analytics Dashboard
  - S: Salesperson Display Code
  - T: New Sales Count
  - U: Used Sales Count
  - V: Total Sales Count
  - W: Percentage of Team Total
  - X: Rank

**Key Features**:

- Date headers separate each day's entries (format: M/D)
- Red highlights indicate non-delivered deals
- Light red highlights show salesperson code errors
- Analytics update automatically after each daily process
- Complete history preserved during month rollover

### SALESPEOPLE Sheet

**Purpose**: Team roster and alias management

[Screenshot: SALESPEOPLE sheet with example data]

**Layout**:

- **Column A**: Full Name (e.g., "John Smith")
- **Column B**: Aliases (comma-separated, e.g., "JS, Johnny, John")
- **Column C**: Display Code (2-4 characters, e.g., "JS")

**Key Features**:

- Maps all name variations to one person
- Case-insensitive matching
- Syncs with configuration system
- Managed through Settings UI

**Example Entry**:

```
Full Name: John Smith
Aliases: JS, Johnny, John
Display Code: JS
```

### DEPOSITS Sheet

**Purpose**: Track customer deposits to prevent duplicate entries

[Screenshot: DEPOSITS sheet with deposit tracking]

**Layout** (Columns A-N):

- A: Date
- B: New/Used
- C: Year
- D: Make
- E: Model
- F: Order #
- G: Stock # (critical for duplicate detection)
- H: Salesperson
- I: BDC
- J: Customer
- K: Director
- L: Phone #
- M: Est Delivery Date
- N: Notes

**Key Features**:

- Stock numbers automatically flagged on TODAY sheet
- Prevents double-counting deposited vehicles
- Conditional formatting highlights matches

---

## Getting Started

### First-Time Setup

#### Step 1: Run Setup Wizard

1. Open your Google Sheet
2. Click **Sales Log Pro 2.0** → **🚀 Run Setup Wizard**
3. Choose customization options (optional):
   - New car header color (4 presets)
   - Font selection (4 options: Calibri, Arial, Times New Roman, Courier New)
   - System calculates WCAG-compliant text colors automatically
4. Review the summary showing created sheets
5. Settings sidebar opens automatically for team configuration

[Screenshot: Setup wizard completion dialog]

The wizard (via [`runSetupWizard()`](../../src/setup_wizard.js:12-68)) creates all four sheets with proper formatting and structure.

#### Step 2: Configure Your Sales Team

1. Settings sidebar opens automatically after setup, or click **Sales Log Pro 2.0** → **⚙️ Settings**
2. Go to **👥 Sales Team** tab
3. Replace example salespeople (3 provided by default) with your team:
   - Click **Add Salesperson**
   - Enter Full Name (e.g., "Sarah Johnson")
   - Enter Aliases (e.g., "SJ, Sarah, Johnson")
   - Enter Display Code (e.g., "SJ")
   - Click **Add**
4. Repeat for each team member
5. Click **Save Changes**

Note: Configuration is stored in Properties Service and syncs bidirectionally with the SALESPEOPLE sheet.

[Screenshot: Settings sidebar - Sales Team tab]

#### Step 3: Customize Appearance (Optional)

1. In Settings, go to **🎨 Visual Customization** tab
2. Adjust colors using color pickers:
   - Non-delivered deal highlight
   - Salesperson error highlight
   - Duplicate stock colors
   - Leaderboard colors
3. Set pace thresholds:
   - Green (Excellent): Default ≥10 units
   - Yellow (Good): Default 8-10 units
   - Red (Needs Attention): Default <8 units
4. Click **Save Changes**

[Screenshot: Settings sidebar - Visual Customization tab]

#### Step 4: Configure Date Settings (Optional)

1. In Settings, go to **📅 Date Settings** tab
2. Configure options:
   - ☑ **Skip Sundays**: Exclude from selling day calculations
   - ☑ **Monday Logs Saturday**: Monday defaults to Saturday date
   - **Archive Format**: Choose M/YY, MM/YY, or MMM/YY
3. Click **Save Changes**

[Screenshot: Settings sidebar - Date Settings tab]

---

## Daily Workflow

### 1. Enter Sales Data

**When**: Throughout the day as sales occur

**Where**: TODAY sheet

**Steps**:

1. Open the TODAY sheet
2. Enter new car sales in columns B-G
3. Enter used car sales in columns I-N
4. Use any salesperson name format (full name, alias, or display code)

[Screenshot: Entering sales data on TODAY sheet]

**Important Notes**:

- **Finance Indicator (FI)**: Enter single letter A-Z for delivered deals
- **Stock Numbers**: System auto-detects duplicates (yellow-green highlight)
- **Deposit Matches**: Auto-flagged if stock in DEPOSITS sheet
- **Font Colors**: Apply any colors - they transfer to MONTHLY
- **Split Sales**: Use format "John/Jane" for two salespersons (0.5 each)

**Data Entry Examples**:

```
New Car Sale:
B: John Doe        → Customer name
C: F               → Finance Indicator (delivered)
D: Camry           → Model
E: 12345          → Stock number
F: TR-789         → Trade stock (or "NT" for no trade)
G: JS             → Salesperson (alias)

Used Car Sale (same pattern in columns I-N)
```

### 2. Process Daily Sales

**When**: End of business day (or next morning)

**What It Does** (via [`processDaily()`](../../src/core_saleslogPro.js:1081)):

- Transfers TODAY entries to MONTHLY
- Generates sequential numbering (auto-numbered 1-50)
- Inserts date header (format: M/D)
- Updates leaderboard
- Calculates analytics (columns S-X)
- Applies error highlighting (red for non-delivered, light red for unknown salesperson)
- Clears TODAY sheet (columns B-N)
- Font colors transfer from TODAY to MONTHLY

**Steps**:

1. Click **Sales Log Pro 2.0** → **Log Yesterday's Sales**
2. Review the summary dialog:
   - New/Used/Total delivered counts
   - Trade counts
   - Salesperson breakdowns (by display code)
   - Salesperson code errors count
   - Unknown salespeople listed (if any)
3. Click **OK**

[Screenshot: Daily processing summary dialog]

**Summary Dialog Example**:

```
Daily Sales Logged: 10/10

NEW DELIVERED SALES: 8
USED DELIVERED SALES: 5
TOTAL DELIVERED UNITS: 13
DELIVERED DEALS WITH TRADES: 7

SALESPERSON DELIVERED COUNTS:
  - JS: 4.5
  - SJ: 3.5
  - MB: 3.0
  - RW: 2.0

SALESPERSON CODE ERRORS: 0
```

### 3. Review Results

**Check MONTHLY Sheet**:

- Verify date header inserted (format: M/D)
- Confirm all sales transferred correctly
- Check analytics in columns S-X
- Review any red highlights (errors)

[Screenshot: MONTHLY sheet after processing]

**Check TODAY Sheet**:

- Verify data cleared (columns B-N)
- Review updated leaderboard
- Check pace indicators (colors)

### 4. Handle Errors

**Red Highlights on MONTHLY**:

- **Non-Delivered Deals**: Missing or invalid FI flag

  - Fix: Enter single letter A-Z in FI column
  - Will auto-clear on next recalculation

- **Light Red Highlights**: Unrecognized salesperson
  - Fix option 1: Add person to SALESPEOPLE sheet
  - Fix option 2: Correct spelling to match existing alias
  - Fix option 3: Add alias to existing person

**Steps to Fix Salesperson Errors**:

1. Note the unrecognized name from error message
2. Click **Sales Log Pro 2.0** → **⚙️ Settings**
3. Either add new person or add alias to existing
4. Click **Sales Log Pro 2.0** → **Recalculate MTD & Check Monthly Errors/Formats**
5. Verify light red highlights cleared

Note: Changes to SALESPEOPLE sheet sync automatically via [`onEditSalespeopleSheet()`](../../src/sync_service.js:34).

[Screenshot: Error highlighting examples]

### 5. Review Analytics

**Where**: MONTHLY sheet, columns S-X

**What to Review**:

- **Team Totals** (rows 3-6):

  - Total Delivered
  - New/Used breakdown
  - Selling days elapsed
  - Per-day averages

- **Individual Performance** (rows 9+):
  - Each salesperson's new/used counts
  - Total sales
  - Percentage of team total
  - Current rank

[Screenshot: Analytics section on MONTHLY sheet]

**Manual Refresh** (if needed):

1. Click **Sales Log Pro 2.0** → **🔄 Refresh Analytics**
2. Confirm the refresh
3. Review updated summary dialog showing:
   - Total delivered count
   - New/used breakdown
   - Top performer and their count

Note: Analytics are automatically calculated during [`processDaily()`](../../src/core_saleslogPro.js:1081) and preserved during [`rolloverMonth()`](../../src/core_saleslogPro.js:1494).

---

## Settings & Configuration

### Accessing Settings

Click **Sales Log Pro 2.0** → **⚙️ Settings** to open the sidebar (via [`openConfigurationSidebar()`](../../src/core_saleslogPro.js:1627)).

[Screenshot: Settings sidebar main view]

### Tab 1: 👥 Sales Team Management

**Adding a Salesperson**:

1. Click **Add Salesperson** button
2. Fill in the form:
   - **Full Name**: Complete name (required)
   - **Aliases**: Alternative names, comma-separated (optional)
   - **Display Code**: 2-4 character code (required)
3. Click **Add**
4. Click **Save Changes**

**Editing a Salesperson**:

1. Find the person in the list
2. Click **Edit** button
3. Modify fields as needed
4. Click **Update**
5. Click **Save Changes**

**Deleting a Salesperson**:

1. Find the person in the list
2. Click **Delete** button
3. Confirm deletion
4. Click **Save Changes**

**Alias Best Practices**:

- Include common misspellings
- Add nicknames team uses
- Include initials
- Example: "John Smith" → Aliases: "JS, Johnny, John, Smitty"

**Validation Rules**:

- No duplicate full names
- No duplicate aliases across team
- Display codes must be 2-4 alphanumeric characters
- Aliases can contain letters, numbers, spaces, commas

### Tab 2: 🎨 Visual Customization

**Color Settings**:

Each color can be customized using the color picker:

1. **Non-Delivered Deal Color** (default: #FF0000)

   - Highlights rows missing valid FI flag
   - Applied to MONTHLY sheet

2. **Salesperson Error Color** (default: #FFEBEE)

   - Highlights unrecognized salesperson inputs
   - Light red for easy identification

3. **Duplicate Stock Fill Color** (default: #b4ff0c)

   - Background color for duplicate stocks
   - Applied to TODAY sheet

4. **Duplicate Stock Text Color** (default: #ff0000)

   - Text color for duplicate stocks
   - High contrast with fill color

5. **Leaderboard Zero MTD Background** (default: #F0F8FF)
   - Applied when all MTD values are zero
   - Light blue indicates start of month

**Pace Thresholds**:

Configure performance indicator thresholds:

- **Green (Excellent)**: Default ≥10 units/month
- **Yellow (Good)**: Default 8-10 units/month
- **Red (Needs Attention)**: Default <8 units/month

Formula: `(MTD Sales / Days Elapsed) * Total Days in Month`

**Reset to Defaults**:

- Click **Reset to Defaults** button
- Confirms before resetting
- Restores all original colors and thresholds

### Tab 3: 📅 Date Settings

**Skip Sundays** (default: enabled):

- ☑ Enabled: Sundays excluded from selling day calculations
- ☐ Disabled: Sundays counted as selling days
- Affects pace calculations and averages

**Monday Logs Saturday** (default: enabled):

- ☑ Enabled: Monday processing defaults to Saturday date
- ☐ Disabled: Monday processing uses Sunday date
- Useful for closed-Sunday dealerships

**Archive Format** (default: M/YY):

- **M/YY**: "5/25" (most compact)
- **MM/YY**: "05/25" (zero-padded)
- **MMM/YY**: "May/25" (month name)
- Applied during month rollover

---

## Understanding Analytics

### How Analytics Work

Analytics automatically calculate after each daily processing and provide comprehensive insights into team performance.

**Calculation Process**:

1. System reads all MONTHLY sheet data
2. Identifies delivered deals (FI flag = A-Z)
3. Separates new vs. used inventory
4. Counts by salesperson (handles split sales)
5. Calculates team totals and percentages
6. Assigns performance ranks
7. Writes to columns S-X

### Analytics Sections

#### Team-Level Metrics (Rows 1-6)

[Screenshot: Team metrics section]

**Row 1**: "MONTHLY ANALYTICS" header (merged S1:X1)

**Rows 2-6**: Summary data

```
Metric                Value       Metric              Value
Total Delivered       45          Selling Days        15
New Delivered         28          New Sold per Day    1.87
Used Delivered        17          Used Sold per Day   1.13
Last Updated          10/10/2025 2:00:00 PM
```

**Key Metrics**:

- **Total Delivered**: All delivered units (new + used)
- **New/Used Breakdown**: Separate inventory counts
- **Selling Days**: Days elapsed (respects Sunday setting)
- **Per Day Averages**: Pace metrics (delivered ÷ days × total days)

#### Salesperson Performance (Rows 9+)

[Screenshot: Salesperson analytics section]

**Row 8**: Column headers

```
Salesperson | New | Used | Total | % of Team | Rank
```

**Rows 9+**: Individual data (sorted by total sales)

```
JS    12.5   8.0   20.5   45.6%   1
SJ    10.0   6.5   16.5   36.7%   2
MB     5.5   2.0    7.5   16.7%   3
RW     0.0   0.5    0.5    1.1%   4
```

**Understanding the Data**:

- **Split Sales**: Shown as decimals (0.5 for each person)
- **% of Team**: Individual contribution to total
- **Rank**: Performance ranking (1 = highest)
- **Display Code**: Uses configured short code

### Manual Analytics Refresh

**When to Use**:

- After manual data edits
- To verify calculations
- After correcting errors

**Steps**:

1. Click **Sales Tools** → **🔄 Refresh Analytics**
2. Confirm the refresh
3. Review summary dialog showing:
   - Total delivered count
   - New/used breakdown
   - Top performer and their count

[Screenshot: Analytics refresh summary]

### Analytics in Archives

During month rollover, analytics are:

1. Recalculated for final accuracy
2. Included in archived month sheet
3. Preserved in columns S-X
4. Available for historical comparison

---

## Month-End Workflow

### When to Run Rollover

**Timing**: First business day of new month

**Prerequisites**:

- All previous month sales processed
- Analytics reviewed and verified
- Any errors corrected

### Month Rollover Process

#### Step 1: Initiate Rollover

1. Click **Sales Log Pro 2.0** → **Start New Month (Rollover)**
2. Review confirmation dialog (via [`rolloverMonth()`](../../src/core_saleslogPro.js:1494)):

   ```
   This will:
   1. Archive the current "MONTHLY" sheet (e.g., as "5/25")
   2. Copy the final leaderboard to the archive
   3. Clear the "MONTHLY" sheet for the new month
   4. Clear MTD sales (Column Q) on the "TODAY" sheet
   5. Recalculate 3-Month Rolling Averages (Column R) on "TODAY"

   Are you sure you want to proceed?
   ```

3. Click **Yes** to proceed

[Screenshot: Rollover confirmation dialog]

[Screenshot: Rollover confirmation dialog]

#### Step 2: System Processing

The system automatically:

1. **Recalculates Final Analytics** (via [`calculateMonthlyAnalytics()`](../../src/sales_analytics.js:41) for accuracy)
2. **Creates Archive Sheet** (with configured format: M/YY, MM/YY, or MMM/YY)
3. **Copies Leaderboard** (preserves all formatting)
4. **Includes Analytics** (columns S-X preserved in archive)
5. **Clears MONTHLY** (resets for new month)
6. **Clears MTD** (Column Q on TODAY set to 0)
7. **Recalculates Averages** (3-month rolling average from archive sheets)

[Screenshot: Month rollover progress]

#### Step 3: Verify Results

**Check Archive Sheet**:

- New sheet created with date name (e.g., "5/25")
- All MONTHLY data preserved
- Leaderboard copied correctly
- Analytics included (columns S-X)

**Check MONTHLY Sheet**:

- Data cleared (rows 2+)
- Headers intact
- Formatting preserved
- Ready for new entries

**Check TODAY Sheet**:

- MTD column cleared (all zeros)
- Averages recalculated (3-month rolling)
- Leaderboard sorted correctly

#### Step 4: Completion

Success dialog displays:

```
Month Rollover Complete!
"5/25" created. "MONTHLY" & MTD reset. Averages updated.
```

[Screenshot: Rollover completion dialog]

### Understanding Rolling Averages

**Calculation**:

1. System looks back 3 months from current
2. Finds archived sheets (e.g., "4/25", "3/25", "2/25")
3. Retrieves each person's MTD from archives
4. Calculates: (Sum of 3 months) ÷ (Number of months found)
5. Rounds to nearest 0.5

**Example**:

```
John Smith monthly sales:
- April: 15 units
- March: 12 units
- February: 18 units

Rolling Average = (15 + 12 + 18) ÷ 3 = 15.0
```

**Missing Months**:

- If archive doesn't exist, that month skipped
- Average calculated from available months only
- If no archives found, average = 0

---

## Advanced Features

### Working with Split Sales

**Use Case**: Two salespersons share credit for one sale

**Format**: "Person1/Person2" in salesperson field

**Example**:

```
TODAY Sheet, Column G:
John/Sarah

Result:
- John credited with 0.5 units
- Sarah credited with 0.5 units
- Both appear in analytics
```

**Rules**:

- Use forward slash (/) separator
- No spaces around slash recommended
- Both names must be valid (exist in SALESPEOPLE)
- Each person gets equal split (0.5)
- Works with aliases: "JS/SJ" is valid

[Screenshot: Split sale example]

### Font Color Transfer

**Purpose**: Visual coding for special deals or notes

**How It Works**:

1. Apply any font color on TODAY sheet
2. Color transfers during daily processing
3. Preserved on MONTHLY sheet
4. Useful for tracking special deals

**Important Notes**:

- Only transfers during [`processDaily()`](../../src/core_saleslogPro.js:1081)
- Manual color changes on MONTHLY don't sync back to TODAY
- Colors cleared from TODAY sheet after processing (columns B-N)
- Font colors are preserved in MONTHLY permanently

**Example Uses**:

- Blue: Internet leads
- Green: Repeat customers
- Purple: Special financing
- Orange: Manager deals

[Screenshot: Font color examples]

### Understanding Pace Indicators

**Purpose**: Visual performance tracking on leaderboard

**Colors**:

- 🟢 **Green**: On pace or ahead (excellent)
- 🟡 **Yellow**: Slightly behind (good)
- 🔴 **Red**: Significantly behind (needs attention)

**Calculation**:

```
Current Pace = (MTD Sales ÷ Days Elapsed) × Total Days in Month

Example:
- MTD Sales: 6 units
- Days Elapsed: 10
- Total Days: 25
- Pace = (6 ÷ 10) × 25 = 15 units/month
```

**Threshold Application**:

- If Pace ≥ Green threshold → Green background
- If Pace ≥ Yellow threshold → Yellow background
- If Pace < Yellow threshold → Red background

**Special Case**: All MTD = 0

- Light blue background applied
- Indicates start of month (no sales yet)

[Screenshot: Pace indicator examples]

### Duplicate Detection

**Stock Number Duplicates**:

- Detected within TODAY sheet
- Highlighted with yellow-green fill, red text
- Checks both new (column E) and used (column L)

**Deposit Matches**:

- Checks against DEPOSITS sheet column G
- Same visual highlighting
- Prevents double-counting deposited units

**How to Handle**:

1. Review highlighted stock number
2. Verify it's truly a duplicate
3. Options:
   - Remove duplicate entry
   - Correct stock number if error
   - Confirm if legitimate (e.g., remarked unit)

[Screenshot: Duplicate detection examples]

### Conditional Formatting Rules

**TODAY Sheet Rules**:

1. Duplicate stocks in new section (E column)
2. Duplicate stocks in used section (L column)
3. New stocks in DEPOSITS sheet
4. Used stocks in DEPOSITS sheet
5. Leaderboard pace indicators

**MONTHLY Sheet Formatting**:

- Applied during processing
- Red = Non-delivered deals
- Light red = Salesperson errors
- Auto-clears when corrected

**Maintenance**:

- Rules reapplied after each processing
- Managed by [`reapplyCF()`](../../src/core_saleslogPro.js:1290) function
- User cannot accidentally delete rules
- Pace thresholds configurable via Settings

---

## Best Practices

### Data Entry

**Consistency**:

- ✅ Use configured aliases consistently
- ✅ Enter stock numbers in same format
- ✅ Use single-letter FI flags (A-Z)
- ❌ Don't mix formats mid-month

**Accuracy**:

- Double-check stock numbers (duplicates flagged)
- Verify salesperson names (unknowns highlighted)
- Confirm FI flags before processing
- Review deposit sheet regularly

**Efficiency**:

- Enter sales throughout day
- Process once daily (end of business)
- Use aliases for faster entry
- Set up common name variations

### Team Management

**Alias Configuration**:

```
Good Alias Setup:
Full Name: Michael Johnson
Aliases: MJ, Mike, Michael, Johnson
Display Code: MJ

Covers:
- Initials (MJ)
- Nickname (Mike)
- First name (Michael)
- Last name (Johnson)
```

**Regular Maintenance**:

- Review team roster monthly
- Add new hires immediately
- Update aliases based on usage patterns
- Remove departed team members after archive

### Month-End Process

**Best Practices**:

1. **Verify Final Day**: Ensure last day processed
2. **Review Analytics**: Check totals make sense
3. **Fix Errors**: Correct any red highlights
4. **Backup First**: Download copy before rollover
5. **Run Rollover**: First business day of new month
6. **Verify Archive**: Confirm creation and data

**Checklist**:

```
☐ All sales for previous month entered
☐ Daily processing completed through month end
☐ Analytics reviewed (columns S-X)
☐ Errors corrected (no red highlights)
☐ Backup downloaded
☐ Rollover executed
☐ Archive verified
☐ New month ready
```

### Performance Optimization

**Keep System Fast**:

- Don't exceed 500 rows in MONTHLY
- Archive monthly (prevents bloat)
- Clear old archives (keep 12 months)
- Limit SALESPEOPLE to active team

**Avoid Common Issues**:

- Don't manually edit MONTHLY Column A (sequence #)
- Don't delete date headers on MONTHLY
- Don't modify analytics columns (S-X) manually
- Don't run multiple processes simultaneously

### Backup Strategy

**What to Backup**:

1. Entire spreadsheet (File → Download → Excel/PDF)
2. SALESPEOPLE sheet (export to CSV)
3. Current month archives
4. Configuration settings

**Backup Schedule**:

- Daily: Quick spreadsheet download
- Weekly: Full backup with all sheets
- Monthly: Archive month + configuration
- Quarterly: Complete system backup

**Recovery Plan**:

1. Identify what was lost
2. Restore from most recent backup
3. Re-enter missing data
4. Verify analytics recalculate correctly
5. Test daily processing

---

## Troubleshooting Common Issues

### Daily Processing Issues

**Problem**: "No sales activity found"

- **Cause**: TODAY sheet empty or no valid data
- **Solution**: Verify data in columns B-N, ensure at least one sale entered

**Problem**: "Unknown salesperson" warnings

- **Cause**: Name not in SALESPEOPLE sheet or alias map
- **Solution**: Add person or add alias via Settings

**Problem**: Font colors not transferring

- **Cause**: Colors added after processing
- **Solution**: Apply colors before running daily process

**Problem**: Wrong date in MONTHLY header

- **Cause**: Date settings or timing issue
- **Solution**: Check Date Settings (Monday logs Saturday option)

### Analytics Issues

**Problem**: Analytics not updating

- **Cause**: Cache or calculation error
- **Solution**: Click **Sales Tools** → **🔄 Refresh Analytics**

**Problem**: Wrong salesperson counts

- **Cause**: Alias mapping issue or FI flags
- **Solution**: Verify aliases in SALESPEOPLE, check FI columns

**Problem**: Missing analytics section

- **Cause**: Sheet lacks columns S-X
- **Solution**: Re-run setup wizard or add columns manually

**Problem**: Ranks not sorting correctly

- **Cause**: Tie in total sales
- **Solution**: Normal behavior - tied ranks allowed

### Settings Issues

**Problem**: Settings won't open

- **Cause**: Script error or permissions
- **Solution**: Refresh sheet, check Apps Script permissions

**Problem**: Changes not saving

- **Cause**: Script lock or validation error
- **Solution**: Wait 30 seconds, verify all required fields filled

**Problem**: Alias conflicts

- **Cause**: Duplicate alias across team
- **Solution**: Review conflict message, choose unique aliases

**Problem**: Colors not applying

- **Cause**: Invalid color code or format
- **Solution**: Use color picker, verify hex format (#RRGGBB)

### Rollover Issues

**Problem**: Archive already exists

- **Cause**: Rollover run twice same month
- **Solution**: Delete duplicate archive or rename existing

**Problem**: Rollover fails mid-process

- **Cause**: Permission or lock issue
- **Solution**: Check for manual edits, try again after 30 seconds

**Problem**: Averages incorrect after rollover

- **Cause**: Missing archive sheets
- **Solution**: Verify previous 3 months archived, recalculate manually

**Problem**: Analytics missing from archive

- **Cause**: Analytics failed before archive
- **Solution**: Manually refresh analytics, copy columns S-X to archive

### Error Highlights

**Red Highlights on MONTHLY**:

1. Check FI column (should be single letter A-Z)
2. Fix invalid or missing FI flags
3. Run **Recalculate MTD** to clear highlights

**Light Red Highlights**:

1. Note unrecognized salesperson name
2. Add to SALESPEOPLE or fix spelling
3. Run **Recalculate MTD** to update

**Duplicate Highlights on TODAY**:

1. Verify stock numbers
2. Check DEPOSITS sheet
3. Remove duplicate or correct entry

---

## Quick Reference

### Menu Commands

| Command                                  | Location           | Purpose                  |
| ---------------------------------------- | ------------------ | ------------------------ |
| 🚀 Run Setup Wizard                      | Sales Log Pro 2.0  | Create required sheets   |
| Log Yesterday's Sales                    | Sales Log Pro 2.0  | Process daily entries    |
| Recalculate MTD & Check Monthly Errors   | Sales Log Pro 2.0  | Rebuild MTD from MONTHLY |
| 🔄 Refresh Analytics                     | Sales Log Pro 2.0  | Recalculate all metrics  |
| 🔧 Check for Incomplete Operations       | Sales Log Pro 2.0  | Recovery check           |
| Start New Month (Rollover)               | Sales Log Pro 2.0  | Month-end rollover       |
| ⚙️ Settings                              | Sales Log Pro 2.0  | Configuration UI         |

### Keyboard Shortcuts

| Action         | Shortcut                          |
| -------------- | --------------------------------- |
| Open menu      | Alt+/ (Windows) or Option+/ (Mac) |
| Navigate cells | Arrow keys                        |
| Select range   | Shift+Arrow keys                  |
| Fill down      | Ctrl+D (Windows) or Cmd+D (Mac)   |
| Find           | Ctrl+F (Windows) or Cmd+F (Mac)   |

### Color Meanings

| Color        | Location    | Meaning            |
| ------------ | ----------- | ------------------ |
| Red          | MONTHLY     | Non-delivered deal |
| Light Red    | MONTHLY     | Salesperson error  |
| Yellow-green | TODAY       | Duplicate stock    |
| Green        | Leaderboard | Excellent pace     |
| Yellow       | Leaderboard | Good pace          |
| Red          | Leaderboard | Needs attention    |
| Light Blue   | Leaderboard | Start of month     |

### Important Formulas

**Pace Calculation**:

```
(MTD Sales ÷ Days Elapsed) × Total Days in Month
```

**Rolling Average**:

```
(Month1 + Month2 + Month3) ÷ Number of Months
```

**Split Sale**:

```
"John/Jane" = 0.5 units each
```

---

## Getting More Help

### Documentation Resources

- **API Reference**: [`docs/api/API_REFERENCE.md`](../api/API_REFERENCE.md)
- **Troubleshooting Guide**: [`docs/troubleshooting/TROUBLESHOOTING.md`](../troubleshooting/TROUBLESHOOTING.md)
- **FAQ**: [`docs/troubleshooting/FAQ.md`](../troubleshooting/FAQ.md)
- **Deployment Guide**: [`docs/guides/DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

### Support Channels

1. Check this user guide first
2. Review troubleshooting documentation
3. Check Apps Script execution logs (View → Executions)
4. Contact your system administrator
5. Refer to [`SUPPORT.md`](../../SUPPORT.md) for additional resources

### Training Resources

**New Users**:

1. Read "Getting Started" section
2. Complete first-time setup
3. Practice daily workflow with test data
4. Review best practices

**Advanced Users**:

1. Explore advanced features
2. Customize visual settings
3. Optimize team aliases
4. Configure automation options

---

_Sales Log Pro v8.0 | Last Updated: 2025-10-10_
