# Setup Wizard

## Overview

The Setup Wizard is an automated tool that creates and configures all required sheets for the Sales Log Pro application. It prompts for customization preferences (colors and fonts), creates all necessary sheets with proper formatting, and automatically opens the configuration sidebar for salesperson setup.

**Implementation:** [`runSetupWizard()`](../src/setup_wizard.js:12-68)

## When to Use

Run the Setup Wizard when:

- Setting up a **new spreadsheet** from scratch
- Missing one or more required sheets
- Need to verify all required sheets exist

The wizard is **idempotent** - it's safe to run multiple times. It will only create sheets that don't already exist, leaving your existing data untouched.

## How to Run

1. Open your spreadsheet
2. Click **Sales Tools** in the menu bar
3. Select **🚀 Run Setup Wizard**
4. Answer customization prompts (or skip to use defaults):
   - Choose new car header color (4 presets)
   - Choose font style (4 options)
5. Review the setup summary dialog
6. Use the automatically-opened Settings sidebar to add your sales team

## Customization Options

**Implementation:** [`promptForCustomization()`](../src/setup_wizard.js:77-194)

The wizard prompts for the following customizations (all optional):

### Color Selection

**New Car Header Color** - Choose from 4 presets:

1. Blue (#234070) - Default
2. Red (#B71C1C)
3. Dark Green (#1B5E20)
4. Dark Yellow (#F9A825)

Text color is automatically calculated using [`getWcagCompliantTextColor()`](../src/config_service.js:680-697) to ensure WCAG AA accessibility compliance.

**Fixed Colors** (not customizable):

- Used Car Headers: #424242 (dark gray) with white text
- Leaderboard Headers: #434343 (dark gray) with white text

### Font Selection

Choose from 4 font options:

1. Calibri - Default
2. Arial
3. Times New Roman
4. Courier New

All customization settings are saved to Properties Service via [`updateConfiguration()`](../src/config_service.js:189-274).

## Sheets Created

The Setup Wizard creates four essential sheets:

### TODAY Sheet

**Purpose:** Daily sales entry and leaderboard tracking

**Implementation:** [`checkAndCreateTodaySheet()`](../src/setup_wizard.js:210-413)

- Data entry area for new and used car sales (columns A-N)
- Leaderboard with salesperson names, MTD sales, and 3-month averages (columns P-R)
- Four conditional formatting rules to highlight duplicate stock numbers and deposits
- Automatically configured for the [`processDaily()`](../src/core_saleslogPro.js:1081) function
- 50 pre-numbered data entry rows (column A contains 1-50)

### MONTHLY Sheet

**Purpose:** Historical record of all sales for the current month

**Implementation:** [`checkAndCreateMonthlySheet()`](../src/setup_wizard.js:511-635)

- Stores processed daily entries with date headers
- Tracks delivered vs. non-delivered deals
- Highlights errors (non-delivered deals, invalid salesperson codes)
- Analytics section in columns S-X for month-end reporting
- Used for monthly analytics and rollover archiving

### SALESPEOPLE Sheet

**Purpose:** Salesperson name/alias management

**Implementation:** [`checkAndCreateSalespeopleSheet()`](../src/setup_wizard.js:647-700)

- Maps full names to aliases and display codes
- Enables flexible data entry (enter "JS" instead of "John Smith")
- Includes 3 example salespeople to demonstrate the format
- **Columns:**
  - **A: FULL NAME** - Required, 2-100 characters
  - **B: ALIASES** - Optional, comma-separated, max 200 characters
  - **C: DISPLAY CODE** - Required, 2-4 alphanumeric characters

### DEPOSITS Sheet

**Purpose:** Track customer deposits to prevent duplicate entries

**Implementation:** [`checkAndCreateDepositsSheet()`](../src/setup_wizard.js:714-776)

- Records detailed deposit information for tracking
- Conditional formatting on TODAY sheet flags stock numbers with deposits
- **14 Columns (A-N):** DATE, NEW/USED, YEAR, MAKE, MODEL, ORDER #, STOCK #, SALESPERSON, BDC, CUSTOMER, DIRECTOR, PHONE #, EST DELIVERY DATE, NOTES
- **Column G (STOCK #)** is used in TODAY sheet conditional formatting rules

### Conditional Formatting Rules

**Implementation:** [`applyTodayConditionalFormatting()`](../src/setup_wizard.js:424-494)

Four automatic rules applied to TODAY sheet:

1. **Duplicate New Car Stock** (Range: E2:E101)

   - Formula: `=COUNTIF($E$2:$E$101,$E2)>1`
   - Highlights entire new car row (A2:G101)

2. **Duplicate Used Car Stock** (Range: L2:L101)

   - Formula: `=COUNTIF($L$2:$L$101,$L2)>1`
   - Highlights entire used car row (I2:N101)

3. **New Stock in DEPOSITS** (Range: A2:G101)

   - Formula: `=COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0`
   - Checks if new car stock (column E) exists in DEPOSITS column G

4. **Used Stock in DEPOSITS** (Range: I2:N101)
   - Formula: `=COUNTIF(INDIRECT("DEPOSITS!G:G"),$L2)>0`
   - Checks if used car stock (column L) exists in DEPOSITS column G

Colors use configuration settings via [`getVisualConfig()`](../src/core_saleslogPro.js:90-124), defaulting to:

- Fill: #b4ff0c (bright yellow-green)
- Text: #ff0000 (red)

## What to Expect

**Implementation:** [`showSetupSummary()`](../src/setup_wizard.js:782-821)

After running the wizard, you'll see a summary dialog showing:

- ✓ **Sheets Created:** New sheets that were added
- • **Sheets Already Existed:** Existing sheets that were left unchanged
- ✗ **Errors:** Any issues encountered (rare)

The wizard will then automatically open the **Settings sidebar** for you to add your sales team.

### Example Outcomes

**First-time setup:**

```ruby
SHEETS CREATED:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

Setup complete! Your sales log spreadsheet is ready to use.
```

**Already configured:**

```bash
All required sheets already exist:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

No setup needed. Your spreadsheet is ready to use!
```

**Partial setup:**

```shell
SHEETS CREATED:
✓ DEPOSITS

SHEETS ALREADY EXISTED:
• TODAY
• MONTHLY
• SALESPEOPLE

Setup complete! Your sales log spreadsheet is ready to use.
```

## Important Notes

- **Idempotent Design:** Running the wizard multiple times is safe - it won't overwrite existing sheets or data
- **Example Data:** The SALESPEOPLE sheet includes 3 sample salespeople (John Smith, Jane Doe, Bob Wilson) to guide you
- **Customizable Colors:** Choose from 4 color presets for new car headers
- **WCAG Compliance:** Text colors automatically calculated to ensure accessibility
- **Automatic Integration:** All sheets work together automatically once created
- **Configuration Storage:** Customization preferences saved to Properties Service for persistence

## Next Steps After Setup

1. **Add Your Sales Team (Sidebar Opens Automatically):**

   - Use the automatically-opened Settings sidebar to add salespeople
   - Or manually edit the SALESPEOPLE sheet
   - Replace the 3 example salespeople with your actual team
   - Add aliases for flexible data entry (e.g., "JS" for "John Smith")

2. **Review Configuration (Optional):**

   - Settings sidebar allows further customization
   - Adjust colors, pace thresholds, and date behavior
   - Changes sync bidirectionally between sidebar and SALESPEOPLE sheet

3. **Start Using:**
   - Enter daily sales on the TODAY sheet
   - Run **Sales Tools → Log Yesterday's Sales** to process entries
   - View analytics automatically calculated in MONTHLY columns S-X

## Related Documentation

- [`setup_wizard.js`](../src/setup_wizard.js:12) - Implementation source code
- [Sales Analytics Architecture](Sales_Analytics_Architecture.md) - Analytics system overview
- [Sheet Headers Reference](setupsheet_headers.md) - Complete header specifications
- [Spreadsheet Service Reference](Spreadsheet-Service_reference.md) - Google Apps Script API reference
