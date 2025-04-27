function onEdit(event) {
  var sheet = event.source.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  var columnToSortByR = 18; // Column index for R
  var columnToSortByS = 19; // Column index for S
  var tableRange = "P2:S25"; // Range to sort

  // Check if the sheet's name is "TODAY" and if the edited cell is in column R or S
  if (sheet.getName() == "TODAY" && (editedCell.getColumn() == columnToSortByR || editedCell.getColumn() == columnToSortByS)) {
    var range = sheet.getRange(tableRange);
    range.sort([
      { column: columnToSortByR, ascending: false },
      { column: columnToSortByS, ascending: false }
    ]);
  }
}