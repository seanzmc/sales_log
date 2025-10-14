# Sales Log Pro - Sample Workflow Guide

This guide walks you through a complete workflow using the example data files, from initial setup through end-of-month processing. Follow these steps to understand how Sales Log Pro works in a realistic scenario.

---

## 📋 Prerequisites

Before starting this workflow:

1. ✅ Sales Log Pro is deployed to your Google Spreadsheet
2. ✅ You have reviewed the example CSV files in this directory
3. ✅ You understand this is a **learning exercise** with fictional data
4. ✅ You have access to the Settings sidebar (Sales Log → Settings)

**Estimated Total Time**: 45-60 minutes

---

## 🗓️ Day 1: Initial Setup and Configuration

**Goal**: Set up the application and configure your sales team.

**Time**: 15-20 minutes

### Step 1.1: Run Setup Wizard

1. Open your Google Spreadsheet
2. Click **Sales Tools** → **🚀 Run Setup Wizard**
3. Wait for the wizard to complete
4. Verify all sheets were created:
   - ✅ TODAY
   - ✅ MONTHLY
   - ✅ SALESPEOPLE
   - ✅ DEPOSITS

**Expected Result**: You should see 4 new sheets with headers and formatting.

**Screenshot Placeholder**: [Setup wizard completion dialog showing all sheets created]

---

### Step 1.2: Configure Sales Team

1. Click **Sales Tools** → **⚙️ Settings**
2. The Settings sidebar opens on the right
3. Navigate to **👥 Sales Team** tab

**Remove Example Data**:

1. Delete the 3 example salespeople (John Smith, Jane Doe, Bob Wilson)
2. Click **Save Changes**

**Import Your Team**:

1. Download [`sample_salespeople.csv`](sample_salespeople.csv)
2. In Settings sidebar, click **📥 Import from CSV**
3. Paste the contents of sample_salespeople.csv
4. Click **Import**
5. Verify 10 salespeople were added
6. Click **Save Changes**

**Expected Result**:

```ruby
✓ Michael Chen (MC)
✓ Sarah Johnson (SJ)
✓ Robert Williams (RW)
✓ Jennifer Martinez (JM)
✓ David Anderson (DA)
✓ Emily Thompson (ET)
✓ James Brown (JB)
✓ Lisa Garcia (LG)
✓ Christopher Davis (CD)
✓ Amanda Rodriguez (AR)
```

**Screenshot Placeholder**: [Settings sidebar showing imported salespeople list]

---

### Step 1.3: Configure Visual Settings (Optional)

1. In Settings sidebar, go to **🎨 Visual** tab
2. Review conditional formatting colors:
   - Duplicate Stock Fill: #b4ff0c (lime green)
   - Duplicate Stock Text: #ff0000 (red)
3. Click **Save Changes** (or keep defaults)

**Expected Result**: Visual settings saved for duplicate detection highlighting.

---

### Step 1.4: Set Up Date Configuration

1. In Settings sidebar, go to **📅 Dates** tab
2. Set **Month Start Day**: 1
3. Set **Rollover Day**: 1
4. Click **Save Changes**

**Expected Result**: Month will start on the 1st, rollover will occur on the 1st of next month.

---

### Step 1.5: Add Deposit Tracking Data

1. Navigate to the **DEPOSITS** sheet
2. Open [`sample_deposits.csv`](sample_deposits.csv) in a text editor
3. Copy rows 2-13 (skip the header comment and column headers)
4. Paste into DEPOSITS sheet starting at row 2
5. Verify 12 deposit entries are shown

**Expected Result**: 12 deposits tracked with stock numbers N24-1215 through N24-1222 and U24-3311 through U24-3314.

**Screenshot Placeholder**: [DEPOSITS sheet with sample data populated]

**✅ Day 1 Complete**: You've set up the application, configured your team, and added deposit tracking.

---

## 🗓️ Day 2: First Sales Entry and Processing

**Goal**: Enter your first sales and run analytics.

**Time**: 15 minutes

### Step 2.1: Navigate to TODAY Sheet

1. Click on the **TODAY** sheet tab
2. Review the three main sections:
   - **Columns A-G**: New car sales
   - **Columns I-N**: Used car sales
   - **Columns P-R**: Leaderboard (auto-populated)

**Screenshot Placeholder**: [TODAY sheet showing three-section layout]

---

### Step 2.2: Enter First New Car Sales

Enter these 3 sales in the New Car section (starting at row 2):

**Row 2**:

- #: 1
- CUSTOMER: Thompson Robert
- FI: A
- MODEL: Camry
- STOCK #: N24-1205
- TRADE STK#: U23-8842
- SALES PERSON: MC

