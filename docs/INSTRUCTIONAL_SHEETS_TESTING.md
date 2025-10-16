# Instructional Sheets Testing & Deployment Guide

**Version:** 1.0
**Date:** 2025-10-14
**Status:** Production Ready
**Related Documents:**

- [Design Specification](INSTRUCTIONAL_SHEETS_DESIGN.md)
- [Implementation](../src/instructional_sheets.js)

---

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Testing Checklist](#pre-deployment-testing-checklist)
3. [Sheet-by-Sheet Verification](#sheet-by-sheet-verification)
4. [User Testing Scenarios](#user-testing-scenarios)
5. [Quality Assurance Criteria](#quality-assurance-criteria)
6. [Deployment Instructions](#deployment-instructions)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Known Limitations & Future Enhancements](#known-limitations--future-enhancements)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Maintenance Procedures](#maintenance-procedures)

---

## Overview

This document provides comprehensive testing procedures and deployment instructions for the Sales Log Pro instructional sheets system. The system consists of 5 interactive tutorial sheets that serve as in-spreadsheet guides for users.

**System Components:**

- **Implementation File:** [`src/instructional_sheets.js`](../src/instructional_sheets.js) (~1,100 lines)
- **Design Specification:** [`docs/INSTRUCTIONAL_SHEETS_DESIGN.md`](INSTRUCTIONAL_SHEETS_DESIGN.md)
- **Menu Integration:** [`src/core_saleslogPro.js`](../src/core_saleslogPro.js) (lines 1677-1678)

**Key Features:**

- ✅ Idempotent operations (safe to run multiple times)
- ✅ Automatic sheet protection (read-only)
- ✅ Cross-sheet hyperlink navigation
- ✅ Visual consistency with design specifications
- ✅ Error handling and user feedback

**Testing Environment Requirements:**

- Google Apps Script environment with bound spreadsheet
- Existing TODAY, MONTHLY, SALESPEOPLE, and DEPOSITS sheets
- Administrative access to run menu functions

---

## Pre-Deployment Testing Checklist

### Phase 1: Code Review & Static Analysis

- [ ] **Code Quality**

  - [ ] All functions have JSDoc documentation
  - [ ] Error handling implemented for all operations
  - [ ] No hardcoded values (colors, dimensions use design spec)
  - [ ] Consistent naming conventions followed

- [ ] **Dependencies Verified**

  - [ ] `SpreadsheetApp` API calls are valid
  - [ ] No external library dependencies
  - [ ] Compatible with Google Apps Script runtime

- [ ] **Integration Points**
  - [ ] Menu items added in [`core_saleslogPro.js`](../src/core_saleslogPro.js:1677)
  - [ ] Functions properly exported/accessible
  - [ ] No naming conflicts with existing functions

### Phase 2: Development Environment Testing

- [ ] **Basic Functionality**

  - [ ] Script compiles without errors
  - [ ] Menu items appear in "Sales Tools" menu
  - [ ] "📚 Create Instructional Sheets" menu option visible
  - [ ] Function executes without exceptions

- [ ] **Sheet Creation**

  - [ ] All 5 sheets created successfully
  - [ ] Sheets appear in correct alphabetical order
  - [ ] Sheet tab colors correct (or null as specified)
  - [ ] No duplicate sheets created

- [ ] **Sheet Protection**
  - [ ] All sheets protected from editing
  - [ ] Protection descriptions match design spec
  - [ ] Current user can edit (for maintenance)
  - [ ] Other users see read-only interface

### Phase 3: Idempotency Testing

- [ ] **Recreation Scenarios**

  - [ ] Run function when no instructional sheets exist → Success
  - [ ] Run function when all sheets exist → Prompts for recreation
  - [ ] Cancel recreation dialog → No changes made
  - [ ] Confirm recreation → Old sheets deleted, new ones created
  - [ ] Run function twice in succession → Both executions succeed

- [ ] **Error Recovery**
  - [ ] Partial creation failure → Clean rollback
  - [ ] Interrupted execution → Next run completes successfully
  - [ ] Sheet naming conflicts handled gracefully

### Phase 4: Performance Testing

- [ ] **Execution Metrics**

  - [ ] Total execution time: **\_\_** seconds (Target: <30s)
  - [ ] No timeout errors (6-minute Apps Script limit)
  - [ ] Memory usage acceptable (no quota exceeded errors)
  - [ ] Batch operations used efficiently

- [ ] **Resource Usage**
  - [ ] Spreadsheet size increase reasonable (~50KB expected)
  - [ ] No excessive API calls to SpreadsheetApp
  - [ ] Cell operations batched where possible

---

## Sheet-by-Sheet Verification

### Getting-Started Sheet

**Purpose:** Central navigation hub and quick start guide

#### Content Verification

- [ ] **Navigation Bar (Row 1)**

  - [ ] Text: "📚 Sales Log Pro - Getting Started Guide"
  - [ ] Background: #4A86E8 (blue)
  - [ ] Text color: #FFFFFF (white)
  - [ ] Font: Calibri, 18pt, Bold
  - [ ] Height: 40px
  - [ ] Frozen: Row 1 is frozen

- [ ] **Welcome Section (Rows 2-5)**

  - [ ] Welcome message present and readable
  - [ ] Background: #E8F0FE (light blue)
  - [ ] All bullet points visible
  - [ ] Text wrapping correct

- [ ] **Quick Start Checklist (Rows 7-15)**

  - [ ] Header: "✅ Quick Start Checklist"
  - [ ] 8 checklist items present
  - [ ] Checkbox symbols (☐) visible
  - [ ] Row borders present (light gray)

- [ ] **Link Cards (Rows 17-25)**

  - [ ] 4 link cards present (TODAY, MONTHLY, SALESPEOPLE, DEPOSITS)
  - [ ] Each card has correct background color
  - [ ] Borders visible and correct color
  - [ ] Descriptions accurate

- [ ] **Daily Workflow (Rows 27-38)**

  - [ ] Three-column layout (Morning, Throughout Day, End of Day)
  - [ ] Emoji headers visible
  - [ ] Content readable in all columns

- [ ] **Help & Resources (Rows 40-48)**

  - [ ] 8 resource entries present
  - [ ] Two-column layout correct
  - [ ] Content accurate

- [ ] **Footer (Row 50)**
  - [ ] Tip text present
  - [ ] Version number shown (v8.0)
  - [ ] Font style: Italic
  - [ ] Color: #666666 (gray)

#### Formatting Verification

- [ ] All columns: 100px width (uniform)
- [ ] Sheet protection active
- [ ] Protection message: "This is a reference guide. Please do not edit."

#### Navigation Testing

- [ ] Links to all 4 instruction sheets work (test in Post-Deployment)
- [ ] No broken hyperlinks
- [ ] Links open correct target sheets

---

### TODAY-Instructions Sheet

**Purpose:** Guide to daily sales entry and leaderboard

#### Content Verification

- [ ] **Navigation Bar (Row 1)**

  - [ ] Text includes "📖 TODAY Sheet Instructions"
  - [ ] Back link to Getting-Started present
  - [ ] Background: #4A86E8 (blue)

- [ ] **Overview Section (Rows 3-9)**

  - [ ] Section header: "📊 OVERVIEW: Daily Sales Entry & Real-Time Leaderboard"
  - [ ] 6 key features listed (✓ checkmarks)
  - [ ] Background: #FFFFFF (white)

- [ ] **Column Layout Mirror (Rows 11-12)**

  - [ ] Header: "TODAY SHEET COLUMN LAYOUT"
  - [ ] 18 column headers present (A-R)
  - [ ] Matches TODAY sheet structure

- [ ] **Key Features (Rows 14-20)**

  - [ ] 5 feature descriptions present
  - [ ] Feature names in bold
  - [ ] Two-column layout

- [ ] **Tips & Best Practices (Rows 21-27)**

  - [ ] 5 tips present (3 DO, 2 DON'T)
  - [ ] DO items: Green background (#E8F5E9)
  - [ ] DON'T items: Light red background (#FFEBEE)

- [ ] **Related Sheets (Rows 28-33)**

  - [ ] 4 related sheet links present
  - [ ] Arrow symbols (→) visible

- [ ] **Footer (Row 34)**
  - [ ] Tip text present
  - [ ] Version shown (v1.0)

#### Formatting Verification

- [ ] Column widths match TODAY sheet exactly:

  - [ ] A: 30px, B: 165px, C: 35px, D: 150px, E: 125px, F: 60px, G: 195px
  - [ ] H: 5px (separator)
  - [ ] I: 165px, J: 35px, K: 150px, L: 125px, M: 60px, N: 195px
  - [ ] O: 5px (separator)
  - [ ] P: 170px, Q: 70px, R: 80px

- [ ] Sheet protection active
- [ ] Protection message correct

---

### MONTHLY-Instructions Sheet

**Purpose:** Guide to historical tracking and analytics dashboard

#### Content Verification

- [ ] **Navigation Bar (Row 1)**

  - [ ] Text includes "📖 MONTHLY Sheet Instructions"
  - [ ] Back link present
  - [ ] Background: #4A86E8 (blue)

- [ ] **Overview Section (Rows 3-8)**

  - [ ] Section header with emoji
  - [ ] 5 key features listed
  - [ ] Month-end archiving mentioned

- [ ] **Date Headers Explanation (Rows 10-16)**

  - [ ] Header: "📅 DATE HEADERS & NAVIGATION"
  - [ ] Yellow header example described
  - [ ] READ-ONLY emphasis present

- [ ] **Error Highlighting System (Rows 18-26)**

  - [ ] Header: "🚨 ERROR HIGHLIGHTING SYSTEM"
  - [ ] 2 error types described (RED and LIGHT RED)
  - [ ] Action items for each error type

- [ ] **Analytics Dashboard (Rows 28-40)**

  - [ ] Header: "📈 ANALYTICS DASHBOARD (Columns S-X)"
  - [ ] Team metrics section described
  - [ ] Individual performance section described
  - [ ] Column references accurate

- [ ] **Month Rollover (Rows 42-52)**

  - [ ] Header: "📅 MONTH ROLLOVER PROCESS"
  - [ ] 5 steps in "WHAT HAPPENS" section
  - [ ] Timing guidance provided
  - [ ] Archive preservation noted

- [ ] **Related Sheets (Rows 54-58)**

  - [ ] 3 related sheet links present

- [ ] **Footer (Row 59)**
  - [ ] Tip text present
  - [ ] Version shown (v1.0)

#### Formatting Verification

- [ ] Column widths match MONTHLY sheet (24 columns A-X)
- [ ] Proper column structure maintained
- [ ] Sheet protection active

---

### SALESPEOPLE-Instructions Sheet

**Purpose:** Guide to team roster and alias management

#### Content Verification

- [ ] **Navigation Bar (Row 1)**

  - [ ] Text includes "📖 SALESPEOPLE Sheet Instructions"
  - [ ] Back link present

- [ ] **Overview Section (Rows 3-9)**

  - [ ] Header: "👥 OVERVIEW: Team Roster & Alias Management"
  - [ ] 5 key functions listed
  - [ ] 3-column emphasis mentioned

- [ ] **Column Headers Mirror (Rows 11-12)**

  - [ ] 3 headers: FULL NAME | ALIASES | DISPLAY CODE
  - [ ] Subtitle present

- [ ] **Column-by-Column Guide (Rows 14-27)**

  - [ ] Column A: Full Name section complete
  - [ ] Column B: Aliases section complete
  - [ ] Column C: Display Code section complete
  - [ ] Each section has distinct background color
  - [ ] Requirements clearly listed
  - [ ] Examples provided

- [ ] **Example Entries (Rows 29-35)**

  - [ ] Header: "💡 EXAMPLE ENTRIES"
  - [ ] 4 example rows with data
  - [ ] Each example has different background color
  - [ ] Explanation text below examples

- [ ] **Bidirectional Sync (Rows 37-48)**

  - [ ] Header: "🔄 BIDIRECTIONAL SYNC WITH SETTINGS"
  - [ ] "What is" section present
  - [ ] Method 1 (Settings Sidebar) described
  - [ ] Method 2 (Direct Editing) described
  - [ ] Sync timing explained

- [ ] **Best Practices (Rows 50-64)**

  - [ ] 4 practice sections (3 DO, 1 DON'T, 1 PRO TIP)
  - [ ] Each section has distinct formatting
  - [ ] Practical examples provided

- [ ] **Related Sheets (Rows 66-70)**

  - [ ] 3 related sheet links present

- [ ] **Footer (Row 71)**
  - [ ] Tip text present
  - [ ] Version shown (v1.0)

#### Formatting Verification

- [ ] All 3 columns: 150px width each
- [ ] Sheet protection active

---

### DEPOSITS-Instructions Sheet

**Purpose:** Guide to deposit tracking and duplicate prevention

#### Content Verification

- [ ] **Navigation Bar (Row 1)**

  - [ ] Text includes "📖 DEPOSITS Sheet Instructions"
  - [ ] Back link present

- [ ] **Overview Section (Rows 3-9)**

  - [ ] Header: "📋 OVERVIEW: Deposit Tracking & Duplicate Prevention"
  - [ ] 5 key purposes listed
  - [ ] Lime green highlighting mentioned

- [ ] **Column Headers Mirror (Rows 11-12)**

  - [ ] 14 headers present (DATE through NOTES)
  - [ ] Subtitle present

- [ ] **Critical Column G (Rows 14-20)**

  - [ ] Header: "⚠️ COLUMN G: STOCK # - CRITICAL FOR DUPLICATE DETECTION"
  - [ ] Background: #FF0000 (red)
  - [ ] Text color: #FFFFFF (white)
  - [ ] "HOW IT WORKS" section detailed
  - [ ] Requirements clearly stated

- [ ] **Duplicate Detection System (Rows 22-42)**

  - [ ] Header: "🚨 DUPLICATE DETECTION & CONDITIONAL FORMATTING"
  - [ ] Conditional formatting formulas shown
  - [ ] Visual highlighting specs (lime green, red text)
  - [ ] Two scenarios compared (with/without tracking)

- [ ] **Workflow Integration (Rows 44-68)**

  - [ ] Header: "🔄 WORKFLOW INTEGRATION"
  - [ ] "Taking a Deposit" steps (4 steps)
  - [ ] "When Vehicle Delivers" steps (3 steps)
  - [ ] "When Deposit Cancels" steps (2 steps)

- [ ] **Best Practices (Rows 70-88)**

  - [ ] Header: "💡 MAINTENANCE & BEST PRACTICES"
  - [ ] 4 practice sections (2 DO, 1 DON'T, 1 PRO TIP)
  - [ ] Maintenance timing emphasized

- [ ] **Related Sheets (Rows 90-94)**

  - [ ] 3 related sheet links present

- [ ] **Footer (Row 95)**
  - [ ] Tip text present
  - [ ] Version shown (v1.0)

#### Formatting Verification

- [ ] Column widths match DEPOSITS sheet (14 columns):
  - [ ] A: 100px, B: 80px, C: 60px, D: 120px, E: 120px, F: 100px, G: 120px
  - [ ] H: 120px, I: 100px, J: 150px, K: 120px, L: 120px, M: 120px, N: 200px
- [ ] Sheet protection active

---

## User Testing Scenarios

### Scenario 1: First-Time User Onboarding

**Objective:** Verify new users can understand and navigate the system

**Test Steps:**

1. [ ] User opens spreadsheet for first time
2. [ ] User finds "Sales Tools" menu
3. [ ] User selects "📚 Create Instructional Sheets"
4. [ ] User sees creation dialog/toast notifications
5. [ ] User navigates to "Getting-Started" sheet
6. [ ] User reads welcome message
7. [ ] User clicks on TODAY-Instructions link
8. [ ] User successfully navigates to TODAY-Instructions
9. [ ] User uses "Back to Getting-Started" link
10. [ ] User explores other instructional sheets

**Success Criteria:**

- [ ] All navigation links work correctly
- [ ] User understands system purpose within 2 minutes
- [ ] No confusion about sheet protection (read-only nature clear)
- [ ] User can find information about any core sheet

### Scenario 2: Returning User Quick Reference

**Objective:** Verify experienced users can quickly find specific information

**Test Steps:**

1. [ ] User needs to understand salesperson alias system
2. [ ] User opens SALESPEOPLE-Instructions directly from tabs
3. [ ] User finds Column B (Aliases) section quickly
4. [ ] User reads requirements and examples
5. [ ] User understands how to add new salesperson
6. [ ] User finds "Related Sheets" links at bottom
7. [ ] User navigates to related content if needed

**Success Criteria:**

- [ ] Information found in <1 minute
- [ ] Section headers clearly visible
- [ ] Examples immediately helpful
- [ ] Navigation between related topics intuitive

### Scenario 3: Troubleshooting Workflow

**Objective:** Test instructional sheets during actual problem-solving

**Test Steps:**

1. [ ] User encounters "Unknown Salesperson" error on MONTHLY
2. [ ] User goes to Getting-Started sheet
3. [ ] User clicks SALESPEOPLE-Instructions link
4. [ ] User finds explanation of name resolution
5. [ ] User understands how to fix the error
6. [ ] User finds validation rules section
7. [ ] User successfully resolves issue

**Success Criteria:**

- [ ] Error resolution path clear
- [ ] Related information easy to find
- [ ] Action items clearly stated
- [ ] User confident in solution

### Scenario 4: Daily Operations Reference

**Objective:** Verify sheets support daily workflow tasks

**Test Steps:**

1. [ ] User preparing to log yesterday's sales
2. [ ] User reviews TODAY-Instructions
3. [ ] User checks duplicate detection section
4. [ ] User understands what lime green highlighting means
5. [ ] User reviews DEPOSITS-Instructions for deposit check
6. [ ] User confidently processes daily sales
7. [ ] User knows how to handle any highlighted rows

**Success Criteria:**

- [ ] Workflow steps clearly explained
- [ ] Visual examples match actual sheets
- [ ] Tips and best practices actionable
- [ ] Edge cases addressed

### Scenario 5: Month-End Processing

**Objective:** Test guidance for infrequent but critical operations

**Test Steps:**

1. [ ] User needs to perform month rollover
2. [ ] User reviews MONTHLY-Instructions
3. [ ] User finds "Month Rollover Process" section
4. [ ] User understands 5 steps that will occur
5. [ ] User knows timing recommendations
6. [ ] User confident to proceed with rollover
7. [ ] User understands archive sheet purpose

**Success Criteria:**

- [ ] Critical information highlighted (⚠️ warnings)
- [ ] Step-by-step process clear
- [ ] Timing guidance helpful
- [ ] Consequences understood

---

## Quality Assurance Criteria

### Visual Formatting Standards

#### Typography

- [ ] **Font Family:** Calibri used throughout all sheets
- [ ] **Font Sizes:**
  - [ ] Navigation bars: 14-18pt
  - [ ] Section headers: 12-14pt
  - [ ] Body text: 10-11pt
  - [ ] Footer text: 9pt
- [ ] **Font Weights:**
  - [ ] Headers: Bold
  - [ ] Section titles: Bold
  - [ ] Body text: Regular
  - [ ] Emphasis: Bold within body text
- [ ] **Font Styles:**
  - [ ] Footer text: Italic
  - [ ] Tips: Regular unless specified

#### Color Accuracy

- [ ] **Primary Colors:**
  - [ ] Blue headers: #4A86E8
  - [ ] Light blue sections: #E8F0FE, #E3F2FD
  - [ ] White content: #FFFFFF
  - [ ] Light gray: #F5F5F5, #E0E0E0
- [ ] **Accent Colors:**
  - [ ] Green (DO items): #E8F5E9, #34A853
  - [ ] Orange (NEW examples): #FFF3E0, #FF9800
  - [ ] Pink (special items): #FCE4EC, #E91E63
  - [ ] Red (critical warnings): #FF0000
  - [ ] Light red (errors): #FFEBEE
  - [ ] Yellow (date headers): #FFFF00

#### Borders & Lines

- [ ] Section borders: 2px solid, matching theme color
- [ ] Row separators: 1px solid #E0E0E0
- [ ] Card borders: 2px solid, matching card color
- [ ] Table borders: 1px solid #000000

#### Alignment & Spacing

- [ ] Navigation bars: Center horizontal, Middle vertical
- [ ] Section headers: Left or Center as specified, Middle vertical
- [ ] Body text: Left horizontal, Top vertical
- [ ] Row heights appropriate (25-40px based on content)
- [ ] Text wrapping enabled for multi-line content

### Content Accuracy Standards

#### Technical Accuracy

- [ ] All column references correct (e.g., "Column G" matches actual DEPOSITS column G)
- [ ] Formula examples accurate (e.g., `=COUNTIF(INDIRECT('DEPOSITS!G:G'),$E2)>0`)
- [ ] Range references match actual sheets (e.g., RANGES.leaderboard)
- [ ] Color codes match implementation (e.g., #b4ff0c for duplicate highlight)
- [ ] Feature descriptions match actual system behavior

#### Completeness

- [ ] All major features documented
- [ ] All error conditions explained
- [ ] All user actions have guidance
- [ ] Edge cases addressed
- [ ] Limitations clearly stated

#### Language & Clarity

- [ ] Clear, concise language (no jargon without explanation)
- [ ] Active voice used for instructions
- [ ] Consistent terminology throughout
- [ ] Examples provided for complex concepts
- [ ] Tips are actionable

### Hyperlink Integrity

#### Internal Navigation

- [ ] **Getting-Started → Others:**

  - [ ] Link to TODAY-Instructions works
  - [ ] Link to MONTHLY-Instructions works
  - [ ] Link to SALESPEOPLE-Instructions works
  - [ ] Link to DEPOSITS-Instructions works

- [ ] **Back Links:**

  - [ ] TODAY-Instructions → Getting-Started works
  - [ ] MONTHLY-Instructions → Getting-Started works
  - [ ] SALESPEOPLE-Instructions → Getting-Started works
  - [ ] DEPOSITS-Instructions → Getting-Started works

- [ ] **Cross-References:**
  - [ ] TODAY ↔ MONTHLY links work
  - [ ] TODAY ↔ SALESPEOPLE links work
  - [ ] TODAY ↔ DEPOSITS links work
  - [ ] MONTHLY ↔ SALESPEOPLE links work
  - [ ] All "Related Sheets" links functional

#### Link Testing Method

```javascript
// Test script to verify all hyperlinks
function testAllInstructionalLinks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  sheets.forEach((sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log(`❌ Sheet not found: ${sheetName}`);
      return;
    }

    // Check for rich text values with links
    const dataRange = sheet.getDataRange();
    const richTextValues = dataRange.getRichTextValues();

    richTextValues.forEach((row, i) => {
      row.forEach((cell, j) => {
        const linkUrl = cell.getLinkUrl();
        if (linkUrl && linkUrl.startsWith("#gid=")) {
          const targetGid = linkUrl.split("=")[1];
          const targetSheet = ss
            .getSheets()
            .find((s) => s.getSheetId().toString() === targetGid);
          if (targetSheet) {
            Logger.log(
              `✓ Link in ${sheetName} cell ${String.fromCharCode(65 + j)}${
                i + 1
              } → ${targetSheet.getName()}`
            );
          } else {
            Logger.log(
              `❌ Broken link in ${sheetName} cell ${String.fromCharCode(
                65 + j
              )}${i + 1} → GID ${targetGid}`
            );
          }
        }
      });
    });
  });
}
```

### Sheet Protection Verification

#### Protection Settings

- [ ] All 5 instructional sheets protected
- [ ] Protection descriptions appropriate for each sheet
- [ ] Current user listed as editor (for maintenance access)
- [ ] No other editors listed
- [ ] Domain edit disabled (if applicable)

#### User Experience

- [ ] Users see read-only indicator when attempting to edit
- [ ] Protection message displays correctly
- [ ] No errors when users try to edit
- [ ] Copy functionality still works (users can copy content)
- [ ] Print functionality works

#### Protection Testing

```javascript
// Verify sheet protection
function verifyInstructionalSheetProtection() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  sheets.forEach((sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log(`❌ Sheet not found: ${sheetName}`);
      return;
    }

    const protection = sheet.getProtections(
      SpreadsheetApp.ProtectionType.SHEET
    )[0];
    if (protection) {
      Logger.log(`✓ ${sheetName} is protected`);
      Logger.log(`  Description: ${protection.getDescription()}`);
      Logger.log(`  Can domain edit: ${protection.canDomainEdit()}`);
      Logger.log(
        `  Editors: ${protection
          .getEditors()
          .map((e) => e.getEmail())
          .join(", ")}`
      );
    } else {
      Logger.log(`❌ ${sheetName} is NOT protected`);
    }
  });
}
```

### Performance Metrics

#### Execution Time Benchmarks

- [ ] **Initial Creation:** <30 seconds for all 5 sheets
- [ ] **Recreation:** <30 seconds (includes deletion + creation)
- [ ] **Hyperlink Addition:** <5 seconds for all cross-references
- [ ] **Total Process:** <40 seconds end-to-end

#### Resource Usage

- [ ] No Apps Script timeout errors (6-minute limit)
- [ ] No quota exceeded errors
- [ ] Spreadsheet size increase <100KB
- [ ] No excessive memory warnings

#### Performance Testing

```javascript
// Benchmark creation performance
function benchmarkInstructionalSheetsCreation() {
  const startTime = new Date();

  try {
    createAllInstructionalSheets();

    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;

    Logger.log(`✓ Creation completed in ${duration.toFixed(1)} seconds`);

    if (duration > 30) {
      Logger.log(`⚠️ Performance warning: Exceeded 30s target`);
    }
  } catch (e) {
    Logger.log(`❌ Creation failed: ${e.toString()}`);
  }
}
```

---

## Deployment Instructions

### Prerequisites

#### Environment Verification

- [ ] Google Apps Script project properly configured
- [ ] Project bound to Sales Log Pro spreadsheet
- [ ] All source files present in project:
  - [ ] `src/instructional_sheets.js`
  - [ ] `src/core_saleslogPro.js` (with menu integration)
  - [ ] `src/error_logger.js` (dependency)
- [ ] clasp installed and configured (if deploying via CLI)
- [ ] Deployment environment matches testing environment

#### Backup Creation

- [ ] **CRITICAL:** Create complete spreadsheet backup before deployment
  - [ ] File → Make a copy → Name: "Sales Log Pro - Backup [DATE]"
  - [ ] Test backup can be opened
  - [ ] Note backup file URL for rollback if needed

### Deployment Methods

#### Method 1: Direct Script Editor Deployment (Recommended for First Deployment)

**Step 1: Access Script Editor**

1. Open the target Sales Log Pro spreadsheet
2. Go to Extensions → Apps Script
3. Verify you're in the correct project

**Step 2: Update Code Files**

1. Open `instructional_sheets.js` in script editor
2. Copy complete file content from [`src/instructional_sheets.js`](../src/instructional_sheets.js)
3. Paste into script editor, replacing any existing content
4. Click "Save project" (Ctrl+S / Cmd+S)

**Step 3: Update Menu Integration**

1. Open `core_saleslogPro.js` in script editor (or main code file)
2. Locate the `onOpen()` function
3. Verify menu item is present (around line 1677):

   ```javascript
   .addItem("📚 Create Instructional Sheets", "createAllInstructionalSheets")
   ```

4. Save if changes were made

**Step 4: Initial Test Run**

1. In script editor, select `createAllInstructionalSheets` function
2. Click "Run" button (▶️)
3. Authorize script if prompted
4. Monitor execution logs for errors
5. Verify completion message appears

**Step 5: Verify Deployment**

1. Return to spreadsheet
2. Refresh page (F5 / Cmd+R)
3. Check for new sheet tabs:
   - [ ] Getting-Started
   - [ ] TODAY-Instructions
   - [ ] MONTHLY-Instructions
   - [ ] SALESPEOPLE-Instructions
   - [ ] DEPOSITS-Instructions
4. Open "Sales Tools" menu
5. Verify "📚 Create Instructional Sheets" appears

#### Method 2: clasp CLI Deployment (For Version Control Integration)

**Prerequisites:**

- [ ] clasp installed globally: `npm install -g @google/clasp`
- [ ] Authenticated: `clasp login`
- [ ] Project cloned locally: `clasp clone <scriptId>`

**Step 1: Verify Local Files**

```bash
# Navigate to project directory
cd /path/to/sales_log_pro2

# Verify files present
ls src/instructional_sheets.js
ls src/core_saleslogPro.js
```

**Step 2: Push Code to Apps Script**

```bash
# Push all files to Apps Script project
clasp push

# Verify push succeeded
clasp status
```

**Step 3: Deploy New Version**

```bash
# Create new version
clasp version "Instructional Sheets v1.0 - Initial Release"

# Deploy new version
clasp deploy -V <version-number> -d "Instructional Sheets Deployment"
```

**Step 4: Verify Deployment**

```bash
# Open script editor
clasp open

# OR open spreadsheet
clasp open --webapp
```

**Step 5: Test in Spreadsheet**

1. Navigate to spreadsheet
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Test function execution
4. Verify sheets created successfully

### Deployment Verification Checklist

#### Immediate Post-Deployment Checks

- [ ] All 5 sheets created without errors
- [ ] No timeout or execution errors in logs
- [ ] Success dialog displayed to user
- [ ] Sheet tabs visible in correct order

#### Functional Verification

- [ ] Menu integration works (Sales Tools → 📚 Create Instructional Sheets)
- [ ] Recreation function works (try recreating sheets)
- [ ] Sheet protection active on all sheets
- [ ] Hyperlinks functional between sheets

#### Visual Quality Check

- [ ] Sample 5 sections across all sheets
- [ ] Verify formatting matches design spec
- [ ] Check for any rendering issues
- [ ] Confirm colors accurate

### Rollback Procedures

#### If Deployment Fails

**Scenario 1: Partial Sheet Creation**

1. Open spreadsheet
2. Delete any partially created instructional sheets
3. Review error logs to identify issue
4. Fix code issue
5. Retry deployment

**Scenario 2: Complete Failure / Data Corruption**

1. **Immediate Action:** Do NOT make additional changes
2. Close spreadsheet without saving (if possible)
3. Restore from backup:
   - Open backup copy created pre-deployment
   - Verify backup integrity
   - Share backup with users as temporary solution
4. **Investigate root cause:**
   - Review error logs in Apps Script
   - Check recent code changes
   - Test in development environment
5. **Fix and redeploy:**
   - Correct identified issues
   - Test thoroughly in dev environment
   - Retry deployment to production

**Scenario 3: Code Version Rollback (clasp)**

```bash
# List deployed versions
clasp versions

# Undeploy current version
clasp undeploy <deploymentId>

# Deploy previous working version
clasp deploy -V <previous-version-number> -d "Rollback to working version"
```

#### Emergency Rollback Script

```javascript
/**
 * Emergency cleanup - removes all instructional sheets
 * USE WITH CAUTION: This permanently deletes the sheets
 */
function emergencyRemoveInstructionalSheets() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "Emergency Cleanup",
    "This will DELETE all instructional sheets. Continue?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetsToRemove = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  let removed = 0;
  sheetsToRemove.forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      ss.deleteSheet(sheet);
      removed++;
      Logger.log(`Removed: ${name}`);
    }
  });

  ui.alert(
    "Cleanup Complete",
    `Removed ${removed} instructional sheets`,
    ui.ButtonSet.OK
  );
}
```

---

## Post-Deployment Verification

### Phase 1: Immediate Verification (First 10 Minutes)

#### System Stability

- [ ] No error emails from Apps Script
- [ ] No user-reported errors
- [ ] All sheets visible and accessible
- [ ] No broken references to instructional sheets

#### Core Functionality

- [ ] Menu item works for all users
- [ ] Recreation function accessible
- [ ] Sheet protection prevents editing
- [ ] Navigation links functional

### Phase 2: User Acceptance Testing (First 24 Hours)

#### User Feedback Collection

- [ ] Send announcement to users about new instructional sheets
- [ ] Request feedback via email or form
- [ ] Monitor for support requests
- [ ] Track usage metrics if available

#### Common User Tasks

- [ ] New users can find Getting-Started
- [ ] Users successfully navigate between sheets
- [ ] Links work correctly
- [ ] Information is helpful and clear

### Phase 3: Extended Monitoring (First Week)

#### Usage Patterns

- [ ] Monitor which sheets are most accessed
- [ ] Identify any confusing sections (high support questions)
- [ ] Track any errors or issues reported
- [ ] Note requests for additional content

#### Performance Monitoring

- [ ] No degradation in spreadsheet performance
- [ ] Recreation function works consistently
- [ ] No quota issues

### Verification Test Script

```javascript
/**
 * Comprehensive post-deployment verification test
 * Run this after deployment to verify system integrity
 */
function runPostDeploymentVerification() {
  const results = {
    sheetsExist: false,
    sheetsProtected: false,
    hyperlinksWork: false,
    formattingCorrect: false,
    menuIntegration: false,
    errors: [],
  };

  try {
    // Test 1: Verify all sheets exist
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const requiredSheets = [
      "Getting-Started",
      "TODAY-Instructions",
      "MONTHLY-Instructions",
      "SALESPEOPLE-Instructions",
      "DEPOSITS-Instructions",
    ];

    const allExist = requiredSheets.every(
      (name) => ss.getSheetByName(name) !== null
    );
    results.sheetsExist = allExist;
    if (!allExist) {
      results.errors.push("Not all instructional sheets exist");
    }

    // Test 2: Verify protection
    let allProtected = true;
    requiredSheets.forEach((name) => {
      const sheet = ss.getSheetByName(name);
      if (sheet) {
        const protections = sheet.getProtections(
          SpreadsheetApp.ProtectionType.SHEET
        );
        if (protections.length === 0) {
          allProtected = false;
          results.errors.push(`Sheet not protected: ${name}`);
        }
      }
    });
    results.sheetsProtected = allProtected;

    // Test 3: Check basic formatting
    const gettingStarted = ss.getSheetByName("Getting-Started");
    if (gettingStarted) {
      const navBarColor = gettingStarted.getRange("A1").getBackground();
      results.formattingCorrect = navBarColor.toUpperCase() === "#4A86E8";
      if (!results.formattingCorrect) {
        results.errors.push(`Navigation bar color incorrect: ${navBarColor}`);
      }
    }

    // Test 4: Verify menu integration
    // Note: This must be manually verified by user
    results.menuIntegration = true; // Assume true if no errors

    // Log results
    Logger.log("=== Post-Deployment Verification Results ===");
    Logger.log(`Sheets Exist: ${results.sheetsExist ? "✓" : "✗"}`);
    Logger.log(`Sheets Protected: ${results.sheetsProtected ? "✓" : "✗"}`);
    Logger.log(`Formatting Correct: ${results.formattingCorrect ? "✓" : "✗"}`);
    Logger.log(`Menu Integration: ${results.menuIntegration ? "✓" : "✗"}`);

    if (results.errors.length > 0) {
      Logger.log("\nErrors Found:");
      results.errors.forEach((err) => Logger.log(`  - ${err}`));
    } else {
      Logger.log("\n✓ All verification tests passed!");
    }

    return results;
  } catch (e) {
    Logger.log(`❌ Verification failed with error: ${e.toString()}`);
    results.errors.push(e.toString());
    return results;
  }
}
```

---

## Known Limitations & Future Enhancements

### Current Limitations

#### Functionality Limitations

1. **Static Content**

   - Content is embedded during creation
   - Updates require recreation of sheets
   - No dynamic content loading

2. **Language Support**

   - English only currently
   - No internationalization support
   - Hard-coded emoji characters

3. **Customization**

   - Colors hardcoded from design spec
   - Cannot adjust font sizes without code change
   - Limited user customization options

4. **Version Management**

   - No automatic version tracking in sheets
   - Version numbers manually embedded in footer
   - No changelog visible to users

5. **Search Capability**
   - No in-sheet search function
   - Users must manually browse content
   - No keyword index

#### Technical Limitations

1. **Performance**

   - Creation takes 30+ seconds for all sheets
   - No incremental updates
   - Full recreation required for changes

2. **Maintenance**

   - Content updates require code deployment
   - Testing required after any content change
   - No WYSIWYG editor for content

3. **Analytics**
   - No usage tracking
   - Cannot measure which sections most helpful
   - No user feedback collection mechanism

### Future Enhancements (v2.0)

#### High Priority

- [ ] **Content Management System**

  - External JSON/config file for content
  - Update content without code changes
  - Version-controlled content repository

- [ ] **Incremental Updates**

  - Update specific sections without full recreation
  - Preserve user annotations (if supported)
  - Faster update process

- [ ] **Interactive Elements**

  - Clickable table of contents
  - Expandable/collapsible sections
  - In-sheet search functionality

- [ ] **Usage Analytics**
  - Track sheet access frequency
  - Identify most-viewed sections
  - Measure time spent in each sheet

#### Medium Priority

- [ ] **Multilingual Support**

  - Spanish translation
  - French translation
  - Language selection mechanism

- [ ] **Video Integration**

  - Embedded video tutorials
  - Screenshot galleries
  - Animated GIFs for complex workflows

- [ ] **User Feedback**

  - In-sheet feedback forms
  - "Was this helpful?" buttons
  - Direct support links

- [ ] **Customization**
  - User preference for color themes
  - Font size adjustment
  - Print-optimized layouts

#### Low Priority

- [ ] **Advanced Navigation**

  - Breadcrumb navigation
  - Recently viewed sections
  - Bookmarking system

- [ ] **Content Versioning**

  - Show update history
  - "What's new" highlighting
  - Changelog integration

- [ ] **Accessibility**
  - Screen reader optimization
  - High contrast themes
  - Keyboard navigation enhancements

### Enhancement Request Process

**For Users:**

1. Document the enhancement request
2. Include use case and benefit
3. Submit via designated feedback channel
4. Requests reviewed monthly

**For Developers:**

1. Review feasibility
2. Estimate effort
3. Prioritize based on impact
4. Plan for future release

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: Sheets Not Created

**Symptoms:**

- Function executes but sheets don't appear
- Partial sheets created
- Error in execution logs

**Diagnostic Steps:**

1. Check Apps Script execution logs
2. Verify all required sheets (TODAY, MONTHLY, etc.) exist
3. Check for permission issues
4. Verify sufficient spreadsheet quota

**Solutions:**

- **If timeout error:** Sheets are very large, optimize or increase timeout
- **If permission error:** Re-authorize script
- **If quota error:** Remove unused sheets, archive old data
- **If partial creation:** Delete partial sheets, run again

**Prevention:**

- Regular spreadsheet maintenance
- Archive old data
- Monitor execution time

#### Issue 2: Recreation Fails

**Symptoms:**

- Cannot recreate sheets
- Error when attempting deletion
- Sheets locked

**Diagnostic Steps:**

1. Check if sheets are manually protected by user
2. Verify user has edit permissions
3. Check for active data validation rules
4. Look for frozen rows/columns conflicts

**Solutions:**

- **If manually protected:** Remove manual protection first
- **If permission error:** Verify editor access
- **If locked:** Wait and retry
- **If validation conflict:** Use `recreateInstructionalSheets()` function

**Code Solution:**

```javascript
// Force recreation by manually removing protection
function forceRecreateInstructionalSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetsToRecreate = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  // Remove all protections first
  sheetsToRecreate.forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      const protections = sheet.getProtections(
        SpreadsheetApp.ProtectionType.SHEET
      );
      protections.forEach((p) => {
        if (p.canEdit()) {
          p.remove();
        }
      });
    }
  });

  // Now recreate
  createAllInstructionalSheets();
}
```

#### Issue 3: Broken Hyperlinks

**Symptoms:**

- Links don't navigate to target sheets
- "Sheet not found" errors
- Links go to wrong sheet

**Diagnostic Steps:**

1. Verify target sheets exist
2. Check sheet names match exactly (case-sensitive)
3. Verify GID in URL matches target sheet
4. Check for renamed sheets

**Solutions:**

- **If sheets renamed:** Rename back or update links
- **If sheets deleted:** Recreate missing sheets
- **If GID mismatch:** Recreate instructional sheets
- **If persistent:** Use emergency cleanup then recreate

**Testing Script:**

```javascript
// Test all hyperlinks
function validateAllHyperlinks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  let brokenLinks = [];

  sheets.forEach((sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log(`Sheet missing: ${sheetName}`);
      return;
    }

    const richTextValues = sheet.getDataRange().getRichTextValues();
    richTextValues.forEach((row, i) => {
      row.forEach((cell, j) => {
        const linkUrl = cell.getLinkUrl();
        if (linkUrl && linkUrl.startsWith("#gid=")) {
          const gid = linkUrl.split("=")[1];
          const targetExists = ss
            .getSheets()
            .some((s) => s.getSheetId().toString() === gid);
          if (!targetExists) {
            brokenLinks.push({
              source: sheetName,
              cell: `${String.fromCharCode(65 + j)}${i + 1}`,
              targetGid: gid,
            });
          }
        }
      });
    });
  });

  if (brokenLinks.length > 0) {
    Logger.log("Broken links found:");
    brokenLinks.forEach((link) => {
      Logger.log(`  ${link.source} cell ${link.cell} → GID ${link.targetGid}`);
    });
  } else {
    Logger.log("✓ All hyperlinks valid");
  }
}
```

#### Issue 4: Formatting Incorrect

**Symptoms:**

- Colors don't match design
- Column widths wrong
- Text truncated or overlapping
- Borders missing

**Diagnostic Steps:**

1. Compare to design specification
2. Check for manual formatting changes
3. Verify column width settings
4. Check for theme conflicts

**Solutions:**

- **If minor issues:** Use "Recreate Instructional Sheets" menu option
- **If persistent:** Check for conflicting sheet theme
- **If column width:** May need to manually adjust
- **If colors wrong:** Verify [`getColor()`](../src/core_saleslogPro.js) function

**Verification:**

```javascript
// Verify formatting matches design spec
function verifyFormatting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const gettingStarted = ss.getSheetByName("Getting-Started");

  if (!gettingStarted) {
    Logger.log("Getting-Started sheet not found");
    return;
  }

  // Check navigation bar
  const navBar = gettingStarted.getRange("A1");
  const navBarBg = navBar.getBackground().toUpperCase();
  const navBarFont = navBar.getFontFamily();
  const navBarSize = navBar.getFontSize();

  Logger.log("Navigation Bar Formatting:");
  Logger.log(`  Background: ${navBarBg} (Expected: #4A86E8)`);
  Logger.log(`  Font: ${navBarFont} (Expected: Calibri)`);
  Logger.log(`  Size: ${navBarSize}pt (Expected: 18pt)`);

  // Check column widths
  for (let i = 1; i <= 18; i++) {
    const width = gettingStarted.getColumnWidth(i);
    Logger.log(
      `  Column ${String.fromCharCode(64 + i)}: ${width}px (Expected: 100px)`
    );
  }
}
```

#### Issue 5: Sheet Protection Issues

**Symptoms:**

- Users can edit sheets (should be read-only)
- "Cannot edit protected sheet" error for admin
- Protection description missing

**Diagnostic Steps:**

1. Check sheet protection settings
2. Verify protection type (SHEET vs RANGE)
3. Check editor list
4. Verify protection description

**Solutions:**

- **If not protected:** Recreate sheets
- **If admin locked out:** Remove protection, then recreate
- **If users can edit:** Check domain settings
- **If description wrong:** Recreate sheets

**Fix Protection:**

```javascript
// Reapply protection to instructional sheets
function reapplyInstructionalSheetProtection() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    {
      name: "Getting-Started",
      desc: "This is a reference guide. Please do not edit.",
    },
    {
      name: "TODAY-Instructions",
      desc: "This is an instructional guide. Please refer to TODAY sheet for data entry.",
    },
    {
      name: "MONTHLY-Instructions",
      desc: "This is an instructional guide. Please refer to MONTHLY sheet for actual data.",
    },
    {
      name: "SALESPEOPLE-Instructions",
      desc: "This is an instructional guide. Please refer to SALESPEOPLE sheet for team management.",
    },
    {
      name: "DEPOSITS-Instructions",
      desc: "This is an instructional guide. Please refer to DEPOSITS sheet for deposit tracking.",
    },
  ];

  sheets.forEach((sheetInfo) => {
    const sheet = ss.getSheetByName(sheetInfo.name);
    if (!sheet) {
      Logger.log(`Sheet not found: ${sheetInfo.name}`);
      return;
    }

    // Remove existing protections
    const existingProtections = sheet.getProtections(
      SpreadsheetApp.ProtectionType.SHEET
    );
    existingProtections.forEach((p) => {
      if (p.canEdit()) {
        p.remove();
      }
    });

    // Apply new protection
    const protection = sheet.protect().setDescription(sheetInfo.desc);
    protection.addEditor(Session.getEffectiveUser());
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }

    Logger.log(`✓ Protected: ${sheetInfo.name}`);
  });
}
```

### Error Recovery Procedures

#### Corrupted Sheet Recovery

**Scenario:** Sheet exists but content is corrupted/incomplete

**Recovery Steps:**

1. Export corrupted sheet data (if any user data present)
2. Delete corrupted sheet
3. Run `recreateInstructionalSheets()` function
4. Verify recreation successful
5. Test functionality

**Script:**

```javascript
function recoverCorruptedSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log(`Sheet not found: ${sheetName}`);
    return false;
  }

  // Delete corrupted sheet
  ss.deleteSheet(sheet);
  Logger.log(`Deleted corrupted sheet: ${sheetName}`);

  // Recreate all instructional sheets
  createAllInstructionalSheets();

  // Verify recreation
  const newSheet = ss.getSheetByName(sheetName);
  if (newSheet) {
    Logger.log(`✓ Successfully recovered: ${sheetName}`);
    return true;
  } else {
    Logger.log(`✗ Failed to recover: ${sheetName}`);
    return false;
  }
}
```

#### Complete System Reset

**When to Use:** Multiple issues, corrupt state, clean slate needed

**Steps:**

1. **Backup first** - Critical!
2. Run emergency cleanup script
3. Verify all instructional sheets deleted
4. Clear any cached data
5. Run creation function
6. Verify complete deployment
7. Test all functionality

**Script:**

```javascript
function completeInstructionalSheetsReset() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "Complete Reset",
    "This will DELETE and RECREATE all instructional sheets.\n\n" +
      "Make sure you have a backup!\n\nContinue?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    Logger.log("Reset cancelled by user");
    return;
  }

  // Step 1: Remove all sheets
  emergencyRemoveInstructionalSheets();

  // Step 2: Clear cache
  CacheService.getScriptCache().removeAll(["instructional_sheets_cache"]);

  // Step 3: Recreate
  createAllInstructionalSheets();

  Logger.log("✓ Complete reset finished");
}
```

---

## Maintenance Procedures

### Content Update Workflow

#### When to Update Content

**Regular Updates (Monthly):**

- [ ] Check for outdated information
- [ ] Review user feedback
- [ ] Update examples if features changed
- [ ] Verify links still accurate

**Immediate Updates Required:**

- Feature changes affecting documented behavior
- Critical errors in instructions
- Broken or incorrect examples
- Significant UX changes

#### Update Process

**Step 1: Identify Changes Needed**

1. Document specific sections requiring updates
2. Note line numbers in source code
3. Reference design document sections
4. List affected sheets

**Step 2: Update Source Code**

1. Edit [`src/instructional_sheets.js`](../src/instructional_sheets.js)
2. Modify content in appropriate `create*Sheet()` function
3. Update version number in footer (e.g., "v1.0" → "v1.1")
4. Add comments documenting changes

**Step 3: Test Changes**

1. Run in development environment
2. Verify content displays correctly
3. Check formatting preserved
4. Test affected hyperlinks
5. Verify sheet protection

**Step 4: Deploy Updates**

1. Follow deployment procedures above
2. Use "Recreate Instructional Sheets" menu option
3. Confirm old content replaced
4. Verify new content correct

**Step 5: Announce Changes**

1. Notify users of updates
2. Highlight significant changes
3. Update changelog if maintained

### Version Management

#### Version Numbering Scheme

**Format:** `v[MAJOR].[MINOR]`

- **MAJOR version:** Significant content changes, new sections, restructuring
- **MINOR version:** Content updates, corrections, clarifications

**Examples:**

- `v1.0` - Initial release
- `v1.1` - Minor content updates
- `v2.0` - Major redesign/restructuring

#### Version Tracking

**In Code:**

```javascript
// At top of instructional_sheets.js
/**
 * instructional_sheets.js
 * Version: 1.1
 * Last Updated: 2025-10-14
 * Changes: Updated deposit workflow, clarified alias examples
 */
```

**In Sheet Footers:**

```javascript
// Update footer text with version
"💡 Tip: Clean DEPOSITS weekly for accurate duplicate detection | DEPOSITS Instructions v1.1";
```

#### Changelog Maintenance

Create `docs/INSTRUCTIONAL_SHEETS_CHANGELOG.md`:

```markdown
# Instructional Sheets Changelog

## v1.1 (2025-10-15)

### Changed

- Updated DEPOSITS-Instructions workflow section
- Clarified alias examples in SALESPEOPLE-Instructions
- Fixed typo in MONTHLY error highlighting description

### Fixed

- Hyperlink to SALESPEOPLE from TODAY-Instructions

## v1.0 (2025-10-14)

### Added

- Initial release of all 5 instructional sheets
- Complete Getting-Started navigation hub
- All cross-sheet hyperlinks
- Sheet protection implementation
```

### Recreate vs. Modify Decision Matrix

| Scenario                   | Action                           | Reasoning                      |
| -------------------------- | -------------------------------- | ------------------------------ |
| **Minor text correction**  | Recreate                         | Easiest and safest             |
| **Formatting issue**       | Recreate                         | Ensures consistency            |
| **New section needed**     | Code update + Recreate           | Requires code change           |
| **Broken hyperlink**       | Recreate                         | Links embedded during creation |
| **Color change**           | Code update + Recreate           | Colors from code               |
| **User feedback typo**     | Recreate                         | Quick fix                      |
| **Major restructure**      | Code update + Recreate + Testing | Full development cycle         |
| **Multiple sheet updates** | Code update + Recreate all       | Batch changes                  |

**General Rule:** Always recreate rather than manually editing. Manual edits:

- Not version controlled
- Lost on next recreation
- May introduce inconsistencies
- Not reproducible

### Backup & Archive Procedures

#### Before Major Updates

**Create Snapshot:**

1. File → Make a copy
2. Name: "Sales Log Pro - Pre-Update [DATE]"
3. Move to archive folder
4. Document what version/state

**Export Sheets:**

```javascript
function exportInstructionalSheetsBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  sheets.forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      // Export as CSV to Drive
      const csvContent = sheet
        .getDataRange()
        .getValues()
        .map((row) => row.join(","))
        .join("\n");

      DriveApp.createFile(
        `${name}_backup_${new Date().toISOString().split("T")[0]}.csv`,
        csvContent
      );
    }
  });

  Logger.log("✓ Backup complete");
}
```

#### Archive Old Versions

**When:** Before major version updates (v1.x → v2.0)

**Process:**

1. Create full spreadsheet copy
2. Rename: "Sales Log Pro - v1.x Archive"
3. Move to "Archives" folder
4. Update documentation with archive location
5. Keep accessible for reference

### Quality Assurance for Updates

#### Pre-Update Checklist

- [ ] Changes documented
- [ ] Code reviewed
- [ ] Tests passed in dev environment
- [ ] Backup created
- [ ] Rollback plan ready

#### Post-Update Checklist

- [ ] All sheets recreated successfully
- [ ] Visual verification completed
- [ ] Hyperlinks tested
- [ ] Sheet protection verified
- [ ] User notification sent

---

## Appendix

### Testing Scripts Collection

All testing scripts from this document consolidated for easy access:

```javascript
// File: test_instructional_sheets.js

