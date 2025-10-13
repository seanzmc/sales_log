# Sales Log Pro - Example Data Files

This directory contains sample data files to help you understand and test the Sales Log Pro functionality. These files demonstrate the proper format for each data type and can be used for learning, testing, or as templates for your own data.

## ⚠️ Important Notice

> [!WARNING]
> DO NOT USE THESE FILES IN PRODUCTION

These example files contain fictional data for demonstration purposes only. They are designed to help you:

- Understand the expected data formats
- Test the application functionality
- Learn how different features work together
- Create your own data import files

Before using Sales Log Pro with real data, replace all example data with your actual team members, sales, and deposits.

---

## 📁 Example Files Overview

### 1. sample_salespeople.csv

**Purpose**: Demonstrates the format for importing salesperson data into the SALESPEOPLE sheet.

**Contains**: 10 fictional automotive sales team members with various alias patterns.

**Format**:

```csv
FULL NAME,ALIASES,DISPLAY CODE
Michael Chen,MC,Mike,Michael,Chen,MC
Sarah Johnson,SJ,Sarah,Johnson,Sally,SJ
```

**Column Descriptions**:

- **FULL NAME**: Complete official name for tracking and reports
- **ALIASES**: Comma-separated list of alternative names/nicknames/codes that map to this person
- **DISPLAY CODE**: 2-4 character code used in leaderboards and analytics (typically initials)

**Use Cases**:

- Understanding how aliases work (e.g., "MC", "Mike", "Michael", "Chen" all resolve to "Michael Chen")
- Seeing different display code styles (initials, abbreviations)
- Testing the import functionality via Settings → Import Salespeople
- Creating your own salesperson data template

**Related Sheet**: SALESPEOPLE

---

### 2. sample_sales_data.csv

**Purpose**: Demonstrates the format for daily sales tracking in the TODAY sheet.

**Contains**: 20 realistic automotive sales entries (10 new cars, 10 used cars).

**Format - New Car Sales**:

```csv
#,CUSTOMER,FI,MODEL,STOCK #,TRADE STK#,SALES PERSON
1,Thompson Robert,A,Camry,N24-1205,U23-8842,MC
```