**Row 3**:

- #: 2
- CUSTOMER: Martinez Elena
- FI: B
- MODEL: Accord
- STOCK #: N24-1206
- TRADE STK#: N23-1103
- SALES PERSON: Sarah Johnson

**Row 4**:

- #: 3
- CUSTOMER: Williams David
- FI: (leave blank - pending)
- MODEL: RAV4
- STOCK #: N24-1207
- TRADE STK#: (leave blank)
- SALES PERSON: RW

**Expected Result**: 3 new car sales entered. Note different input styles:

- "MC" (display code)
- "Sarah Johnson" (full name)
- "RW" (alias)

All three should be recognized when analytics run.

---

### Step 2.3: Enter First Used Car Sales

Enter these 2 sales in the Used Car section (starting at row 2):

**Row 2**:

- CUSTOMER: Johnson Mark
- FI: A
- MODEL: F-150
- STOCK #: U24-3301
- TRADE STK#: (leave blank)
- SALES PERSON: RW

**Row 3**:

- CUSTOMER: Smith Patricia
- FI: B
- MODEL: Accord
- STOCK #: U24-3302
- TRADE STK#: N23-1150
- SALES PERSON: Jennifer Martinez

**Expected Result**: 2 used car sales entered.

---

### Step 2.4: Test Duplicate Detection

Try entering a stock number from the DEPOSITS sheet:

1. In TODAY sheet, Row 5, Column E (New Car STOCK #)
2. Type: **N24-1215** (this is in DEPOSITS)
3. Press Enter

   **Expected Result**: The entire row should highlight in lime green (#b4ff0c) with red text, indicating this stock is already in deposits.

   > **Screenshot Placeholder**: [Row with duplicate stock number highlighted in lime green]

4. Delete this test entry (clear Row 5)

---

### Step 2.5: Run Analytics

1. Click **Sales Tools** → **🔄 Refresh Analytics**
2. Wait for processing (5-10 seconds)
3. A confirmation dialog appears
4. Click **OK**

**Expected Result**: Dialog shows:

```ruby
Analytics Refreshed

Total Delivered: 4
New: 2
Used: 2

Top Performer: [Display Code] ([count] units)
```

---

### Step 2.6: Review Analytics Results

1. Navigate to **MONTHLY** sheet
2. Review the analytics section (columns S-X):

**Expected Metrics** (approximately):

- **Total New Delivered**: 2
- **Total Used Delivered**: 2
- **Total Delivered**: 4
- **Total Pending**: 1
- **Delivery Rate**: 80% (4 out of 5 funded)

**Expected Salesperson Rankings** (rows 9+):

- Michael Chen (MC): 1 new, 0 used = 1.0 total
- Robert Williams (RW): 0 new, 1 used = 1.0 total
- Sarah Johnson (SJ): 1 new, 0 used = 1.0 total
- Jennifer Martinez (JM): 0 new, 1 used = 1.0 total

**Screenshot Placeholder**: [MONTHLY sheet analytics section showing first results]

**✅ Day 2 Complete**: You've entered your first sales and generated analytics!

---

## 🗓️ Day 3: Multiple Sales and Advanced Features

**Goal**: Enter more complex sales including split sales, review comprehensive analytics.

**Time**: 15 minutes

### Step 3.1: Add More New Car Sales

Return to **TODAY** sheet and add these sales (rows 5-8):

**Row 5**:

- #: 4
- CUSTOMER: Anderson Lisa
- FI: C
- MODEL: Civic
- STOCK #: N24-1208
- TRADE STK#: U23-9156
- SALES PERSON: JM

**Row 6**:

- #: 5
- CUSTOMER: Davis Michael
- FI: D
- MODEL: CRV
- STOCK #: N24-1209
- TRADE STK#: U24-0012
- SALES PERSON: Dave

**Row 7** (Pending Sale):

- #: 6
- CUSTOMER: Garcia Maria
- FI: (leave blank)
- MODEL: Highlander
- STOCK #: N24-1210
- TRADE STK#: (leave blank)
- SALES PERSON: ET

**Row 8** (Split Sale):

- #: 7
- CUSTOMER: Rodriguez James
- FI: (leave blank)
- MODEL: Camry
- STOCK #: N24-1211
- TRADE STK#: N23-1205
- SALES PERSON: Jim/Lisa

**Expected Result**: 4 more new car sales, including:

- "Dave" (alias for David Anderson)
- "ET" (display code for Emily Thompson)
- "Jim/Lisa" (split sale between James Brown and Lisa Garcia)

---

### Step 3.2: Add More Used Car Sales

Add these used car sales (rows 4-6):

**Row 4**:

- CUSTOMER: Lee Kevin
- FI: C
- MODEL: Camry
- STOCK #: U24-3303
- TRADE STK#: (leave blank)
- SALES PERSON: DA

**Row 5** (Pending):

- CUSTOMER: Harris Tom
- FI: (leave blank)
- MODEL: Civic
- STOCK #: U24-3305
- TRADE STK#: (leave blank)
- SALES PERSON: JB

**Row 6** (Split Sale):

- CUSTOMER: Lewis John
- FI: E
- MODEL: Explorer
- STOCK #: U24-3307
- TRADE STK#: U24-0015
- SALES PERSON: Chris/Bob

**Expected Result**: 3 more used sales including "Chris/Bob" split sale (Christopher Davis and Robert Williams).

---

### Step 3.3: Update Analytics Again

1. Click **Sales Tools** → **🔄 Refresh Analytics**
2. Wait for processing
3. Review confirmation

**Expected Result**: Dialog shows increased totals:

```ruby
Analytics Refreshed

Total Delivered: 8
New: 5
Used: 3

Top Performer: [Display Code] ([count] units)
```

---

### Step 3.4: Analyze Performance Metrics

Navigate to **MONTHLY** sheet and review:

**Overall Metrics**:

- Total New Delivered: ~5
- Total Used Delivered: ~3
- Total Delivered: ~8
- Total Pending: ~3
- Delivery Rate: ~73% (8 out of 11)

**Top Performers**:
Look for salespeople with split sales showing 0.5 credits:

- James Brown: Should show 0.5 from "Jim/Lisa" split
- Lisa Garcia: Should show 0.5 from "Jim/Lisa" split
- Christopher Davis: Should show 0.5 from "Chris/Bob" split
- Robert Williams: Should show 1.5 total (1.0 individual + 0.5 split)

**Screenshot Placeholder**: [MONTHLY analytics showing split sale calculations]

---

### Step 3.5: Test Alias Resolution

1. Return to **TODAY** sheet
2. Try entering a sale using different aliases:

   Add in Row 9:

   - #: 8
   - CUSTOMER: Test Customer
   - FI: F
   - MODEL: Test
   - STOCK #: N24-9999
   - TRADE STK#: (blank)
   - SALES PERSON: Mike (alias for Michael Chen)

3. Run analytics again
4. Check MONTHLY sheet - should credit "Michael Chen", not "Mike"
5. Delete this test entry

**Expected Result**: Analytics correctly resolve "Mike" to "Michael Chen".

**✅ Day 3 Complete**: You've mastered complex entries and split sales!

---

## 🗓️ End of Month: Rollover Process

**Goal**: Complete month-end procedures and prepare for next month.

**Time**: 10 minutes

### Step 4.1: Final Month Analytics

Before rollover:

1. Ensure all sales for the month are entered in TODAY
2. Run **Sales Tools** → **🔄 Refresh Analytics** one final time
3. Review MONTHLY sheet for final month metrics
4. Note top performers and team statistics

**Screenshot Placeholder**: [Final monthly analytics before rollover]

---

### Step 4.2: Perform Rollover

1. Click **Sales Tools** → **Start New Month (Rollover)**
2. Read the confirmation warning carefully
3. Confirm you want to proceed
4. Wait for processing (10-15 seconds)

**Expected Result**:

```
Month Rollover Complete!

"[M/YY]" created. "MONTHLY" & MTD reset. Averages updated.
```

(Where [M/YY] is the archive name like "5/25" for May 2025)

---

### Step 4.3: Verify Rollover Results

**Check TODAY Sheet**:

1. Navigate to TODAY sheet
2. Verify all data rows (2+) are cleared
3. Headers remain intact
4. Leaderboard (columns P-R) is empty

**Check MONTHLY Sheet**:

1. Navigate to MONTHLY sheet
2. Verify previous month's data is preserved
3. Analytics section shows final month statistics
4. All sales data remains visible

**Screenshot Placeholder**: [Cleared TODAY sheet after rollover]

---

### Step 4.4: Start New Month

1. Begin entering sales for the new month in TODAY sheet
2. New sales will show in the leaderboard as they're added
3. Run analytics to generate new month's report in MONTHLY

**✅ End of Month Complete**: You've successfully completed a full month cycle!

---

## 📊 Key Concepts Demonstrated

### Throughout This Workflow

#### 1. **Flexible Salesperson Entry**

You've used:

- Full names: "Sarah Johnson"
- Display codes: "MC", "RW", "ET"
- Aliases: "Dave", "Mike", "Jim", "Chris", "Bob"

All correctly resolved to proper names in analytics.

#### 2. **Split Sales Handling**

Format: "Name1/Name2"

- "Jim/Lisa" split between James Brown and Lisa Garcia
- "Chris/Bob" split between Christopher Davis and Robert Williams
- Each person gets 0.5 credit

#### 3. **FI Status Tracking**

- **A-Z**: Delivered and funded (counted in analytics)
- **Blank**: Pending delivery (tracked but not in delivery rate)

#### 4. **Duplicate Detection**

- Stock numbers in DEPOSITS highlight in TODAY
- Prevents double-counting delivered vehicles
- Visual warning with lime green highlight

#### 5. **Analytics Automation**

- Automatic calculations across all metrics
- Salesperson rankings by performance
- Delivery rate tracking
- Split sale credit distribution

---

## 🎯 Verification Checklist

After completing this workflow, verify:

- [ ] All 4 required sheets exist and are formatted
- [ ] 10 salespeople configured with aliases
- [ ] Deposits tracked and duplicate detection working
- [ ] Sales entered using various input formats (full name, code, alias)
- [ ] Split sales correctly divided credit (0.5 each)
- [ ] Analytics calculated and displayed in MONTHLY sheet
- [ ] Salesperson rankings accurate
- [ ] Rollover cleared TODAY and preserved MONTHLY data
- [ ] System ready for new month entries

---

## 💡 Best Practices Learned

1. **Always run Setup Wizard first** before manual configuration
2. **Import salespeople from CSV** rather than manual entry for teams of 5+
3. **Use display codes consistently** for faster data entry
4. **Track deposits immediately** to prevent duplicate stock entries
5. **Run analytics regularly** (daily or weekly) to stay current
6. **Review analytics before rollover** for final month reporting
7. **Test with small data sets first** before bulk entry
8. **Use split sale format** exactly: "Name1/Name2" with slash, no spaces

---

## 🔄 Suggested Monthly Cycle

**Week 1**:

- Enter daily sales in TODAY
- Monitor leaderboard in real-time
- Track deposits as they occur

**Week 2-3**:

- Continue daily sales entry
- Run analytics mid-month for performance review
- Address any unknown salesperson errors

**Week 4**:

- Final sales push
- Daily analytics updates
- Prepare for month-end

**Month End**:

- Run final analytics
- Review MONTHLY sheet performance
- Export reports if needed
- Perform rollover
- Begin new month fresh

---

## 📈 Next Steps

Now that you've completed the sample workflow:

1. **Practice**: Run through this workflow again with different data
2. **Experiment**: Try edge cases (very long names, special characters, etc.)
3. **Customize**: Adjust visual settings, date configurations to your needs
4. **Deploy**: Replace sample data with your real team and sales
5. **Train**: Share this workflow with your team for onboarding

---

## 📚 Additional Resources

- **[README.md](README.md)**: Overview of all example files
- **[../QUICKSTART.md](../QUICKSTART.md)**: Quick setup guide
- **[../docs/guides/USER_GUIDE.md](../docs/guides/USER_GUIDE.md)**: Complete feature documentation
- **[../docs/troubleshooting/FAQ.md](../docs/troubleshooting/FAQ.md)**: Common questions
- **[../docs/troubleshooting/TROUBLESHOOTING.md](../docs/troubleshooting/TROUBLESHOOTING.md)**: Problem resolution

---

## ❓ Common Questions

**Q: Can I skip the rollover?**
A: No, rollover is required to preserve monthly data and reset for the new month.

**Q: What happens if I enter a wrong salesperson name?**
A: The system tracks it as "unknown" and reports it when you run analytics. Fix it and re-run.

**Q: Can I have more than 10 salespeople?**
A: Yes, there's no limit. The sample has 10 for demonstration.

**Q: Do split sales have to be 50/50?**
A: Yes, the current system only supports equal splits using the "Name1/Name2" format.

**Q: Can I run analytics multiple times per day?**
A: Yes, run analytics as often as needed. It always uses current data.

---

## 🎓 Congratulations

You've completed the full Sales Log Pro workflow from setup through month-end. You now understand:

✅ Initial configuration and setup
✅ Sales team management
✅ Daily sales entry with various formats
✅ Split sales handling
✅ Deposit tracking and duplicate prevention
✅ Analytics generation and interpretation
✅ Month-end rollover process

**You're ready to use Sales Log Pro with real data!**