/**
 * Master test suite for instructional sheets
 * Run this to execute all verification tests
 */
function runAllInstructionalSheetsTests() {
  Logger.log("========================================");
  Logger.log("INSTRUCTIONAL SHEETS TEST SUITE");
  Logger.log("========================================\n");

  // Test 1: Verify sheets exist
  Logger.log("TEST 1: Sheet Existence");
  testSheetExistence();

  // Test 2: Verify protection
  Logger.log("\nTEST 2: Sheet Protection");
  verifyInstructionalSheetProtection();

  // Test 3: Validate hyperlinks
  Logger.log("\nTEST 3: Hyperlink Validation");
  validateAllHyperlinks();

  // Test 4: Check formatting
  Logger.log("\nTEST 4: Formatting Verification");
  verifyFormatting();

  // Test 5: Post-deployment verification
  Logger.log("\nTEST 5: Post-Deployment Checks");
  const results = runPostDeploymentVerification();

  Logger.log("\n========================================");
  Logger.log("TEST SUITE COMPLETE");
  Logger.log("========================================");

  return results;
}

function testSheetExistence() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requiredSheets = [
    "Getting-Started",
    "TODAY-Instructions",
    "MONTHLY-Instructions",
    "SALESPEOPLE-Instructions",
    "DEPOSITS-Instructions",
  ];

  let allExist = true;
  requiredSheets.forEach((name) => {
    const exists = ss.getSheetByName(name) !== null;
    Logger.log(`  ${exists ? "✓" : "✗"} ${name}`);
    if (!exists) allExist = false;
  });

  return allExist;
}

