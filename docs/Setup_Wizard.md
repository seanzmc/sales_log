# Setup Wizard

## Overview

The Setup Wizard is an automated tool that creates and configures all required sheets for the Sales Log application. It ensures your spreadsheet has the proper structure and formatting needed for the sales tracking system to function correctly.

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
4. Review the summary dialog that appears

## Sheets Created

The Setup Wizard creates four essential sheets:

### TODAY Sheet
**Purpose:** Daily sales entry and leaderboard tracking
- Data entry area for new and used car sales (columns A-N)
- Leaderboard with salesperson names, MTD sales, and 3-month averages (columns P-R)
- Conditional formatting to highlight duplicate stock numbers and deposits
- Automatically configured for the [`processDaily()`](7.9.8.js:511) function

### MONTHLY Sheet
**Purpose:** Historical record of all sales for the current month
- Stores processed daily entries with date headers
- Tracks delivered vs. non-delivered deals
- Highlights errors (non-delivered deals, invalid salesperson codes)
- Used for monthly analytics and rollover archiving

### SALESPEOPLE Sheet
**Purpose:** Salesperson name/alias management
- Maps full names to aliases and display codes
- Enables flexible data entry (enter "JS" instead of "John Smith")
- Includes example data to help you understand the format
- **Columns:**
  - Full Name: Official name for tracking
  - Aliases: Comma-separated nicknames/codes
  - Preferred Display Code: Short code for reports

### DEPOSITS Sheet
**Purpose:** Track customer deposits to prevent duplicate entries
- Records deposit information including stock numbers
- Conditional formatting on TODAY sheet flags stock numbers with deposits
- **Columns:** Date, Customer, Amount, Type, Notes, Salesperson, Stock Number

## What to Expect

After running the wizard, you'll see a summary dialog showing:
- ✓ **Sheets Created:** New sheets that were added
- • **Sheets Already Existed:** Existing sheets that were left unchanged
- ✗ **Errors:** Any issues encountered (rare)

### Example Outcomes

**First-time setup:**
```
SHEETS CREATED:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

Setup complete! Your sales log spreadsheet is ready to use.
```

**Already configured:**
```
All required sheets already exist:
✓ TODAY
✓ MONTHLY
✓ SALESPEOPLE
✓ DEPOSITS

No setup needed. Your spreadsheet is ready to use!
```

**Partial setup:**
```
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
- **Example Data:** The SALESPEOPLE sheet includes sample entries to guide you in adding your team
- **No Configuration Required:** Sheets are pre-configured with proper formatting and formulas
- **Automatic Integration:** All sheets work together automatically once created

## Next Steps After Setup

1. **Customize SALESPEOPLE sheet:**
   - Replace example data with your actual sales team
   - Add aliases for each person for flexible data entry

2. **Configure Settings:**
   - Go to **Sales Tools → ⚙️ Settings**
   - Adjust colors, thresholds, and behavior preferences

3. **Start Using:**
   - Enter daily sales on the TODAY sheet
   - Run **Log Yesterday's Sales** to process entries

## Related Documentation

- [`setup_wizard.js`](setup_wizard.js:12) - Implementation details
- [Sales Analytics Architecture](Sales_Analytics_Architecture.md) - System overview
- [Dynamic Config UI](dynamicconfigUI.md) - Settings documentation