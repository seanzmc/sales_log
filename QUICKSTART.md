# Sales Log Pro 2 - Quick Start Guide

Get up and running with Sales Log Pro 2 in **5 minutes**.

## Prerequisites

- Google Workspace account (G Suite or personal Gmail account)
- Access to the Sales Log Pro 2 template spreadsheet

---

## Initial Setup

### Step 1: Open the Template Spreadsheet

1. Open the template spreadsheet **"SLP-2"**
2. The spreadsheet will open in a **protected read-only format**
   - This prevents accidental changes to the template

   _Time: 30 seconds_

---

### Step 2: Make a Copy

1. Click **File** → **Make a copy**
2. A dialog will appear with copy options
3. Click **Make a copy** to create your own version

   _Time: 30 seconds_

---

### Step 3: Rename Your Spreadsheet

1. At the top of your new spreadsheet, click the title (it will say "Copy of SLP-2")
2. Change the title to something meaningful:
   - **"Sales Log"**
   - **"[Your Dealership Name] Sales Log"**
   - Or any name you prefer
3. Press **Enter** to save the new name

   _Time: 15 seconds_

---

### Step 4: Run Setup Wizard

1. Click **Sales Log** → **Run Setup Wizard**
2. Follow the on-screen prompts to configure your spreadsheet
3. Wait for the setup to complete (progress shown in toast notifications)

   > **📘 For detailed setup instructions:** See the [Setup Wizard Guide](docs/Setup_Wizard.md)

   _Time: 2 minutes_

---

### Step 5: Add Your Sales Team

You have two options for adding your sales team:

#### Option A: Use the Sidebar Module (Recommended)

1. Click **Sales Log** → **Settings**
2. In the Settings sidebar, click **Add Salesperson**
3. Enter the salesperson's information:
   - **Full Name**: Complete name for reports
   - **Aliases**: Alternative names/nicknames (comma-separated)
   - **Display Code**: 2-4 character code (e.g., "SJ" for Sarah Johnson)
4. Click **Add**
5. Repeat for each team member

#### Option B: Edit the SALESPEOPLE Sheet Directly

1. Close the Settings sidebar if it's open
2. Navigate to the **SALESPEOPLE** sheet
3. Enter salesperson information directly in the sheet columns:
   - Name
   - Aliases (separate multiple aliases with commas)
   - Display Code
4. The sidebar will automatically pick up the team members the next time it opens

> **💡 Tip:** Use aliases to handle variations in how names might be entered (e.g., "Mike" and "Michael" for Michael Chen)

   _Time: 3-5 minutes_

---

### Step 6: Update Leaderboard

1. After adding your sales team, open the Settings sidebar
2. Click **"Update Leaderboard"**
3. Wait for the update to complete

**Your sheet is now ready for daily use!** ✅

   _Time: 30 seconds_

---

## Daily Use Tutorial

### Entering Sales on the TODAY Sheet

1. Navigate to the **TODAY** sheet
2. Enter sales information in the appropriate columns:
   - **Date**: Sale date (usually auto-populated for today)
   - **Salesperson**: Name or alias (must match your sales team)
   - **Deal Type**: F&I, Front, Back, etc.
   - **Stock Number**: Vehicle stock number
   - **Customer Name**: Customer's name
   - **Gross**: Gross profit amount
   - **Delivered**: Y/N (whether vehicle was delivered)
   - **FI**: Finance & Insurance information
3. Enter multiple sales as needed throughout the day

> **✅ Best Practice:** Enter sales as they happen or at regular intervals throughout the day for best accuracy

---

### Fixing Deals on the MONTHLY Log

The system uses color coding to help you identify issues that need attention:

#### Issue 1: Deal Not Delivered (Whole Row Highlighted)

**What it means:** A deal has been logged but the vehicle hasn't been delivered yet.

**How to fix:**
1. Locate the highlighted row in the **MONTHLY** sheet
2. Find the **FI** field in that row
3. Change the FI field to a **single letter** (any letter will work)
4. Click **Sales Log** → **Recalculate MTD** function
5. The highlighting will be removed once the deal is properly logged

---

