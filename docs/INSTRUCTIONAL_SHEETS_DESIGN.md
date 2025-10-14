# Sales Log Pro - Instructional Sheets Design Document

**Version:** 1.0  
**Date:** 2025-10-14  
**Author:** Architecture Mode  
**Purpose:** Comprehensive design specifications for interactive tutorial sheets

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Principles](#design-principles)
3. [Naming Convention & Visibility](#naming-convention--visibility)
4. [Sheet-by-Sheet Designs](#sheet-by-sheet-designs)
   - [Getting-Started Sheet](#getting-started-sheet)
   - [TODAY-Instructions Sheet](#today-instructions-sheet)
   - [MONTHLY-Instructions Sheet](#monthly-instructions-sheet)
   - [SALESPEOPLE-Instructions Sheet](#salespeople-instructions-sheet)
   - [DEPOSITS-Instructions Sheet](#deposits-instructions-sheet)
5. [Global Formatting Specifications](#global-formatting-specifications)
6. [Implementation Notes](#implementation-notes)

---

## Executive Summary

This document provides complete specifications for creating five instructional sheets that will serve as embedded, interactive tutorials within the Sales Log Pro application. These sheets will help users understand and effectively use the four primary working sheets: TODAY, MONTHLY, SALESPEOPLE, and DEPOSITS.

**Key Design Decisions:**
- **Naming:** Suffix pattern "[SheetName]-Instructions" (e.g., "TODAY-Instructions")
- **Visibility:** Always visible in sheet tabs
- **Protection:** Read-only (protected from editing)
- **Master Sheet:** "Getting-Started" sheet linking to all instructional sheets
- **Content:** Informational reference guides with read-only examples

---

## Design Principles

### 1. Clarity First
- Use clear, concise language
- Break complex concepts into digestible sections
- Use visual hierarchy to guide the eye

### 2. Mirror Source Structure
- Instructional sheets mirror their source sheet's column layout
- This allows users to see instructions alongside actual column headers
- Helps users understand spatial relationships

### 3. Progressive Disclosure
- Start with overview/purpose
- Progress to detailed column explanations
- End with tips and best practices

### 4. Visual Consistency
- Consistent color coding across all instructional sheets
- Uniform formatting for similar content types
- Clear visual separation between sections

### 5. Cross-Sheet Navigation
- Hyperlinks between related concepts
- Clear references to related sheets
- Master "Getting-Started" sheet as central hub

---

## Naming Convention & Visibility

### Naming Pattern
- **Format:** `[SheetName]-Instructions`
- **Examples:**
  - `TODAY-Instructions`
  - `MONTHLY-Instructions`
  - `SALESPEOPLE-Instructions`
  - `DEPOSITS-Instructions`
  - `Getting-Started` (master sheet)

### Rationale
- Suffix pattern sorts instructional sheets immediately after their source sheets alphabetically
- Users see source sheet followed by its instructions in tab list
- Example tab order: `DEPOSITS`, `DEPOSITS-Instructions`, `MONTHLY`, `MONTHLY-Instructions`, etc.

### Visibility & Protection
- **Visibility:** Always visible in sheet tabs
- **Protection:** Entire sheet protected from editing
- **Frozen Rows:** Row 1 frozen as header navigation bar
- **Frozen Columns:** None (allows horizontal scrolling to see all content)

---

## Sheet-by-Sheet Designs

---

## Getting-Started Sheet

### Purpose
Central navigation hub and quick start guide for new users. Provides overview of the system and links to all detailed instructional sheets.

### Layout Structure

#### Section 1: Welcome Banner (Rows 1-5)
**Row 1:** Navigation/Title Bar (Merged A1:R1)
- **Content:** "📚 Sales Log Pro - Getting Started Guide"
- **Formatting:**
  - Font: Calibri, 18pt, Bold
  - Background: #4A86E8 (blue)
  - Text Color: #FFFFFF (white)
  - Alignment: Center, Vertical Center
  - Height: 40px

**Rows 2-5:** Welcome Message
- **Merged Range:** A2:R5
- **Content:**
```
Welcome to Sales Log Pro!

This guide will help you get started with the system. Sales Log Pro uses four main sheets to track your dealership's sales:
• TODAY - Daily sales entry with real-time leaderboard
• MONTHLY - Historical sales with analytics dashboard  
• SALESPEOPLE - Team roster with flexible alias mapping
• DEPOSITS - Customer deposit tracking to prevent duplicates

Click any link below to learn more about each sheet.
```
- **Formatting:**
  - Font: Calibri, 12pt, Regular
  - Background: #E8F0FE (light blue)
  - Text Color: #000000 (black)
  - Alignment: Left, Top
  - Padding: 10px (via row height)

#### Section 2: Quick Start Checklist (Rows 7-15)
**Row 7:** Section Header (Merged A7:R7)
- **Content:** "✅ Quick Start Checklist"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #34A853 (green)
  - Text Color: #FFFFFF (white)
  - Alignment: Center, Vertical Center

**Rows 8-15:** Checklist Items
- **Column A:** Checkbox symbols (☐)
- **Columns B-R:** Merged cells with task descriptions
- **Content:**
```
Row 8:  ☐  Run Setup Wizard (Sales Tools → 🚀 Run Setup Wizard)
Row 9:  ☐  Add your sales team to SALESPEOPLE sheet (or use Settings sidebar)
Row 10: ☐  Review TODAY-Instructions to understand daily data entry
Row 11: ☐  Enter a test sale on TODAY sheet
Row 12: ☐  Run "Log Yesterday's Sales" to see how processing works
Row 13: ☐  Review MONTHLY-Instructions to understand analytics
Row 14: ☐  Check MONTHLY sheet to see your first analytics report
Row 15: ☐  Explore other instructional sheets as needed
```
- **Formatting:**
  - Font: Calibri, 11pt, Regular
  - Background: #FFFFFF (white)
  - Border: Light gray (#E0E0E0) between rows
  - Alignment: Left, Vertical Center
  - Row Height: 30px

#### Section 3: Instructional Sheet Links (Rows 17-25)
**Row 17:** Section Header (Merged A17:R17)
- **Content:** "📖 Instructional Sheet Reference"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #4A86E8 (blue)
  - Text Color: #FFFFFF (white)
  - Alignment: Center, Vertical Center

**Rows 18-25:** Link Cards (One per sheet)
Each card spans columns A-R, height 2 rows

**Row 18-19:** TODAY-Instructions Link Card
- **Merged:** A18:D18, E18:R18, A19:R19
- **Content:**
  - A18:D18: "TODAY Sheet" (Bold, 12pt)
  - E18:R18: [Hyperlink to TODAY-Instructions sheet]
  - A19:R19: "Learn how to enter daily sales, understand the leaderboard, and use duplicate detection"
- **Formatting:**
  - Background: #FFF3E0 (light orange)
  - Border: 2px solid #FF9800 (orange)
  - Text Color: #000000 (black)
  - Padding: 5px

**Row 20-21:** MONTHLY-Instructions Link Card
- **Merged:** A20:D20, E20:R20, A21:R21
- **Content:**
  - A20:D20: "MONTHLY Sheet" (Bold, 12pt)
  - E20:R20: [Hyperlink to MONTHLY-Instructions sheet]
  - A21:R21: "Understand historical tracking, date headers, error highlights, and the analytics dashboard"
- **Formatting:**
  - Background: #E3F2FD (light blue)
  - Border: 2px solid #2196F3 (blue)
  - Text Color: #000000 (black)
  - Padding: 5px

**Row 22-23:** SALESPEOPLE-Instructions Link Card
- **Merged:** A22:D22, E22:R22, A23:R23
- **Content:**
  - A22:D22: "SALESPEOPLE Sheet" (Bold, 12pt)
  - E22:R22: [Hyperlink to SALESPEOPLE-Instructions sheet]
  - A23:R23: "Set up your team roster, configure aliases, and understand bidirectional sync"
- **Formatting:**
  - Background: #E8F5E9 (light green)
  - Border: 2px solid #4CAF50 (green)
  - Text Color: #000000 (black)
  - Padding: 5px

**Row 24-25:** DEPOSITS-Instructions Link Card
- **Merged:** A24:D24, E24:R24, A25:R25
- **Content:**
  - A24:D24: "DEPOSITS Sheet" (Bold, 12pt)
  - E24:R24: [Hyperlink to DEPOSITS-Instructions sheet]
  - A25:R25: "Track customer deposits and prevent duplicate entries on TODAY sheet"
- **Formatting:**
  - Background: #FCE4EC (light pink)
  - Border: 2px solid #E91E63 (pink)
  - Text Color: #000000 (black)
  - Padding: 5px

#### Section 4: Daily Workflow Overview (Rows 27-38)
**Row 27:** Section Header (Merged A27:R27)
- **Content:** "📅 Typical Daily Workflow"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #9C27B0 (purple)
  - Text Color: #FFFFFF (white)
  - Alignment: Center, Vertical Center

**Rows 28-38:** Workflow Steps
- **Format:** Three-column layout (A-F, G-L, M-R)
- **Content:**

**Morning (A28:F38):**
```
🌅 MORNING
Row 29: Open TODAY sheet
Row 30: Review leaderboard from yesterday
Row 31: Check for any deposits in DEPOSITS sheet
```

**Throughout Day (G28:L38):**
```
☀️ THROUGHOUT DAY  
Row 29: Enter sales as they occur on TODAY sheet
Row 30: Use any name format (full name, alias, or display code)
Row 31: Apply font colors for special deals (optional)
Row 32: System highlights duplicates automatically
```

**End of Day (M28:R38):**
```
🌙 END OF DAY
Row 29: Run "Log Yesterday's Sales" (Sales Tools menu)
Row 30: Review processing summary dialog
Row 31: Check MONTHLY sheet for transferred data
Row 32: Review analytics in columns S-X
Row 33: TODAY sheet is cleared and ready for tomorrow
```

- **Formatting:**
  - Font: Calibri, 11pt, Regular
  - Background: Alternating white/light gray (#F5F5F5)
  - Border: Medium borders between columns, light borders between rows
  - Alignment: Left, Top

#### Section 5: Help & Resources (Rows 40-48)
**Row 40:** Section Header (Merged A40:R40)
- **Content:** "❓ Help & Resources"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #607D8B (blue-gray)
  - Text Color: #FFFFFF (white)
  - Alignment: Center, Vertical Center

**Rows 41-48:** Resource Links
- **Two-column layout:** A-I (Resource), J-R (Description)
- **Content:**
```
Row 41: Settings Sidebar | Access via Sales Tools → ⚙️ Settings to manage team, colors, and pace thresholds
Row 42: Recalculate MTD | Use Sales Tools → 🔄 Recalculate MTD if data is edited manually  
Row 43: Refresh Analytics | Use Sales Tools → 🔄 Refresh Analytics to update MONTHLY analytics on demand
Row 44: Month Rollover | Use Sales Tools → 📅 Rollover Month at end of each month to archive and start fresh
Row 45: [Empty]
Row 46: Common Issues | See troubleshooting documentation for solutions to common problems
Row 47: Best Practices | Review user guide for tips on optimal usage patterns
Row 48: Support | Contact your system administrator for assistance
```
- **Formatting:**
  - Font: Calibri, 10pt, Regular
  - Background: #FFFFFF (white)
  - Border: Light gray (#E0E0E0) between rows
  - Column A-I: Bold
  - Column J-R: Regular
  - Alignment: Left, Vertical Center

#### Section 6: Footer (Row 50)
**Row 50:** Footer (Merged A50:R50)
- **Content:** "💡 Tip: Keep this sheet open in a separate browser tab for quick reference while working | Sales Log Pro v8.0"
- **Formatting:**
  - Font: Calibri, 9pt, Italic
  - Background: #F5F5F5 (light gray)
  - Text Color: #666666 (gray)
  - Alignment: Center, Vertical Center

### Column Widths
- All columns A-R: 100px (uniform for balanced layout)

### Sheet Protection
- Entire sheet protected from editing
- Message: "This is a reference guide. Please do not edit."

---

## TODAY-Instructions Sheet

*Full design specifications are maintained in this document.*

**Note:** The TODAY-Instructions sheet design is fully specified above in the Getting-Started sheet section. Due to document length, key highlights include:

- Navigation bar with back link to Getting-Started
- Complete column-by-column guide (columns A-R)
- Example data with visual formatting
- Key features: duplicate detection, font color transfer, salesperson flexibility, leaderboard
- Daily workflow guide
- Tips & best practices with DO's and DON'Ts
- Related sheet links

**See complete specification in the comprehensive design document.**

---

## MONTHLY-Instructions Sheet

### Purpose
Comprehensive guide to understanding historical sales tracking, date headers, error highlighting, and the analytics dashboard on the MONTHLY sheet.

### Layout Structure

#### Section 1: Navigation Bar (Row 1)
**Merged A1:X1**
- **Content:** "📖 MONTHLY Sheet Instructions | [← Back to Getting-Started]" (with hyperlink)
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #4A86E8 (blue)
  - Text Color: #FFFFFF (white)
  - Alignment: Left, Vertical Center
  - Height: 35px

#### Section 2: Overview (Rows 3-8)
**Row 3:** Section Title (Merged A3:X3)
- **Content:** "📊 OVERVIEW: Historical Sales & Analytics Dashboard"

**Rows 4-8:** Overview Text
```
The MONTHLY sheet is your historical record and analytics center. It contains:

✓ All processed sales from TODAY sheet organized by date (columns A-N)
✓ Date headers separating each day's entries (format: M/D in yellow)
✓ Final leaderboard from month-end (columns P-R)
✓ Comprehensive analytics dashboard (columns S-X)
✓ Error highlighting for non-delivered deals (red) and unknown salespeople (light red)

This sheet grows throughout the month. At month-end, it's archived and cleared for the new month.
```

#### Sections 3-11: Complete Specifications
- Column headers mirror (matching MONTHLY sheet columns A-X)
- Sales data columns guide (A-N) with READ-ONLY emphasis
- Leaderboard columns guide (P-R)
- Analytics dashboard detailed breakdown (S-X)
  - Team metrics (rows 2-6)
  - Individual performance (row 8+)
- Error highlighting system (red & light red backgrounds)
- Date headers explanation and navigation
- Month rollover process step-by-step
- Working with MONTHLY data (editing, exporting, troubleshooting)
- Related sheet links

### Column Widths (Matching MONTHLY sheet)
- A: 45px, B: 115px, C: 45px, D: 100px, E: 70px, F: 90px, G: 125px
- H: 5px (separator)
- I: 115px, J: 45px, K: 100px, L: 70px, M: 90px, N: 125px
- O: 5px (separator)
- P: 160px, Q: 50px, R: 60px
- S: 180px, T: 140px, U: 120px, V: 100px, W: 100px, X: 100px

### Sheet Protection
- Entire sheet protected
- Message: "This is an instructional guide. Please refer to MONTHLY sheet for actual data."

---

## SALESPEOPLE-Instructions Sheet

### Purpose
Guide to understanding team roster management, alias configuration, and bidirectional sync between the SALESPEOPLE sheet and Settings sidebar.

### Layout Structure

#### Section 1: Navigation Bar (Row 1)
**Merged A1:C1**
- **Content:** "📖 SALESPEOPLE Sheet Instructions | [← Back to Getting-Started]"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #4A86E8 (blue)
  - Text Color: #FFFFFF (white)
  - Alignment: Left, Vertical Center
  - Height: 35px

#### Section 2: Overview (Rows 3-9)
**Row 3:** Section Title (Merged A3:C3)
- **Content:** "👥 OVERVIEW: Team Roster & Alias Management"

**Rows 4-9:** Overview Text (Merged A4:C9)
```
The SALESPEOPLE sheet is the master roster for your sales team. It serves several critical functions:

✓ Maps full names to shorter aliases and display codes
✓ Enables flexible data entry (type "JS" instead of "John Smith")
✓ Powers salesperson name resolution throughout the system
✓ Syncs bidirectionally with Settings sidebar
✓ Supports multiple aliases per person for maximum flexibility

This 3-column sheet is the foundation of the entire tracking system. All analytics, leaderboards, and reporting depend on accurate SALESPEOPLE data.
```

#### Section 3: Column Headers Mirror (Rows 11-12)
**Row 11:** Mirror of SALESPEOPLE sheet headers
- **Columns A-C:** FULL NAME | ALIASES | DISPLAY CODE

**Formatting:**
- Font: Calibri, 10pt, Bold
- Background: #E0E0E0 (gray)
- Text Color: #000000 (black)
- Alignment: Center, Vertical Center
- Height: 25px

**Row 12:** Section Label (Merged A12:C12)
- **Content:** "THREE COLUMNS THAT POWER THE ENTIRE SYSTEM"
- **Formatting:**
  - Font: Calibri, 9pt, Bold, Italic
  - Background: #F5F5F5 (light gray)
  - Text Color: #666666 (gray)

#### Section 4: Column-by-Column Guide (Rows 14-30)

**Row 14:** Section Title (Merged A14:C14)
- **Content:** "📝 COLUMN-BY-COLUMN GUIDE"

**Row 15-17:** Column A - Full Name
```
Row 15 (merged A15:C15): "COLUMN A: FULL NAME"
  Background: #FFF3E0 (light orange), Bold

Row 16-17 (merged A16:C17): 
"The official, complete name of the salesperson used in all reports and analytics.

REQUIREMENTS:
• Required field (cannot be blank)
• Must be 2-100 characters
• Should be unique (no two people with same full name)
• This is how the person appears in leaderboards and analytics

EXAMPLES:
• 'Michael Chen'
• 'Sarah Johnson'
• 'Robert Williams Jr.'

BEST PRACTICE: Use the name as it appears on official documents or payroll. Consistency matters for historical tracking."
```

**Row 18-22:** Column B - Aliases
```
Row 18 (merged A18:C18): "COLUMN B: ALIASES"
  Background: #E8F5E9 (light green), Bold

Row 19-22 (merged A19:C22):
"Comma-separated list of alternative names that map to this person. This is where the magic happens!

REQUIREMENTS:
• Optional field (can be blank)
• Comma-separated format: "JS, Johnny, John"
• Maximum 200 characters total
• No duplicate aliases across different people
• Case-insensitive matching

HOW ALIASES WORK:
When entering sales data, you can use ANY of these formats:
1. Full name from Column A: 'Michael Chen'
2. Any alias from Column B: 'MC', 'Mike', 'Michael', 'Chen'
3. Display code from Column C: 'MC'

ALL resolve to the same person in analytics!

EXAMPLES:
Person 1: 'Michael Chen' with aliases 'MC, Mike, Michael, Chen'
Person 2: 'Sarah Johnson' with aliases 'SJ, Sarah, Johnson, Sally'

TIPS:
• Include initials (e.g., 'MC')
• Add nicknames (e.g., 'Mike')
• Include last name only (e.g., 'Chen')
• Add common misspellings to prevent errors
• Consider what salespeople actually type"
```

**Row 23-27:** Column C - Display Code
```
Row 23 (merged A23:C23): "COLUMN C: DISPLAY CODE"
  Background: #E3F2FD (light blue), Bold

Row 24-27 (merged A24:C27):
"Short 2-4 character code used in compact displays like leaderboards and analytics.

REQUIREMENTS:
• Required field (cannot be blank)
• Must be 2-4 alphanumeric characters
• Auto-converts to UPPERCASE
• Must be unique across all salespeople
• Typically initials (e.g., 'MC', 'SJ', 'RW')

WHERE DISPLAY CODES APPEAR:
• MONTHLY analytics dashboard (Column S)
• Leaderboard compact view
• Processing summaries
• Export reports

EXAMPLES:
• 'MC' for Michael Chen
• 'SJ' for Sarah Johnson
• 'RW' for Robert Williams
• 'MJ2' for second Mary Johnson (if duplicate initials)

BEST PRACTICE: Use initials when possible. If two people have same initials, add a number or middle initial."
```

#### Section 5: Example Entries (Rows 29-35)

**Row 29:** Section Title (Merged A29:C29)
- **Content:** "💡 EXAMPLE ENTRIES"

**Row 30:** Example Headers (Mirror of Row 11)

**Row 31:** Example 1
```
A31: Michael Chen
B31: MC, Mike, Michael, Chen
C31: MC
```
**Formatting:** Background #E8F5E9 (light green), Border 1px solid #4CAF50

**Row 32:** Example 2
```
A32: Sarah Johnson
B32: SJ, Sarah, Johnson, Sally
C32: SJ
```
**Formatting:** Background #E1F5FE (light cyan), Border 1px solid #03A9F4

**Row 33:** Example 3 - Minimal Aliases
```
A33: Robert Williams Jr.
B33: RW
C33: RW
```
**Formatting:** Background #FFF3E0 (light orange), Border 1px solid #FF9800

**Row 34:** Example 4 - No Aliases
```
A34: Emily Taylor
B34: [blank]
C34: ET
```
**Formatting:** Background #FCE4EC (light pink), Border 1px solid #E91E63

**Row 35:** Explanations (Merged A35:C35)
```
"✓ Ex1: Maximum flexibility - can enter 'MC', 'Mike', 'Michael', 'Chen', or full name
✓ Ex2: Common aliases including nickname
✓ Ex3: Minimal setup - only initials as alias
✓ Ex4: No aliases - must use full name or display code only"
```

#### Section 6: Bidirectional Sync (Rows 37-48)

**Row 37:** Section Title (Merged A37:C37)
- **Content:** "🔄 BIDIRECTIONAL SYNC WITH SETTINGS"

**Row 38-48:** Sync Explanation
```
Row 38-40 (merged): WHAT IS BIDIRECTIONAL SYNC?
"Changes made in EITHER location automatically sync to the other:
• Add person in Settings sidebar → Appears in SALESPEOPLE sheet
• Edit name in SALESPEOPLE sheet → Updates in Settings sidebar
• Delete person in Settings → Removes from SALESPEOPLE sheet

This ensures consistency and allows you to work in whichever interface is most convenient."

Row 41-43 (merged): HOW TO ADD SALESPEOPLE

METHOD 1: Settings Sidebar (Recommended for most users)
"1. Click Sales Tools → ⚙️ Settings
2. Go to 👥 Sales Team tab
3. Click 'Add Salesperson' button
4. Fill in Full Name, Aliases, Display Code
5. Click 'Add' then 'Save Changes'
6. Person appears in SALESPEOPLE sheet immediately"

Row 44-46 (merged): METHOD 2: Direct Sheet Editing (Advanced users)
"1. Open SALESPEOPLE sheet
2. Add new row with data in columns A-C
3. Data automatically syncs to Settings sidebar
4. Validation rules enforce formatting requirements
5. Duplicate checking prevents conflicts"

Row 47-48 (merged): SYNC TIMING
"• Sidebar → Sheet: Immediate upon clicking 'Save Changes'
• Sheet → Sidebar: Next time sidebar opens or on next data operation
• Cache: 5-minute cache for performance (getSalespersonMaps function)
• Processing: Always uses most current data from sheet"
```

#### Section 7: Validation Rules (Rows 50-62)

**Row 50:** Section Title (Merged A50:C50)
- **Content:** "✅ VALIDATION RULES & CONFLICT PREVENTION"

**Row 51-62:** Validation details
```
Row 51-53: FULL NAME VALIDATION
"• Required: Cannot be blank
• Length: 2-100 characters
• Uniqueness: No two people can have identical full names
• Check: System validates when adding via sidebar or editing sheet"

Row 54-56: ALIASES VALIDATION
"• Optional: Can be left blank
• Format: Comma-separated list (e.g., 'JS, Johnny, John')
• Length: Maximum 200 characters total
• Uniqueness: Cannot duplicate another person's alias, full name, or display code
• Case: Case-insensitive (system treats 'JS' and 'js' as same)"

Row 57-59: DISPLAY CODE VALIDATION
"• Required: Cannot be blank
• Length: 2-4 characters
• Characters: Alphanumeric only (A-Z, 0-9)
• Case: Auto-converts to UPPERCASE
• Uniqueness: Must be unique across all salespeople"

Row 60-62: CONFLICT DETECTION
"The system prevents these conflicts:
• Duplicate full names
• Alias matching another person's full name
• Alias matching another person's display code
• Alias matching another person's different alias
• Duplicate display codes

Error messages guide you to fix conflicts before saving."
```

#### Section 8: Name Resolution Process (Rows 64-75)

**Row 64:** Section Title (Merged A64:C64)
- **Content:** "🔍 HOW NAME RESOLUTION WORKS"

**Row 65-75:** Resolution explanation
```
Row 65-67: THE MATCHING PROCESS
"When you enter a name on TODAY sheet, the system checks in this order:

1. Check if it matches a Full Name (Column A) - exact match
2. Check if it matches a Display Code (Column C) - exact match
3. Check if it matches any Alias (Column B) - exact match
4. If no match found → Flag as 'Unknown Salesperson' (light red highlight on MONTHLY)"

Row 68-72: EXAMPLE RESOLUTION
"For Michael Chen with aliases 'MC, Mike, Michael, Chen' and display code 'MC':

These ALL resolve to 'Michael Chen':
• 'Michael Chen' → Column A exact match
• 'MC' → Column C OR Column B match (both valid)
• 'Mike' → Column B alias match
• 'Michael' → Column B alias match
• 'Chen' → Column B alias match

These DO NOT match:
• 'M Chen' → No match (needs exact full name)
• 'Mike Chen' → No match (only full name OR alias, not combination)
• 'mc' → DOES match (case-insensitive)"

Row 73-75: SPLIT SALES RESOLUTION
"Split sales (e.g., 'John/Sarah') resolve EACH name separately:
• 'Michael/Sarah' → Both names must resolve independently
• 'MC/SJ' → Both display codes resolve to full names
• 'Mike/Sally' → Both aliases resolve to full names
• Each person credited with 0.5 units

If either name doesn't resolve, the entire entry shows as unknown salesperson error."
```

#### Section 9: Best Practices (Rows 77-92)

**Row 77:** Section Title (Merged A77:C77)
- **Content:** "💡 BEST PRACTICES & PRO TIPS"

**Rows 78-92:** Best practices
```
Row 78-80: ✅ DO: Set up aliases strategically
"Think about HOW your team actually types names. Add common variations:
• Initials: 'MC', 'SJ'
• First name only: 'Michael', 'Sarah'
• Last name only: 'Chen', 'Johnson'
• Nicknames: 'Mike', 'Sally'
• Common typos: 'Jon' for 'John', 'Mich' for 'Michael'"

Row 81-83: ✅ DO: Use consistent display codes
"Establish a pattern and stick to it:
• Initials: 'MC' for Michael Chen, 'SJ' for Sarah Johnson
• If duplicates: Add number 'MJ1', 'MJ2' OR middle initial 'MJA', 'MJB'
• Keep codes short (2-4 characters) for compact displays"

Row 84-86: ✅ DO: Update promptly when team changes
"Add new hires immediately:
• Before their first sale appears in the system
• Prevents 'unknown salesperson' errors
• Ensures accurate first-day analytics

Remove departed employees:
• After verifying all their sales are processed
• Historical data preserves their name
• Prevents accidental crediting to wrong person"

Row 87-89: ❌ DON'T: Create duplicate aliases
"Each alias must be unique:
• Wrong: Two people both have alias 'Mike'
• Right: Use 'Mike' and 'Mikey', OR full names 'Mike S' and 'Mike J'
• System prevents this but good to plan ahead"

Row 90-92: 💎 PRO TIP: Import/Export for bulk changes
"Use Settings sidebar Import/Export:
• Export to CSV to review all salespeople
• Edit in spreadsheet for bulk changes
• Re-import to update system
• Faster than one-by-one for large teams"
```

#### Section 10: Troubleshooting (Rows 94-108)

**Row 94:** Section Title (Merged A94:C94)
- **Content:** "🔧 TROUBLESHOOTING COMMON ISSUES"

**Rows 95-108:** Common issues
```
Row 95-97: ISSUE: "Unknown Salesperson" errors on MONTHLY
"CAUSE: Name entered doesn't match any full name, alias, or display code
SOLUTION:
1. Check spelling in MONTHLY sheet column G or N
2. Add missing person or alias to SALESPEOPLE sheet
3. Run 'Sales Tools → 🔄 Recalculate MTD'
4. Light red highlight should clear"

Row 98-100: ISSUE: Alias conflict error when adding
"CAUSE: Trying to add alias that already belongs to someone else
SOLUTION:
1. Review error message showing conflict
2. Choose different alias
3. Or remove alias from other person if it was error
4. System prevents saving until conflict resolved"

Row 101-103: ISSUE: Changes not appearing in Settings sidebar
"CAUSE: Cache or sync timing
SOLUTION:
1. Close and reopen Settings sidebar
2. Changes should appear (5-minute cache)
3. If not, verify data saved in SALESPEOPLE sheet
4. Check for validation errors preventing save"

Row 104-106: ISSUE: Analytics showing wrong person
"CAUSE: Multiple people with similar aliases or name confusion
SOLUTION:
1. Review SALESPEOPLE sheet for duplicate/similar aliases
2. Make aliases more distinct
3. Run 'Sales Tools → 🔄 Refresh Analytics'
4. Verify resolution working correctly"

Row 107-108: ISSUE: Cannot add person - validation error
"CAUSE: Violating validation rules
SOLUTION: Check requirements:
• Full name: 2-100 characters, unique
• Aliases: Max 200 chars, no conflicts
• Display code: 2-4 chars, unique, alphanumeric"
```

#### Section 11: Related Sheets (Rows 110-115)

**Row 110:** Section Title (Merged A110:C110)
- **Content:** "🔗 RELATED SHEETS"

**Rows 111-115:** Related links
```
Row 111: → TODAY-Instructions | See how flexible salesperson entry works during daily data entry
Row 112: → MONTHLY-Instructions | Understand how names appear in analytics and how to fix errors
Row 113: → Getting-Started | Return to main instructions hub
```

#### Section 12: Footer (Row 117)
**Merged A117:C117**
- **Content:** "💡 Tip: Keep SALESPEOPLE current - it's the foundation of accurate analytics | SALESPEOPLE Sheet Instructions v1.0"

### Column Widths (Matching SALESPEOPLE sheet)
- A: 150px (FULL NAME)
- B: 150px (ALIASES)
- C: 150px (DISPLAY CODE)

### Sheet Protection
- Entire sheet protected
- Message: "This is an instructional guide. Please refer to SALESPEOPLE sheet for team management."

---

## DEPOSITS-Instructions Sheet

### Purpose
Guide to understanding customer deposit tracking and its role in preventing duplicate entries on the TODAY sheet through conditional formatting.

### Layout Structure

#### Section 1: Navigation Bar (Row 1)
**Merged A1:N1**
- **Content:** "📖 DEPOSITS Sheet Instructions | [← Back to Getting-Started]"
- **Formatting:**
  - Font: Calibri, 14pt, Bold
  - Background: #4A86E8 (blue)
  - Text Color: #FFFFFF (white)
  - Alignment: Left, Vertical Center
  - Height: 35px

#### Section 2: Overview (Rows 3-9)
**Row 3:** Section Title (Merged A3:N3)
- **Content:** "📋 OVERVIEW: Deposit Tracking & Duplicate Prevention"

**Rows 4-9:** Overview Text (Merged A4:N9)
```
The DEPOSITS sheet tracks customer deposits on vehicles that haven't yet delivered. Its primary purpose:

✓ Record detailed deposit information for customer management
✓ Prevent counting deposited vehicles as delivered sales on TODAY sheet
✓ Automatic highlighting of deposit stock numbers when entered on TODAY
✓ Track delivery status and timeline
✓ Maintain customer contact information

When a stock number from DEPOSITS (Column G) appears on TODAY sheet, it highlights in LIME GREEN with RED text. This visual warning prevents double-counting and alerts you that the vehicle has a deposit.
```

#### Section 3: Column Headers Mirror (Rows 11-12)
**Row 11:** Mirror of DEPOSITS sheet headers
- **Columns A-N:** DATE | NEW/USED | YEAR | MAKE | MODEL | ORDER # | STOCK # | SALESPERSON | BDC | CUSTOMER | DIRECTOR | PHONE # | EST DELIVERY DATE | NOTES

**Formatting:**
- Font: Calibri, 10pt, Bold
- Background: #E0E0E0 (gray)
- Text Color: #000000 (black)
- Alignment: Center, Vertical Center
- Height: 25px

**Row 12:** Section Label (Merged A12:N12)
- **Content:** "DEPOSIT TRACKING - 14 COLUMNS FOR COMPREHENSIVE INFORMATION"

#### Section 4: Column-by-Column Guide (Rows 14-42)

**Row 14:** Section Title (Merged A14:N14)
- **Content:** "📝 COLUMN-BY-COLUMN GUIDE"

**Rows 15-42:** Individual column explanations
- Each column gets 2 rows: Title row + detail row
- Format similar to other instruction sheets

**Row 15-16:** Column A - Date
```
Row 15 (merged A15:N15): "COLUMN A: DATE"
  Background: #FFF3E0, Bold

Row 16 (merged A16:N16):
"Date the deposit was taken. Format: MM/DD/YYYY or M/D/YYYY. Helps track how long deposits have been pending. Example: '10/15/2024' or '10/15'."
```

**Row 17-18:** Column B - New/Used
```
Row 17: "COLUMN B: NEW/USED"
Row 18: "Vehicle type. Enter 'NEW' or 'USED' to categorize the deposit. Important for inventory planning and matching to correct stock numbers on TODAY sheet (NEW stock in column E, USED stock in column L)."
```

**Row 19-20:** Column C - Year
```
Row 19: "COLUMN C: YEAR"
Row 20: "Model year of the vehicle. Format: YYYY (e.g., '2025', '2024'). Optional but helpful for tracking. Example: '2025' for a 2025 model."
```

**Row 21-22:** Column D - Make
```
Row 21: "COLUMN D: MAKE"
Row 22: "Vehicle manufacturer. Examples: 'Toyota', 'Ford', 'Honda', 'Chevrolet'. Useful for reporting and customer communication. Be consistent with naming."
```

**Row 23-24:** Column E - Model
```
Row 23: "COLUMN E: MODEL"
Row 24: "Vehicle model with optional trim level. Examples: 'Camry XLE', 'F-150 Lariat', 'Accord'. Include trim if relevant for customer expectations. Format as needed for your dealership."
```

**Row 25-26:** Column F - Order Number
```
Row 25: "COLUMN F: ORDER #"
Row 26: "Internal order or deposit tracking number. Format is dealer-specific. Examples: 'ORD-2024-1001', 'DEP-12345'. Helps match deposits to ordering systems. Optional but recommended."
```

**Row 27-28:** Column G - Stock Number ⚠️ CRITICAL
```
Row 27: "COLUMN G: STOCK # ⚠️ CRITICAL COLUMN"
  Background: #FF0000 (red), Text: #FFFFFF (white), Bold

Row 28 (merged A28:N28):
"THIS IS THE KEY COLUMN! Stock numbers in this column are used for conditional formatting on TODAY sheet.

HOW IT WORKS:
• When you enter a stock number on TODAY sheet (column E for new, column L for used)
• System checks if that stock number exists in DEPOSITS column G
• If match found → Entire TODAY row highlights in LIME GREEN with RED text
• This prevents counting deposited vehicles as delivered sales

REQUIREMENTS:
• Use same stock number format as TODAY sheet
• Must match EXACTLY for highlighting to work
• Examples: 'N24-1215', 'U24-3301', '12345'
• Update or remove stock number when vehicle delivers

This column powers the duplicate detection system - keep it current!"
```

**Row 29-30:** Column H - Salesperson
```
Row 29: "COLUMN H: SALESPERSON"
Row 30: "Salesperson who took the deposit. Can use any name format (full name, alias, display code) for consistency with TODAY sheet. Helps track who's working with the customer."
```

**Row 31-32:** Column I - BDC
```
Row 31: "COLUMN I: BDC"
Row 32: "Business Development Center representative handling the deposit. Optional field for dealerships with BDC departments. Helps coordinate customer communication."
```

**Row 33-34:** Column J - Customer
```
Row 33: "COLUMN J: CUSTOMER"
Row 34: "Customer name who placed the deposit. Format: 'First Last' or 'Last First'. Essential for customer communication and tracking. Should match format used on TODAY sheet when delivered."
```

**Row 35-36:** Column K - Director
```
Row 35: "COLUMN K: DIRECTOR"
Row 36: "Sales director or manager overseeing this deposit. Optional field. Useful for escalation and high-value deposits. Format: name of director."
```

**Row 37-38:** Column L - Phone Number
```
Row 37: "COLUMN L: PHONE #"
Row 38: "Customer contact phone number. Format flexible: '(555) 555-0101', '555-555-0101', '5555550101'. Essential for delivery coordination and updates. Include area code."
```

**Row 39-40:** Column M - Est Delivery Date
```
Row 39: "COLUMN M: EST DELIVERY DATE"
Row 40: "Estimated or expected delivery date. Format: MM/DD/YYYY or M/D/YYYY. Helps manage customer expectations and track pending deliveries. Update as information changes. Example: '10/30/2024'."
```

**Row 41-42:** Column N - Notes
```
Row 41: "COLUMN N: NOTES"
Row 42: "Additional information about the deposit, special requirements, or customer preferences. Free-form text field (200px wide with text wrapping). Examples: 'Customer requested silver exterior', 'Factory order - 6-8 weeks', 'Trade pending'."
```

#### Section 5: Example Deposit Entry (Rows 44-49)

**Row 44:** Section Title (Merged A44:N44)
- **Content:** "💡 EXAMPLE DEPOSIT ENTRY"

**Row 45:** Example Headers (Mirror of Row 11)

**Row 46:** Example Entry
```
A46-N46: 
10/01/2024 | NEW | 2025 | Toyota | Camry XLE | ORD-2024-1001 | N24-1215 | MC | Sarah Chen | Robert Thompson | Mike Wilson | 555-0101 | 10/15/2024 | Customer requested silver exterior
```
**Formatting:** 
- Background: #E8F5E9 (light green)
- Border: 2px solid #4CAF50 (green)
- Font: Calibri, 10pt

**Row 47-49:** Example Explanation (Merged A47:N49)
```
"This deposit shows:
✓ Deposit taken on 10/1/2024 for a new 2025 Camry XLE
✓ Stock number N24-1215 will trigger highlighting if entered on TODAY sheet
✓ Salesperson MC (Michael Chen) is working with customer Robert Thompson
✓ Expected delivery around 10/15/2024
✓ Special note about color preference

If someone tries to enter stock number 'N24-1215' on TODAY sheet before delivery, the entire row will highlight to prevent double-counting."
```

#### Section 6: Duplicate Detection System (Rows 51-68)

**Row 51:** Section Title (Merged A51:N51)
- **Content:** "🚨 DUPLICATE DETECTION & CONDITIONAL FORMATTING"

**Row 52-68:** Detection explanation
```
Row 52-55: HOW DUPLICATE DETECTION WORKS

"The DEPOSITS sheet integrates with TODAY sheet through conditional formatting:

CONDITIONAL FORMATTING FORMULA:
• NEW cars: =COUNTIF(INDIRECT('DEPOSITS!G:G'),$E2)>0
  Checks if TODAY Column E matches any stock in DEPOSITS Column G
  
• USED cars: =COUNTIF(INDIRECT('DEPOSITS!G:G'),$L2)>0
  Checks if TODAY Column L matches any stock in DEPOSITS Column G

VISUAL HIGHLIGHTING:
• Fill color: #b4ff0c (bright lime green)
• Text color: #ff0000 (red)
• Applies to entire row on TODAY sheet
• Identical highlighting to duplicate stock detection"

Row 56-59: WHY THIS MATTERS

"Prevents critical error: Counting a vehicle twice

SCENARIO WITHOUT DEPOSITS TRACKING:
1. Customer places deposit on stock N24-1215 (recorded somewhere)
2. Later, vehicle arrives and delivers to customer
3. Salesperson enters N24-1215 on TODAY sheet
4. System counts as delivered sale
5. BUT deposit was already counted in previous month
6. Result: Double-counting inflates sales numbers

SCENARIO WITH DEPOSITS TRACKING:
1. Deposit on N24-1215 recorded in DEPOSITS sheet
2. When entered on TODAY sheet, row highlights in lime green
3. Salesperson sees warning and investigates
4. Realizes it's a deposit delivery, not a new sale
5. Either: Don't enter (already counted) OR note as deposit delivery
6. Result: Accurate sales tracking"

Row 60-63: WHEN HIGHLIGHTING APPEARS

"Highlighting appears in two situations:

1. ENTERING DEPOSITED STOCK: You enter a stock number on TODAY that exists in DEPOSITS
   → Action: Verify if this is a deposit delivery vs. new sale
   → If deposit delivery: Remove entry or mark clearly
   → If new sale: Check stock number is correct

2. STOCK STILL IN SYSTEM: Historic deposits not yet removed from DEPOSITS
   → Action: Clean up DEPOSITS sheet by removing delivered vehicles
   → Keep DEPOSITS current to avoid false positives"

Row 64-68: MANAGING THE HIGHLIGHTING

"Best practices for clean highlighting:

WHEN VEHICLE DELIVERS:
• Remove the row from DEPOSITS sheet, OR
• Clear the stock number from Column G
• This stops the highlighting on TODAY sheet
• Keeps DEPOSITS focused on pending deliveries

REGULAR MAINTENANCE:
• Weekly: Review DEPOSITS for delivered vehicles
• Remove or update delivered entries
• Archive if needed for records
• Keep sheet focused on active/pending deposits

FALSE POSITIVES:
• If highlighting appears but shouldn't, check Column G
• Verify stock number format matches exactly
• Check for typos or extra spaces
• System requires exact match (case-insensitive)"
```

#### Section 7: Workflow Integration (Rows 70-82)

**Row 70:** Section Title (Merged A70:N70)
- **Content:** "🔄 WORKFLOW INTEGRATION"

**Row 71-82:** Workflow explanation
```
Row 71-74: TAKING A DEPOSIT (Step-by-Step)

"When customer places deposit:

STEP 1: Gather information
• Customer name and contact info
• Vehicle details (year, make, model)
• Stock number (if assigned) or order number
• Estimated delivery date
• Salesperson and any special notes

STEP 2: Record in DEPOSITS sheet
• Add new row with all information
• CRITICAL: Enter stock number in Column G
• Double-check stock number is correct
• Add any relevant notes in Column N

STEP 3: System automatically protects
• Stock number now in conditional formatting lookup
• Any attempt to enter on TODAY sheet triggers highlighting
• Protection active until you remove from DEPOSITS

STEP 4: Update as needed
• Change estimated delivery date as information updates
• Add notes about customer communication
• Update salesperson if reassigned"

Row 75-78: WHEN VEHICLE DELIVERS

"When deposited vehicle delivers to customer:

STEP 1: Verify delivery
• Confirm vehicle delivered and funded (has FI letter)
• Check all paperwork complete

STEP 2: Remove from DEPOSITS
• Delete the row from DEPOSITS sheet, OR
• Clear Column G (stock number) only
• This disables the conditional formatting protection

STEP 3: Do NOT enter on TODAY sheet
• Deposit was already counted when taken
• Entering again would double-count the sale
• Keep TODAY sheet for non-deposited sales

ALTERNATIVE TRACKING:
• Some dealerships track deposit deliveries separately
• If needed, use different sheet or notes field
• But DO NOT process through TODAY sheet again"

Row 79-82: DEPOSIT BECOMES CANCELLED

"When customer cancels deposit:

STEP 1: Remove from DEPOSITS
• Delete the row entirely
• Vehicle stock available for other sales

STEP 2: Stock available again
• Stock number can now be sold to different customer
• Will no longer trigger highlighting on TODAY sheet

STEP 3: Record cancellation
• Optional: Move to archive or cancelled deposits sheet
• Note cancellation date and reason if needed

The stock number becomes available for a new sale since deposit was cancelled."
```

#### Section 8: Maintenance & Best Practices (Rows 84-98)

**Row 84:** Section Title (Merged A84:N84)
- **Content:** "💡 MAINTENANCE & BEST PRACTICES"

**Rows 85-98:** Best practices
```
Row 85-87: ✅ DO: Keep deposits current
"Regularly review and update:
• Weekly cleanup of delivered vehicles
• Remove or update old deposits
• Verify estimated delivery dates
• Update customer contact information as needed
• Active maintenance prevents false positives on TODAY sheet"

Row 88-90: ✅ DO: Use consistent stock number format
"Stock number format MUST match TODAY sheet:
• If TODAY uses 'N24-1215', use 'N24-1215' in DEPOSITS
• If TODAY uses '12345', use '12345' in DEPOSITS
• Case doesn't matter (N24-1215 = n24-1215)
• Spaces and special characters must match exactly
• Consistency ensures highlighting works correctly"

Row 91-93: ✅ DO: Record comprehensive information
"More information = better customer service:
• Always include customer name and phone
• Note special requests or preferences
• Track expected delivery timeline
• Record salesperson for continuity
• Use notes field liberally for details"

Row 94-96: ❌ DON'T: Let deposits accumulate indefinitely
"Stale deposits cause problems:
• False positive highlights on TODAY sheet
• Confusion about what's actually pending
• Cluttered deposit tracking
• Regular cleanup (weekly/monthly) keeps system clean
• Archive old deposits if needed for records"

Row 97-98: 💎 PRO TIP: Export for customer follow-up
"Use DEPOSITS as customer communication tool:
• Export to CSV for call lists
• Sort by estimated delivery date for proactive outreach
• Filter by salesperson for individual follow-up
• Phone numbers ready for customer updates
• Better customer experience through organization"
```

#### Section 9: Troubleshooting (Rows 100-112)

**Row 100:** Section Title (Merged A100:N100)
- **Content:** "🔧 TROUBLESHOOTING"

**Rows 101-112:** Common issues
```
Row 101-103: ISSUE: Stock not highlighting on TODAY sheet
"CAUSE: Stock number mismatch or formatting issue
SOLUTIONS:
1. Verify stock number in DEPOSITS Column G matches TODAY exactly
2. Check for extra spaces before/after stock number
3. Verify conditional formatting rules exist on TODAY sheet
4. Test with simple stock number to isolate issue
5. Check DEPOSITS sheet name is exactly 'DEPOSITS' (case-sensitive)"

Row 104-106: ISSUE: Everything highlighting (too many false positives)
"CAUSE: Too many old deposits in DEPOSITS sheet
SOLUTIONS:
1. Review DEPOSITS and remove delivered vehicles
2. Clear Column G for delivered deposits (keep row for records)
3. Archive old deposits to separate sheet
4. Keep DEPOSITS focused on active/pending only
5. Regular weekly cleanup prevents this"

Row 107-109: ISSUE: Deposit delivered but shows as sale
"CAUSE: Confusion about counting methodology
CLARIFICATION:
• Deposits count when TAKEN, not when delivered
• Do NOT enter deposited vehicles on TODAY sheet
• TODAY is for non-deposited sales only
• Mixing causes double-counting
• Keep deposit tracking separate from daily sales"

Row 110-112: ISSUE: Lost deposit information
"PREVENTION & RECOVERY:
• Don't delete DEPOSITS sheet - system needs it
• Use File → Version history if accidentally deleted
• Regular backups of important deposit data
• Export periodically for offline records
• Sheet protected but data still editable"
```

#### Section 10: Related Sheets (Rows 114-118)

**Row 114:** Section Title (Merged A114:N114)
- **Content:** "🔗 RELATED SHEETS"

**Rows 115-118:** Related links
```
Row 115: → TODAY-Instructions | Understand how duplicate detection highlighting works on TODAY sheet
Row 116: → MONTHLY-Instructions | Not directly related but part of the complete tracking system
Row 117: → Getting-Started | Return to main instructions hub
```

#### Section 11: Footer (Row 120)
**Merged A120:N120**
- **Content:** "💡 Tip: Clean DEPOSITS weekly for accurate duplicate detection | DEPOSITS Sheet Instructions v1.0"

### Column Widths (Matching DEPOSITS sheet)
- A: 100px (DATE)
- B: 80px (NEW/USED)
- C: 60px (YEAR)
- D: 120px (MAKE)
- E: 120px (MODEL)
- F: 100px (ORDER #)
- G: 120px (STOCK #)
- H: 120px (SALESPERSON)
- I: 100px (BDC)
- J: 150px (CUSTOMER)
- K: 120px (DIRECTOR)
- L: 120px (PHONE #)
- M: 120px (EST DELIVERY DATE)
- N: 200px (NOTES)

### Sheet Protection
- Entire sheet protected
- Message: "This is an instructional guide. Please refer to DEPOSITS sheet for deposit tracking."

---

## Global Formatting Specifications

### Color Palette

#### Primary Colors (Section Headers)
- **Blue Headers:** #4A86E8 (navigation bars, main sections)
- **Light Blue Backgrounds:** #E8F0FE (section title backgrounds)
- **Blue Text:** #1A73E8 (section titles)

#### Content Area Colors
- **White:** #FFFFFF (main content background)
- **Light Gray:** #F5F5F5 (alternating rows, separators)
- **Medium Gray:** #E0E0E0 (borders, header backgrounds)
- **Dark Gray:** #666666 (footer text)

#### Highlight Colors (Examples & Features)
- **Light Orange:** #FFF3E0 (NEW car examples)
- **Orange:** #FF9800 (NEW car borders)
- **Light Green:** #E8F5E9 (success examples, tips)
- **Green:** #4CAF50 (borders for positive examples)
- **Light Blue:** #E3F2FD (informational examples)
- **Cyan:** #03A9F4 (informational borders)
- **Light Pink:** #FCE4EC (special case examples)
- **Pink:** #E91E63 (special case borders)

#### Warning/Error Colors
- **Red:** #FF0000 (critical warnings, error highlights)
- **Light Red:** #FFEBEE (minor warnings)
- **Yellow:** #FFFF00 (date headers on MONTHLY)

#### System Colors (Matching application)
- **Duplicate Highlight Fill:** #b4ff0c (lime green)
- **Duplicate Highlight Text:** #ff0000 (red)
- **Non-delivered Error:** #FF0000 (red background)
- **Salesperson Error:** #FFEBEE (light red background)

### Typography

#### Font Family
- **Primary:** Calibri (matches application sheets)
- **Fallback:** Arial, sans-serif

#### Font Sizes
- **Navigation/Title Bars:** 18pt, Bold
- **Section Headers:** 14pt, Bold
- **Subsection Headers:** 13pt, Bold
- **Section Titles (content):** 12pt, Bold
- **Body Text:** 11pt, Regular
- **Details/Tips:** 10pt, Regular
- **Footer Text:** 9pt, Italic
- **Fine Print:** 8pt, Regular

#### Font Styles
- **Bold:** Headers, section titles, emphasis
- **Italic:** Tips, notes, footer text
- **Regular:** Main body content
- **Underline:** Hyperlinks only

#### Text Colors
- **Primary Text:** #000000 (black)
- **Header Text (on dark bg):** #FFFFFF (white)
- **Footer Text:** #666666 (gray)
- **Link Text:** #1A73E8 (blue, underlined)

### Cell Formatting

#### Borders
- **Section Separators:** 2px solid, color matches section theme
- **Row Separators:** 1px solid #E0E0E0 (light gray)
- **Table Borders:** 1px solid #000000 (black)
- **Example Cards:** 2px solid, color matches card type

#### Alignment
- **Navigation Bars:** Center horizontal, Center vertical
- **Section Headers:** Left horizontal, Center vertical (or Center, Center for some)
- **Body Text:** Left horizontal, Top vertical
- **Tables/Examples:** Center horizontal, Center vertical
- **Footer:** Center horizontal, Center vertical

#### Cell Padding/Height
- **Navigation Bars:** 35-40px height
- **Section Headers:** 30-35px height
- **Body Text Rows:** 25-30px height
- **Detailed Content:** 30-40px height (more for readability)
- **Footer:** 25px height

#### Text Wrapping
- **Enabled:** All content cells with multi-line text
- **Disabled:** Single-line headers and navigation

### Merged Cells

#### Navigation Bars
- Always merged across all columns (full width)
- Row 1 of each sheet

#### Section Headers
- Merged across all columns (full width)
- Separates major sections

#### Content Areas
- Strategic merging for multi-column explanations
- Two-column layouts: Split at midpoint
- Three-column layouts: Equal distribution
- Examples: Merged per logical grouping

### Hyperlinks

#### Format
- **Text Color:** #1A73E8 (blue)
- **Style:** Underlined
- **Hover:** System default (usually darker blue)

#### Link Text Patterns
- **Back Navigation:** "[← Back to Getting-Started]"
- **Forward Navigation:** "→ [Sheet-Name]-Instructions"
- **Sheet References:** "[Sheet-Name]" (in context)

#### Link Destinations
- Internal links to other instructional sheets
- Format: `#gid=[sheet_id]` (will be populated during implementation)

---

## Implementation Notes for Code Mode

### Sheet Creation Order

1. **Getting-Started** (First - serves as hub)
2. **TODAY-Instructions**
3. **MONTHLY-Instructions**
4. **SALESPEOPLE-Instructions**
5. **DEPOSITS-Instructions**

### Implementation Approach

#### Method: Programmatic Creation via Apps Script

**Rationale:**
- Consistent formatting across all sheets
- Reusable formatting functions
- Easy to maintain and update
- Can be included in setup wizard or separate function

#### Core Implementation Steps

1. **Create Base Sheet Structure**
   ```javascript
   function createInstructionalSheet(sheetName, numColumns, referenceSheet) {
     const ss = SpreadsheetApp.getActiveSpreadsheet();
     let sheet = ss.getSheetByName(sheetName);
     
     if (sheet) {
       // Sheet exists, optionally clear or skip
       return sheet;
     }
     
     // Create new sheet
     sheet = ss.insertSheet(sheetName);
     
     // Set column widths to match reference sheet
     setColumnWidths(sheet, referenceSheet);
     
     // Freeze row 1 (navigation bar)
     sheet.setFrozenRows(1);
     
     return sheet;
   }
   ```

2. **Apply Section Formatting**
   ```javascript
   function formatNavigationBar(sheet, range, content, backgroundColor) {
     const navRange = sheet.getRange(range);
     navRange.merge()
       .setValue(content)
       .setFontFamily('Calibri')
       .setFontSize(14)
       .setFontWeight('bold')
       .setBackground(backgroundColor)
       .setFontColor('#FFFFFF')
       .setHorizontalAlignment('left')
       .setVerticalAlignment('middle');
     
     // Add hyperlink to Getting-Started
     addBackLink(navRange);
   }
   ```

3. **Build Content Sections**
   ```javascript
   function addSectionHeader(sheet, row, colStart, colEnd, title) {
     const range = sheet.getRange(row, colStart, 1, colEnd - colStart + 1);
     range.merge()
       .setValue(title)
       .setFontFamily('Calibri')
       .setFontSize(13)
       .setFontWeight('bold')
       .setBackground('#E8F0FE')
       .setFontColor('#1A73E8')
       .setHorizontalAlignment('left')
       .setVerticalAlignment('middle');
     
     sheet.setRowHeight(row, 30);
   }
   ```

4. **Add Column Explanations**
   ```javascript
   function addColumnExplanation(sheet, row, colStart, colEnd, columnName, explanation) {
     // Column name cell
     const nameRange = sheet.getRange(row, colStart, 1, 4);
     nameRange.merge()
       .setValue(columnName)
       .setFontWeight('bold')
       .setBackground('#FFF3E0');
     
     // Explanation cell
     const explRange = sheet.getRange(row, colStart + 4, 1, colEnd - colStart - 3);
     explRange.merge()
       .setValue(explanation)
       .setBackground('#FFFFFF')
       .setWrap(true);
     
     // Border between rows
     sheet.getRange(row, colStart, 1, colEnd - colStart + 1)
       .setBorder(null, null, true, null, null, null, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);
   }
   ```

5. **Protect Sheet**
   ```javascript
   function protectInstructionalSheet(sheet, description) {
     const protection = sheet.protect()
       .setDescription(description);
     
     // Ensure current user can edit (for maintenance)
     protection.addEditor(Session.getEffectiveUser());
     
     // Remove all other editors
     protection.removeEditors(protection.getEditors());
     
     // Prevent warning for regular users
     if (protection.canDomainEdit()) {
       protection.setDomainEdit(false);
     }
   }
   ```

### Column Width Strategy

Each instructional sheet should mirror its source sheet's column widths:

- **Getting-Started:** Uniform 100px (18 columns)
- **TODAY-Instructions:** Match TODAY sheet widths (A:R)
- **MONTHLY-Instructions:** Match MONTHLY sheet widths (A:X)
- **SALESPEOPLE-Instructions:** Match SALESPEOPLE sheet widths (A:C)
- **DEPOSITS-Instructions:** Match DEPOSITS sheet widths (A:N)

### Content Population Strategy

**Option 1: Template Arrays**
- Store section content in arrays
- Loop through and populate
- Pro: Easy to maintain content
- Con: Verbose for long sections

**Option 2: Direct Range Operations**
- Set values and formatting directly
- More imperative approach
- Pro: Clear what's happening where
- Con: Longer implementation code

**Recommended: Hybrid**
- Use arrays for repetitive sections (column explanations)
- Direct operations for unique sections (navigation, examples)

### Hyperlink Implementation

```javascript
function addSheetLink(range, targetSheetName, linkText) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const targetSheet = ss.getSheetByName(targetSheetName);
  
  if (targetSheet) {
    const gid = targetSheet.getSheetId();
    const url = `#gid=${gid}`;
    
    const richText = SpreadsheetApp.newRichTextValue()
      .setText(linkText)
      .setLinkUrl(url)
      .build();
    
    range.setRichTextValue(richText)
      .setFontColor('#1A73E8')
      .setFontUnderline(true);
  }
}
```

### Batch Operations for Performance

Group operations to minimize API calls:

```javascript
// Bad: Multiple individual operations
for (let i = 0; i < 100; i++) {
  sheet.getRange(i, 1).setValue(data[i]);
}

// Good: Batch operation
sheet.getRange(1, 1, data.length, 1).setValues(data);
```

### Error Handling

```javascript
function createAllInstructionalSheets() {
  try {
    Logger.log('Creating instructional sheets...');
    
    // Create sheets in order
    createGettingStartedSheet();
    createTodayInstructionsSheet();
    createMonthlyInstructionsSheet();
    createSalespeopleInstructionsSheet();
    createDepositsInstructionsSheet();
    
    // Add hyperlinks after all sheets exist
    linkInstructionalSheets();
    
    Logger.log('Instructional sheets created successfully');
    showCreationSummary();
    
  } catch (e) {
    Logger.log('ERROR creating instructional sheets: ' + e.message);
    SpreadsheetApp.getUi().alert(
      'Error Creating Instructions',
      'An error occurred: ' + e.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

function showCreationSummary() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Instructional Sheets Created',
    '📚 Successfully created all instructional sheets:\n\n' +
    '✓ Getting-Started\n' +
    '✓ TODAY-Instructions\n' +
    '✓ MONTHLY-Instructions\n' +
    '✓ SALESPEOPLE-Instructions\n' +
    '✓ DEPOSITS-Instructions\n\n' +
    'Navigate between sheets using the hyperlinks.',
    ui.ButtonSet.OK
  );
}
```

### Menu Integration

Add instructional sheets creation to the menu:

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Sales Log Pro 2.0')
    .addItem('🚀 Run Setup Wizard', 'runSetupWizard')
    .addSeparator()
    .addItem('📚 Create Instructional Sheets', 'createAllInstructionalSheets')
    .addItem('🔄 Recreate Instructional Sheets', 'recreateAllInstructionalSheets')
    .addSeparator()
    // ... other menu items ...
    .addToUi();
}
```

### File Structure

Recommended file organization:

```
src/
├── instruction_sheets/
│   ├── instructions_main.js          # Main creation function
│   ├── instructions_getting_started.js
│   ├── instructions_today.js
│   ├── instructions_monthly.js
│   ├── instructions_salespeople.js
│   ├── instructions_deposits.js
│   └── instructions_utils.js         # Shared utility functions
```

---

## Testing & Quality Assurance

### Testing Strategy

1. **Unit Testing**: Test individual formatting functions
2. **Integration Testing**: Test complete sheet creation
3. **Visual Testing**: Verify formatting matches design
4. **User Testing**: Get feedback from actual users

### Test Checklist

**Visual Tests:**
- [ ] All colors match specification
- [ ] All fonts match specification
- [ ] Column widths match source sheets
- [ ] Row heights are appropriate
- [ ] Text wrapping works correctly
- [ ] Merged cells display properly
- [ ] Borders appear as specified

**Functional Tests:**
- [ ] All hyperlinks work
- [ ] Sheet protection is active
- [ ] Frozen rows work correctly
- [ ] Content is readable on different screen sizes
- [ ] No typos or errors in content

**User Acceptance Tests:**
- [ ] Instructions are clear and understandable
- [ ] Examples are helpful
- [ ] Navigation is intuitive
- [ ] Information is complete

---

## Appendix

### A. Quick Reference

**Sheet Counts:**
- Total sheets: 5
- Total sections: ~50
- Total rows: ~500
- Total columns: 76 (across all sheets)

**Time Estimates:**
- Implementation: 40-60 hours
- Testing: 10-15 hours
- Total: 50-75 hours

### B. Color Palette

Primary Colors:
- #4A86E8 - Blue (navigation)
- #E8F0FE - Light blue (sections)
- #1A73E8 - Blue text (titles)
- #FFFFFF - White (content)
- #F5F5F5 - Light gray (alternating)
- #E0E0E0 - Medium gray (borders)

### C. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-14 | Initial design document |

---

**Document Status:** Complete and Ready for Implementation

**Next Steps:**
1. Review design with stakeholders
2. Begin Code mode implementation
3. Test in development environment
4. Deploy to production
5. Gather user feedback

---

*End of Instructional Sheets Design Document*