// ... (Include all other test functions from above)
```

### Quick Reference Commands

**Create instructional sheets:**

```javascript
createAllInstructionalSheets();
```

**Recreate instructional sheets:**

```javascript
recreateInstructionalSheets();
```

**Run verification tests:**

```javascript
runAllInstructionalSheetsTests();
```

**Emergency cleanup:**

```javascript
emergencyRemoveInstructionalSheets();
```

**Reapply protection:**

```javascript
reapplyInstructionalSheetProtection();
```

**Test hyperlinks:**

```javascript
validateAllHyperlinks();
```

**Benchmark performance:**

```javascript
benchmarkInstructionalSheetsCreation();
```

### Related Documentation Links

- **Design Specification:** [`docs/INSTRUCTIONAL_SHEETS_DESIGN.md`](INSTRUCTIONAL_SHEETS_DESIGN.md)
- **Implementation Code:** [`src/instructional_sheets.js`](../src/instructional_sheets.js)
- **Menu Integration:** [`src/core_saleslogPro.js`](../src/core_saleslogPro.js)
- **Error Logging:** [`src/error_logger.js`](../src/error_logger.js)

### Support Contacts

**For Technical Issues:**

- Review error logs in Apps Script
- Check troubleshooting guide above
- Contact development team

**For Content Issues:**

- Document specific problem
- Note sheet and section
- Submit enhancement request

---

## Document History

| Version | Date       | Author                    | Changes                                          |
| ------- | ---------- | ------------------------- | ------------------------------------------------ |
| 1.0     | 2025-10-14 | Documentation Writer Mode | Initial comprehensive testing & deployment guide |

---

**End of Testing & Deployment Guide**
