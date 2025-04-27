/**
 * Script Architecture: Daily Sales Automation
 * See .specs/script-architecture.md
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sales Log')
    .addItem('Run Automation', 'transferDailySales')
    .addToUi();
}

function transferDailySales() {
  try {
    var ss = SpreadsheetApp.getActive();
    var todaySheet = ss.getSheetByName('today');
    var monthlySheet = ss.getSheetByName('monthly');
    if (!todaySheet || !monthlySheet) {
      throw new Error('Required sheets not found.');
    }
    var dataRange = todaySheet.getDataRange();
    var data = dataRange.getValues();
    if (data.length <= 1) {
      Logger.log('No data to transfer.');
      return;
    }
    // Copy data columns A:N, excluding header row
    var rowsToCopy = data.slice(1).map(function(row) {
      return row.slice(0, 14);
    });
    copySalesData(rowsToCopy, monthlySheet);
    tallySalesTotals(monthlySheet, todaySheet);
    clearTodaySheet(todaySheet);
    Logger.log('transferDailySales completed successfully.');
  } catch (e) {
    Logger.log('Error in transferDailySales: ' + e);
    throw e;
  }
}

function copySalesData(rows, monthlySheet) {
  if (!rows || rows.length === 0) return;
  var lastRow = monthlySheet.getLastRow();
  var targetRange = monthlySheet.getRange(lastRow + 1, 1, rows.length, rows[0].length);
  targetRange.setValues(rows);
}

function tallySalesTotals(monthlySheet, todaySheet) {
  var mData = monthlySheet.getDataRange().getValues();
  if (mData.length <= 1) return;
  var usedCounts = {};
  var totalCounts = {};
  var seen = {};
  for (var i = 1; i < mData.length; i++) {
    var row = mData[i];
    var customerNew = row[1];
    var stockNew = row[4];
    var salespersonNew = row[6];
    var customerUsed = row[8];
    var stockUsed = row[11];
    var salespersonUsed = row[13];
    var isNew = customerNew && stockNew;
    var isUsed = customerUsed && stockUsed;
    if (isNew) {
      var keyNew = customerNew + '|' + stockNew;
      if (!seen[keyNew]) {
        seen[keyNew] = true;
        totalCounts[salespersonNew] = (totalCounts[salespersonNew] || 0) + 1;
      }
    }
    if (isUsed) {
      var keyUsed = customerUsed + '|' + stockUsed;
      if (!seen[keyUsed]) {
        seen[keyUsed] = true;
        totalCounts[salespersonUsed] = (totalCounts[salespersonUsed] || 0) + 1;
        usedCounts[salespersonUsed] = (usedCounts[salespersonUsed] || 0) + 1;
      }
    }
  }
  // Write headers
  todaySheet.getRange('P1').setValue('Sales Person');
  todaySheet.getRange('Q1').setValue('Total Used MTD');
  todaySheet.getRange('R1').setValue('Total sold MTD');
  todaySheet.getRange('S1').setValue('3month average');
  // Determine rows with salespeople in column P
  var lastRow = todaySheet.getLastRow();
  var pValues = todaySheet.getRange(2, 16, lastRow - 1, 1).getValues();
  for (var j = 0; j < pValues.length; j++) {
    var sp = pValues[j][0];
    if (!sp) continue;
    var total = totalCounts[sp] || 0;
    var used = usedCounts[sp] || 0;
    var avg = Math.round(total / 3);
    todaySheet.getRange(2 + j, 17).setValue(used);
    todaySheet.getRange(2 + j, 18).setValue(total);
    todaySheet.getRange(2 + j, 19).setValue(avg);
  }
}

function clearTodaySheet(todaySheet) {
  var lastRow = todaySheet.getLastRow();
  if (lastRow <= 1) return;
  var numRows = lastRow - 1;
  // clear columns B:N (2 to 14)
  todaySheet.getRange(2, 2, numRows, 13).clearContent();
}

/* Unit Tests */

function test_copySalesData() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName('monthly');
  var startRow = sheet.getLastRow();
  var testRow = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
  copySalesData([testRow], sheet);
  var newRow = sheet.getRange(startRow + 1, 1, 1, 14).getValues()[0];
  for (var i = 0; i < 14; i++) {
    if (newRow[i] !== testRow[i]) {
      throw new Error('copySalesData failed at index ' + i);
    }
  }
  sheet.deleteRow(startRow + 1);
}

function test_clearTodaySheet() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName('today');
  sheet.getRange('B2').setValue('X');
  clearTodaySheet(sheet);
  var val = sheet.getRange('B2').getValue();
  if (val !== '') {
    throw new Error('clearTodaySheet failed');
  }
}

function runAllTests() {
  test_copySalesData();
  test_clearTodaySheet();
  Logger.log('All tests passed.');
}