**Format - Used Car Sales** (no # column):

```csv
CUSTOMER,FI,MODEL,STOCK #,TRADE STK#,SALES PERSON
Johnson Mark,A,F-150,U24-3301,,RW
```

**Column Descriptions**:

- **#**: Sequential number (new cars only)
- **CUSTOMER**: Customer name
- **FI**: Finance & Insurance status (A-Z = delivered/funded, blank = pending)
- **MODEL**: Vehicle model
- **STOCK #**: Stock/VIN number (critical for tracking)
- **TRADE STK#**: Trade-in stock number (if applicable)
- **SALES PERSON**: Salesperson (can use full name, display code, or alias)

**Special Features Demonstrated**:

- **Split Sales**: "John/Jane" format divides credit equally (0.5 each)
- **Mixed Entry Styles**: Full names, display codes, and aliases
- **FI Status Tracking**: Shows both delivered (A-Z) and pending (blank) sales
- **Trade-In Tracking**: Some sales include trade stock numbers

**Related Sheet**: TODAY

---

### 3. sample_deposits.csv

**Purpose**: Demonstrates the format for tracking customer deposits and preventing duplicate stock entries.

**Contains**: 12 realistic deposit tracking entries with delivery dates and notes.

**Format**:

```csv
DATE,NEW/USED,YEAR,MAKE,MODEL,ORDER #,STOCK #,SALESPERSON,BDC,CUSTOMER,DIRECTOR,PHONE #,EST DELIVERY DATE,NOTES
10/01/2024,NEW,2025,Toyota,Camry XLE,ORD-2024-1001,N24-1215,MC,Sarah Chen,Robert Thompson,Mike Wilson,555-0101,10/15/2024,Customer requested silver exterior
```

**Column Descriptions**:

- **DATE**: Deposit date
- **NEW/USED**: Vehicle type
- **YEAR**: Model year
- **MAKE**: Vehicle manufacturer
- **MODEL**: Vehicle model with trim
- **ORDER #**: Order/deposit tracking number
- **STOCK #**: Stock number (used for duplicate detection in TODAY sheet)
- **SALESPERSON**: Salesperson who took the deposit
- **BDC**: Business Development Center contact
- **CUSTOMER**: Customer name
- **DIRECTOR**: Sales director/manager
- **PHONE #**: Customer contact number
- **EST DELIVERY DATE**: Expected delivery date
- **NOTES**: Additional tracking information

**Critical Feature**:
Stock numbers in the DEPOSITS sheet are automatically highlighted if entered in the TODAY sheet, preventing duplicate processing of vehicles.

**Related Sheet**: DEPOSITS

---

## 🎯 How to Use These Files

### For Learning & Testing

1. **Review the Formats**: Open each CSV file to see the exact format expected
2. **Understand the Data**: Read the comments in each file explaining the fields
3. **Test Imports**: Use the Settings sidebar to import sample_salespeople.csv
4. **Practice Entry**: Manually copy sample data into sheets to practice
5. **View Analytics**: Use sample_sales_data.csv to see how analytics calculate

### For Creating Your Own Data

1. **Use as Templates**: Copy the CSV structure for your own data
2. **Replace Fictional Data**: Substitute real team members, sales, etc.
3. **Maintain Format**: Keep the same column order and headers
4. **Test First**: Import small batches to verify format before bulk imports

### Step-by-Step Quick Start

```plaintext
1. Run Setup Wizard (Sales Log → Setup Wizard)
2. Import salespeople from sample_salespeople.csv
3. Manually copy a few rows from sample_sales_data.csv to TODAY sheet
4. Run Update Analytics (Sales Log → Update Analytics)
5. View the generated analytics in MONTHLY sheet
6. Add deposits from sample_deposits.csv to DEPOSITS sheet
7. Try entering a stock number from DEPOSITS into TODAY - see the highlight!
```

---

## 📊 How Files Relate to Sheets

| Example File           | Target Sheet | Purpose                                   |
| ---------------------- | ------------ | ----------------------------------------- |
| sample_salespeople.csv | SALESPEOPLE  | Defines team roster and alias mappings    |
| sample_sales_data.csv  | TODAY        | Daily sales entry and tracking            |
| sample_deposits.csv    | DEPOSITS     | Deposit tracking and duplicate prevention |

### Data Flow Example

```liquid
1. Import salespeople → SALESPEOPLE sheet
2. Enter daily sales → TODAY sheet (using any salesperson alias)
3. System resolves aliases → Analytics use full names
4. Run analytics → MONTHLY sheet shows performance
5. Track deposits → DEPOSITS sheet prevents duplicates
```

---

## 🔍 Key Concepts Demonstrated

### Alias Resolution

The sample_salespeople.csv shows how one person can have multiple aliases:

- Full name: "Michael Chen"
- Aliases: "MC", "Mike", "Michael", "Chen"
- Display code: "MC"

All of these resolve to the same person in analytics.

### Split Sales

In sample_sales_data.csv, entries like "MC/SJ" or "Jim/Lisa" show split sales where two salespeople share credit (0.5 each).

### FI Status Tracking

The FI column uses:

- **A-Z**: Delivered and funded (counts in analytics)
- **Blank**: Pending delivery (tracked but not counted)

### Duplicate Detection

Stock numbers in sample_deposits.csv will trigger conditional formatting if entered in the TODAY sheet, preventing double-counting.

---

## 💡 Best Practices

1. **Start Small**: Import 2-3 salespeople first, test, then add more
2. **Verify Aliases**: Ensure no conflicts between team members' aliases
3. **Consistent Codes**: Use 2-4 character display codes consistently
4. **Test Analytics**: After importing sales data, run analytics to verify calculations
5. **Check Duplicates**: Enter a deposit stock number in TODAY to verify highlighting works

---

## 🚀 Next Steps

After reviewing these examples:

1. Read [`SAMPLE_WORKFLOW.md`](SAMPLE_WORKFLOW.md) for a step-by-step walkthrough
2. Review [`../docs/guides/USER_GUIDE.md`](../docs/guides/USER_GUIDE.md) for detailed features
3. Check [`../QUICKSTART.md`](../QUICKSTART.md) for initial setup
4. Visit [`../docs/troubleshooting/FAQ.md`](../docs/troubleshooting/FAQ.md) for common questions

---

## 📝 Notes

- All data in these files is **fictional** and for demonstration only
- Phone numbers use the 555-0100 range (reserved for examples)
- Stock numbers follow realistic patterns (N24-XXXX for new, U24-XXXX for used)
- Dates are formatted as MM/DD/YYYY
- All CSV files use UTF-8 encoding

---

## 🆘 Need Help?

- **General Questions**: See [`../docs/troubleshooting/FAQ.md`](../docs/troubleshooting/FAQ.md)
- **Technical Issues**: Check [`../docs/troubleshooting/TROUBLESHOOTING.md`](../docs/troubleshooting/TROUBLESHOOTING.md)
- **Feature Requests**: Review [`../CONTRIBUTING.md`](../CONTRIBUTING.md)
- **Support**: See [`../SUPPORT.md`](../SUPPORT.md)
