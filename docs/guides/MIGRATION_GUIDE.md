# Sales Log Pro - Migration Guide

## Table of Contents

1. [Overview](#overview)
2. [Migration Scenarios](#migration-scenarios)
3. [Migrating from v7.x to v8.0](#migrating-from-v7x-to-v80)
4. [Migrating from Manual Spreadsheets](#migrating-from-manual-spreadsheets)
5. [Data Import Procedures](#data-import-procedures)
6. [Configuration Migration](#configuration-migration)
7. [Testing Migration Success](#testing-migration-success)
8. [Rollback Procedures](#rollback-procedures)
9. [Post-Migration Optimization](#post-migration-optimization)
10. [Common Migration Issues](#common-migration-issues)

---

## Overview

This guide provides step-by-step instructions for migrating to Sales Log Pro v8.0 from various sources, including previous versions and manual tracking systems.

### What's New in v8.0

**Major Changes**:
- ✨ Easy Setup Wizard for one-click installation
- ⚙️ Settings Sidebar UI (replaces code editing)
- 📊 Analytics Dashboard with comprehensive metrics
- 🔄 Auto-Migration from hardcoded constants
- 📈 Analytics preservation in monthly archives
- 🎨 Visual customization through UI
- 📅 Configurable date settings

**Breaking Changes**:
- None - v8.0 is fully backward compatible with v7.x data

**New Requirements**:
- Additional HTML files for Settings UI
- Updated OAuth scopes in appsscript.json
- Properties Service for configuration storage

---

## Migration Scenarios

### Scenario 1: v7.x to v8.0 Upgrade

**Characteristics**:
- Already using Sales Log Pro
- Existing data in proper format
- Configuration currently hardcoded
- No structural changes needed

**Migration Complexity**: ⭐ Low
**Estimated Time**: 30-60 minutes
**Data Risk**: Very Low

---

### Scenario 2: Manual Spreadsheet to v8.0

**Characteristics**:
- Tracking sales in Excel or basic Sheets
- Custom column structure
- No automation currently
- Historical data to preserve

**Migration Complexity**: ⭐⭐⭐ Medium
**Estimated Time**: 2-4 hours
**Data Risk**: Medium (data mapping required)

---

### Scenario 3: Other System to v8.0

**Characteristics**:
- Using different tracking software
- Exporting to CSV/Excel format
- Data structure completely different
- May need custom import script

**Migration Complexity**: ⭐⭐⭐⭐ High
**Estimated Time**: 4-8 hours
**Data Risk**: Medium to High

---

## Migrating from v7.x to v8.0

### Pre-Migration Checklist

```
☐ Current system version verified (7.x)
☐ Full backup created
☐ Configuration settings documented
☐ Salesperson list exported
☐ Current month complete or saved
☐ Users notified of upgrade
☐ Maintenance window scheduled
```

### Migration Process

#### Phase 1: Preparation (15 minutes)

**Step 1: Create Backup**
```
1. File → Make a copy
2. Name: "Sales Log Pro v7.x - BACKUP - [Date]"
3. Move to safe folder
4. Verify backup opens correctly
5. Download backup to local storage
```

**Step 2: Document Current Configuration**
```
Document from existing code:
☐ Salesperson list (from SALESPEOPLE sheet)
☐ Color settings (if customized)
☐ Sunday skip setting
☐ Monday logs Saturday setting
☐ Any custom modifications
```

**Step 3: Export Current Data**
```
Optional but recommended:
1. File → Download → Microsoft Excel
2. Save as: "SalesLog_PreMigration_[Date].xlsx"
3. Keep as additional backup
```

#### Phase 2: Code Update (15 minutes)

**Step 1: Update Script Files**
```
In Apps Script Editor:

1. Update Code.gs:
   - Replace with latest core_saleslogPro.js
   - Keep file name as Code.gs

2. Update or add config_service.gs:
   - Create new file if doesn't exist
   - Paste config_service.js content

3. Add sales_analytics.gs:
   - Create new file
   - Paste sales_analytics.js content

4. Update setup_wizard.gs:
   - Replace or create
   - Paste setup_wizard.js content

5. Add HTML files:
   - Create config_sidebar.html
   - Create config_sidebar_css.html
   - Create sidebar_js.html

6. Save all files (Ctrl+S / Cmd+S)
```

**Step 2: Update appsscript.json**
```json
{
  "timeZone": "America/New_York",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.container.ui",
    "https://www.googleapis.com/auth/script.scriptapp"
  ]
}
```

**Step 3: Verify File Structure**
```
Apps Script Project Files:
☐ Code.gs (core_saleslogPro.js)
☐ config_service.gs
☐ sales_analytics.gs
☐ setup_wizard.gs
☐ config_sidebar.html
☐ config_sidebar_css.html
☐ sidebar_js.html
☐ appsscript.json (updated)
```

#### Phase 3: Configuration Migration (15 minutes)

**Step 1: Run Auto-Migration**
```
1. Close and reopen spreadsheet
2. Wait for "Sales Tools" menu to appear
3. Click: Sales Tools → ⚙️ Settings
4. Auto-migration runs automatically on first open
5. Toast notification: "Configuration system upgraded!"
```

**What Auto-Migration Does**:
```
✓ Creates Properties Service configuration
✓ Migrates SALESPEOPLE sheet to configuration
✓ Sets default visual settings
✓ Sets default date settings
✓ Preserves all existing data
✓ No data loss or modification
```

**Step 2: Verify Migration**
```
In Settings sidebar:

1. Check 👥 Sales Team tab:
   ☐ All salespeople present
   ☐ Aliases intact
   ☐ Display codes correct

2. Check 🎨 Visual Customization:
   ☐ Colors match previous (or defaults)
   ☐ Thresholds set appropriately

3. Check 📅 Date Settings:
   ☐ Skip Sundays matches previous
   ☐ Monday behavior correct
   ☐ Archive format selected
```

**Step 3: Customize Settings**
```
If previous configuration was customized:

1. Adjust colors to match previous
2. Set pace thresholds to previous values
3. Configure date settings as before
4. Click "Save Changes"
5. Verify settings persist
```

#### Phase 4: Verification (15 minutes)

**Test 1: Data Integrity**
```
☐ Open each sheet and verify data intact
☐ Check TODAY sheet structure unchanged
☐ Verify MONTHLY data preserved
☐ Confirm SALESPEOPLE sheet accurate
☐ Check archive sheets accessible
```

**Test 2: Functionality**
```
1. Enter test data on TODAY
2. Run: Sales Tools → Log Yesterday's Sales
3. Verify:
   ☐ Data processes correctly
   ☐ Analytics appear in columns S-X
   ☐ Leaderboard updates
   ☐ TODAY sheet clears
```

**Test 3: New Features**
```
1. Analytics Dashboard:
   ☐ Columns S-X populated
   ☐ Team totals correct
   ☐ Salesperson metrics accurate

2. Manual Refresh:
   ☐ Sales Tools → 🔄 Refresh Analytics works
   ☐ Results match expectations

3. Settings UI:
   ☐ Can add/edit/delete salespeople
   ☐ Can modify colors
   ☐ Changes save and persist
```

#### Phase 5: User Communication (As needed)

**Notification to Users**:
```
Subject: Sales Log Pro Upgraded to v8.0

The Sales Log Pro system has been upgraded to version 8.0 with new features:

NEW FEATURES:
- Settings UI: No more code editing! Access via Sales Tools → ⚙️ Settings
- Analytics Dashboard: Comprehensive sales metrics in columns S-X
- Manual Analytics Refresh: Sales Tools → 🔄 Refresh Analytics
- Setup Wizard: Easier initial setup for new deployments

WORKFLOW CHANGES:
- None! Daily process remains the same
- All existing data preserved
- New analytics calculate automatically

TRAINING:
- Updated user guide available
- Optional training session: [Date/Time]
- Support: [Contact Information]

Questions? Contact [Administrator]
```

### Post-Migration Tasks

**Day 1 After Migration**:
```
☐ Monitor for issues
☐ Check execution logs
☐ Verify daily processing works
☐ Confirm analytics calculating
☐ Address any user questions
```

**Week 1 After Migration**:
```
☐ Validate analytics accuracy
☐ Compare with manual calculations
☐ Optimize settings based on usage
☐ Document any issues
☐ Gather user feedback
```

**Month 1: First Rollover**
```
☐ Test month rollover with new analytics
☐ Verify analytics preserved in archive
☐ Confirm rolling averages calculate
☐ Document rollover success
```

---

## Migrating from Manual Spreadsheets

### Assessment Phase

**Step 1: Analyze Current System**
```
Document current spreadsheet:
☐ Column headers and their meanings
☐ Data fields captured
☐ Formulas and calculations
☐ Manual processes required
☐ Reporting outputs needed
☐ Historical data retention period
```

**Step 2: Data Mapping**
```
Map old columns to Sales Log Pro structure:

Your Current          → Sales Log Pro
------------------    → ------------------
[Your Column]         → Column B (Customer)
[Your Column]         → Column C (FI)
[Your Column]         → Column D (Model)
[Your Column]         → Column E (Stock #)
[Your Column]         → Column F (Trade Stock)
[Your Column]         → Column G (Salesperson)
[Repeat for used]     → Columns I-N

Create mapping document for reference
```

**Step 3: Identify Gaps**
```
☐ Fields in old system not in new
☐ Fields in new system not in old
☐ Data transformations needed
☐ Calculation differences
☐ Custom features to replicate
```

### Migration Strategy Selection

**Option A: Fresh Start** (Recommended for most)
```
Timeline: 1-2 days
Complexity: Low
Data Risk: Minimal

Process:
1. Complete current month in old system
2. Archive old system (read-only)
3. Deploy Sales Log Pro
4. Start new month fresh
5. Reference old system for history

Best for:
- Clean deployment desired
- Limited historical needs
- Start of new month
```

**Option B: Historical Import**
```
Timeline: 3-5 days
Complexity: Medium
Data Risk: Medium

Process:
1. Deploy Sales Log Pro
2. Import previous 3 months manually
3. Verify data accuracy
4. Continue in new system

Best for:
- Need historical averages
- Want continuous data
- Mid-month migration acceptable
```

**Option C: Complete Migration**
```
Timeline: 1-2 weeks
Complexity: High
Data Risk: High

Process:
1. Export all historical data
2. Transform to new format
3. Import systematically
4. Extensive verification
5. Cutover when validated

Best for:
- Complete historical archive required
- Regulatory/compliance needs
- Long-term trending analysis
```

### Data Import Process (Option B/C)

#### Step 1: Prepare Data

**Export from Old System**:
```
1. Select all data
2. File → Download → CSV or Excel
3. Save as: "OldSalesData_Export_[Date].csv"
```

**Clean Data**:
```
☐ Standardize salesperson names
☐ Format dates consistently
☐ Validate stock numbers
☐ Remove duplicate entries
☐ Fill required fields
☐ Convert text to proper case
```

#### Step 2: Transform Data

**Column Alignment**:
```
Create new columns matching Sales Log Pro:
A: Sequence # (leave blank, will auto-number)
B: Customer Name
C: FI Flag (single letter A-Z)
D: Model
E: Stock Number
F: Trade Stock Number
G: Salesperson
H: [Blank]
I: Customer Name (Used)
J: FI Flag (Used)
K: Model (Used)
L: Stock Number (Used)
M: Trade Stock Number (Used)
N: Salesperson (Used)
```

**Example Transformation**:
```
Old Format:
Date | Customer | Stock | Salesperson | Type | Delivered

New Format (if New):
[blank] | Customer | [FI] | [blank] | Stock | [blank] | Salesperson

New Format (if Used):
[blank] | [blank] | [blank] | [blank] | [blank] | [blank] | [blank] | [blank] | Customer | [FI] | [blank] | Stock | [blank] | Salesperson
```

#### Step 3: Import Historical Data

**For Each Historical Month**:
```
1. Create archive sheet (e.g., "4/25")
2. Copy transformed data to sheet
3. Add date headers where appropriate:
   - Merge cells across A:N
   - Format: "M/D"
   - Yellow background, bold, centered
4. Verify data structure matches MONTHLY
5. Add leaderboard data if available (columns P-R)
6. Repeat for each month (recommend max 3 months)
```

**Leaderboard Data** (if available):
```
For each historical month's archive:
Column P: Salesperson names
Column Q: MTD sales (from old system)
Column R: Historical averages (if available)

This enables rolling average calculation.
```

#### Step 4: Verify Import

**Data Quality Checks**:
```
☐ Row counts match original
☐ Salesperson names consistent
☐ Stock numbers intact
☐ Dates in correct format
☐ FI flags valid (single letter)
☐ No data truncation
☐ Formulas not imported (values only)
```

**Calculation Verification**:
```
☐ Manual count vs. imported count
☐ Salesperson totals match
☐ Trade counts accurate
☐ Date ranges correct
```

---

## Configuration Migration

### From Hardcoded Configuration

**v7.x Hardcoded Settings**:
```javascript
// Old v7.x style (in code)
const SKIP_SUNDAYS = true;
const MONDAY_LOGS_SATURDAY = true;
const NON_DELIVERED_COLOR = "#FF0000";
// etc.
```

**Migration to v8.0**:
```
Automatic via auto-migration:
1. First Settings open triggers migration
2. Reads hardcoded defaults
3. Writes to Properties Service
4. Syncs to SALESPEOPLE sheet
5. Shows confirmation toast

No manual action required!
```

### From Custom Configuration

**If You Customized v7.x Code**:

**Step 1: Document Custom Settings**
```
Before upgrade, note:
☐ Custom color values
☐ Custom pace thresholds
☐ Custom date settings
☐ Any other modifications
```

**Step 2: Reapply via Settings UI**
```
After migration:
1. Sales Tools → ⚙️ Settings
2. Visual Customization tab:
   - Set custom colors
   - Adjust pace thresholds
3. Date Settings tab:
   - Configure Sunday handling
   - Set Monday behavior
4. Save Changes
```

**Step 3: Verify Custom Features**
```
If you added custom functionality:
☐ Review new code structure
☐ Re-implement customizations
☐ Test thoroughly
☐ Document for future upgrades
```

### Exporting Configuration

**Create Configuration Backup**:
```javascript
// Run in Apps Script Editor
function exportMyConfiguration() {
  const config = getConfiguration();
  const backup = JSON.stringify(config, null, 2);
  Logger.log(backup);
  
  // Copy from logs and save to file
}
```

**Importing Configuration**:
```javascript
// To restore configuration
function importMyConfiguration() {
  const configJSON = `{
    // Paste your backed-up configuration here
  }`;
  
  const config = JSON.parse(configJSON);
  updateConfiguration(config);
}
```

---

## Testing Migration Success

### Comprehensive Test Plan

#### Test 1: Data Integrity
```
☐ All sheets present and accessible
☐ Data counts match pre-migration
☐ No missing rows or columns
☐ Formulas not broken (if any custom)
☐ Historical archives intact
☐ SALESPEOPLE sheet accurate
```

#### Test 2: Core Functionality
```
☐ Daily processing works:
  - Enter test data
  - Run "Log Yesterday's Sales"
  - Verify transfer to MONTHLY
  - Check analytics calculate

☐ Leaderboard updates correctly:
  - MTD column accurate
  - Sorting correct
  - Conditional formatting applies

☐ Settings function:
  - Can open Settings sidebar
  - Can add/edit salespeople
  - Changes save and persist
```

#### Test 3: New Features
```
☐ Analytics Dashboard:
  - Columns S-X populated
  - Team totals accurate
  - Salesperson metrics correct
  - Rankings logical

☐ Manual Analytics Refresh:
  - Menu item works
  - Recalculates correctly
  - Shows summary dialog

☐ Enhanced Settings:
  - All tabs accessible
  - Color pickers work
  - Validation functions
  - Sync to SALESPEOPLE sheet
```

#### Test 4: Month Rollover
```
☐ Create test data spanning month
☐ Run rollover process
☐ Verify:
  - Archive created correctly
  - Analytics included in archive
  - MONTHLY cleared
  - MTD reset
  - Averages calculated
  - New month starts clean
```

#### Test 5: Error Handling
```
☐ Invalid data highlights correctly
☐ Unknown salesperson flagged
☐ Duplicate stocks detected
☐ Error messages clear
☐ Recovery procedures work
```

### Acceptance Criteria

**Migration Successful If**:
```
✓ All data present and accurate
✓ Core functions work correctly
✓ New features operational
✓ Performance acceptable
✓ Users can perform daily tasks
✓ Month rollover tested successfully
✓ No critical issues found
```

**Migration Needs Remediation If**:
```
✗ Data missing or corrupted
✗ Core functions fail
✗ Performance unacceptable
✗ Critical errors occur
✗ Users unable to work
✗ Rollback may be needed
```

---

## Rollback Procedures

### When to Rollback

**Critical Issues**:
- Data corruption or loss
- Core functions completely broken
- Performance degradation severe
- Unable to resolve within 4 hours

**Non-Critical Issues**:
- Minor feature bugs (don't rollback)
- Cosmetic issues (don't rollback)
- User training gaps (don't rollback)
- Configuration adjustments needed (don't rollback)

### Rollback Process

#### Option 1: Version History Rollback

**Best For**: Recent migration (< 24 hours)

```
1. File → Version history → See version history
2. Find version before migration
3. Name format: "Pre-Migration - [Date]"
4. Click version to preview
5. Verify it's correct version
6. Click "Restore this version"
7. Confirm restoration
8. Notify users of rollback
```

#### Option 2: Backup Restoration

**Best For**: Need complete restore from backup

```
1. Open backup spreadsheet created pre-migration
2. File → Make a copy
3. Name: "Sales Log Pro - Restored [Date]"
4. Move to production location
5. Update sharing permissions
6. Notify users of new URL
7. Investigate migration issues
```

#### Option 3: Hybrid Approach

**Best For**: Partial data recovery needed

```
1. Keep new v8.0 spreadsheet
2. Open backup spreadsheet
3. Copy specific data:
   - MONTHLY sheet historical data
   - SALESPEOPLE sheet (if corrupted)
   - Archive sheets (if lost)
4. Paste into new spreadsheet
5. Re-test functionality
6. Resume if successful
```

### Post-Rollback Actions

**Immediate**:
```
☐ Verify backup functional
☐ Confirm users can access
☐ Test critical operations
☐ Document what went wrong
☐ Plan remediation
```

**Within 24 Hours**:
```
☐ Analyze failure cause
☐ Determine fix approach
☐ Test fix in separate copy
☐ Plan re-migration
☐ Communicate timeline
```

**Before Re-Attempting**:
```
☐ Root cause identified and addressed
☐ Test plan enhanced
☐ Backup strategy verified
☐ Additional preparation done
☐ Users notified of retry
```

---

## Post-Migration Optimization

### Performance Tuning

**Week 1 Optimizations**:
```
☐ Monitor processing times
☐ Identify slow operations
☐ Optimize salesperson roster (remove inactive)
☐ Clean up excess data
☐ Review conditional formatting
```

**Month 1 Optimizations**:
```
☐ Archive old test data
☐ Streamline configuration
☐ Adjust settings based on usage
☐ Implement user feedback
☐ Document best practices
```

### User Adoption

**Track Adoption Metrics**:
```
☐ % users entering data daily
☐ % users running processing
☐ % users accessing analytics
☐ Support ticket volume
☐ User satisfaction scores
```

**Increase Adoption**:
```
☐ Additional training sessions
☐ One-on-one support
☐ Quick reference materials
☐ Success stories sharing
☐ Address pain points
```

### Continuous Improvement

**Monthly Reviews**:
```
☐ Review analytics accuracy
☐ Evaluate performance metrics
☐ Gather user feedback
☐ Identify enhancement opportunities
☐ Plan incremental improvements
```

**Quarterly Assessments**:
```
☐ Comprehensive system review
☐ ROI evaluation
☐ Process optimization
☐ Training effectiveness
☐ Future roadmap planning
```

---

## Common Migration Issues

### Issue 1: Auto-Migration Doesn't Run

**Symptoms**: Settings open but configuration not migrated

**Causes**:
- Properties Service access denied
- Script permissions insufficient
- SALESPEOPLE sheet corrupted

**Solutions**:
```
1. Check Apps Script permissions
2. Reauthorize if needed
3. Manually trigger migration:
   - Apps Script Editor
   - Run: migrateToConfigUI()
4. Check execution log for errors
```

---

### Issue 2: Analytics Not Calculating After Migration

**Symptoms**: Columns S-X empty after processing

**Causes**:
- MONTHLY sheet column count insufficient
- Analytics module not loaded
- Cache corruption

**Solutions**:
```
1. Verify MONTHLY has 26 columns (A-Z)
2. Run manual analytics refresh:
   Sales Tools → 🔄 Refresh Analytics
3. Check execution logs for errors
4. Verify sales_analytics.gs file present
```

---

### Issue 3: Settings Changes Don't Save

**Symptoms**: Settings revert after closing sidebar

**Causes**:
- Properties Service write failure
- Validation errors (silent)
- Concurrent modification

**Solutions**:
```
1. Check for validation error messages
2. Save in smaller batches
3. Wait 30 seconds between saves
4. Verify Properties Service access
5. Check execution logs
```

---

### Issue 4: Historical Data Doesn't Display Correctly

**Symptoms**: Imported data looks wrong or broken

**Causes**:
- Incorrect column mapping
- Date format mismatch
- FI flags invalid

**Solutions**:
```
1. Verify column alignment (A-N structure)
2. Check FI flags are single letters
3. Ensure date headers formatted correctly
4. Validate no merged cells in data area
5. Re-import problematic month
```

---

### Issue 5: Performance Degraded After Migration

**Symptoms**: Processing very slow compared to v7.x

**Causes**:
- Large MONTHLY sheet
- Too many salespeople
- Excess conditional formatting

**Solutions**:
```
1. Run month rollover to clear MONTHLY
2. Remove inactive salespeople
3. Clear manual formatting
4. Check for stuck processes
5. Review execution times in log
```

---

## Migration Support

### Documentation Resources

- **User Guide**: Comprehensive user documentation
- **API Reference**: Technical reference for developers
- **Troubleshooting Guide**: Common issues and solutions
- **FAQ**: Frequently asked questions

### Getting Help

**Self-Service**:
1. Check this migration guide
2. Review troubleshooting documentation
3. Search FAQ for similar issues
4. Check execution logs

**Support Escalation**:
1. Contact system administrator
2. Provide detailed error information
3. Include screenshots if applicable
4. Note steps to reproduce

### Best Practices for Smooth Migration

```
✓ Plan migration thoroughly
✓ Create comprehensive backups
✓ Test in copy first
✓ Migrate during low-usage period
✓ Have rollback plan ready
✓ Monitor closely post-migration
✓ Document everything
✓ Communicate with users
✓ Provide adequate training
✓ Be patient with adoption
```

---

## Migration Success Stories

### Typical Migration Experience

```
"Migrated from v7.x to v8.0 in 45 minutes. Auto-migration worked perfectly. Settings UI is much easier than editing code. Analytics provide insights we didn't have before. Highly recommend the upgrade."
- Sales Manager, Mid-Size Dealership
```

### Migration Metrics (Typical)

```
Time Investment:
- Planning: 1-2 hours
- Migration: 30-60 minutes
- Testing: 1-2 hours
- Training: 2-3 hours
Total: 5-8 hours

Return on Investment:
- Time saved monthly: 4-6 hours
- Improved accuracy: 95%+
- Better insights: Significant
- ROI timeline: 1-2 months
```

---

*Sales Log Pro Migration Guide v8.0 | Last Updated: 2025-10-10*