# Sales Log Pro - Quick Start Guide

Get up and running with Sales Log Pro in **10 minutes**.

## Prerequisites

- Google Workspace account (G Suite or personal Gmail account)
- Permission to create Google Sheets and Apps Script projects

## Installation (5 Steps)

### Step 1: Create Your Spreadsheet

1. Open [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Sales Log Pro" or your preferred name

   _Time: 1 minute_

---

### Step 2: Open Apps Script Editor

1. In your new spreadsheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Keep the Apps Script tab open

   _Time: 30 seconds_

---

### Step 3: Copy Project Files

1. Download or clone the Sales Log Pro repository
2. In the Apps Script editor, create files matching the `src/` directory:
   - Click the **+** next to Files
   - Add each `.js` file (Code.gs, config_service.gs, etc.)
   - Add each `.html` file (config_sidebar.html, etc.)
3. Copy and paste the content from each source file into the corresponding Apps Script file

**Files to add:**

JavaScript files (rename .js to .gs):
- `core_saleslogPro.js` → Code.gs (1,707 lines)
- `config_service.js` → config_service.gs (1,441 lines)
- `sync_service.js` → sync_service.gs (1,834 lines)
- `sales_analytics.js` → sales_analytics.gs (707 lines)
- `setup_wizard.js` → setup_wizard.gs (821 lines)
- `error_logger.js` → error_logger.gs (161 lines)
- `utilities_locks.js` → utilities_locks.gs (386 lines)
- `validation_rules.js` → validation_rules.gs (220 lines)

HTML files (keep .html extension):
- `config_sidebar.html` → config_sidebar.html
- `config_sidebar.css.html` → config_sidebar_css.html
- `sidebar_js.html` → sidebar_js.html

Configuration file:
- `appsscript.json` → appsscript.json

  _Time: 8-10 minutes (12 files total)_

---

### Step 4: Save and Authorize

1. Click the **Save** icon (💾) in the Apps Script editor
2. Click **Run** → Select `onOpen` function
3. Click **Review Permissions** when prompted
4. Select your Google account
5. Click **Advanced** → **Go to [Your Project] (unsafe)**
6. Click **Allow** to grant necessary permissions

   _Time: 2 minutes_

---

### Step 5: Run Setup Wizard

1. Return to your Google Sheet (refresh the page if needed)
2. You should see a new menu: **Sales Log**
3. Click **Sales Log** → **Run Setup Wizard**
4. Follow the on-screen prompts to create initial sheets
5. Wait for the setup to complete (progress shown in toast notifications)

   _Time: 1 minute_

---

## First Configuration

### Add Your Sales Team

1. Click **Sales Log** → **Settings**
2. In the Settings sidebar, click **Add Salesperson**
3. Enter the salesperson's information:
   - **Full Name**: Complete name for reports
   - **Aliases**: Alternative names/nicknames (comma-separated)
   - **Display Code**: 2-4 character code (e.g., "SJ" for Sarah Johnson)
4. Click **Add**
5. Repeat for each team member

   **\*Tip:** Aliases help with data entry. If someone enters "Mike" instead of "Michael Chen", the system will recognize it.\*

   _Time: 2-3 minutes_

---

## First Use

### Enter Sales Data

1. Open the **TODAY** sheet (created by setup wizard)
2. Enter sales information in the appropriate columns:
   - **Date**: Sale date (auto-populated for today)
   - **Salesperson**: Name or alias
   - **Deal Type**: F&I, Front, Back, etc.
   - **Stock Number**: Vehicle stock number
   - **Customer Name**: Customer's name
   - **Gross**: Gross profit amount
   - **Delivered**: Y/N (whether vehicle was delivered)
3. Enter multiple sales as needed

### Process Daily Sales

1. Click **Sales Log** → **Process Daily**
2. The system will:
   - Validate salesperson names
   - Check for duplicate stock numbers
   - Calculate totals
   - Update the leaderboard
   - Format the sheet with color coding
3. Review the processed results

   _Time: 2-3 minutes per day_

---

## Tips for First-Time Users

### Common Issues

**"Salesperson not found" error:**

- Verify the name matches exactly (or use an alias)
- Add the salesperson through Settings if missing

**Setup wizard doesn't appear:**

- Refresh the spreadsheet page
- Wait 10-15 seconds for the menu to load
- Check that you granted all permissions

**Menu is missing:**

- Close and reopen the spreadsheet
- Check Extensions → Apps Script to ensure all files saved correctly

**Processing is slow:**

- First run may take longer (15-30 seconds)
- Subsequent runs are faster due to caching

### Best Practices

1. **Use Aliases**: Set up common variations of names to reduce data entry errors
2. **Daily Processing**: Run "Process Daily" once per day, typically at end of business
3. **Stock Numbers**: Use consistent formatting for stock numbers (system will detect duplicates)
4. **Regular Backups**: Archive monthly sheets are created automatically, but consider additional backups
5. **Settings Review**: Periodically review Settings to ensure team roster is current

---

## What's Next?

### Explore Advanced Features

- **Sales Analytics**: Click Sales Log → Show Sales Analytics for detailed reporting
- **Archive System**: Monthly sheets are created automatically on the 1st of each month
- **Custom Formatting**: Adjust colors and thresholds in Settings → Visual tab
- **Date Settings**: Configure weekend handling in Settings → Dates tab

### Get Help

- **Full Documentation**: See [README.md](README.md) for comprehensive documentation
- **Troubleshooting**: Check [SUPPORT.md](SUPPORT.md) for common issues and solutions
- **Feature Requests**: Contact support with suggestions for improvements

---

## Quick Reference

| Action              | Menu Path                              |
| ------------------- | -------------------------------------- |
| Add salesperson     | Sales Log → Settings → Add Salesperson |
| Process daily sales | Sales Log → Process Daily              |
| View analytics      | Sales Log → Show Sales Analytics       |
| Archive month       | Sales Log → Archive Current Month      |
| Run setup           | Sales Log → Run Setup Wizard           |
| Change settings     | Sales Log → Settings                   |

---

## Estimated Total Setup Time

- Installation: **12-15 minutes** (copying 12 source files)
- First configuration: **5 minutes**
- First use: **5 minutes**

**Total: ~25 minutes** from start to processing your first sales data.

---

## Support

If you encounter any issues during setup, please refer to:

- [README.md](README.md) - Detailed documentation
- [SUPPORT.md](SUPPORT.md) - Support information and troubleshooting

For licensed customers, support is available via the contact information provided with your license.

---

**You're ready to start tracking sales!** 🚀

The system is designed to be intuitive after initial setup. Most daily operations take just a few minutes.
