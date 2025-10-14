# Sales Log Pro Setup Sheet Headers

This document specifies the exact column headers and formatting created by the Setup Wizard.

**Implementation Source:** [`setup_wizard.js`](../src/setup_wizard.js)

**Version:** 8.0.0

---

## Sheet Name: DEPOSITS

**Created by:** [`checkAndCreateDepositsSheet()`](../src/setup_wizard.js:714-776)

**Headers (Row 1, Bold):**
```
[A:N] DATE, NEW/USED, YEAR, MAKE, MODEL, ORDER #, STOCK #, SALESPERSON, BDC, CUSTOMER, DIRECTOR, PHONE #, EST DELIVERY DATE, NOTES
```

**Column Layout:**
- A: DATE (100px)
- B: NEW/USED (80px)
- C: YEAR (60px)
- D: MAKE (120px)
- E: MODEL (120px)
- F: ORDER # (100px)
- G: STOCK # (120px) - **Used in TODAY sheet conditional formatting**
- H: SALESPERSON (120px)
- I: BDC (100px)
- J: CUSTOMER (150px)
- K: DIRECTOR (120px)
- L: PHONE # (120px)
- M: EST DELIVERY DATE (120px)
- N: NOTES (200px)

**Formatting:**
- Font: Calibri, 10pt
- Header row: Bold, center-aligned, gray background (#E0E0E0)
- All cells: Vertical center alignment, text wrapping enabled

---

## Sheet Name: TODAY

**Created by:** [`checkAndCreateTodaySheet()`](../src/setup_wizard.js:210-413)

**Headers (Row 1, Bold):**
```
[New car sales A:G] #, CUSTOMER, FI, NEW MODEL, STOCK #, TRADE STK#, SALESPERSON
[H] (blank separator)
[Used car sales I:N] CUSTOMER, FI, USED MODEL, STOCK #, TRADE STK#, SALESPERSON
[O] (blank separator)
[Leaderboard P:R] LEADERBOARD, MTD SALES, 3mo. AVG
```

**Data Entry Area:**
- Rows 2-51: Pre-numbered with incremental count in column A (values 1-50)
- 50 rows available for daily sales entry

**Text Wrapping:**
- Enabled for columns F, M, Q, R (trade stock numbers and leaderboard averages)

**Column Widths:**
- A: 30px (#)
- B: 165px (CUSTOMER)
- C: 35px (FI)
- D: 150px (NEW MODEL)
- E: 125px (STOCK #)
- F: 60px (TRADE STK#)
- G: 195px (SALESPERSON) - Updated from 150px
- H: 5px (separator)
- I: 165px (CUSTOMER)
- J: 35px (FI)
- K: 150px (USED MODEL)
- L: 125px (STOCK #)
- M: 60px (TRADE STK#)
- N: 195px (SALESPERSON) - Updated from 150px
- O: 5px (separator)
- P: 170px (LEADERBOARD)
- Q: 70px (MTD SALES) - Updated from 50px
- R: 80px (3mo. AVG)

**Font Formatting:**
- Font Family: Calibri (or user-selected during setup)
- Font Sizes:
  - A:N = 18pt (data entry area)
  - F, M = 10pt (trade stock columns - smaller for compact display)
  - P:R = 14pt (leaderboard)

**Header Colors:**
- New Car (A:G): User-selected or default #234070 (blue)
- Used Car (I:N): Fixed #424242 (dark gray)
- Leaderboard (P:R): Fixed #434343 (dark gray)
- Text colors: Auto-calculated for WCAG compliance

**Conditional Formatting:**
- 4 rules applied (see Setup_Wizard.md for details)
- Highlights duplicate stock numbers
- Highlights stock numbers that exist in DEPOSITS sheet

---

## Sheet Name: MONTHLY

**Created by:** [`checkAndCreateMonthlySheet()`](../src/setup_wizard.js:511-635)

**Headers (Row 1, Bold):**
```
[Sales data A:G] #, CUSTOMER, FI, NEW MODEL, STOCK #, TRADE STK#, SALESPERSON
[H] (blank separator)
[Sales data I:N] CUSTOMER, FI, USED MODEL, STOCK #, TRADE STK#, SALESPERSON
[O] (blank separator)
[Leaderboard P:R] LEADERBOARD, SALES, 3mo. AVG
[Analytics S:X] MONTHLY ANALYTICS (merged S1:X1)
```

**Text Wrapping:**
- Enabled for columns F, M, R (trade stock and averages)

**Column Widths:**
- A: 45px (#)
- B: 115px (CUSTOMER)
- C: 45px (FI)
- D: 100px (NEW MODEL)
- E: 70px (STOCK #)
- F: 90px (TRADE STK#)
- G: 125px (SALESPERSON)
- H: 5px (separator)
- I: 115px (CUSTOMER)
- J: 45px (FI)
- K: 100px (USED MODEL)
- L: 70px (STOCK #)
- M: 90px (TRADE STK#)
- N: 125px (SALESPERSON)
- O: 5px (separator)
- P: 160px (LEADERBOARD)
- Q: 50px (SALES)
- R: 60px (3mo. AVG)
- S: 180px (analytics)
- T: 140px (analytics)
- U: 120px (analytics)
- V: 100px (analytics)
- W: 100px (analytics)
- X: 100px (analytics)

**Font Formatting:**
- Font Family: Calibri (or user-selected during setup)
- Font Size: 10pt for entire sheet
- All text: Bold

**Header Colors:**
- New Car (A:G): User-selected or default #234070 (blue)
- Used Car (I:N): Fixed #424242 (dark gray)
- Leaderboard (P:R): Fixed #434343 (dark gray)
- Analytics (S:X): Fixed #E0E0E0 (light gray)
- Text colors: Auto-calculated for WCAG compliance

**Analytics Section (S:X):**
- Row 1: "MONTHLY ANALYTICS" (merged across S1:X1)
- Rows 2-8: Summary metrics and headers
- Row 9+: Individual salesperson data
- Populated by [`writeAnalyticsToMonthly()`](../src/sales_analytics.js:124-164)

---

## Sheet Name: SALESPEOPLE

**Created by:** [`checkAndCreateSalespeopleSheet()`](../src/setup_wizard.js:647-700)

**Headers (Row 1, Bold):**
```
[A:C] FULL NAME, ALIASES, DISPLAY CODE
```

**Example Data (Rows 2-4):**
```
Row 2: John Smith, "JS, Johnny", JS
Row 3: Jane Doe, "JD, Jane", JD
Row 4: Bob Wilson, "BW, Bob, Wilson", BW
```

**Validation Rules (enforced by sidebar):**
- **FULL NAME (Column A):** Required, 2-100 characters
- **ALIASES (Column B):** Optional, comma-separated, max 200 characters total
- **DISPLAY CODE (Column C):** Required, 2-4 alphanumeric characters, auto-converted to uppercase

**Text Wrapping:**
- Enabled for all cells in sheet (columns A:C, all rows)

**Column Widths:**
- A: 150px (FULL NAME)
- B: 150px (ALIASES)
- C: 150px (DISPLAY CODE)

**Font Formatting:**
- Font Family: Calibri
- Font Size: 10pt
- Header row: Bold, center-aligned, gray background (#E0E0E0)

**Usage:**
- Read by [`getSalespersonMaps()`](../src/core_saleslogPro.js:281-331) with 5-minute cache
- Synced bidirectionally with Properties Service via [`syncToSalespeopleSheet()`](../src/config_service.js:1095-1144)
- Modified through Settings sidebar or direct sheet editing