#### Issue 2: Salesperson Name Mismatch (Red Highlighted Name)

**What it means:** The salesperson name in the deal doesn't match any names in your sales team roster.

**How to fix:**

**Option A - Add an Alias:**
1. Navigate to the **SALESPEOPLE** sheet
2. Find the **Aliases** section
3. Add the mismatched name as an alias for the correct salesperson
4. Return to the **MONTHLY** sheet
5. Click **Sales Log** → **Recalculate MTD** function

**Option B - Correct the Name:**
1. In the **MONTHLY** sheet, find the deal with the red highlighted name
2. Change the salesperson name to match exactly with your sales team roster
3. Click **Sales Log** → **Recalculate MTD** function

> **💡 Tip:** Adding aliases (Option A) is usually better for long-term efficiency, as it prevents the same issue from recurring

---

### Updating Analytics

Monthly analytics provide insights into sales performance, trends, and team metrics.

**Analytics update automatically when you:**
- Run **"Log Yesterday's Sales"** function
- Run **"Refresh Analytics"** function

**To manually refresh analytics:**
1. Click **Sales Log** → **Refresh Analytics**
2. Wait for the update to complete
3. View updated analytics in the analytics dashboard

> **📊 Note:** Analytics are calculated based on the data in your MONTHLY sheets, so ensure your deals are properly logged and any issues are resolved before refreshing

---

## Quick Reference

| Action                    | How To                                                           |
| ------------------------- | ---------------------------------------------------------------- |
| Enter daily sales         | Enter data on the TODAY sheet                                    |
| Fix undelivered deals     | Change FI field to single letter → Run "Recalculate MTD"         |
| Fix name mismatches       | Add alias in SALESPEOPLE sheet → Run "Recalculate MTD"           |
| Update analytics          | Run "Log Yesterday's Sales" or "Refresh Analytics"               |
| Add new salesperson       | Sales Log → Settings → Add Salesperson                           |
| Update leaderboard        | Sales Log → Settings → Update Leaderboard                        |
| Run setup wizard          | Sales Log → Run Setup Wizard                                     |

---

## Tips for Success

### Best Practices

1. **Enter Sales Promptly**: Log sales throughout the day rather than waiting until closing time
2. **Check Highlighting Daily**: Review the MONTHLY sheet each day for any highlighted issues
3. **Use Consistent Aliases**: Set up common name variations to reduce data entry errors
4. **Run Recalculate MTD After Fixes**: Always run this function after correcting issues
5. **Regular Analytics Reviews**: Check analytics weekly to track trends and performance

### Common Issues

**Sales not appearing in MONTHLY sheet:**
- Verify the salesperson name is spelled correctly or matches an alias
- Check that the FI field has been properly filled
- Ensure the TODAY sheet data is complete

**Leaderboard not updating:**
- Click "Update Leaderboard" in the Settings sidebar
- Verify all sales team members are properly configured

**Colors not clearing after fixes:**
- Make sure you ran the "Recalculate MTD" function after making corrections
- Check that corrections were made exactly as instructed

---

## Estimated Total Setup Time

- Initial setup (Steps 1-3): **2 minutes**
- Setup wizard (Step 4): **2 minutes**
- Add sales team (Step 5): **3-5 minutes**
- Update leaderboard (Step 6): **30 seconds**

**Total: ~8-10 minutes** from template to ready-to-use spreadsheet.

---

## Get Help

For more detailed information:

- **User Guide**: See [docs/guides/USER_GUIDE.md](docs/guides/USER_GUIDE.md) for comprehensive documentation
- **Setup Wizard Details**: See [docs/Setup_Wizard.md](docs/Setup_Wizard.md) for complete setup instructions
- **Troubleshooting**: Check [docs/troubleshooting/TROUBLESHOOTING.md](docs/troubleshooting/TROUBLESHOOTING.md)
- **FAQ**: See [docs/troubleshooting/FAQ.md](docs/troubleshooting/FAQ.md) for common questions

For licensed customers, support is available via the contact information provided with your license.

---

**You're ready to start tracking sales!** 🚀

The system is designed to be intuitive. Most daily operations take just a few minutes once you're familiar with the workflow.