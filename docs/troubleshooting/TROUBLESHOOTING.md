# Sales Log Pro - Troubleshooting Guide

## Table of Contents

1. [Setup & Installation Issues](#setup--installation-issues)
2. [Daily Processing Issues](#daily-processing-issues)
3. [Analytics Issues](#analytics-issues)
4. [Settings & Configuration Issues](#settings--configuration-issues)
5. [Month Rollover Issues](#month-rollover-issues)
6. [Conditional Formatting Issues](#conditional-formatting-issues)
7. [Performance Issues](#performance-issues)
8. [Data Recovery](#data-recovery)
9. [Checking Logs](#checking-logs)
10. [Permission Issues](#permission-issues)
11. [When to Contact Support](#when-to-contact-support)

---

## Setup & Installation Issues

### Setup Wizard Fails to Create Sheets

**Symptoms**:

- Setup wizard completes but sheets not created
- Error message: "Required sheets missing"
- Partial sheet creation (some created, some not)

**Common Causes**:

1. Insufficient permissions
2. Script execution timeout
3. Spreadsheet protection settings
4. Quota limits exceeded

**Solutions**:

**Solution 1: Check Permissions**

```
1. Open Apps Script editor (Extensions → Apps Script)
2. Click Run → Select onOpen function
3. Click "Review Permissions"
4. Authorize all requested permissions
5. Return to spreadsheet and retry setup wizard
```

**Solution 2: Manual Sheet Creation**

```
If wizard fails repeatedly:

1. Create sheets manually with exact names:
   - "TODAY"
   - "MONTHLY"
   - "SALESPEOPLE"
   - "DEPOSITS"

2. Run setup wizard again - it will skip existing sheets
   and configure them properly
```

**Solution 3: Check Sheet Protection**

```
1. Right-click sheet tab → "Protect sheet"
2. If protection exists, remove it
3. Retry setup wizard
```

**Solution 4: Verify Quotas**

```
1. Apps Script Editor → View → Executions
2. Check for quota limit errors
3. Wait 24 hours if quota exceeded
4. Consider workspace upgrade if recurring
```

**Prevention**:

- Run setup wizard during low-usage hours
- Ensure account has create sheet permissions
- Avoid running multiple times simultaneously

---

### Menu Not Appearing

**Symptoms**:

- "Sales Tools" menu missing from spreadsheet
- Menu appears but has no items
- Menu disappears after page refresh

**Common Causes**:

1. Apps Script not bound to spreadsheet
2. [`onOpen()`](../../src/core_saleslogPro.js:1654-1707) function not executing
3. Script errors preventing menu creation
4. Browser cache issues

**Solutions**:

**Solution 1: Refresh and Wait**

```
1. Close the spreadsheet tab completely
2. Wait 10 seconds
3. Reopen the spreadsheet
4. Wait 15-20 seconds for menu to load
5. Refresh page (Ctrl+R or Cmd+R) if still missing
```

**Solution 2: Manually Run onOpen**

```
1. Extensions → Apps Script
2. Select "onOpen" function from dropdown
3. Click "Run" button
4. Return to spreadsheet
5. Refresh page - menu should appear
```

**Solution 3: Check for Script Errors**

```
1. Apps Script Editor → View → Executions
2. Look for errors in recent executions
3. Check error messages for specific issues
4. Fix errors and redeploy if needed
```

**Solution 4: Clear Browser Cache**

```
1. Close all spreadsheet tabs
2. Clear browser cache for Google Sheets
3. Clear cookies for *.google.com
4. Restart browser
5. Reopen spreadsheet
```

**Prevention**:

- Always authorize script permissions fully
- Don't modify script files while spreadsheet is open
- Use supported browsers (Chrome, Firefox, Safari, Edge)

---

### Authorization Issues

**Symptoms**:

- "Authorization Required" dialog appears repeatedly
- "This app isn't verified" warning
- Script won't run after authorization

**Common Causes**:

1. OAuth scope changes
2. Google security review required
3. Account permissions insufficient
4. Organization policies blocking

**Solutions**:

**Solution 1: Complete Authorization**

```
1. Click "Review Permissions" in dialog
2. Select your Google account
3. Click "Advanced" link
4. Click "Go to [Project Name] (unsafe)"
   Note: This is normal for unverified scripts
5. Click "Allow" to grant all permissions
```

**Solution 2: Check Required Scopes**

```
Verify appsscript.json includes:
- https://www.googleapis.com/auth/spreadsheets
- https://www.googleapis.com/auth/script.container.ui

If missing, add them and reauthorize.
```

**Solution 3: Organization Restrictions**

```
If in a workspace with restrictions:

1. Contact your Google Workspace administrator
2. Request authorization for Apps Script projects
3. Provide project ID from Apps Script settings
4. Wait for admin approval
```

**Solution 4: Remove and Re-Add Authorization**

```
1. Go to myaccount.google.com/permissions
2. Find "Sales Log Pro" or script project
3. Click "Remove Access"
4. Return to spreadsheet
5. Reauthorize when prompted
```

---

## Daily Processing Issues

### "No Sales Activity Found" Error

**Symptoms**:

- Daily processing completes but says no activity
- TODAY sheet has data but not processed
- Empty MONTHLY sheet after processing

**Common Causes**:

1. Data in wrong columns
2. TODAY sheet renamed or missing
3. Data outside expected range (A2:N51)
4. Only column A filled (sequence numbers)

**Solutions**:

**Solution 1: Verify Data Location**

```
Check data is in correct columns:
- New car sales: Columns B-G
- Used car sales: Columns I-N
- At least one section must have data
- Data must be in rows 2-51
```

**Solution 2: Check for Content**

```
Valid data requires:
- At least one cell in B-G OR I-N with content
- Not just Column A (sequence numbers)
- Not just blank/space characters

Example valid row:
B: "John Doe"  C: "F"  D: "Camry"  E: "12345"
```

**Solution 3: Verify Sheet Name**

```
1. Sheet must be named exactly "TODAY"
2. Case-sensitive (not "today" or "Today")
3. No extra spaces in name
4. Right-click tab → "Rename" to verify
```

**Solution 4: Move Data Into Range**

```
If data is below row 51:

1. Cut data from below row 51
2. Paste into rows 2-51
3. Run daily processing again
```

---

### Daily Processing Doesn't Work

**Symptoms**:

- Processing starts but fails
- Error dialog appears
- Data not transferred to MONTHLY
- TODAY sheet not cleared

**Common Causes**:

1. Script lock timeout (concurrent execution)
2. Missing required sheets
3. Invalid FI flags
4. MONTHLY sheet column count insufficient

**Solutions**:

**Solution 1: Wait and Retry**

```
If error: "Could not acquire script lock"

1. Wait 30 seconds
2. Do not click menu items multiple times
3. Retry processing once
4. Check for stuck processes in Executions log
```

**Solution 2: Verify All Sheets Exist**

```
Required sheets (case-sensitive):
☐ TODAY
☐ MONTHLY
☐ SALESPEOPLE
☐ DEPOSITS

If any missing:
1. Run Setup Wizard (Sales Tools → 🚀 Run Setup Wizard)
2. Or create manually with exact names
```

**Solution 3: Check MONTHLY Columns**

```
MONTHLY sheet must have at least 14 columns (A-N)

To verify:
1. Open MONTHLY sheet
2. Check column headers go through at least N
3. If insufficient, insert columns
```

**Solution 4: Check Apps Script Logs**

```
1. Apps Script Editor → View → Executions
2. Find most recent execution
3. Click to view details
4. Look for specific error message
5. Follow error-specific solution below
```

---

### Font Colors Not Transferring

**Symptoms**:

- Font colors applied on TODAY sheet
- Colors don't appear on MONTHLY sheet
- Only default black text in MONTHLY

**Common Causes**:

1. Colors applied after processing
2. Using background color instead of font color
3. TODAY sheet formatting corrupted

**Solutions**:

**Solution 1: Apply Before Processing**

```
Correct workflow:
1. Enter data on TODAY sheet
2. Apply font colors to TODAY sheet
3. Then run "Log Yesterday's Sales"

Font colors only transfer during processing.
```

**Solution 2: Verify Font Color (Not Background)**

```
1. Select cell on TODAY sheet
2. Click text color button (A with underline)
3. Choose color from palette
4. Do NOT use fill color (paint bucket icon)
```

**Solution 3: Re-Enter and Process**

```
If colors already applied but not transferred:

1. Copy data from TODAY sheet
2. Clear TODAY sheet
3. Paste data back
4. Reapply font colors
5. Run daily processing
```

**Note**: Colors on MONTHLY cannot be synced back to TODAY. Direction is one-way only during [`processDaily()`](../../src/core_saleslogPro.js:1081-1285).

---

### Wrong Date in MONTHLY Header

**Symptoms**:

- Date header shows unexpected date
- Monday shows Sunday date (or vice versa)
- Off by one day consistently

**Common Causes**:

1. Monday logs Saturday setting
2. Timezone differences
3. Processing run at wrong time

**Solutions**:

**Solution 1: Check Date Settings**

```
1. Sales Tools → ⚙️ Settings
2. Go to 📅 Date Settings tab
3. Review "Monday Logs Saturday" checkbox:
   - ☑ Checked: Monday defaults to Saturday
   - ☐ Unchecked: Monday uses Sunday
4. Adjust as needed for your dealership
```

**Solution 2: Verify Sunday Skip Setting**

```
1. In Date Settings tab
2. Check "Skip Sundays" setting
3. If enabled, Sunday processing prevented
4. Monday processing may compensate
```

**Solution 3: Manual Date Correction**

```
If wrong date already inserted:

1. Locate date header on MONTHLY sheet
2. Click the merged cell with date
3. Edit to correct date (format: M/D)
4. Press Enter to save
```

---

## Analytics Issues

### Analytics Not Updating

**Symptoms**:

- Analytics columns (S-X) empty or outdated
- Analytics don't reflect recent sales
- "Last Updated" timestamp old

**Common Causes**:

1. Analytics calculation disabled or failed
2. Cache not invalidated
3. Insufficient columns on MONTHLY sheet
4. Data outside expected range

**Solutions**:

**Solution 1: Manual Refresh**

```
1. Sales Tools → 🔄 Refresh Analytics
2. Click "Yes" to confirm
3. Wait for completion dialog
4. Verify "Last Updated" timestamp current
```

**Solution 2: Verify Column Count**

```
MONTHLY sheet needs at least 24 columns (A-X) for analytics

To check:
1. Open MONTHLY sheet
2. Scroll right to verify columns through X exist (S-X contain analytics)
3. If columns missing, insert at right edge
4. Run analytics refresh
```

**Solution 3: Check for Calculation Errors**

```
1. Apps Script Editor → View → Executions
2. Look for "calculateMonthlyAnalytics" entries
3. Check for error messages
4. Common errors:
   - "Sheet needs at least 26 columns"
   - "MONTHLY sheet is empty"
```

**Solution 4: Invalidate Cache and Recalculate**

```
1. Run daily processing (even if no new sales)
   This forces cache invalidation
2. Or manually refresh analytics
3. Verify results in columns S-X
```

---

### Incorrect Salesperson Counts

**Symptoms**:

- Analytics show wrong counts for salespeople
- Numbers don't match manual count
- Split sales counted incorrectly

**Common Causes**:

1. Salesperson name not in SALESPEOPLE sheet
2. FI flags missing or invalid
3. Split sales formatted incorrectly
4. Data edited after processing

**Solutions**:

**Solution 1: Verify Salesperson Names**

```
1. Check MONTHLY sheet salesperson columns (G, N)
2. Verify names exist in SALESPEOPLE sheet
3. Check for typos or variations
4. Add missing aliases via Settings
```

**Solution 2: Check FI Flags**

```
Analytics only count delivered sales (FI = A-Z)

To verify:
1. Open MONTHLY sheet
2. Check columns C and J (FI columns)
3. Delivered sales must have single letter A-Z
4. Fix any blank, multi-character, or invalid flags
5. Run analytics refresh
```

**Solution 3: Verify Split Sale Format**

```
Correct format: "John/Jane"
Incorrect: "John, Jane" or "John & Jane"

Each person gets 0.5 credit with correct format.

To fix:
1. Find split sales on MONTHLY
2. Change to "Name1/Name2" format
3. Run analytics refresh
```

**Solution 4: Manual Recalculation**

```
1. Sales Tools → Recalculate MTD & Check Monthly Errors/Formats
2. This rebuilds counts from MONTHLY data
3. Then run analytics refresh
4. Verify counts now correct
```

---

### Analytics Missing from Archive

**Symptoms**:

- Month rollover completed
- Archive sheet created
- Analytics columns (S-X) empty in archive

**Common Causes**:

1. Analytics not calculated before rollover
2. Archive created manually (not via rollover)
3. Columns not copied during rollover

**Solutions**:

**Solution 1: Manual Analytics Copy**

```
1. Open current MONTHLY sheet
2. Run analytics refresh to ensure current
3. Select columns S-X (all rows with data)
4. Copy selection (Ctrl+C or Cmd+C)
5. Open archive sheet
6. Select column S, row 1
7. Paste (Ctrl+V or Cmd+V)
```

**Solution 2: Recalculate for Archive Month**

```
This requires manual process:

1. Copy archive sheet data to MONTHLY temporarily
2. Run analytics refresh
3. Copy resulting analytics (S-X) back to archive
4. Restore current MONTHLY data

Note: Complex - only if analytics critical for that month
```

**Prevention**:

- Always use rollover function (don't create archives manually)
- Verify analytics refresh before rollover
- Check columns S-X included when rollover completes

---

## Settings & Configuration Issues

### Settings UI Won't Open

**Symptoms**:

- Clicking Settings menu item does nothing
- Settings sidebar doesn't appear
- Error message when opening settings

**Common Causes**:

1. HTML file missing or corrupted
2. Permission issues
3. Script error during sidebar creation
4. Browser blocking sidebar

**Solutions**:

**Solution 1: Refresh and Retry**

```
1. Refresh spreadsheet (Ctrl+R or Cmd+R)
2. Wait 10 seconds for scripts to load
3. Try opening settings again
4. If fails, proceed to next solution
```

**Solution 2: Check HTML Files**

```
In Apps Script Editor, verify files exist:
☐ config_sidebar.html
☐ config_sidebar.css.html
☐ sidebar_js.html

If missing:
1. Re-add files from source repository
2. Save project
3. Return to spreadsheet and retry
```

**Solution 3: Check Execution Log**

```
1. Apps Script Editor → View → Executions
2. Find "openConfigurationSidebar" execution
3. Check for errors:
   - File not found
   - Permission denied
   - HTML parsing error
4. Fix specific error and retry
```

**Solution 4: Browser Issues**

```
1. Try different browser (Chrome recommended)
2. Disable browser extensions temporarily
3. Clear cache and cookies
4. Ensure pop-ups not blocked
```

---

### Settings Changes Not Saving

**Symptoms**:

- Settings appear to save
- Changes revert after closing sidebar
- Configuration unchanged after save

**Common Causes**:

1. Validation errors (silent failures)
2. Concurrent modification
3. Properties Service write failure
4. Browser session timeout

**Solutions**:

**Solution 1: Check for Validation Errors**

```
Common validation issues:
- Display code not 2-4 characters
- Invalid color codes (must be #RRGGBB)
- Duplicate aliases across team
- Full name too short (< 2 characters)

Fix validation issues and retry save.
```

**Solution 2: Wait and Retry**

```
If error: "Could not acquire lock"

1. Wait 30 seconds
2. Close settings sidebar
3. Reopen settings
4. Make changes again
5. Save
```

**Solution 3: Save in Smaller Batches**

```
Instead of:
- Adding 10 salespeople at once

Try:
- Add 2-3 salespeople
- Click Save Changes
- Wait for confirmation
- Add next batch
```

**Solution 4: Verify Properties Service Access**

```
1. Apps Script Editor → View → Executions
2. Look for "updateConfiguration" entries
3. Check for permission errors
4. Reauthorize if needed
```

---

### Alias Conflicts

**Symptoms**:

- Error: "Alias already used"
- Can't add new salesperson
- Update fails with conflict message

**Common Causes**:

1. Alias already assigned to another person
2. Alias matches another person's full name
3. Alias matches another person's display code

**Solutions**:

**Solution 1: Choose Different Alias**

```
If "JS" already used:
- Try "JMS" (add middle initial)
- Try "JSM" (reverse order)
- Try "JSX" (add character)
```

**Solution 2: Find Conflicting Person**

```
1. Review current salespeople list in Settings
2. Search for the conflicting alias
3. Either:
   a) Remove alias from other person
   b) Choose different alias for new person
```

**Solution 3: Use Full Name Instead**

```
System automatically maps full names even without aliases.

If can't resolve conflict:
- Skip aliases field
- Enter full name consistently
- System will still work
```

---

## Month Rollover Issues

### Archive Already Exists Error

**Symptoms**:

- Rollover fails immediately
- Error: "Archive already exists"
- Cannot proceed with rollover

**Common Causes**:

1. Rollover already run this month
2. Manual sheet created with same name
3. Previous rollover attempt failed mid-process

**Solutions**:

**Solution 1: Verify Current Month**

```
1. Check if you're already in new month
2. Look at existing archive sheets
3. If rollover already complete, no action needed
```

**Solution 2: Rename Existing Archive**

```
If archive is incomplete or test:

1. Right-click archive sheet tab
2. Select "Rename"
3. Add suffix like " - OLD" or " - TEST"
4. Run rollover again
```

**Solution 3: Delete Partial Archive**

```
If previous rollover failed:

1. Verify archive sheet has no data
2. Right-click sheet tab
3. Select "Delete"
4. Run rollover again
```

**Prevention**:

- Only run rollover once per month
- Run on first business day of new month
- Don't manually create sheets with date names

---

### Rollover Fails Mid-Process

**Symptoms**:

- Rollover starts but doesn't complete
- Archive created but MONTHLY not cleared
- Error message during processing

**Common Causes**:

1. Permission errors
2. Sheet protection
3. Script timeout
4. Concurrent execution

**Solutions**:

**Solution 1: Check Archive Creation**

```
If archive created but process failed:

1. Verify archive has all data from MONTHLY
2. Verify archive has analytics (columns S-X)
3. Verify leaderboard copied (columns P-R)
4. If complete, manually clear MONTHLY:
   a) Select rows 2 to last row
   b) Right-click → Delete rows
```

**Solution 2: Manual MTD Reset**

```
If MONTHLY cleared but TODAY not reset:

1. Open TODAY sheet
2. Select column Q (MTD)
3. Fill with zeros
4. Column R (averages) may need manual calculation
```

**Solution 3: Check Sheet Protection**

```
1. Right-click MONTHLY tab → Protect sheet
2. If protected, remove protection
3. Retry rollover
```

**Solution 4: Complete Rollover Manually**

```
If automatic rollover impossible:

1. Create archive sheet manually
2. Copy MONTHLY entire sheet to archive
3. Rename archive to date (e.g., "5/25")
4. Clear MONTHLY rows 2+
5. Clear TODAY MTD column
6. Manually calculate averages (see FAQ)
```

---

### Incorrect Averages After Rollover

**Symptoms**:

- 3-month averages wrong
- Averages show 0 when should have values
- Some salespeople have averages, others don't

**Common Causes**:

1. Archive sheets missing or incorrectly named
2. Salesperson name changed
3. Previous 3 months don't have data

**Solutions**:

**Solution 1: Verify Archive Names**

```
Archives must use configured format (M/YY, MM/YY, or MMM/YY)

Check Settings → Date Settings for format.

If archives exist but wrong format:
1. Rename each archive to match format
2. Run rollover again (or manual recalc)
```

**Solution 2: Check Archive Content**

```
For each of previous 3 months:

1. Open archive sheet
2. Verify leaderboard in columns P-R exists
3. Verify MTD values (column Q) present
4. If missing, averages will be wrong
```

**Solution 3: Manual Average Calculation**

```
Formula for 3-month average:
(Month1_MTD + Month2_MTD + Month3_MTD) ÷ Number_of_Months

Example for John Smith:
- April (4/25): 15 units
- March (3/25): 12 units
- February (2/25): 18 units
Average = (15 + 12 + 18) ÷ 3 = 15.0

Enter in Column R of TODAY sheet.
```

**Solution 4: Missing Previous Months**

```
If fewer than 3 previous months exist:

Average = Sum of available months ÷ Number available

If no previous months:
Average = 0

This is normal for new deployments.
```

---

## Conditional Formatting Issues

### Duplicates Not Highlighting

**Symptoms**:

- Duplicate stock numbers not highlighted
- Yellow-green color not appearing
- Conditional formatting not working

**Common Causes**:

1. Conditional formatting rules deleted
2. Stock numbers in wrong column
3. Rules overridden by manual formatting

**Solutions**:

**Solution 1: Reapply Formatting**

```
1. Run daily processing
2. Formatting rules automatically reapplied
3. Or run: Sales Tools → Recalculate MTD
```

**Solution 2: Verify Stock Number Columns**

```
Stock numbers must be in:
- Column E for new cars
- Column L for used cars

If in different columns:
- Move stock numbers to correct columns
- Or modify conditional formatting formulas
```

**Solution 3: Manual Rule Creation**

```
If automatic doesn't work:

1. Select range (e.g., A2:G101)
2. Format → Conditional formatting
3. Format rules → Custom formula
4. Enter: =COUNTIF($E$2:$E$101,$E2)>1
5. Set formatting style
6. Click Done
```

**Solution 4: Check for Overrides**

```
Manual formatting overrides conditional:

1. Select cells that should be highlighted
2. Clear formatting (Format → Clear formatting)
3. Re-run daily processing
4. Conditional formatting should apply
```

---

### Deposits Not Flagging Stocks

**Symptoms**:

- Stocks in DEPOSITS not highlighted on TODAY
- Deposit conditional formatting not working
- No error but no highlighting

**Common Causes**:

1. Stock numbers in wrong column on DEPOSITS
2. DEPOSITS sheet renamed
3. Formula reference broken

**Solutions**:

**Solution 1: Verify DEPOSITS Column**

```
Stock numbers MUST be in Column G of DEPOSITS sheet.

To verify:
1. Open DEPOSITS sheet
2. Check header row - Column G should be "STOCK #"
3. Check stock numbers in column G
4. If in different column, move them to G
```

**Solution 2: Verify Sheet Name**

```
1. Sheet must be named exactly "DEPOSITS"
2. Case-sensitive
3. Right-click tab to verify name
4. Rename if necessary
```

**Solution 3: Test Formula Manually**

```
1. On TODAY sheet, select a cell in column E
2. Enter formula: =COUNTIF(DEPOSITS!G:G,E2)
3. If returns >0, stock is in deposits
4. If returns error, sheet name or reference wrong
```

**Solution 4: Recreate Rule**

```
1. Format → Conditional formatting
2. Apply to range: A2:G101
3. Custom formula: =COUNTIF(INDIRECT("DEPOSITS!G:G"),$E2)>0
4. Set formatting colors
5. Repeat for used section (I2:N101, column L)
```

---

## Lock Contention Issues

### Symptom

Error message: "Could not acquire lock after X attempts"

**Description**:
Multiple users or operations attempting to modify configuration or process data simultaneously, resulting in lock acquisition failure after automatic retry attempts.

### Cause

- Multiple users running operations at the same time
- Long-running operation holding lock
- Concurrent daily processing attempts
- Settings changes during processing

### Solution

**Wait and Retry** (Recommended):

```
1. Wait 30-60 seconds for current operation to complete
2. Try operation again
3. System will automatically retry up to 5 times with exponential backoff
4. If persistent, check for stuck processes
```

**Check Execution Log**:

```
1. Apps Script Editor → View → Executions
2. Look for long-running operations (> 30 seconds)
3. Check for errors indicating stuck processes
4. Note timing of lock acquisition attempts
```

**Coordinate with Team**:

```
If multiple users:
1. Designate primary user for settings changes
2. Avoid simultaneous daily processing
3. Run operations during off-peak hours
4. Use Settings sidebar for better lock management
```

### Technical Details

**Lock Retry Behavior**:

```
Attempt 1: Immediate (0ms delay)
Attempt 2: 100ms delay
Attempt 3: 200ms delay
Attempt 4: 400ms delay
Attempt 5: 800ms delay
Attempt 6: 1600ms delay

Total retry time: ~3.1 seconds
Lock timeout per attempt: 30 seconds
Maximum total time: ~183 seconds
```

**What's Protected by Locks** (via [`acquireScriptLockWithRetry()`](../../src/utilities_locks.js:197-308)):

- Configuration updates via Settings
- Daily processing operations
- Month rollover operations
- Sheet synchronization to Properties Service

### Prevention

**Best Practices**:

- Avoid running multiple operations simultaneously
- Use Settings sidebar (better lock management than direct edits)
- Coordinate timing with other users
- Monitor execution logs for patterns
- Run intensive operations during off-peak hours

**When Safe to Retry**:

- After error message appears
- When execution log shows previous operation completed
- At least 30 seconds after first attempt
- When no other users are active

---

## Cache Service Failures

### Symptom

Logs show cache invalidation errors but operations complete successfully

**Log Examples**:

```
[CRITICAL] Cache invalidation failed (non-fatal): [context]
Operation continuing without cache invalidation
[HIGH] Failed to invalidate visual config cache (non-fatal)
[MEDIUM] Cache write failed, will retry on next operation
```

### Cause

- CacheService temporarily unavailable
- Google infrastructure maintenance
- Quota limits reached (rare)
- Network connectivity issues

### Impact

**No User-Visible Impact**:

- Operations continue normally despite cache failures
- Data integrity fully maintained
- No data loss or corruption
- Functionality unchanged

**Temporary Side Effects**:

- Stale data in cache for up to 5-10 minutes
- Slight performance impact until cache refreshes
- Multiple operations may see outdated cached data
- Auto-recovery when cache service available

### Solution

**No Action Required**:

```
The system is designed to handle cache failures gracefully:

1. All cache operations are non-fatal
2. Operations continue regardless of cache status
3. Cache expires naturally within 5-10 minutes
4. System auto-recovers without intervention
```

**If Concerned**:

```
1. Check that operations completed successfully
2. Verify data appears correct in sheets
3. Wait 5-10 minutes for cache to expire
4. Refresh browser if concerned about stale UI
```

**Monitor Logs**:

```
1. Apps Script Editor → View → Executions
2. Look for cache-related messages
3. Note severity levels:
   - CRITICAL: Cache completely unavailable
   - HIGH: Important cache operation failed
   - MEDIUM: Minor cache issue
4. Verify main operations show "Success"
```

### Technical Details

**Cache TTL (Time To Live)**:

```
Configuration cache: 10 minutes
Salesperson maps: 5 minutes
Analytics results: 5 minutes
Visual config: 5 minutes

After TTL expires, data automatically reloaded from source
```

**What's Cached**:

- Configuration data (performance optimization)
- Salesperson alias mappings (fast lookups)
- Analytics results (reduce recalculation)
- Visual settings (UI performance)

**Cache Failure Handling**:

- All cache operations wrapped in try-catch blocks
- Errors logged with context and severity
- Primary operations never fail due to cache issues
- Defensive programming ensures robustness

### Why This Design?

**Cache as Enhancement, Not Requirement**:

- Cache improves performance but isn't critical
- All data persists in sheets and Properties Service
- Operations must succeed even when cache unavailable
- User experience shouldn't degrade due to cache

**Reliability Over Speed**:

- Better to complete slowly than fail fast
- Graceful degradation preferred
- Comprehensive logging for monitoring
- Automatic recovery without user intervention

---

## Sync Metadata Size Limits

### Symptom

Warning logs: "Approaching size limit" or "Size limit reached"

**Log Examples**:

```
[saveSyncMetadata] Metadata size: 6500 bytes (6.35 KB)
[saveSyncMetadata] Approaching size limit (WARNING at 75%)
[saveSyncMetadata] Size threshold exceeded: 8500 bytes
[saveSyncMetadata] Running cleanup...
[cleanupOldMetadata] Removed 12 entries older than 30 days
[saveSyncMetadata] Cleanup complete. Size reduced: 8500 → 5200 bytes
```

### Cause

- High frequency of sheet edits (100+ per day)
- Large team with many salespeople
- Metadata accumulation over time
- Normal usage for high-activity spreadsheets

### Automatic Resolution

**System Self-Manages**:

```
Threshold Levels:
- 6KB (75%): Warning logged, no action taken
- 8KB (100%): Automatic cleanup triggered
- 9KB: Hard limit with safety margin

Cleanup Process:
1. Identifies entries older than 30 days
2. Removes old sync metadata
3. Preserves special keys (_stats, etc.)
4. Reduces size below threshold
5. Operation continues normally
```

**Typical Sequence** (handled by [`saveSyncMetadata()`](../../src/config_service.js:915-972)):

```
1. Normal operation: Size grows gradually
2. Warning at 6KB: Logged for monitoring
3. Cleanup at 8KB: Automatic removal of old data
4. Size reduced: Usually to 4-5KB
5. Continue: No interruption to operations
```

### Manual Resolution (If Needed)

**Rarely Required** (automatic cleanup usually sufficient):

**Check Current Size**:

```
1. Apps Script Editor → View → Executions
2. Look for saveSyncMetadata log entries
3. Note current size in bytes
4. Check if warnings present
```

**Force Cleanup** (if automatic cleanup insufficient):

```
1. Review sync metadata in Properties Service
2. Identify unusually large entries
3. Consider reducing retention period (contact support)
4. Archive old data externally if needed
```

**Verify Cleanup Success**:

```
1. Check logs for cleanup completion message
2. Verify size reduction (should be ~40-50% reduction)
3. Confirm operations continue normally
4. Monitor for recurring issues
```

### Technical Details

**Size Thresholds** (enforced by [`saveSyncMetadata()`](../../src/config_service.js:915-972)):

```
Warning Threshold: 6KB (75% of limit)
Action Threshold: 8KB (100% of limit)
Hard Limit: 9KB (with safety margin)
Typical Size: 2-5KB for normal usage
```

**Retention Policy** (enforced by [`cleanupOldMetadata()`](../../src/config_service.js:854-906)):

```
Retention Period: 30 days
Calculation: lastModified timestamp compared to current time
Preserved: Recent entries + special keys
Removed: Entries with lastModified > 30 days old
```

**What's Stored**:

```
Sync metadata tracks:
- Sheet row to Properties Service mappings
- Last modification timestamps
- Sync status information
- Data integrity checksums
```

**Performance Impact**:

```
Normal operations: <10ms overhead
Size check: <5ms per operation
Cleanup process: 50-100ms (rare)
No user-visible delay
```

### Prevention

**Normal Usage** (no prevention needed):

- System designed to handle typical workloads
- Automatic cleanup prevents issues
- No user action required

**High-Activity Spreadsheets**:

- May see warnings more frequently (normal)
- Automatic cleanup handles increased load
- Monitor logs for patterns
- Contact support if cleanup insufficient

**Not Recommended**:

- Manual metadata manipulation
- Disabling sync operations
- Modifying retention period without guidance

---

## Event Trigger Failures

### Symptom

Toast notification: "Failed to create menu" on spreadsheet open

**Description**:
On opening the spreadsheet, a 10-second toast notification appears indicating menu creation failed. The spreadsheet loads but the "Sales Tools" menu may not appear in the menu bar.

### Cause

- Temporary spreadsheet initialization issue
- Script permissions need reauthorization
- Google Sheets service momentarily unavailable
- Browser extension interference

### Impact

**Limited Impact**:

- Spreadsheet remains fully functional
- Data remains accessible and safe
- Can manually trigger operations via script editor
- Menu usually appears on next open
- No data corruption or loss

**What Still Works**:

- Viewing all data
- Manual data entry
- Direct script execution (via Apps Script editor)
- All data integrity maintained

**What May Not Work**:

- Custom menu items
- One-click operation triggers
- Settings sidebar access (may need manual open)

### Solution

**Solution 1: Reload Spreadsheet** (Most Common):

```
1. Close spreadsheet tab completely
2. Wait 10 seconds
3. Reopen spreadsheet
4. Menu should appear normally
5. If not, proceed to next solution
```

**Solution 2: Check Permissions**:

```
1. Extensions → Apps Script
2. Click Run → Select onOpen function
3. If prompted, click "Review Permissions"
4. Authorize all requested permissions
5. Return to spreadsheet and refresh
```

**Solution 3: Clear Browser Cache**:

```
1. Close all Google Sheets tabs
2. Clear browser cache for Google Sheets
3. Clear cookies for *.google.com
4. Restart browser
5. Reopen spreadsheet
```

**Solution 4: Manual Menu Creation**:

```
If menu still missing:
1. Extensions → Apps Script
2. Select "onOpen" from function dropdown
3. Click "Run" button
4. Return to spreadsheet
5. Refresh page (Ctrl+R or Cmd+R)
```

### Check Execution Logs

**Verify Issue**:

```
1. Apps Script Editor → View → Executions
2. Find most recent onOpen execution
3. Check for error details:
   - "Exception: ..." indicates specific error
   - "Service invoked too many times" = quota
   - "Permission denied" = authorization needed
4. Note timestamp to correlate with spreadsheet open
```

**Common Log Entries**:

```
Success:
✓ onOpen completed successfully

Failure:
✗ onOpen failed
  Error: Cannot add menu to spreadsheet

Partial Success:
✓ onOpen completed with warnings
  Warning: Menu creation attempted but may have failed
```

### Technical Details

**Error Handling Design**:

```
try {
  // Attempt menu creation
  createCustomMenu();
  Logger.log('Menu created successfully');
} catch (error) {
  // Log error with details
  Logger.log('Menu creation failed: ' + error.message);

  // Notify user via toast
  SpreadsheetApp.getActiveSpreadsheet()
    .toast('Failed to create menu. Please refresh.', 'Menu Error', 10);
} finally {
  // Ensure cleanup regardless of success/failure
  // Spreadsheet remains functional
}
```

**Why Graceful Degradation**:

- Menu is convenience, not requirement
- Can access all functions via script editor
- User experience maintained even with errors
- Clear notification guides user to solution

**Toast Notification Details**:

- Duration: 10 seconds
- Title: "Menu Error" or similar
- Message: Actionable guidance
- Appears automatically on spreadsheet load

### Prevention

**Best Practices**:

- Keep script authorized at all times
- Don't modify script while spreadsheet open
- Use supported browsers (Chrome recommended)
- Close spreadsheet properly (don't force close)
- Allow page to fully load before interacting

**If Recurring**:

```
1. Check for browser extensions causing issues
2. Verify stable internet connection
3. Try different browser
4. Check Google Workspace status page
5. Contact support if persistent
```

---

## Performance Issues

### Slow Daily Processing

**Symptoms**:

- Processing takes > 30 seconds
- "Working..." toast appears for long time
- Script timeout errors

**Common Causes**:

1. Large MONTHLY sheet (> 1000 rows)
2. Too many salespeople (> 50)
3. Concurrent executions
4. Network latency

**Solutions**:

**Solution 1: Archive Old Data**

```
If MONTHLY sheet very large:

1. Run month rollover (even mid-month)
2. This moves data to archive
3. Clears MONTHLY for better performance
4. Note: Affects averages, plan accordingly
```

**Solution 2: Optimize Salespeople**

```
1. Review SALESPEOPLE sheet
2. Remove inactive/former employees
3. Keep roster to active team only
4. Each person adds processing overhead
```

**Solution 3: Wait for Completion**

```
Don't:
- Click menu items while processing
- Close spreadsheet during processing
- Run multiple operations simultaneously

Do:
- Wait for completion dialog
- Allow 30-60 seconds for large sheets
- Check execution log if times out
```

**Solution 4: Network Connection**

```
1. Check internet connection speed
2. Avoid processing on slow connections
3. Consider wired connection vs. WiFi
4. Try again during off-peak hours
```

---

### Settings UI Slow to Load

**Symptoms**:

- Settings sidebar takes long time to open
- Salesperson list loads slowly
- Saving takes excessive time

**Common Causes**:

1. Large number of salespeople (> 30)
2. Browser extensions interfering
3. Cached data corruption

**Solutions**:

**Solution 1: Reduce Roster Size**

```
1. Archive former employees from SALESPEOPLE
2. Keep only active team
3. Reopen settings - should load faster
```

**Solution 2: Clear Browser Data**

```
1. Close all Google Sheets tabs
2. Clear browser cache for Google Sheets
3. Clear site data for *.google.com
4. Reopen spreadsheet
5. Try settings again
```

**Solution 3: Use Chrome**

```
Google Apps Script optimized for Chrome:

1. Install Google Chrome if not using
2. Open spreadsheet in Chrome
3. Settings should load faster
```

---

## Data Recovery

### Accidentally Cleared TODAY Sheet

**Symptoms**:

- TODAY sheet data cleared
- Data not yet processed to MONTHLY
- Need to recover data

**Solutions**:

**Solution 1: Use Version History**

```
1. File → Version history → See version history
2. Find version before data cleared
3. Click to preview
4. Restore that version
5. Manually process data if needed
```

**Solution 2: Undo**

```
Immediately after clearing:

1. Press Ctrl+Z (Windows) or Cmd+Z (Mac)
2. Data should restore
3. Repeat undo if multiple operations
```

**Solution 3: Copy from Email**

```
If you emailed yourself summary:

1. Find daily processing summary email
2. Extract salesperson counts
3. Manually recreate approximate data
4. Process normally
```

**Prevention**:

- Run daily processing as soon as data entered
- Take screenshot of TODAY before processing
- Keep backup copy in different sheet

---

### Accidentally Deleted MONTHLY Data

**Symptoms**:

- MONTHLY sheet data deleted
- Month's sales history lost
- Need to recover

**Solutions**:

**Solution 1: Version History (Best Option)**

```
1. File → Version history → See version history
2. Navigate to version before deletion
3. Restore that version
4. All data should be recovered
```

**Solution 2: Named Versions**

```
If you created named versions:

1. File → Version history → See version history
2. Look for named versions (e.g., "End of Month")
3. Restore appropriate named version
```

**Solution 3: Reconstruct from TODAY**

```
If today's data still in TODAY:

1. Run daily processing
2. Adds today back to MONTHLY
3. Previous days lost unless recovered otherwise
```

**Prevention**:

- Create named version daily or weekly
- Don't manually edit MONTHLY rows
- Use sheet protection for MONTHLY

---

### Lost Configuration

**Symptoms**:

- Settings reset to defaults
- Salespeople list empty
- Visual settings reverted

**Common Causes**:

1. Properties Service data cleared
2. Migration re-run
3. Script redeployed

**Solutions**:

**Solution 1: Check SALESPEOPLE Sheet**

```
Configuration syncs to SALESPEOPLE sheet:

1. Open SALESPEOPLE sheet
2. If data present, configuration can be restored
3. Open Settings sidebar
4. Data should auto-populate from sheet
5. Click Save to restore to Properties Service
```

**Solution 2: Restore from Backup**

```
If you exported configuration:

1. Find configuration backup JSON file
2. Apps Script Editor → Open config_service.gs
3. Use importConfiguration() function
4. Paste backup JSON
5. Configuration restored
```

**Solution 3: Manual Re-Entry**

```
If no backup available:

1. Re-enter salespeople via Settings UI
2. Reconfigure visual settings
3. Set date preferences
4. Save changes
```

**Prevention**:

- Regular configuration exports
- Keep SALESPEOPLE sheet backed up
- Document settings in external document

---

## Checking Logs

### How to Access Execution Logs

**Location**: Apps Script Editor → View → Executions

**What Logs Show**:

- Function executions (name, timestamp)
- Status (Success, Failed)
- Execution time
- Error messages
- Detailed stack traces

**Steps**:

```
1. Open spreadsheet
2. Extensions → Apps Script
3. Click "View" menu (left sidebar)
4. Select "Executions"
5. View list of recent executions
```

### Understanding Log Entries

**Successful Execution**:

```
✓ onOpen          10/10/2025 2:00 PM    0.5 sec
✓ processDaily    10/10/2025 2:05 PM    2.3 sec
```

**Failed Execution**:

```
✗ processDaily    10/10/2025 2:10 PM    1.2 sec
  Error: Required sheets missing
```

**Click Entry for Details**:

- Full error message
- Stack trace
- Specific line numbers
- Parameter values (if logged)

### Common Log Errors

**"Required sheets missing"**

```
Solution: Run setup wizard or verify sheet names
```

**"Could not acquire script lock"**

```
Solution: Wait 30 seconds, don't run multiple times
```

**"MONTHLY sheet needs at least 14 columns"**

```
Solution: Insert additional columns on MONTHLY
```

**"Configuration validation failed"**

```
Solution: Check Settings validation messages, fix errors
```

**"Exception: Service invoked too many times"**

```
Solution: Hit quota limit, wait 24 hours
```

---

## Permission Issues

### Script Permissions Revoked

**Symptoms**:

- "Authorization required" every time
- Script won't run without re-authorizing
- "This app isn't verified" repeatedly

**Causes**:

1. Manual permission revocation
2. Automatic security scan
3. OAuth scope changes

**Solutions**:

**Solution 1: Re-Authorize Fully**

```
1. Open spreadsheet
2. Click any menu item (e.g., Settings)
3. Click "Review Permissions"
4. Select account
5. Click "Advanced"
6. Click "Go to [Project] (unsafe)"
7. Click "Allow" for all permissions
8. Don't skip any steps
```

**Solution 2: Check Account Permissions**

```
1. Visit myaccount.google.com/permissions
2. Find script project
3. Verify it has access
4. If missing, re-authorize from spreadsheet
```

**Solution 3: Remove and Re-Add**

```
1. myaccount.google.com/permissions
2. Remove script access
3. Return to spreadsheet
4. Follow full authorization process
```

---

### Google Workspace Restrictions

**Symptoms**:

- Can't install or run script
- "Administrator has disabled" message
- Installation blocked

**Causes**:

- Workspace policy restrictions
- Admin blocked Apps Script
- Domain security settings

**Solutions**:

**Solution 1: Contact Admin**

```
1. Note the error message
2. Contact Google Workspace administrator
3. Request Apps Script permission
4. Provide project details if needed
```

**Solution 2: Request Allowlisting**

```
Admin needs to:
1. Admin console → Apps → Google Workspace
2. Apps Script settings
3. Allow users to run scripts
4. Or allowlist specific project
```

**Solution 3: Use Personal Account**

```
If workspace restrictions can't be lifted:

1. Copy spreadsheet to personal Google account
2. Install script on personal account
3. Use for testing/development
4. Share results back to workspace
```

---

## When to Contact Support

### Issues Requiring Support

Contact support when:

**Data Corruption**:

- Widespread data loss
- Formulas broken across sheets
- Cannot recover from version history

**System-Wide Failures**:

- All functions fail consistently
- Script completely non-functional
- Setup wizard won't complete after multiple attempts

**Performance Problems**:

- Consistent timeouts (not quota-related)
- Processing takes > 5 minutes
- Spreadsheet crashes frequently

**Configuration Issues**:

- Properties Service completely inaccessible
- Cannot save any settings
- Configuration corrupted beyond repair

### Information to Provide

When contacting support, include:

**Spreadsheet Information**:

```
- Spreadsheet ID (from URL)
- Number of salespeople
- Approximate MONTHLY sheet row count
- When issue started
```

**Error Details**:

```
- Exact error message
- Screenshot of error dialog
- Steps to reproduce
- Execution log screenshot
```

**Attempted Solutions**:

```
- Solutions already tried
- Results of each attempt
- Any partial successes
```

**System Information**:

```
- Browser and version
- Google Workspace or personal account
- Account permissions level
- Organization restrictions (if any)
```

### Self-Help Resources First

Before contacting support:

1. ✅ Check this troubleshooting guide
2. ✅ Review [FAQ](FAQ.md)
3. ✅ Check execution logs
4. ✅ Try version history recovery
5. ✅ Review [User Guide](../guides/USER_GUIDE.md)
6. ✅ Verify all prerequisites met

### Emergency Contacts

For licensed customers:

- Support email: (provided with license)
- Response time: 24-48 hours
- Priority support available

For community version:

- GitHub Issues: (repository URL)
- Community forum: (if applicable)
- Documentation: This guide

---

## Quick Troubleshooting Checklist

**Before contacting support, verify**:

```
☐ All required sheets exist (TODAY, MONTHLY, SALESPEOPLE, DEPOSITS)
☐ Sheet names exactly correct (case-sensitive)
☐ Script fully authorized (all permissions granted)
☐ Not hitting quota limits (check executions log)
☐ No concurrent processes running
☐ Browser cache cleared
☐ Using supported browser (Chrome recommended)
☐ Internet connection stable
☐ No manual modifications to script files
☐ Setup wizard completed successfully
☐ Configuration saved in Settings
☐ Version history available for recovery
☐ Execution logs checked for specific errors
```

---

_Sales Log Pro Troubleshooting Guide v8.0 | Last Updated: 2025-10-10_
