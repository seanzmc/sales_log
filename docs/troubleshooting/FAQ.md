# Sales Log Pro - Frequently Asked Questions (FAQ)

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Configuration & Settings](#configuration--settings)
3. [Daily Usage](#daily-usage)
4. [Data Management](#data-management)
5. [Analytics & Reporting](#analytics--reporting)
6. [Performance & Limits](#performance--limits)
7. [Compatibility](#compatibility)
8. [License & Usage Rights](#license--usage-rights)
9. [Troubleshooting Quick Answers](#troubleshooting-quick-answers)

---

## Installation & Setup

### Q: Do I need any coding knowledge to use Sales Log Pro?

**A:** No. Sales Log Pro is designed for non-technical users. The Easy Setup Wizard creates everything automatically, and the Settings sidebar provides a user-friendly interface for all configurations. You only interact with Google Sheets - no coding required.

**What you need to know**:

- How to use Google Sheets (basic spreadsheet skills)
- How to click menu items
- How to fill in forms

**What you don't need**:

- JavaScript or programming knowledge
- Apps Script experience
- Technical configuration skills

---

### Q: Can I use Sales Log Pro with Microsoft Excel?

**A:** No, Sales Log Pro is built specifically for Google Sheets using Google Apps Script. It requires:

- Google Sheets (part of Google Workspace or free Google account)
- Apps Script support (automatically available with Google Sheets)
- Active internet connection

**Why Google Sheets only?**

- Uses Google Apps Script (not available in Excel)
- Leverages Google Cloud infrastructure
- Requires Properties Service for configuration
- Uses Google Sheets API for automation

**Alternative**: You can export data from Sales Log Pro to Excel format for external analysis:

- File → Download → Microsoft Excel (.xlsx)

---

### Q: How long does initial setup take?

**A:** Complete setup typically takes **15-20 minutes**:

**Breakdown**:

- Script installation: 5-7 minutes
- Authorization: 1-2 minutes
- Running Setup Wizard: 1 minute
- Configuring sales team: 5-10 minutes
- Customizing settings (optional): 5 minutes

**First-time users**: Allow 30 minutes to familiarize yourself with the interface and test the daily workflow.

---

### Q: What happens if I run the Setup Wizard multiple times?

**A:** The Setup Wizard is **idempotent** (safe to run multiple times):

**Behavior**:

- Checks if each sheet exists before creating
- Skips existing sheets (won't overwrite data)
- Only creates missing sheets
- Reapplies formatting to existing sheets
- Shows summary of what was created vs. existed

**Use cases**:

- Accidentally deleted a sheet → Run wizard to recreate
- Corrupted sheet formatting → Run wizard to fix
- Added new user → Run wizard to verify setup

**Example output**:

```
SHEETS ALREADY EXISTED:
• TODAY
• MONTHLY

SHEETS CREATED:
✓ SALESPEOPLE
✓ DEPOSITS
```

---

### Q: Do I need a Google Workspace account or can I use a free Gmail account?

**A:** Both work! Sales Log Pro supports:

**Free Gmail Account** ✅

- Full functionality available
- No limitations
- Personal use approved

**Google Workspace (Business)** ✅

- Full functionality available
- Organization-wide deployment possible
- May require admin approval for Apps Script

**Workspace Considerations**:

- Check with IT admin about Apps Script policies
- Some organizations restrict script installations
- May need allowlisting for deployment

---

## Configuration & Settings

### Q: How many salespeople can I add to the system?

**A:** **Tested with 50+ salespeople** with excellent performance:

**Technical Limits**:

- No hard limit on salesperson count
- Configuration size limit: 8KB total
- Typical capacity: 100+ salespeople

**Performance Considerations**:

- Each additional person adds minimal overhead
- Caching keeps lookups fast
- 30-50 salespeople: Optimal performance
- 50-100 salespeople: Slight processing delay
- 100+ salespeople: May need performance tuning

**Best Practice**: Keep roster to active employees only for best performance.

---

### Q: Can I change colors and formatting without editing code?

**A:** Yes! All visual customization available through Settings UI:

**What You Can Customize** (No coding required):

1. **Colors**:

   - Non-delivered deal highlighting
   - Salesperson error highlighting
   - Duplicate stock colors
   - Leaderboard colors

2. **Thresholds**:

   - Pace indicator thresholds (green/yellow/red)
   - Performance benchmarks

3. **Date Settings**:
   - Sunday handling
   - Monday behavior
   - Archive naming format

**How to Access**:

1. Sales Tools → ⚙️ Settings
2. Go to 🎨 Visual Customization tab
3. Use color pickers to choose colors
4. Adjust threshold sliders
5. Click Save Changes

**Reset Available**: One-click "Reset to Defaults" button if you want to undo changes.

---

### Q: What happens to my settings if I copy the spreadsheet?

**A:** Settings behavior when copying:

**Configuration Data**:

- **SALESPEOPLE sheet**: ✅ Copies with spreadsheet
- **Properties Service data**: ❌ Does NOT copy
- **Conditional formatting**: ✅ Copies with sheets
- **Script code**: ✅ Copies with spreadsheet

**After Copying**:

1. Open Settings sidebar in new copy
2. Data auto-loads from SALESPEOPLE sheet
3. Click "Save Changes" to sync to Properties Service
4. All settings now active in copy

**Manual Alternative**: Export configuration from original, import to copy.

---

### Q: Can I have different settings for different locations/dealerships?

**A:** Yes, use separate spreadsheets:

**Recommended Approach**:

```
Location A Spreadsheet:
- Own salespeople roster
- Custom color scheme
- Location-specific settings

Location B Spreadsheet:
- Different salespeople
- Different thresholds
- Independent configuration
```

**Shared Elements**:

- Same script code
- Same basic workflow
- Can share best practices

**Deployment Options**:

1. **Template Approach**: Create master template, copy for each location
2. **Independent**: Each location sets up separately
3. **Centralized**: Use different sheets within one spreadsheet (not recommended)

---

## Daily Usage

### Q: Can I undo a daily process if I make a mistake?

**A:** **Sort of** - here's how to handle mistakes:

**Immediate Undo** (< 5 minutes):

```
1. File → Version history → See version history
2. Find version right before processing
3. Click to preview
4. Click "Restore this version"
5. Re-enter correct data
6. Process again
```

**Partial Undo** (Data already on MONTHLY):

```
1. Delete incorrect rows from MONTHLY
2. Edit date header if needed
3. Re-enter correct data on TODAY
4. Run daily processing again
5. Run Recalculate MTD to fix leaderboard
```

**Best Practice**: Double-check TODAY data before processing. The system validates but doesn't prevent all errors.

**Prevention**:

- Review data before processing
- Check duplicate highlights
- Verify salesperson names
- Confirm FI flags

---

### Q: How do I handle split sales between two salespersons?

**A:** Use the forward slash format:

**Correct Format**:

```
TODAY Sheet, Salesperson Column:
"John/Jane"
or
"JS/SJ"  (using aliases)
```

**Result**:

- John credited with 0.5 units
- Jane credited with 0.5 units
- Both appear in analytics
- Both counted in leaderboard

**Rules**:

- Use forward slash `/` only (not comma or ampersand)
- Maximum 2 salespersons per split
- Both names must be valid (in SALESPEOPLE)
- No spaces around slash recommended
- Case-insensitive matching

**Invalid Formats**:

```
❌ "John, Jane"      (comma)
❌ "John & Jane"     (ampersand)
❌ "John/Jane/Bob"   (three people)
```

---

### Q: What does the FI (Finance Indicator) column do?

**A:** The FI column determines if a sale is **delivered** (counted in analytics):

**Valid FI Flags** (Delivered):

- Any single letter A-Z
- Examples: F, B, A, R, etc.
- Must be exactly one character

**Invalid FI Flags** (Not Delivered):

- Blank/empty
- Numbers: 1, 2, 3
- Multiple characters: "FI", "FR"
- Special characters: \*, #, etc.

**Visual Indicators**:

- **Red highlight on MONTHLY**: Invalid/missing FI flag
- **No highlight**: Valid FI flag (delivered)

**Analytics Impact**:

- Only delivered sales (valid FI) counted
- Non-delivered highlighted but not in totals
- Trade counts unaffected by FI flag

---

### Q: Can I enter sales for past dates?

**A:** The system processes "yesterday's" sales by default, but you can enter any date:

**How It Works**:

```
TODAY sheet:
- Column A: Date (you can edit this)
- System formats date header based on current date
- But you can override by manual entry
```

**Process**:

1. Enter sales data on TODAY
2. In Column A, enter the actual sale date
3. Run daily processing
4. Date header on MONTHLY matches your entry

**Limitation**: Only one date per daily processing run.

**For Multiple Past Dates**:

```
1. Enter all sales for Date 1
2. Process daily (creates Date 1 header)
3. Enter all sales for Date 2
4. Process daily (creates Date 2 header)
5. Repeat as needed
```

---

### Q: What happens if I accidentally delete data from the MONTHLY sheet?

**A:** Use Version History for recovery:

**Recovery Steps**:

```
1. File → Version history → See version history
2. Use timeline or list to find version before deletion
3. Click version to preview
4. Verify it has correct data
5. Click "Restore this version"
6. Check MONTHLY sheet - data restored
```

**Prevention**:

- **Sheet Protection**: Protect MONTHLY from edits
- **Named Versions**: Create named version daily/weekly
- **Backup Downloads**: Download spreadsheet regularly
- **Access Control**: Limit who can edit MONTHLY

**If Version History Unavailable**:

- Manually reconstruct from TODAY data
- Use archived month sheets if available
- Contact support for assistance

---

## Data Management

### Q: Where is my data stored?

**A:** Sales Log Pro stores data in multiple locations:

**Google Sheets** (Primary Data):

```
- TODAY sheet: Current day's entries
- MONTHLY sheet: Current month's history
- Archive sheets: Previous months (e.g., "5/25")
- SALESPEOPLE sheet: Team roster
- DEPOSITS sheet: Deposit tracking
```

**Properties Service** (Configuration):

```
- Salesperson roster
- Visual settings (colors, thresholds)
- Date preferences
- Metadata (version, last modified)
```

**Script Cache** (Temporary):

```
- Salesperson maps (5-min TTL)
- Analytics results (5-min TTL)
- Configuration (10-min TTL)
```

**Data Ownership**:

- You own all data in your Google Drive
- Data never leaves Google's infrastructure
- No external servers or databases used

---

### Q: Can I export my data?

**A:** Yes, multiple export options available:

**Full Spreadsheet**:

```
File → Download → Choose format:
- Microsoft Excel (.xlsx)
- PDF
- CSV (current sheet only)
- OpenDocument (.ods)
```

**Specific Data**:

```
1. Select range on any sheet
2. Copy (Ctrl+C or Cmd+C)
3. Paste into external application
```

**Configuration Export**:

```
Via Apps Script:
1. Apps Script Editor
2. Run exportConfiguration()
3. Copy JSON output
4. Save to file
```

**Analytics Export**:

```
1. Open MONTHLY sheet
2. Select columns S-X
3. Copy data
4. Paste into Excel/analysis tool
```

**Best Practice**: Export monthly archives for long-term storage outside Google Drive.

---

### Q: How long does data persist in the system?

**A:** Data persists indefinitely unless manually deleted:

**Automatic Retention**:

- **TODAY sheet**: Cleared after each daily processing
- **MONTHLY sheet**: Persists until month rollover
- **Archive sheets**: Persist forever (until manually deleted)
- **SALESPEOPLE**: Persists until manually modified
- **Configuration**: Persists until manually changed

**Recommended Retention**:

```
- Current month (MONTHLY): Keep active
- Previous 12 months (Archives): Keep for analysis
- 13-24 months old: Archive externally, consider deleting
- 24+ months old: Archive externally, delete from sheet
```

**Why Clean Old Data**:

- Improves performance
- Reduces storage usage
- Faster loading times
- Easier navigation

**Backup Before Deleting**: Always download old archives before deletion.

---

### Q: What's the maximum amount of data the system can handle?

**A:** Performance tested with substantial data loads:

**Tested Capacity**:

- **MONTHLY rows**: 1,000+ rows (tested to 2,000)
- **Salespeople**: 50+ active team members
- **Archive sheets**: 24+ months of history
- **Daily entries**: 50+ sales per day

**Performance Impact**:

```
Small Deployment (<500 rows/month):
- Processing: < 5 seconds
- Analytics: < 2 seconds
- Rollover: < 10 seconds

Medium Deployment (500-1000 rows/month):
- Processing: 5-15 seconds
- Analytics: 2-5 seconds
- Rollover: 10-20 seconds

Large Deployment (1000+ rows/month):
- Processing: 15-30 seconds
- Analytics: 5-10 seconds
- Rollover: 20-40 seconds
```

**Google Sheets Limits**:

- Maximum 10 million cells per spreadsheet
- Maximum 5 million cells per sheet
- These limits rarely reached in practice

**Optimization**: Run monthly rollover on schedule to keep MONTHLY sheet size manageable.

---

## Analytics & Reporting

### Q: How are analytics calculated?

**A:** Analytics use a multi-step calculation process:

**Calculation Process**:

```
1. Read all MONTHLY sheet data (columns A-N)
2. Filter for delivered deals (FI = single letter A-Z)
3. Separate new (columns B-G) vs. used (columns I-N)
4. Count selling days (where Column A = 1)
5. Resolve salesperson names via alias map
6. Handle split sales (0.5 credit each)
7. Calculate team totals and per-person metrics
8. Rank salespeople by total sales
9. Calculate percentages of team total
10. Write to MONTHLY columns S-X
```

**Key Formulas**:

```
Selling Days = Count of rows where Column A = 1
Per Day Average = Total Delivered ÷ Selling Days
Percentage of Team = (Person's Total ÷ Team Total) × 100
Rank = Position when sorted by total sales (descending)
```

**Accuracy**:

- Recalculated fresh each time
- No cumulative rounding errors
- Validation checks built-in
- 5-minute cache for performance

---

### Q: Why don't my analytics match my manual count?

**A:** Common reasons for discrepancies:

**Reason 1: FI Flags**

```
Analytics only count delivered sales (FI = A-Z)
Manual count might include non-delivered

Solution: Verify FI columns (C, J) have valid flags
```

**Reason 2: Salesperson Names**

```
Unknown salespeople excluded from analytics
Show up in "unknownSalespeople" array

Solution: Add missing people to SALESPEOPLE sheet
```

**Reason 3: Split Sales**

```
"John/Jane" counts as 0.5 for each
Manual count might count as 1 for each

Solution: Verify split sales formatted correctly
```

**Reason 4: Cached Data**

```
Analytics might be showing cached results
Recent changes not reflected yet

Solution: Run manual analytics refresh
```

**Verification**:

```
1. Check "Last Updated" timestamp in analytics
2. Verify against current date/time
3. Run: Sales Tools → 🔄 Refresh Analytics
4. Recount manually if still mismatched
```

---

### Q: Can I customize what analytics are calculated?

**A:** Yes, but requires code modification:

**Current Analytics** (Out of Box):

- Total/new/used delivered counts
- Selling days elapsed
- Per-day averages
- Per-salesperson breakdowns
- Team percentages
- Performance rankings

**To Add Custom Metrics**:

```javascript
// In sales_analytics.js
function processMonthlyDataForAnalytics(monthlyData, aliasMap) {
  // Add your custom metric tracking
  const metrics = {
    totalNew: 0,
    totalUsed: 0,
    customMetric: 0, // Your addition
    // ...
  };

  // Process and calculate
  // Update formatting functions to display
}
```

**Common Customizations**:

- Trade percentage tracking
- Average gross profit
- Product mix analysis
- Lead source tracking
- Financing method breakdown

**Requires**: JavaScript knowledge and Apps Script experience

**Alternative**: Export analytics to external tools (Excel, Power BI) for custom analysis.

---

## Performance & Limits

### Q: Why is processing sometimes slow?

**A:** Several factors affect processing speed:

**Common Causes**:

**1. Large MONTHLY Sheet**

```
Problem: > 1,000 rows in MONTHLY
Solution: Run month rollover to archive old data
```

**2. Many Salespeople**

```
Problem: > 50 active salespeople
Solution: Remove inactive team members from roster
```

**3. Complex Conditional Formatting**

```
Problem: Multiple overlapping rules
Solution: System reapplies optimal rules automatically
```

**4. Network Latency**

```
Problem: Slow internet connection
Solution: Use wired connection, try during off-peak hours
```

**5. Concurrent Execution**

```
Problem: Multiple users running processes simultaneously
Solution: Script locking prevents this, wait 30 seconds
```

**Performance Tips**:

- Regular monthly rollovers
- Keep salesperson roster current
- Don't manually add excessive formatting
- Use good internet connection
- Avoid peak usage hours

---

### Q: Are there any quota limits I should be aware of?

**A:** Yes, Google Apps Script has daily quotas:

**Free Gmail Account Quotas**:

```
- Script runtime: 6 minutes per execution
- Triggers: 20 triggers per script
- Email sends: 100 per day
- URL fetches: 20,000 per day
```

**Google Workspace Quotas**:

```
- Script runtime: 6 minutes per execution
- Triggers: 20 triggers per script
- Email sends: 1,500 per day
- URL fetches: 20,000 per day
```

**Sales Log Pro Usage** (Typical):

```
- Daily processing: 2-30 seconds (well under 6 min)
- Rollover: 10-40 seconds
- No time-based triggers used
- No email sends (unless customized)
- No URL fetches
```

**Quota Issues**:

- Rare in normal usage
- Might occur with very large datasets
- Check execution log for quota errors
- Wait 24 hours for quota reset

**View Quotas**: Apps Script Dashboard → Quotas

---

## Compatibility

### Q: Which Google Sheets features are compatible?

**A:** Sales Log Pro works with most Google Sheets features:

**Compatible** ✅:

- Filters and filter views
- Charts and graphs
- Data validation
- Cell comments
- Named ranges
- Formulas in unused columns
- Importing data
- Add-ons (most)

**Incompatible** ⚠️:

- Column rearrangement (breaks references)
- Renaming required sheets
- Deleting required columns
- Protected ranges on data areas
- Scripts that modify same ranges

**Best Practices**:

- Use columns beyond N for custom formulas
- Don't rename TODAY, MONTHLY, SALESPEOPLE, DEPOSITS
- Don't move or delete columns A-N
- Test add-ons in copy before production use

---

### Q: Does Sales Log Pro work with the mobile Google Sheets app?

**A:** **Limited functionality** on mobile:

**What Works** ✅:

- Viewing data (all sheets)
- Reading analytics
- Checking leaderboard
- Viewing archives
- Basic data entry on TODAY

**What Doesn't Work** ❌:

- Custom menu (Sales Tools)
- Running daily processing
- Opening Settings sidebar
- Running setup wizard
- Running analytics refresh
- Month rollover

**Mobile Workflow**:

```
1. Enter data on TODAY via mobile
2. Switch to desktop to run processing
3. View results on mobile
```

**Best Practice**: Use desktop for all automation functions, mobile for viewing/light data entry only.

---

### Q: Can I use this with Google Workspace offline mode?

**A:** **No**, Sales Log Pro requires internet connection:

**Why Internet Required**:

- Apps Script executes on Google servers
- Properties Service cloud-based
- Cache Service cloud-based
- Menu functions server-side

**Offline Limitations**:

- Can view data (if previously loaded)
- Can enter data (syncs when online)
- Cannot run any script functions
- Cannot process daily sales
- Cannot open Settings
- Cannot run analytics

**Offline Alternative**:

```
1. Export to Excel before going offline
2. Work in Excel offline
3. Re-import when back online
4. Process through Sales Log Pro
```

---

## License & Usage Rights

### Q: Can I use Sales Log Pro at multiple dealership locations?

**A:** Yes, with proper licensing:

**Free/Community Version**:

- ✅ Single location use
- ✅ One dealership
- ❌ Multi-location deployment

**Commercial License**:

- ✅ Multiple locations
- ✅ Dealership groups
- ✅ Centralized deployment
- ✅ Priority support

**Implementation Options**:

**Option 1: Separate Spreadsheets**

```
Each location maintains own spreadsheet
- Independent configuration
- Location-specific team
- Separate data
```

**Option 2: Shared Template**

```
Create master template
Copy for each location
Each runs independently
```

**Option 3: Multi-Sheet Deployment**

```
Single spreadsheet
Different TODAY/MONTHLY sheets per location
Requires customization
```

Contact licensing for multi-location deployments.

---

### Q: Can I modify the code for my specific needs?

**A:** Depends on your license:

**Free/Community Version**:

- ✅ Personal modifications
- ✅ Internal use customizations
- ❌ Redistribution of modified version
- ❌ Commercial resale

**Commercial License**:

- ✅ Custom modifications
- ✅ Organization-specific features
- ✅ Integration with other systems
- ✅ Technical support for modifications

**Common Modifications**:

```
Allowed:
- Adding custom analytics
- Additional sheets
- Extra validation rules
- Custom reports
- Integration hooks

Restricted:
- Removing attribution
- Rebranding as own product
- Selling to others
```

**Support Note**: Modified versions may not be eligible for official support.

---

### Q: What happens if I stop paying for a commercial license?

**A:** License terms specify:

**Subscription Model**:

```
Active License:
- Full functionality
- Updates included
- Priority support

Expired License:
- System continues working
- No new updates
- No support
- Must renew for updates
```

**Perpetual License**:

```
One-time purchase:
- Permanent use of current version
- No updates after purchase
- Limited support period
```

**Data Ownership**:

- You always own your data
- Can export at any time
- Spreadsheet remains accessible
- Script code remains in your project

**Transition**: Contact licensing before expiration to avoid service interruption.

---

## Troubleshooting Quick Answers

### Q: Why am I seeing "Approaching size limit" warnings in the logs?

**A:** This indicates your sync metadata is growing beyond the recommended 6KB threshold (75% of the 8KB limit). This is normal for high-activity spreadsheets with many users editing the SALESPEOPLE sheet frequently.

**What happens:**

1. At 75% (6KB): Warning logged, no action taken
2. At 100% (8KB): Automatic cleanup removes entries older than 30 days
3. After cleanup: Size reduced (typically to 4-5KB), operations continue normally

**What it means:**

- Your spreadsheet is actively used (good!)
- High edit frequency on SALESPEOPLE sheet
- Normal for dealerships with frequent roster changes
- System is monitoring and managing itself

**Action required:** None. The system handles this automatically.

**Technical details:**

```
Size threshold: 8KB (9KB hard limit with safety margin)
Warning threshold: 6KB (75% of limit)
Retention period: 30 days
Cleanup: Automatic when threshold exceeded
Performance impact: <50-100ms during cleanup (rare)
```

**When cleanup occurs:**

- Identifies entries older than 30 days
- Removes outdated sync metadata
- Preserves recent entries and special keys
- Logs removal count for monitoring
- Operation continues without interruption

**If you see this frequently:**

- Normal for high-activity spreadsheets
- Indicates healthy, active usage
- Automatic cleanup prevents issues
- No performance degradation
- Monitor logs to verify cleanup success

**Only contact support if:**

- Cleanup fails repeatedly
- Operations start timing out
- Error messages accompany warnings
- Size continues growing after cleanup

---

### Q: What happens if lock acquisition fails after retries?

**A:** After 5 retry attempts (~3.1 seconds of delays plus 30s timeout per attempt), the operation will fail with a clear error message. This typically indicates one of the following situations.

**Common scenarios:**

**1. Another long-running operation** is holding the lock

```
Cause: Daily processing, month rollover, or analytics refresh in progress
Solution: Wait 30-60 seconds and try again
Timeline: Usually resolves within 1-2 minutes
```

**2. System congestion** with multiple concurrent users

```
Cause: Multiple people using Settings or running operations simultaneously
Solution: Coordinate with team, retry after brief wait
Prevention: Designate one person for configuration changes
```

**3. Persistent lock issue** requiring investigation

```
Cause: Stuck process or script error
Solution: Check Executions log for long-running operations
Action: May need to wait for automatic timeout
```

**What to do:**

**Immediate (within 5 minutes):**

```
1. Wait 30-60 seconds
2. Try operation again (system will retry automatically)
3. Don't click menu items multiple times
4. Check if other users are active
```

**If persistent (after 5 minutes):**

```
1. Apps Script Editor → View → Executions
2. Look for operations running > 30 seconds
3. Note any error messages
4. Wait for long operations to complete
5. Try again after confirmation
```

**Check execution logs:**

```
Look for entries like:
[Lock Retry] Attempt 1 failed. Retrying in 100ms...
[Lock Retry] Attempt 2 failed. Retrying in 200ms...
[Lock Retry] Successfully acquired lock on attempt 3

Failed acquisition shows:
[Lock Retry] All 5 attempts failed
Error: Could not acquire lock after 5 attempts (total wait: ~3100ms)
```

**Retry schedule:**

```
Attempt 1: Immediate (0ms delay)
Attempt 2: 100ms delay
Attempt 3: 200ms delay
Attempt 4: 400ms delay
Attempt 5: 800ms delay
Attempt 6: 1600ms delay

Total retry time: ~3.1 seconds
Plus 30s lock timeout per attempt
Maximum total: ~183 seconds
```

**Prevention:**

- Avoid running multiple operations simultaneously
- Coordinate timing with other users
- Use Settings sidebar (better lock management)
- Monitor execution logs for patterns
- Run intensive operations during off-peak hours

---

### Q: Do cache failures affect my data?

**A:** **No.** Cache failures have zero impact on data integrity. This is a core design principle of Sales Log Pro.

**Why no impact:**

**1. Data safety:** All data stored in sheets and Properties Service (not cache)

```
Primary storage:
- TODAY sheet: Daily entries
- MONTHLY sheet: Historical data
- SALESPEOPLE sheet: Team roster
- Properties Service: Configuration

Cache storage:
- Temporary copies only
- Performance optimization
- NOT the source of truth
- Can be cleared without loss
```

**2. Operations continue:** Cache failures don't interrupt operations

```
What happens when cache fails:
1. System logs error (for monitoring)
2. Operation continues normally
3. Data written to primary storage
4. Cache expires naturally (5-10 min)
5. Next operation refreshes cache

What does NOT happen:
- Operation doesn't fail
- No data corruption
- No user error messages
- No functionality loss
```

**3. Auto-recovery:** Cache expires naturally within 5-10 minutes

```
Cache TTL (Time To Live):
- Configuration: 10 minutes
- Salesperson maps: 5 minutes
- Analytics: 5 minutes
- Visual settings: 5 minutes

After expiry:
- Data reloaded from source automatically
- Cache repopulated on next access
- No manual intervention needed
```

**4. Performance:** Slight slowdown until cache refreshes

```
Impact during cache failure:
- Operations may be 10-20% slower
- Still complete successfully
- No user-visible errors
- Temporary inconvenience only

Normal performance resumes:
- Within 5-10 minutes automatically
- Or immediately on manual refresh
- No lasting effects
```

**Why defensively handled:**

**Design Philosophy:**

```
Cache = Convenience, not Critical

Principles:
1. CacheService is optimization, not requirement
2. Operations must succeed even when cache unavailable
3. User experience shouldn't degrade due to cache
4. Reliability over speed
```

**Implementation:**

```javascript
// All cache operations wrapped defensively
try {
  cache.put(key, data, ttl);
  Logger.log("Cache updated successfully");
} catch (error) {
  // Log but don't fail
  Logger.log("[HIGH] Cache update failed (non-fatal): " + error.message);
  // Operation continues regardless
}
```

**When you might see cache errors:**

**In execution logs:**

```
[CRITICAL] Cache invalidation failed (non-fatal): Service unavailable
[HIGH] Failed to write analytics cache (non-fatal)
[MEDIUM] Cache read failed, loading from source

Note: All marked "non-fatal" to indicate operation succeeded
```

**What to monitor:**

```
✓ Verify operations show "Success" status
✓ Check that data appears correctly in sheets
✓ Confirm no user-facing error messages
✓ Note cache errors are logged but not critical
```

**When to take action:**

**Never required, but optional:**

```
If concerned about stale data:
1. Wait 5-10 minutes for natural expiry
2. Refresh browser page
3. Run manual analytics refresh
4. Verify latest data in sheets

If recurring and frequent:
1. Note pattern in logs
2. Check Google Workspace status
3. Verify network connectivity
4. Contact support if suspicious pattern
```

**Summary:**

- Cache failures are logged for monitoring
- Operations always complete successfully
- Data integrity never compromised
- No user action needed
- System designed for resilience

---

### Q: "Could not acquire script lock" - what does this mean?

**A:** Another process is currently running:

**Cause**: Script locking prevents simultaneous execution that could corrupt data.

**Solution**:

```
1. Wait 30 seconds
2. Try operation again
3. Don't click menu items multiple times
4. Check Executions log for stuck processes
```

**Prevention**: Don't run multiple operations at once.

---

### Q: Settings won't save - what should I do?

**A:** Check for validation errors:

**Common Issues**:

```
- Display code not 2-4 characters
- Invalid color code format
- Duplicate aliases
- Name too short
```

**Solution**:

```
1. Look for red error messages in Settings UI
2. Fix validation issues
3. Try saving in smaller batches
4. Check Executions log for specific errors
```

---

### Q: My leaderboard colors disappeared - how do I fix?

**A:** Reapply conditional formatting:

**Quick Fix**:

```
1. Run: Sales Tools → Process Daily
   OR
2. Run: Sales Tools → Recalculate MTD & Check Monthly Errors/Formats

Both reapply conditional formatting automatically
```

**Manual Reset**: Settings → Visual Customization → Adjust colors → Save

---

### Q: Can I recover deleted salespeople?

**A:** Yes, using version history or SALESPEOPLE sheet:

**Option 1: Version History**

```
1. File → Version history → See version history
2. Find version before deletion
3. Restore that version
4. Salesperson data recovered
```

**Option 2: SALESPEOPLE Sheet**

```
If deleted from Settings but still in SALESPEOPLE sheet:
1. Open Settings sidebar
2. Data auto-loads from sheet
3. Click Save Changes
4. Salesperson restored to system
```

**Prevention**: Regular backups of SALESPEOPLE sheet and configuration exports.

---

## Still Have Questions?

### Documentation Resources

- **User Guide**: [`docs/guides/USER_GUIDE.md`](../guides/USER_GUIDE.md)
- **API Reference**: [`docs/api/API_REFERENCE.md`](../api/API_REFERENCE.md)
- **Troubleshooting**: [`docs/troubleshooting/TROUBLESHOOTING.md`](TROUBLESHOOTING.md)
- **Deployment Guide**: [`docs/guides/DEPLOYMENT_GUIDE.md`](../guides/DEPLOYMENT_GUIDE.md)

### Support Channels

**Community Support**:

- GitHub Issues (if applicable)
- Community forums
- Documentation search

**Licensed Customers**:

- Priority email support
- Phone support (premium plans)
- Direct technical assistance
- Custom training available

### Feedback

Have a question not answered here? Submit feedback to help us improve this FAQ:

- Create GitHub issue
- Contact support email
- Suggest documentation improvements

---

_Sales Log Pro FAQ v8.0 | Last Updated: 2025-10-10 | 25 Questions_
