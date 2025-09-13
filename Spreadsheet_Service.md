# Spreadsheet Service

This service allows scripts to create, access, and modify Google Sheets files. See also the guide to storing data in spreadsheets.

Sometimes, spreadsheet operations are bundled together to improve performance, such as when doing multiple calls to a method. If you want to make sure that all pending changes are made right away, for instance to show users information as a script is executing, call SpreadsheetApp.flush().

## Classes

| Name	| Brief description |
| --- | --- |
| AutoFillSeries	| An enumeration of the types of series used to calculate auto-filled values. |
| Banding	| Access and modify bandings, the color patterns applied to rows or columns of a range. |
| BandingTheme	| An enumeration of banding themes. |
| BigQueryDataSourceSpec	| Access the existing BigQuery data source specification. |
| BigQueryDataSourceSpecBuilder	| The builder for BigQueryDataSourceSpecBuilder. |
| BooleanCondition	| Access boolean conditions in ConditionalFormatRules. |
| BooleanCriteria	| An enumeration representing the boolean criteria that can be used in conditional format or filter. |
| BorderStyle	| Styles that can be set on a range using Range.setBorder(top, left, bottom, right, vertical, horizontal, color, style). |
| CellImage	| Represents an image value in a cell. |
| CellImageBuilder	| Builder for CellImage. |
| Color	| A representation for a color. |
| ColorBuilder	| The builder for ColorBuilder. |
| ConditionalFormatRule	| Access conditional formatting rules. |
| ConditionalFormatRuleBuilder	| Builder for conditional format rules. |
| ContainerInfo	| Access the chart's position within a sheet. |
| CopyPasteType	| An enumeration of possible special paste types. |
| DataExecutionErrorCode	| An enumeration of data execution error codes. |
| DataExecutionState	| An enumeration of data execution states. |
| DataExecutionStatus	| The data execution status. |
| DataSource	| Access and modify existing data source. |
| DataSourceChart	| Access and modify an existing data source chart. |
| DataSourceColumn	| Access and modify a data source column. |
| DataSourceFormula	| Access and modify existing data source formulas. |
| DataSourceParameter	| Access existing data source parameters. |
| DataSourceParameterType	| An enumeration of data source parameter types. |
| DataSourcePivotTable	| Access and modify existing data source pivot table. |
| DataSourceRefreshSchedule	| Access and modify an existing refresh schedule. |
| DataSourceRefreshScheduleFrequency	| Access a refresh schedule's frequency, which specifies how often and when to refresh. |
| DataSourceRefreshScope	| An enumeration of scopes for refreshes. |
| DataSourceSheet	| Access and modify existing data source sheet. |
| DataSourceSheetFilter	| Access and modify an existing data source sheet filter. |
| DataSourceSpec	| Access the general settings of an existing data source spec. |
| DataSourceSpecBuilder	| The builder for DataSourceSpec. |
| DataSourceTable	| Access and modify existing data source table. |
| DataSourceTableColumn	| Access and modify an existing column in a DataSourceTable. |
| DataSourceTableFilter	| Access and modify an existing data source table filter. |
| DataSourceType	| An enumeration of data source types. |
| DataValidation	| Access data validation rules. |
| DataValidationBuilder	| Builder for data validation rules. |
| DataValidationCriteria	| An enumeration representing the data validation criteria that can be set on a range. |
| DateTimeGroupingRule	| Access an existing date-time grouping rule. |
| DateTimeGroupingRuleType	| The types of date-time grouping rule. |
| DeveloperMetadata	| Access and modify developer metadata. |
| DeveloperMetadataFinder	| Search for developer metadata in a spreadsheet. |
| DeveloperMetadataLocation	| Access developer metadata location information. |
| DeveloperMetadataLocationType	| An enumeration of the types of developer metadata location types. |
| DeveloperMetadataVisibility	| An enumeration of the types of developer metadata visibility. |
| Dimension	| An enumeration of possible directions along which data can be stored in a spreadsheet. |
| Direction	| An enumeration representing the possible directions that one can move within a spreadsheet using the arrow keys. |
| Drawing	| Represents a drawing over a sheet in a spreadsheet. |
| EmbeddedAreaChartBuilder	| Builder for area charts. |
| EmbeddedBarChartBuilder	| Builder for bar charts. |
| EmbeddedChart	| Represents a chart that has been embedded into a spreadsheet. |
| EmbeddedChartBuilder	| Builder used to edit an EmbeddedChart. |
| EmbeddedColumnChartBuilder	| Builder for column charts. |
| EmbeddedComboChartBuilder	| Builder for combo charts. |
| EmbeddedHistogramChartBuilder	| Builder for histogram charts. |
| EmbeddedLineChartBuilder	| Builder for line charts. |
| EmbeddedPieChartBuilder	| Builder for pie charts. |
| EmbeddedScatterChartBuilder	| Builder for scatter charts. |
| EmbeddedTableChartBuilder	| Builder for table charts. |
| Filter	| Use this class to modify existing filters on Grid sheets, the default type of sheet. |
| FilterCriteria	| Use this class to get information about or copy the criteria on existing filters. |
| FilterCriteriaBuilder	| Builder for filter criteria. |
| FrequencyType	| An enumeration of frequency types. |
| GradientCondition	| Access gradient (color) conditions in ConditionalFormatRuleApis. |
| Group	| Access and modify spreadsheet groups. |
| GroupControlTogglePosition	| An enumeration representing the possible positions that a group control toggle can have. |
| InterpolationType	| An enumeration representing the interpolation options for calculating a value to be used in a GradientCondition in a ConditionalFormatRule. |
| LookerDataSourceSpec	| A DataSourceSpec which is used to access specifically the existing Looker data source specifications. |
| LookerDataSourceSpecBuilder	| The builder for LookerDataSourceSpecBuilder. |
| NamedRange	| Create, access and modify named ranges in a spreadsheet. |
| OverGridImage	| Represents an image over the grid in a spreadsheet. |
| PageProtection	| Access and modify protected sheets in the older version of Google Sheets. |
| PivotFilter	| Access and modify pivot table filters. |
| PivotGroup	| Access and modify pivot table breakout groups. |
| PivotGroupLimit	| Access and modify pivot table group limit. |
| PivotTable	| Access and modify pivot tables. |
| PivotTableSummarizeFunction	| An enumeration of functions that summarize pivot table data. |
| PivotValue	| Access and modify value groups in pivot tables. |
| PivotValueDisplayType	| An enumeration of ways to display a pivot value as a function of another value. |
| Protection	| Access and modify protected ranges and sheets. |
| ProtectionType	| An enumeration representing the parts of a spreadsheet that can be protected from edits. |
| Range	| Access and modify spreadsheet ranges. |
| RangeList	| A collection of one or more Range instances in the same sheet. |
| RecalculationInterval	| An enumeration representing the possible intervals used in spreadsheet recalculation. |
| RelativeDate	| An enumeration representing the relative date options for calculating a value to be used in date-based BooleanCriteria. |
| RichTextValue	| A stylized text string used to represent cell text. |
| RichTextValueBuilder	| A builder for Rich Text values. |
| Selection	| Access the current active selection in the active sheet. |
| Sheet	| Access and modify spreadsheet sheets. |
| SheetType	| The different types of sheets that can exist in a spreadsheet. |
| Slicer	| Represents a slicer, which is used to filter ranges, charts and pivot tables in a non-collaborative manner. |
| SortOrder	| An enumeration representing the sort order. |
| SortSpec	| The sorting specification.
| Spreadsheet	| Access and modify Google Sheets files. |
| SpreadsheetApp	| Access and create Google Sheets files. |
| SpreadsheetTheme	| Access and modify existing themes. |
| TextDirection	| An enumerations of text directions. |
| TextFinder	| Find or replace text within a range, sheet or spreadsheet. |
| TextRotation	| Access the text rotation settings for a cell. |
| TextStyle	| The rendered style of text in a cell. |
| TextStyleBuilder	| A builder for text styles. |
| TextToColumnsDelimiter	| An enumeration of the types of preset delimiters that can split a column of text into multiple columns. |
| ThemeColor	| A representation for a theme color. |
| ThemeColorType	| An enum which describes various color entries supported in themes. |
| ValueType	| An enumeration of value types returned by Range.getValue() and Range.getValues() from the Range class of the Spreadsheet service. |
| WrapStrategy	| An enumeration of the strategies used to handle cell text wrapping. |

## AutoFillSeries

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DEFAULT_SERIES	| Enum	| Default. |
| ALTERNATE_SERIES	| Enum	| Auto-filling with this setting results in the empty cells in the expanded range being filled with copies of the existing values. |

## Banding

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| copyTo(range) | Banding	| Copies this banding to another range. |
| getFirstColumnColorObject()	| Color	| Returns the first alternating column color in the banding, or null if no color is set. |
| getFirstRowColorObject()	| Color	| Returns the first alternating row color, or null if no color is set. |
| getFooterColumnColorObject()	| Color	| Returns the color of the last column in the banding, or null if no color is set. |
| getFooterRowColorObject()	| Color	| Returns the last row color in the banding, or null if no color is set. |
| getHeaderColumnColorObject()	| Color	| Returns the color of the first column in the banding, or null if no color is set. |
| getHeaderRowColorObject()	| Color	| Returns the color of the header row or null if no color is set. |
| getRange()	| Range	| Returns the range for this banding. |
| getSecondColumnColorObject()	| Color	| Returns the second alternating column color in the banding, or null if no color is set. |
| getSecondRowColorObject()	| Color	| Returns the second alternating row color, or null if no color is set. |
| remove()	| void	| Removes this banding. |
| setFirstColumnColor(color)	| Banding	| Sets the first column color that is alternating. |
| setFirstColumnColorObject(color)	| Banding	| Sets the first alternating column color in the banding. |
| setFirstRowColor(color)	| Banding	| Sets the first row color that is alternating. |
| setFirstRowColorObject(color)	| Banding	| Sets the first alternating row color in the banding. |
| setFooterColumnColor(color)	| Banding	| Sets the color of the last column. |
| setFooterColumnColorObject(color)	| Banding	| Sets the color of the last column in the banding. |
| setFooterRowColor(color)	| Banding	| Sets the color of the last row. |
| setFooterRowColorObject(color)	| Banding	| Sets the color of the footer row in the banding. |
| setHeaderColumnColor(color)	| Banding	| Sets the color of the header column. |
| setHeaderColumnColorObject(color)	| Banding	| Sets the color of the header column. |
| setHeaderRowColor(color)	| Banding	| Sets the color of the header row. |
| setHeaderRowColorObject(color)	| Banding	| Sets the color of the header row. |
| setRange(range)	| Banding	| Sets the range for this banding. |
| setSecondColumnColor(color)	| Banding	| Sets the second column color that is alternating. |
| setSecondColumnColorObject(color)	| Banding	| Sets the second alternating column color in the banding. |
| setSecondRowColor(color)	| Banding	| Sets the second row color that is alternating. |
| setSecondRowColorObject(color)	| Banding	| Sets the second alternating color in the banding. |

## BandingTheme

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| LIGHT_GREY	| Enum	| A light grey banding theme. |
| CYAN	| Enum	| A cyan banding theme. |
| GREEN	| Enum	| A green banding theme. |
| YELLOW	| Enum	| A yellow banding theme. |
| ORANGE	| Enum	| An orange banding theme. |
| BLUE	| Enum	| A blue banding theme. |
| TEAL	| Enum	| A teal banding theme. |
| GREY	| Enum	| A grey banding theme. |
| BROWN	| Enum	| A brown banding theme. |
| LIGHT_GREEN	| Enum	| A light green banding theme. |
| INDIGO	| Enum	| An indigo banding theme. |
| PINK	| Enum	| A pink banding theme. |

## BigQueryDataSourceSpec

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| copy() | DataSourceSpecBuilder | Creates a DataSourceSpecBuilder based on this data source's settings. |
| getDatasetId() | String | Gets the BigQuery dataset ID. |
| getParameters() | DataSourceParameter[] | Gets the parameters of the data source. |
| getProjectId() | String | Gets the billing project ID. |
| getRawQuery() | String | Gets the raw query string. |
| getTableId() | String | Gets the BigQuery table ID. |
| getTableProjectId() | String | Gets the BigQuery project ID for the table. |
| getType() | DataSourceType | Gets the type of the data source. |

## BigQueryDataSourceSpecBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| build() | DataSourceSpec | Builds a data source specification from the settings in this builder. |
| copy() | DataSourceSpecBuilder | Creates a DataSourceSpecBuilder based on this data source's settings. |
| getDatasetId() | String | Gets the BigQuery dataset ID. |
| getParameters() | DataSourceParameter[] | Gets the parameters of the data source. |
| getProjectId() | String | Gets the billing project ID. |
| getRawQuery() | String | Gets the raw query string. |
| getTableId() | String | Gets the BigQuery table ID. |
| getTableProjectId() | String | Gets the BigQuery project ID for the table. |
| getType() | DataSourceType | Gets the type of the data source. |
| removeAllParameters() | BigQueryDataSourceSpecBuilder | Removes all the parameters. |
| removeParameter(parameterName) | BigQueryDataSourceSpecBuilder | Removes the specified parameter. |
| setDatasetId(datasetId) | BigQueryDataSourceSpecBuilder | Sets the BigQuery dataset ID. |
| setParameterFromCell(parameterName, sourceCell) | BigQueryDataSourceSpecBuilder | Adds a parameter, or if the parameter with the name exists, updates its source cell for data source spec builders of type DataSourceType.BIGQUERY. |
| setProjectId(projectId) | BigQueryDataSourceSpecBuilder | Sets the billing BigQuery project ID. |
| setRawQuery(rawQuery) | BigQueryDataSourceSpecBuilder | Sets the raw query string. |
| setTableId(tableId) | BigQueryDataSourceSpecBuilder | Sets the BigQuery table ID. |
| setTableProjectId(projectId) | BigQueryDataSourceSpecBuilder | Sets the BigQuery project ID for the table. |

## BooleanCondition

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getBackgroundObject() | Color | Gets the background color for this boolean condition. |
| getBold() | Boolean | Returns true if this boolean condition bolds the text and returns false if this boolean condition removes bolding from the text. |
| getCriteriaType() | BooleanCriteria | Gets the rule's criteria type as defined in the BooleanCriteria enum. |
| getCriteriaValues() | Object[] | Gets an array of arguments for the rule's criteria. |
| getFontColorObject() | Color | Gets the font color for this boolean condition. |
| getItalic() | Boolean | Returns true if this boolean condition italicises the text and returns false if this boolean condition removes italics from the text. |
| getStrikethrough() | Boolean | Returns true if this boolean condition strikes through the text and returns false if this boolean condition removes strikethrough from the text. |
| getUnderline() | Boolean | Returns true if this boolean condition underlines the text and returns false if this boolean condition removes underlining from the text. |

## BooleanCriteria

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| CELL_EMPTY	| Enum	| The criteria is met when a cell is empty. |
| CELL_NOT_EMPTY	| Enum	| The criteria is met when a cell is not empty. |
| DATE_AFTER	| Enum	| The criteria is met when a date is after the given value. |
| DATE_BEFORE	| Enum	| The criteria is met when a date is before the given value. |
| DATE_EQUAL_TO	| Enum	| The criteria is met when a date is equal to the given value. |
| DATE_NOT_EQUAL_TO	| Enum	| The criteria is met when a date is not equal to the given value. |
| DATE_AFTER_RELATIVE	| Enum	| The criteria is met when a date is after the relative date value. |
| DATE_BEFORE_RELATIVE	| Enum	| The criteria is met when a date is before the relative date value. |
| DATE_EQUAL_TO_RELATIVE	| Enum	| The criteria is met when a date is equal to the relative date value. |
| NUMBER_BETWEEN	| Enum	| The criteria is met when a number that is between the given values. |
| NUMBER_EQUAL_TO	| Enum	| The criteria is met when a number that is equal to the given value. |
| NUMBER_GREATER_THAN	| Enum	| The criteria is met when a number that is greater than the given value. |
| NUMBER_GREATER_THAN_OR_EQUAL_TO	| Enum	| The criteria is met when a number that is greater than or equal to the given value. |
| NUMBER_LESS_THAN	| Enum	| The criteria is met when a number that is less than the given value. |
| NUMBER_LESS_THAN_OR_EQUAL_TO	| Enum	| The criteria is met when a number that is less than or equal to the given value. |
| NUMBER_NOT_BETWEEN	| Enum	| The criteria is met when a number that is not between the given values. |
| NUMBER_NOT_EQUAL_TO	| Enum	| The criteria is met when a number that is not equal to the given value. |
| TEXT_CONTAINS	| Enum	| The criteria is met when the input contains the given value. |
| TEXT_DOES_NOT_CONTAIN	| Enum	| The criteria is met when the input does not contain the given value. |
| TEXT_EQUAL_TO	| Enum	| The criteria is met when the input is equal to the given value. |
| TEXT_NOT_EQUAL_TO	| Enum	| The criteria is met when the input is not equal to the given value. |
| TEXT_STARTS_WITH	| Enum	| The criteria is met when the input begins with the given value. |
| TEXT_ENDS_WITH	| Enum	| The criteria is met when the input ends with the given value. |
| CUSTOM_FORMULA	| Enum	| The criteria is met when the input makes the given formula evaluate to true. |

## BorderStyle

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DOTTED	| Enum	| Dotted line borders. |
| DASHED	| Enum	| Dashed line borders. |
| SOLID	| Enum	| Thin solid line borders. |
| SOLID_MEDIUM	| Enum	| Medium solid line borders. |
| SOLID_THICK	| Enum	| Thick solid line borders. |
| DOUBLE	| Enum	| Two solid line borders. |

## CellImage

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| valueType	| ValueType	| The value type of the cell image, which is ValueType.IMAGE. |

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getAltTextDescription()	| String	| Returns the alt text description for this image. |
| getAltTextTitle()	| String	| Returns the alt text title for this image. |
| getContentUrl()	| String	| Returns a Google-hosted URL to the image. |
| toBuilder()	| CellImageBuilder	| Creates a cell image builder based on the current image properties. |

## CellImageBuilder

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| valueType	| ValueType	| The value type of the cell image, which is ValueType.IMAGE. |

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| build()	| CellImage	| Creates the image value type needed to add an image to a cell. |
| getAltTextDescription()	| String	| Returns the alt text description for this image. |
| getAltTextTitle()	| String	| Returns the alt text title for this image. |
| getContentUrl()	| String	| Returns a Google-hosted URL to the image. |
| setAltTextDescription(description)	| CellImage	| Sets the alt-text description for this image. |
| setAltTextTitle(title)	| CellImage	| Sets the alt text title for this image. |
| setSourceUrl(url)	| CellImageBuilder	| Sets the image source URL. |
toBuilder()	| CellImageBuilder	| Creates a cell image builder based on the current image properties. |

## Color

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| asRgbColor()	| RgbColor	| Converts this color to an RgbColor. |
| asThemeColor()	| ThemeColor	| Converts this color to a ThemeColor. |
| getColorType()	| ColorType	| Get the type of this color. |

## ColorBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| asRgbColor()	| RgbColor	| Converts this color to an RgbColor. |
| asThemeColor()	| ThemeColor	| Converts this color to a ThemeColor. |
| build()	| Color	| Creates a color object from the settings supplied to the builder. |
| getColorType()	| ColorType	| Get the type of this color. |
| setRgbColor(cssString)	| ColorBuilder	| Sets as RGB color. |
| setThemeColor(themeColorType) | ColorBuilder	| Sets as theme color.

## ConditionalFormatRule

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| copy()	| ConditionalFormatRuleBuilder	| Returns a rule builder preset with this rule's settings. |
| getBooleanCondition()	BooleanCondition	| Retrieves the rule's BooleanCondition information if this rule uses boolean condition criteria. |
| getGradientCondition()	GradientCondition	| Retrieves the rule's GradientCondition information, if this rule uses gradient condition criteria. |
| getRanges()	Range[]	| Retrieves the ranges to which this conditional format rule is applied. |

## ConditionalFormatRuleBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| build()	| ConditionalFormatRule	| Constructs a conditional format rule from the settings applied to the builder. |
| copy()	| ConditionalFormatRuleBuilder	| Returns a rule builder preset with this rule's settings. |
| getBooleanCondition()	| BooleanCondition	| Retrieves the rule's BooleanCondition information if this rule uses boolean condition criteria. |
| getGradientCondition()	| GradientCondition	| Retrieves the rule's GradientCondition information, if this rule uses gradient condition criteria. |
| getRanges()	| Range[]	| Retrieves the ranges to which this conditional format rule is applied. |
| setBackground(color)	| ConditionalFormatRuleBuilder	| Sets the background color for the conditional format rule's format. |
| setBackgroundObject(color)	| ConditionalFormatRuleBuilder	| Sets the background color for the conditional format rule's format. |
| setBold(bold)	| ConditionalFormatRuleBuilder	| Sets text bolding for the conditional format rule's format. |
| setFontColor(color)	| ConditionalFormatRuleBuilder	| Sets the font color for the conditional format rule's format. |
| setFontColorObject(color)	| ConditionalFormatRuleBuilder	| Sets the font color for the conditional format rule's format. |
| setGradientMaxpoint(color)	| ConditionalFormatRuleBuilder	| Clears the conditional format rule's gradient maxpoint value, and instead uses the maximum value in the rule's ranges. |
| setGradientMaxpointObject(color)	| ConditionalFormatRuleBuilder	| Clears the conditional format rule's gradient maxpoint value, and instead uses the maximum value in the rule's ranges. |
| setGradientMaxpointObjectWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient maxpoint fields. |
| setGradientMaxpointWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient maxpoint fields. |
| setGradientMidpointObjectWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient midpoint fields. |
| setGradientMidpointWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient midpoint fields. |
| setGradientMinpoint(color)	| ConditionalFormatRuleBuilder	| Clears the conditional format rule's gradient minpoint value, and instead uses the minimum value in the rule's ranges. |
| setGradientMinpointObject(color)	| ConditionalFormatRuleBuilder	| Clears the conditional format rule's gradient minpoint value, and instead uses the minimum value in the rule's ranges. |
| setGradientMinpointObjectWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient minpoint fields. |
| setGradientMinpointWithValue(color, type, value)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule's gradient minpoint fields. |
| setItalic(italic)	| ConditionalFormatRuleBuilder	| Sets text italics for the conditional format rule's format. |
| setRanges(ranges)	| ConditionalFormatRuleBuilder	| Sets one or more ranges to which this conditional format rule is applied. |
| setStrikethrough(strikethrough)	| ConditionalFormatRuleBuilder	| Sets text strikethrough for the conditional format rule's format. |
| setUnderline(underline)	| ConditionalFormatRuleBuilder	| Sets text underlining for the conditional format rule's format. |
| whenCellEmpty()	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when the cell is empty. |
| whenCellNotEmpty()	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when the cell is not empty. |
| whenDateAfter(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is after the given value. |
| whenDateAfter(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is after the given relative date. |
| whenDateBefore(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is before the given date. |
| whenDateBefore(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is before the given relative date. |
| whenDateEqualTo(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is equal to the given date. |
| whenDateEqualTo(date)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a date is equal to the given relative date. |
| whenFormulaSatisfied(formula)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the given formula evaluates to true. |
| whenNumberBetween(start, end)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number falls between, or is either of, two specified values. |
| whenNumberEqualTo(number)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number is equal to the given value. |
|  whenNumberGreaterThan(number)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number is greater than the given value. |
| whenNumberGreaterThanOrEqualTo(number)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number is greater than or equal to the given value. |
| whenNumberLessThan(number)	| ConditionalFormatRuleBuilder	| Sets the conditional conditional format rule to trigger when a number less than the given value. |
| whenNumberLessThanOrEqualTo(number)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number less than or equal to the given value. |
| whenNumberNotBetween(start, end)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number does not fall between, and is neither of, two specified values. |
| whenNumberNotEqualTo(number)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when a number is not equal to the given value. |
| whenTextContains(text)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the input contains the given value. |
| whenTextDoesNotContain(text)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the input does not contain the given value. |
| whenTextEndsWith(text)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the input ends with the given value. |
| whenTextEqualTo(text)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the input is equal to the given value. |
| whenTextStartsWith(text)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to trigger when that the input starts with the given value. |
| withCriteria(criteria, args)	| ConditionalFormatRuleBuilder	| Sets the conditional format rule to criteria defined by BooleanCriteria values, typically taken from the criteria and arguments of an existing rule. |

## ContainerInfo

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getAnchorColumn()	| Integer	| The chart's left side is anchored in this column. |
| getAnchorRow()	| Integer	| The chart's top side is anchored in this row. |
| getOffsetX()	| Integer	| The chart's upper left hand corner is offset from the anchor column by this many pixels. |
| getOffsetY()	| Integer	| The chart's upper left hand corner is offset from the anchor row by this many pixels. |

## CopyPasteType

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| PASTE_NORMAL	| Enum	| Paste values, formulas, formats and merges. |
| PASTE_NO_BORDERS	| Enum	| Paste values, formulas, formats and merges but without borders. |
| PASTE_FORMAT	| Enum	| Paste the format only. |
| PASTE_FORMULA	| Enum	| Paste the formulas only. |
| PASTE_DATA_VALIDATION	| Enum	| Paste the data validation only. |
| PASTE_VALUES	| Enum	| Paste the values ONLY without formats, formulas or merges. |
| PASTE_CONDITIONAL_FORMATTING	| Enum	| Paste the color rules only. |
| PASTE_COLUMN_WIDTHS	| Enum	| Paste the column widths only. |

## DataExecutionErrorCode

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DATA_EXECUTION_ERROR_CODE_UNSUPPORTED	| Enum	| A data execution error code that is not supported in Apps Script. |
| NONE	| Enum	| The data execution has no error. |
| TIME_OUT	| Enum	| The data execution timed out. |
| TOO_MANY_ROWS	| Enum	| The data execution returns more rows than the limit. |
| TOO_MANY_COLUMNS	| Enum	| The data execution returns more columns than the limit. |
| TOO_MANY_CELLS	| Enum	| The data execution returns more cells than the limit. |
| ENGINE	| Enum	| Data execution engine error. |
| PARAMETER_INVALID	| Enum	| Invalid data execution parameter. |
| UNSUPPORTED_DATA_TYPE	| Enum	| The data execution returns unsupported data type. |
| DUPLICATE_COLUMN_NAMES	| Enum	| The data execution returns duplicate column names. |
| INTERRUPTED	| Enum	| The data execution is interrupted. |
| OTHER	| Enum	| Other errors. |
| TOO_MANY_CHARS_PER_CELL	| Enum	| The data execution returns values that exceed the maximum characters allowed in a single cell. |
| DATA_NOT_FOUND	| Enum	| The database referenced by the data source is not found. |
| PERMISSION_DENIED	| Enum	| The user does not have access to the database referenced by the data source. |

## DataExecutionState

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DATA_EXECUTION_STATE_UNSUPPORTED	| Enum	| A data execution state is not supported in Apps Script. |
| RUNNING	| Enum	| The data execution has started and is running. |
| SUCCESS	| Enum	| The data execution is completed and successful. |
| ERROR	| Enum	| The data execution is completed and has errors. |
| NOT_STARTED	| Enum	| The data execution has not started. |

## DataExecutionStatus

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getErrorCode()	| DataExecutionErrorCode	| Gets the error code of the data execution. |
| getErrorMessage()	| String	| Gets the error message of the data execution. |
| getExecutionState()	| DataExecutionState	| Gets the state of the data execution. |
| getLastExecutionTime()	| Date	| Gets the time the last data execution completed regardless of the execution state. |
| getLastRefreshedTime()	| Date	| Gets the time the data last successfully refreshed. |
| isTruncated()	| Boolean	| Returns true if the data from last successful execution is truncated, or false otherwise. |

## DataSource

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| cancelAllLinkedDataSourceObjectRefreshes()	| void	| Cancels all currently running refreshes of data source objects linked to this data source. |
| createCalculatedColumn(name, formula)	| DataSourceColumn	| Creates a calculated column. |
| createDataSourcePivotTableOnNewSheet()	| DataSourcePivotTable	| Creates a data source pivot table from this data source in the first cell of a new sheet. |
| createDataSourceTableOnNewSheet()	| DataSourceTable	| Creates a data source table from this data source in the first cell of a new sheet. |
| getCalculatedColumnByName(columnName)	| DataSourceColumn	| Returns the calculated column in the data source that matches the column name. |
| getCalculatedColumns()	| DataSourceColumn[]	| Returns all the calculated columns in the data source. |
| getColumns()	| DataSourceColumn[]	| Returns all the columns in the data source. |
| getDataSourceSheets()	| DataSourceSheet[]	| Returns the data source sheets associated with this data source. |
| getSpec()	| DataSourceSpec	| Gets the data source specification. |
| refreshAllLinkedDataSourceObjects()	| void	| Refreshes all data source objects linked to the data source. |
| updateSpec(spec)	| DataSource	| Updates the data source specification and refreshes the data source objects linked with this data source with the new specification. |
| updateSpec(spec, refreshAllLinkedObjects)	| DataSource	| Updates the data source specification and refreshes the linked data source sheets with the new specification. |
| waitForAllDataExecutionsCompletion(timeoutInSeconds)	| void	| Waits until all the current executions of the linked data source objects complete, timing out after the provided number of seconds. |

## DataSourceChart

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| cancelDataRefresh()	| DataSourceChart	| Cancels the data refresh associated with this object if it's currently running.
| forceRefreshData()	| DataSourceChart	| Refreshes the data of this object regardless of the current state.
| getDataSource()	| DataSource	| Gets the data source the object is linked to.
| getStatus()	| DataExecutionStatus	| Gets the data execution status of the object.
| refreshData()	| DataSourceChart	| Refreshes the data of the object.
| waitForCompletion(timeoutInSeconds)	| DataExecutionStatus	| Waits until the current execution completes, timing out after the provided number of seconds. |

## DataSourceColumn

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getDataSource()	| DataSource	| Gets the data source associated with the data source column. |
| getFormula()	| String	| Gets the formula for the data source column. |
| getName()	| String	| Gets the name for the data source column. |
| hasArrayDependency()	| Boolean	| Returns whether the column has an array dependency. |
| isCalculatedColumn()	| Boolean	| Returns whether the column is a calculated column. |
| remove()	| void	| Removes the data source column. |
| setFormula(formula)	| DataSourceColumn	| Sets the formula for the data source column. |
| setName(name)	| DataSourceColumn	| Sets the name of the data source column. |

## DataSourceFormula

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| cancelDataRefresh()	| DataSourceFormula	| Cancels the data refresh associated with this object if it's currently running. |
| forceRefreshData()	| DataSourceFormula	| Refreshes the data of this object regardless of the current state. |
| getAnchorCell()	| Range	| Returns the Range representing the cell where this data source formula is anchored. |
| getDataSource()	| DataSource	| Gets the data source the object is linked to. |
| getDisplayValue()	| String	| Returns the display value of the data source formula. |
| getFormula()	| String	| Returns the formula for this data source formula. |
| getStatus()	| DataExecutionStatus	| Gets the data execution status of the object. |
| refreshData()	| DataSourceFormula	| Refreshes the data of the object. |
| setFormula(formula)	| DataSourceFormula	| Updates the formula. |
| waitForCompletion(timeoutInSeconds)	| DataExecutionStatus	| Waits until the current execution completes, timing out after the provided number of seconds. |

## DataSourceParameter

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getName()	| String	| Gets the parameter name. |
| getSourceCell()	| String	| Gets the source cell the parameter is valued based on, or null if the parameter type is not DataSourceParameterType.CELL. |
| getType()	| DataSourceParameterType	| Gets the parameter type. |

## DataSourceParameterType

### Properties

Property	Type	Description
DATA_SOURCE_PARAMETER_TYPE_UNSUPPORTED	Enum	A data source parameter type that is not supported in Apps Script.
CELL	Enum	The data source parameter is valued based on a cell.

## DataSourcePivotTable

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| addColumnGroup(columnName)	| PivotGroup	| Adds a new pivot column group based on the specified data source column. |
| addFilter(columnName, filterCriteria)	| PivotFilter	| Adds a new filter based on the specified data source column with the specified filter criteria. |
| addPivotValue(columnName)	| PivotValue	| Adds a new pivot value based on the specified data source column without any summarize function. |
| addPivotValue(columnName, summarizeFunction)	| PivotValue	| Adds a new pivot value based on the specified data source column with the specified summarize function. |
| addRowGroup(columnName)	| PivotGroup	| Adds a new pivot row group based on the specified data source column. |
| asPivotTable()	PivotTable	Returns the data source pivot table as a regular pivot table object. |
| cancelDataRefresh()	DataSourcePivotTable	Cancels the data refresh associated with this object if it's currently running. |
| forceRefreshData()	DataSourcePivotTable	Refreshes the data of this object regardless of the current state. |
| getDataSource()	DataSource	Gets the data source the object is linked to. |
| getStatus()	DataExecutionStatus	Gets the data execution status of the object. |
| refreshData()	DataSourcePivotTable	Refreshes the data of the object. |
| waitForCompletion(timeoutInSeconds)	DataExecutionStatus	Waits until the current execution completes, timing out after the provided number of seconds. |

## DataSourceRefreshSchedule

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getFrequency()	| DataSourceRefreshScheduleFrequency	| Gets the refresh schedule frequency, which specifies how often and when to refresh. |
| getScope()	| DataSourceRefreshScope	| Gets the scope of this refresh schedule. |
| getTimeIntervalOfNextRun()	| TimeInterval	| Gets the time window of the next run of this refresh schedule. |
| isEnabled()	| Boolean	| Determines whether this refresh schedule is enabled. |

## DataSourceRefreshScheduleFrequency

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getDaysOfTheMonth()	| Integer[]	| Gets the days of the month as numbers (1-28) on which to refresh the data source. |
| getDaysOfTheWeek()	| Weekday[]	| Gets the days of the week on which to refresh the data source. |
| getFrequencyType()	| FrequencyType	| Gets the frequency type. |
| getStartHour()	| Integer	| Gets the start hour (as a number 0-23) of the time interval during which the refresh schedule runs. |

## DataSourceRefreshScope

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DATA_SOURCE_REFRESH_SCOPE_UNSUPPORTED	| Enum	| The data source refresh scope is unsupported. |
| ALL_DATA_SOURCES	| Enum	| The refresh applies to all data sources in the spreadsheet. |

## DataSourceSheet

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| addFilter(columnName, filterCriteria)	| DataSourceSheet	| Adds a filter applied to the data source sheet. |
| asSheet()	| Sheet	| Returns the data source sheet as a regular sheet object. |
| autoResizeColumn(columnName)	| DataSourceSheet	| Auto resizes the width of the specified column. |
| autoResizeColumns(columnNames)	| DataSourceSheet	| Auto resizes the width of the specified columns. |
| cancelDataRefresh()	| DataSourceSheet	| Cancels the data refresh associated with this object if it's currently running. |
| forceRefreshData()	| DataSourceSheet	| Refreshes the data of this object regardless of the current state. |
| getColumnWidth(columnName)	| Integer	| Returns the width of the specified column. |
| getDataSource()	| DataSource	| Gets the data source the object is linked to. |
| getFilters()	| DataSourceSheetFilter[]	| Returns all filters applied to the data source sheet. |
| getSheetValues(columnName)	| Object[]	| Returns all the values for the data source sheet for the provided column name. |
| getSheetValues(columnName, startRow, numRows)	| Object[]	| Returns all the values for the data source sheet for the provided column name from the provided start row (based-1) and up to the provided numRows. |
| getSortSpecs()	| SortSpec[]	| Gets all the sort specs in the data source sheet. |
| getStatus()	| DataExecutionStatus	| Gets the data execution status of the object. |
| refreshData()	| DataSourceSheet	| Refreshes the data of the object. |
| removeFilters(columnName)	| DataSourceSheet	| Removes all filters applied to the data source sheet column. |
| removeSortSpec(columnName)	| DataSourceSheet	| Removes the sort spec on a column in the data source sheet. |
| setColumnWidth(columnName, width)	| DataSourceSheet	| Sets the width of the specified column. |
| setColumnWidths(columnNames, width)	| DataSourceSheet	| Sets the width of the specified columns. |
| setSortSpec(columnName, ascending)	| DataSourceSheet	| Sets the sort spec on a column in the data source sheet. |
| setSortSpec(columnName, sortOrder)	| DataSourceSheet	| Sets the sort spec on a column in the data source sheet. |
| waitForCompletion(timeoutInSeconds)	| DataExecutionStatus	| Waits until the current execution completes, timing out after the provided number of seconds. |

## DataSourceSheetFilter

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getDataSourceColumn()	| DataSourceColumn	| Returns the data source column this filter applies to. |
| getDataSourceSheet()	| DataSourceSheet	| Returns the DataSourceSheet that this filter belongs to. |
| getFilterCriteria()	| FilterCriteria	| Returns the filter criteria for this filter. |
| remove()	| void	| Removes this filter from the data source object. |
| setFilterCriteria(filterCriteria)	| DataSourceSheetFilter	| Sets the filter criteria for this filter. |

## DataSourceSpec

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| asBigQuery()	| BigQueryDataSourceSpec	| Gets the spec for BigQuery data source. |
| asLooker()	| LookerDataSourceSpec	| Gets the spec for Looker data source. |
| copy()	| DataSourceSpecBuilder	| Creates a DataSourceSpecBuilder based on this data source's settings. |
| getParameters()	| DataSourceParameter[]	| Gets the parameters of the data source. |
| getType()	| DataSourceType	| Gets the type of the data source. |

## DataSourceSpecBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| asBigQuery()	| BigQueryDataSourceSpecBuilder	| Gets the builder for BigQuery data source. |
| asLooker()	| LookerDataSourceSpecBuilder	| Gets the builder for Looker data source. |
| build()	| DataSourceSpec	| Builds a data source specification from the settings in this builder. |
| copy()	| DataSourceSpecBuilder	| Creates a DataSourceSpecBuilder based on this data source's settings. |
| getParameters()	| DataSourceParameter[]	| Gets the parameters of the data source. |
| getType()	| DataSourceType	| Gets the type of the data source. |
| removeAllParameters()	| DataSourceSpecBuilder	| Removes all the parameters. |
| removeParameter(parameterName)	| DataSourceSpecBuilder	| Removes the specified parameter. |
| setParameterFromCell(parameterName, sourceCell)	| DataSourceSpecBuilder	| Adds a parameter, or if the parameter with the name exists, updates its source cell for data source spec builders of type DataSourceType.BIGQUERY. |

## DataSourceTable

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| addColumns(columnNames)	| DataSourceTable	| Adds columns to the data source table. |
| addFilter(columnName, filterCriteria)	| DataSourceTable	| Adds a filter applied to the data source table. |
| addSortSpec(columnName, ascending)	| DataSourceTable	| Adds a sort spec on a column in the data source table. |
| addSortSpec(columnName, sortOrder)	| DataSourceTable	| Adds a sort spec on a column in the data source table. |
| cancelDataRefresh()	| DataSourceTable	| Cancels the data refresh associated with this object if it's currently running. |
| forceRefreshData()	| DataSourceTable	| Refreshes the data of this object regardless of the current state. |
| getColumns()	| DataSourceTableColumn[]	| Gets all the data source columns added to the data source table. |
| getDataSource()	| DataSource	| Gets the data source the object is linked to. |
| getFilters()	| DataSourceTableFilter[]	| Returns all filters applied to the data source table. |
| getRange()	| Range	| Gets the Range this data source table spans. |
| getRowLimit()	| Integer	| Returns the row limit for the data source table. |
| getSortSpecs()	| SortSpec[]	| Gets all the sort specs in the data source table. |
| getStatus()	| DataExecutionStatus	| Gets the data execution status of the object. |
| isSyncingAllColumns()	| Boolean	| Returns whether the data source table is syncing all columns in the associated data source. |
| refreshData()	| DataSourceTable	| Refreshes the data of the object. |
| removeAllColumns()	| DataSourceTable	| Removes all the columns in the data source table. |
| removeAllSortSpecs()	| DataSourceTable	| Removes all the sort specs in the data source table. |
| setRowLimit(rowLimit)	| DataSourceTable	| Updates the row limit for the data source table. |
| syncAllColumns()	| DataSourceTable	| Sync all current and future columns in the associated data source to the data source table. |
| waitForCompletion(timeoutInSeconds)	| DataExecutionStatus	| Waits until the current execution completes, timing out after the provided number of seconds. |

## DataSourceTableColumn

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getDataSourceColumn() | DataSourceColumn | Gets the data source column. |
| remove() | void | Removes the column from the DataSourceTable. |

## DataSourceTableFilter

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getDataSourceColumn() | DataSourceColumn | Returns the data source column this filter applies to. |
| getDataSourceTable() | DataSourceTable | Returns the DataSourceTable that this filter belongs to. |
| getFilterCriteria() | FilterCriteria | Returns the filter criteria for this filter. |
| remove() | void | Removes this filter from the data source object. |
| setFilterCriteria(filterCriteria) | DataSourceTableFilter | Sets the filter criteria for this filter. |

## DataSourceType

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DATA_SOURCE_TYPE_UNSUPPORTED	| Enum	| A data source type that is not supported in Apps Script. |
| BIGQUERY	| Enum	| A BigQuery data source. |
| LOOKER	| Enum	| A Looker data source. |

## DataValidation

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| copy() | DataValidationBuilder | Creates a builder for a data validation rule based on this rule's settings. |
| getAllowInvalid() | Boolean | Returns true if the rule shows a warning when input fails data validation, or false if it rejects the input entirely. |
| getCriteriaType() | DataValidationCriteria | Gets the rule's criteria type as defined in the DataValidationCriteria enum. |
| getCriteriaValues() | Object[] | Gets an array of arguments for the rule's criteria. |
| getHelpText() | String | Gets the rule's help text, or null if no help text is set. |

## DataValidationBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| build() | DataValidation | Constructs a data validation rule from the settings applied to the builder. |
| copy() | DataValidationBuilder | Creates a builder for a data validation rule based on this rule's settings. |
| getAllowInvalid() | Boolean | Returns true if the rule shows a warning when input fails data validation, or false if it rejects the input entirely. |
| getCriteriaType() | DataValidationCriteria | Gets the rule's criteria type as defined in the DataValidationCriteria enum. |
| getCriteriaValues() | Object[] | Gets an array of arguments for the rule's criteria. |
| getHelpText() | String | Gets the rule's help text, or null if no help text is set. |
| requireCheckbox() | DataValidationBuilder | Sets the data validation rule to require that the input is a boolean value; this value is rendered as a checkbox. |
| requireCheckbox(checkedValue) | DataValidationBuilder | Sets the data validation rule to require that the input is the specified value or blank. |
| requireCheckbox(checkedValue, uncheckedValue) | DataValidationBuilder | Sets the data validation rule to require that the input is one of the specified values. |
| requireDate() | DataValidationBuilder | Sets the data validation rule to require a date. |
| requireDateAfter(date) | DataValidationBuilder | Sets the data validation rule to require a date after the given value. |
| requireDateBefore(date) | DataValidationBuilder | Sets the data validation rule to require a date before the given value. |
| requireDateBetween(start, end) | DataValidationBuilder | Sets the data validation rule to require a date that falls between, or is either of, two specified dates. |
| requireDateEqualTo(date) | DataValidationBuilder | Sets the data validation rule to require a date equal to the given value. |
| requireDateNotBetween(start, end) | DataValidationBuilder | Sets the data validation rule to require a date that does not fall between, and is neither of, two specified dates. |
| requireDateOnOrAfter(date) | DataValidationBuilder | Sets the data validation rule to require a date on or after the given value. |
| requireDateOnOrBefore(date) | DataValidationBuilder | Sets the data validation rule to require a date on or before the given value. |
| requireFormulaSatisfied(formula) | DataValidationBuilder | Sets the data validation rule to require that the given formula evaluates to true. |
| requireNumberBetween(start, end) | DataValidationBuilder | Sets the data validation rule to require a number that falls between, or is either of, two specified numbers. |
| requireNumberEqualTo(number) | DataValidationBuilder | Sets the data validation rule to require a number equal to the given value. |
| requireNumberGreaterThan(number) | DataValidationBuilder | Sets the data validation rule to require a number greater than the given value. |
| requireNumberGreaterThanOrEqualTo(number) | DataValidationBuilder | Sets the data validation rule to require a number greater than or equal to the given value. |
| requireNumberLessThan(number) | DataValidationBuilder | Sets the data validation rule to require a number less than the given value. |
| requireNumberLessThanOrEqualTo(number) | DataValidationBuilder | Sets the data validation rule to require a number less than or equal to the given value. |
| requireNumberNotBetween(start, end) | DataValidationBuilder | Sets the data validation rule to require a number that does not fall between, and is neither of, two specified numbers. |
| requireNumberNotEqualTo(number) | DataValidationBuilder | Sets the data validation rule to require a number not equal to the given value. |
| requireTextContains(text) | DataValidationBuilder | Sets the data validation rule to require that the input contains the given value. |
| requireTextDoesNotContain(text) | DataValidationBuilder | Sets the data validation rule to require that the input does not contain the given value. |
| requireTextEqualTo(text) | DataValidationBuilder | Sets the data validation rule to require that the input is equal to the given value. |
| requireTextIsEmail() | DataValidationBuilder | Sets the data validation rule to require that the input is in the form of an email address. |
| requireTextIsUrl() | DataValidationBuilder | Sets the data validation rule to require that the input is in the form of a URL. |
| requireValueInList(values) | DataValidationBuilder | Sets the data validation rule to require that the input is equal to one of the given values. |
| requireValueInList(values, showDropdown) | DataValidationBuilder | Sets the data validation rule to require that the input is equal to one of the given values, with an option to hide the dropdown menu. |
| requireValueInRange(range) | DataValidationBuilder | Sets the data validation rule to require that the input is equal to a value in the given range. |
| requireValueInRange(range, showDropdown) | DataValidationBuilder | Sets the data validation rule to require that the input is equal to a value in the given range, with an option to hide the dropdown menu. |
| setAllowInvalid(allowInvalidData) | DataValidationBuilder | Sets whether to show a warning when input fails data validation or whether to reject the input entirely. |
| setHelpText(helpText) | DataValidationBuilder | Sets the help text that appears when the user hovers over the cell on which data validation is set. |
| withCriteria(criteria, args) | DataValidationBuilder | Sets the data validation rule to criteria defined by DataValidationCriteria values, typically taken from the criteria and arguments of an existing rule. |

## DataValidationCriteria

### Properties

| Property	| Type	| Description
| --- | --- | ---
| DATE_AFTER	| Enum	| Requires a date that is after the given value. |
| DATE_BEFORE	| Enum	| Requires a date that is before the given value. |
| DATE_BETWEEN	| Enum	| Requires a date that is between the given values. |
| DATE_EQUAL_TO	| Enum	| Requires a date that is equal to the given value. |
| DATE_IS_VALID_DATE	| Enum	| Requires a date. |
| DATE_NOT_BETWEEN 	| Enum	| Requires a date that is not between the given values. |
| DATE_ON_OR_AFTER	| Enum	| Require a date that is on or after the given value. |
| DATE_ON_OR_BEFORE	| Enum	| Requires a date that is on or before the given value. |
| NUMBER_BETWEEN	| Enum	| Requires a number that is between the given values. |
| NUMBER_EQUAL_TO	| Enum	| Requires a number that is equal to the given value. |
| NUMBER_GREATER_THAN	| Enum	| Require a number that is greater than the given value. |
| NUMBER_GREATER_THAN_OR_EQUAL_TO	| Enum	| Requires a number that is greater than or equal to the given value. |
| NUMBER_LESS_THAN	| Enum	| Requires a number that is less than the given value. |
| NUMBER_LESS_THAN_OR_EQUAL_TO	| Enum	| Requires a number that is less than or equal to the given value. |
| NUMBER_NOT_BETWEEN	| Enum	| Requires a number that is not between the given values. |
| NUMBER_NOT_EQUAL_TO	| Enum	| Requires a number that is not equal to the given value. |
| TEXT_CONTAINS	| Enum	| Requires that the input contains the given value. |
| TEXT_DOES_NOT_CONTAIN	| Enum	| Requires that the input does not contain the given value. |
| TEXT_EQUAL_TO	| Enum	| Requires that the input is equal to the given value. |
| TEXT_IS_VALID_EMAIL	| Enum	| Requires that the input is in the form of an email address. |
| TEXT_IS_VALID_URL	| Enum	| Requires that the input is in the form of a URL. |
| VALUE_IN_LIST	| Enum	| Requires that the input is equal to one of the given values. |
| VALUE_IN_RANGE	| Enum	| Requires that the input is equal to a value in the given range. |
| CUSTOM_FORMULA	| Enum	| Requires that the input makes the given formula evaluate to true. |
| CHECKBOX	| Enum	| Requires that the input is a custom value or a boolean; rendered as a checkbox. |
| DATE_AFTER_RELATIVE	| Enum	| Requires a date that is after the relative date value. |
| DATE_BEFORE_RELATIVE	| Enum	| Requires a date that is before the relative date value. |
| DATE_EQUAL_TO_RELATIVE	| Enum	| Requires a date that is equal to the relative date value. |

## DateTimeGroupingRule

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getRuleType()	| DateTimeGroupingRuleType	| Gets the type of the date-time grouping rule. |

## DateTimeGroupingRuleType

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| UNSUPPORTED	| Enum	| A date-time grouping rule type that is not supported. |
| SECOND	| Enum	| Group date-time by second, from 0 to 59. |
| MINUTE	| Enum	| Group date-time by minute, from 0 to 59. |
| HOUR	| Enum	| Group date-time by hour using a 24-hour system, from 0 to 23. |
| HOUR_MINUTE	| Enum	| Group date-time by hour and minute using a 24-hour system, for example 19:45. |
| HOUR_MINUTE_AMPM	| Enum	| Group date-time by hour and minute using a 12-hour system, for example 7:45 PM. |
| DAY_OF_WEEK	| Enum	| Group date-time by day of week, for example Sunday. |
| DAY_OF_YEAR	| Enum	| Group date-time by day of year, from 1 to 366. |
| DAY_OF_MONTH	| Enum	| Group date-time by day of month, from 1 to 31. |
| DAY_MONTH	| Enum	| Group date-time by day and month, for example 22-Nov. |
| MONTH	| Enum	| Group date-time by month, for example Nov. |
| QUARTER	| Enum	| Group date-time by quarter, for example Q1 (which represents Jan-Mar). |
| YEAR	| Enum	| Group date-time by year, for example 2008. |
| YEAR_MONTH	| Enum	| Group date-time by year and month, for example 2008-Nov. |
| YEAR_QUARTER	| Enum	| Group date-time by year and quarter, for example 2008 Q4 . |
| YEAR_MONTH_DAY	| Enum	| Group date-time by year, month, and day, for example 2008-11-22. |

## DeveloperMetadata

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getId()	| Integer	| Returns the unique ID associated with this developer metadata. |
| getKey()	| String	| Returns the key associated with this developer metadata. |
| getLocation()	| DeveloperMetadataLocation	| Returns the location of this developer metadata. |
| getValue()	| String	| Returns the value associated with this developer metadata, or null if this metadata has no value. |
| getVisibility()	| DeveloperMetadataVisibility	| Returns the visibility of this developer metadata. |
| moveToColumn(column)	| DeveloperMetadata	| Moves this developer metadata to the specified column. |
| moveToRow(row)	| DeveloperMetadata	| Moves this developer metadata to the specified row. |
| moveToSheet(sheet)	| DeveloperMetadata	| Moves this developer metadata to the specified sheet. |
| moveToSpreadsheet()	| DeveloperMetadata	| Moves this developer metadata to the top-level spreadsheet. |
| remove()	| void	| Deletes this metadata. |
| setKey(key)	| DeveloperMetadata	| Sets the key of this developer metadata to the specified value. |
| setValue(value)	| DeveloperMetadata	| Sets the value associated with this developer metadata to the specified value. |
| setVisibility(visibility)	| DeveloperMetadata	| Sets the visibility of this developer metadata to the specified visibility. |

## DeveloperMetadataFinder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| find()	| DeveloperMetadata[]	| Executes this search and returns the matching metadata. |
| onIntersectingLocations()	| DeveloperMetadataFinder	| Configures the search to consider intersecting locations that have metadata. |
| withId(id)	| DeveloperMetadataFinder	| Limits this search to consider only metadata that match the specified ID. |
| withKey(key)	| DeveloperMetadataFinder	| Limits this search to consider only metadata that match the specified key. |
| withLocationType(locationType)	| DeveloperMetadataFinder	| Limits this search to consider only metadata that match the specified location type. |
| withValue(value)	| DeveloperMetadataFinder	| Limits this search to consider only metadata that match the specified value. |
| withVisibility(visibility)	| DeveloperMetadataFinder	| Limits this search to consider only metadata that match the specified visibility. |

## DeveloperMetadataLocation

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getColumn()	| Range	| Returns the Range for the column location of this metadata, or null if the location type is not DeveloperMetadataLocationType.COLUMN. |
| getLocationType()	| DeveloperMetadataLocationType	| Gets the type of location. |
| getRow()	| Range	| Returns the Range for the row location of this metadata, or null if the location type is not DeveloperMetadataLocationType.ROW. |
| getSheet()	| Sheet	| Returns the Sheet location of this metadata, or null if the location type is not DeveloperMetadataLocationType.SHEET. |
| getSpreadsheet()	| Spreadsheet	| Returns the Spreadsheet location of this metadata, or null if the location type is not DeveloperMetadataLocationType.SPREADSHEET. |

## DeveloperMetadataLocationType

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| SPREADSHEET	| Enum	| The location type for developer metadata associated with the top-level spreadsheet. |
| SHEET	| Enum	| The location type for developer metadata associated with a whole sheet. |
| ROW	| Enum	| The location type for developer metadata associated with a row. |
| COLUMN	| Enum	| The location type for developer metadata associated with a column. |

## DeveloperMetadataVisibility

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| DOCUMENT	| Enum	| Document-visible metadata is accessible from any developer project with access to the document. |
| PROJECT	| Enum	| Project-visible metadata is only visible to and accessible by the developer project that created the metadata. |

## Dimension

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| COLUMNS	| Enum	| The column (vertical) dimension. |
| ROWS	| Enum	| The row (horizontal) dimension. |

## Direction

### Properties

| Property	| Type	| Description |
| --- | --- | --- |
| UP	| Enum	| The direction of decreasing row indices. |
| DOWN	| Enum	| The direction of increasing row indices. |
| PREVIOUS	| Enum	| The direction of decreasing column indices. |
| NEXT	| Enum	| The direction of increasing column indices. |

## Drawing

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| getContainerInfo()	| ContainerInfo	| Gets information about where the drawing is positioned in the sheet. |
| getHeight()	| Integer	| Returns the actual height of this drawing in pixels. |
| getOnAction()	| String	| Returns the name of the macro attached to this drawing. |
| getSheet()	| Sheet	| Returns the sheet this drawing appears on. |
| getWidth()	| Integer	| Returns the actual width of this drawing in pixels. |
| getZIndex()	| Number	| Returns the z-index of this drawing. |
| remove()	| void	| Deletes this drawing from the spreadsheet. |
| setHeight(height)	| Drawing	| Sets the actual height of this drawing in pixels. |
| setOnAction(macroName)	| Drawing	| Assigns a macro function to this drawing. |
| setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	| Drawing	| Sets the position where the drawing appears on the sheet. |
| setWidth(width)	| Drawing	| Sets the actual width of this drawing in pixels. |
| setZIndex(zIndex)	| Drawing	| Sets the z-index of this drawing. |

## EmbeddedAreaChartBuilder

### Methods

| Method	| Return type	| Brief description |
| --- | --- | --- |
| addRange(range)	| EmbeddedChartBuilder	| Adds a range to the chart this builder modifies. |
| asAreaChart()	| EmbeddedAreaChartBuilder	| Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder. |
| asBarChart()	| EmbeddedBarChartBuilder	| Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder. |
| asColumnChart()	| EmbeddedColumnChartBuilder	| Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder. |
| asComboChart()	| EmbeddedComboChartBuilder	| Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder. |
| asHistogramChart()	| EmbeddedHistogramChartBuilder	| Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder. |
| asLineChart()	| EmbeddedLineChartBuilder	| Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder. |
| asPieChart()	| EmbeddedPieChartBuilder	| Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder. |
| asScatterChart()	| EmbeddedScatterChartBuilder	| Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder. |
| asTableChart()	| EmbeddedTableChartBuilder	| Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder. |
| build()	| EmbeddedChart	| Builds the chart to reflect all changes made to it. |
| clearRanges()	| EmbeddedChartBuilder	| Removes all ranges from the chart this builder modifies. |
| getChartType()	| ChartType	| Returns the current chart type. |
| getContainer()	| ContainerInfo	| Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet. |
| getRanges()	| Range[]	| Returns a copy of the list of ranges currently providing data for this chart. |
| removeRange(range)	| EmbeddedChartBuilder	| Removes the specified range from the chart this builder modifies. |
| reverseCategories()	| EmbeddedAreaChartBuilder	| Reverses the drawing of series in the domain axis. |
| setBackgroundColor(cssValue)	| EmbeddedAreaChartBuilder	| Sets the background color for the chart. |
| setChartType(type)	| EmbeddedChartBuilder	| Changes the type of chart. |
| setColors(cssValues)	| EmbeddedAreaChartBuilder	| Sets the colors for the lines in the chart. |
| setHiddenDimensionStrategy(strategy)	| EmbeddedChartBuilder	| Sets the strategy to use for hidden rows and columns. |
| setLegendPosition(position)	|EmbeddedAreaChartBuilder	| Sets the position of the legend with respect to the chart. |
| setLegendTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the text style of the chart legend. |
| setMergeStrategy(mergeStrategy)	|EmbeddedChartBuilder	| Sets the merge strategy to use when more than one range exists. |
| setNumHeaders(headers)	|EmbeddedChartBuilder	| Sets the number of rows or columns of the range that should be treated as headers. |
| setOption(option, value)	|EmbeddedChartBuilder	| Sets advanced options for this chart. |
| setPointStyle(style)	|EmbeddedAreaChartBuilder	| Sets the style for points in the line. |
| setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	|EmbeddedChartBuilder	| Sets the position, changing where the chart appears on the sheet. |
| setRange(start, end)	|EmbeddedAreaChartBuilder	| Sets the range for the chart. |
| setStacked()	|EmbeddedAreaChartBuilder	| Uses stacked lines, meaning that line and bar values are stacked (accumulated). |
| setTitle(chartTitle)	|EmbeddedAreaChartBuilder	| Sets the title of the chart. |
| setTitleTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the text style of the chart title. |
| setTransposeRowsAndColumns(transpose)	|EmbeddedChartBuilder	| Sets whether the chart's rows and columns are transposed. |
| setXAxisTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the horizontal axis text style. |
| setXAxisTitle(title)	|EmbeddedAreaChartBuilder	| Adds a title to the horizontal axis. |
| setXAxisTitleTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the horizontal axis title text style. |
| setYAxisTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the vertical axis text style. |
| setYAxisTitle(title)	|EmbeddedAreaChartBuilder	| Adds a title to the vertical axis. |
| setYAxisTitleTextStyle(textStyle)	|EmbeddedAreaChartBuilder	| Sets the vertical axis title text style. |
| useLogScale()	|EmbeddedAreaChartBuilder	| Makes the range axis into a logarithmic scale (requires all values to be positive). |

## EmbeddedBarChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
| addRange(range) | EmbeddedChartBuilder | Adds a range to the chart this builder modifies. |
| asAreaChart()	| EmbeddedAreaChartBuilder	| Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder. |
| asBarChart()	|EmbeddedBarChartBuilder	|Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder. |
| asColumnChart()	|EmbeddedColumnChartBuilder	|Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder. |
| asComboChart()	|EmbeddedComboChartBuilder	|Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder. |
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedBarChartBuilder	Reverses the drawing of series in the domain axis.
reverseDirection()	EmbeddedBarChartBuilder	Reverses the direction in which the bars grow along the horizontal axis.
setBackgroundColor(cssValue)	EmbeddedBarChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedBarChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedBarChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setRange(start, end)	EmbeddedBarChartBuilder	Sets the range for the chart.
setStacked()	EmbeddedBarChartBuilder	Uses stacked lines, meaning that line and bar values are stacked (accumulated).
setTitle(chartTitle)	EmbeddedBarChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedBarChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the horizontal axis title text style.
setYAxisTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedBarChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedBarChartBuilder	Sets the vertical axis title text style.
useLogScale()	EmbeddedBarChartBuilder	Makes the range axis into a logarithmic scale (requires all values to be positive).

## EmbeddedChart

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
asDataSourceChart()	DataSourceChart	Casts to a data source chart instance if the chart is a data source chart, or null otherwise.
getAs(contentType)	Blob	Return the data inside this object as a blob converted to the specified content type.
getBlob()	Blob	Return the data inside this object as a blob.
getChartId()	Integer	Returns a stable identifier for the chart that is unique across the spreadsheet containing the chart or null if the chart is not in a spreadsheet.
getContainerInfo()	ContainerInfo	Returns information about where the chart is positioned within a sheet.
getHiddenDimensionStrategy()	ChartHiddenDimensionStrategy	Returns the strategy to use for handling hidden rows and columns.
getMergeStrategy()	ChartMergeStrategy	Returns the merge strategy used when more than one range exists.
getNumHeaders()	Integer	Returns the number of rows or columns the range that are treated as headers.
getOptions()	ChartOptions	Returns the options for this chart, such as height, colors, and axes.
getRanges()	Range[]	Returns the ranges that this chart uses as a data source.
getTransposeRowsAndColumns()	Boolean	If true, the rows and columns used to populate the chart are switched.
modify()	EmbeddedChartBuilder	Returns an EmbeddedChartBuilder that can be used to modify this chart.

## EmbeddedChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.

## EmbeddedColumnChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedColumnChartBuilder	Reverses the drawing of series in the domain axis.
setBackgroundColor(cssValue)	EmbeddedColumnChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedColumnChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedColumnChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setRange(start, end)	EmbeddedColumnChartBuilder	Sets the range for the chart.
setStacked()	EmbeddedColumnChartBuilder	Uses stacked lines, meaning that line and bar values are stacked (accumulated).
setTitle(chartTitle)	EmbeddedColumnChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedColumnChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the horizontal axis title text style.
setYAxisTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedColumnChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedColumnChartBuilder	Sets the vertical axis title text style.
useLogScale()	EmbeddedColumnChartBuilder	Makes the range axis into a logarithmic scale (requires all values to be positive).

## EmbeddedComboChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedComboChartBuilder	Reverses the drawing of series in the domain axis.
setBackgroundColor(cssValue)	EmbeddedComboChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedComboChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedComboChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setRange(start, end)	EmbeddedComboChartBuilder	Sets the range for the chart.
setStacked()	EmbeddedComboChartBuilder	Uses stacked lines, meaning that line and bar values are stacked (accumulated).
setTitle(chartTitle)	EmbeddedComboChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedComboChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the horizontal axis title text style.
setYAxisTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedComboChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedComboChartBuilder	Sets the vertical axis title text style.
useLogScale()	EmbeddedComboChartBuilder	Makes the range axis into a logarithmic scale (requires all values to be positive).

## EmbeddedHistogramChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedHistogramChartBuilder	Reverses the drawing of series in the domain axis.
setBackgroundColor(cssValue)	EmbeddedHistogramChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedHistogramChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedHistogramChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setRange(start, end)	EmbeddedHistogramChartBuilder	Sets the range for the chart.
setStacked()	EmbeddedHistogramChartBuilder	Uses stacked lines, meaning that line and bar values are stacked (accumulated).
setTitle(chartTitle)	EmbeddedHistogramChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedHistogramChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the horizontal axis title text style.
setYAxisTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedHistogramChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedHistogramChartBuilder	Sets the vertical axis title text style.
useLogScale()	EmbeddedHistogramChartBuilder	Makes the range axis into a logarithmic scale (requires all values to be positive).

## EmbeddedLineChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedLineChartBuilder	Reverses the drawing of series in the domain axis.
setBackgroundColor(cssValue)	EmbeddedLineChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedLineChartBuilder	Sets the colors for the lines in the chart.
setCurveStyle(style)	EmbeddedLineChartBuilder	Sets the style to use for curves in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedLineChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPointStyle(style)	EmbeddedLineChartBuilder	Sets the style for points in the line.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setRange(start, end)	EmbeddedLineChartBuilder	Sets the range for the chart.
setTitle(chartTitle)	EmbeddedLineChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedLineChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the horizontal axis title text style.
setYAxisTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedLineChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedLineChartBuilder	Sets the vertical axis title text style.
useLogScale()	EmbeddedLineChartBuilder	Makes the range axis into a logarithmic scale (requires all values to be positive).

## EmbeddedPieChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
reverseCategories()	EmbeddedPieChartBuilder	Reverses the drawing of series in the domain axis.
set3D()	EmbeddedPieChartBuilder	Sets the chart to be three-dimensional.
setBackgroundColor(cssValue)	EmbeddedPieChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedPieChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedPieChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedPieChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setTitle(chartTitle)	EmbeddedPieChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedPieChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.

## EmbeddedScatterChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
setBackgroundColor(cssValue)	EmbeddedScatterChartBuilder	Sets the background color for the chart.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setColors(cssValues)	EmbeddedScatterChartBuilder	Sets the colors for the lines in the chart.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setLegendPosition(position)	EmbeddedScatterChartBuilder	Sets the position of the legend with respect to the chart.
setLegendTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the text style of the chart legend.
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPointStyle(style)	EmbeddedScatterChartBuilder	Sets the style for points in the line.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setTitle(chartTitle)	EmbeddedScatterChartBuilder	Sets the title of the chart.
setTitleTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the text style of the chart title.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
setXAxisLogScale()	EmbeddedScatterChartBuilder	Makes the horizontal axis into a logarithmic scale (requires all values to be positive).
setXAxisRange(start, end)	EmbeddedScatterChartBuilder	Sets the range for the horizontal axis of the chart.
setXAxisTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the horizontal axis text style.
setXAxisTitle(title)	EmbeddedScatterChartBuilder	Adds a title to the horizontal axis.
setXAxisTitleTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the horizontal axis title text style.
setYAxisLogScale()	EmbeddedScatterChartBuilder	Makes the vertical axis into a logarithmic scale (requires all values to be positive).
setYAxisRange(start, end)	EmbeddedScatterChartBuilder	Sets the range for the vertical axis of the chart.
setYAxisTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the vertical axis text style.
setYAxisTitle(title)	EmbeddedScatterChartBuilder	Adds a title to the vertical axis.
setYAxisTitleTextStyle(textStyle)	EmbeddedScatterChartBuilder	Sets the vertical axis title text style.

## EmbeddedTableChartBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addRange(range)	EmbeddedChartBuilder	Adds a range to the chart this builder modifies.
asAreaChart()	EmbeddedAreaChartBuilder	Sets the chart type to AreaChart and returns an EmbeddedAreaChartBuilder.
asBarChart()	EmbeddedBarChartBuilder	Sets the chart type to BarChart and returns an EmbeddedBarChartBuilder.
asColumnChart()	EmbeddedColumnChartBuilder	Sets the chart type to ColumnChart and returns an EmbeddedColumnChartBuilder.
asComboChart()	EmbeddedComboChartBuilder	Sets the chart type to ComboChart and returns an EmbeddedComboChartBuilder.
asHistogramChart()	EmbeddedHistogramChartBuilder	Sets the chart type to HistogramChart and returns an EmbeddedHistogramChartBuilder.
asLineChart()	EmbeddedLineChartBuilder	Sets the chart type to LineChart and returns an EmbeddedLineChartBuilder.
asPieChart()	EmbeddedPieChartBuilder	Sets the chart type to PieChart and returns an EmbeddedPieChartBuilder.
asScatterChart()	EmbeddedScatterChartBuilder	Sets the chart type to ScatterChart and returns an EmbeddedScatterChartBuilder.
asTableChart()	EmbeddedTableChartBuilder	Sets the chart type to TableChart and returns an EmbeddedTableChartBuilder.
build()	EmbeddedChart	Builds the chart to reflect all changes made to it.
clearRanges()	EmbeddedChartBuilder	Removes all ranges from the chart this builder modifies.
enablePaging(enablePaging)	EmbeddedTableChartBuilder	Sets whether to enable paging through the data.
enablePaging(pageSize)	EmbeddedTableChartBuilder	Enables paging and sets the number of rows in each page.
enablePaging(pageSize, startPage)	EmbeddedTableChartBuilder	Enables paging, sets the number of rows in each page and the first table page to display (page numbers are zero based).
enableRtlTable(rtlEnabled)	EmbeddedTableChartBuilder	Adds basic support for right-to-left languages (such as Arabic or Hebrew) by reversing the column order of the table, so that column zero is the right-most column, and the last column is the left-most column.
enableSorting(enableSorting)	EmbeddedTableChartBuilder	Sets whether to sort columns when the user clicks a column heading.
getChartType()	ChartType	Returns the current chart type.
getContainer()	ContainerInfo	Return the chart ContainerInfo, which encapsulates where the chart appears on the sheet.
getRanges()	Range[]	Returns a copy of the list of ranges currently providing data for this chart.
removeRange(range)	EmbeddedChartBuilder	Removes the specified range from the chart this builder modifies.
setChartType(type)	EmbeddedChartBuilder	Changes the type of chart.
setFirstRowNumber(number)	EmbeddedTableChartBuilder	Sets the row number for the first row in the data table.
setHiddenDimensionStrategy(strategy)	EmbeddedChartBuilder	Sets the strategy to use for hidden rows and columns.
setInitialSortingAscending(column)	EmbeddedTableChartBuilder	Sets the index of the column according to which the table should be initially sorted (ascending).
setInitialSortingDescending(column)	EmbeddedTableChartBuilder	Sets the index of the column according to which the table should be initially sorted (descending).
setMergeStrategy(mergeStrategy)	EmbeddedChartBuilder	Sets the merge strategy to use when more than one range exists.
setNumHeaders(headers)	EmbeddedChartBuilder	Sets the number of rows or columns of the range that should be treated as headers.
setOption(option, value)	EmbeddedChartBuilder	Sets advanced options for this chart.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	EmbeddedChartBuilder	Sets the position, changing where the chart appears on the sheet.
setTransposeRowsAndColumns(transpose)	EmbeddedChartBuilder	Sets whether the chart's rows and columns are transposed.
showRowNumberColumn(showRowNumber)	EmbeddedTableChartBuilder	Sets whether to show the row number as the first column of the table.
useAlternatingRowStyle(alternate)	EmbeddedTableChartBuilder	Sets whether alternating color style is assigned to odd and even rows of a table chart.

## Filter

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getColumnFilterCriteria(columnPosition)	FilterCriteria	Gets the filter criteria on the specified column, or null if the column doesn't have filter criteria applied to it.
getRange()	Range	Gets the range this filter applies to.
remove()	void	Removes this filter.
removeColumnFilterCriteria(columnPosition)	Filter	Removes the filter criteria from the specified column.
setColumnFilterCriteria(columnPosition, filterCriteria)	Filter	Sets the filter criteria on the specified column.
sort(columnPosition, ascending)	Filter	Sorts the filtered range by the specified column, excluding the first row (the header row) in the range this filter applies to.

## FilterCriteria

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
copy()	FilterCriteriaBuilder	Copies this filter criteria and creates a criteria builder that you can apply to another filter.
getCriteriaType()	BooleanCriteria	Returns the criteria's boolean type, for example, CELL_EMPTY.
getCriteriaValues()	Object[]	Returns an array of arguments for boolean criteria.
getHiddenValues()	String[]	Returns the values that the filter hides.
getVisibleBackgroundColor()	Color	Returns the background color used as filter criteria.
getVisibleForegroundColor()	Color	Returns the foreground color used as a filter criteria.
getVisibleValues()	String[]	Returns the values that the pivot table filter shows.

## FilterCriteriaBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
build()	FilterCriteria	Assembles the filter criteria using the settings you add to the criteria builder.
copy()	FilterCriteriaBuilder	Copies this filter criteria and creates a criteria builder that you can apply to another filter.
getCriteriaType()	BooleanCriteria	Returns the criteria's boolean type, for example, CELL_EMPTY.
getCriteriaValues()	Object[]	Returns an array of arguments for boolean criteria.
getHiddenValues()	String[]	Returns the values that the filter hides.
getVisibleBackgroundColor()	Color	Returns the background color used as filter criteria.
getVisibleForegroundColor()	Color	Returns the foreground color used as a filter criteria.
getVisibleValues()	String[]	Returns the values that the pivot table filter shows.
setHiddenValues(values)	FilterCriteriaBuilder	Sets the values to hide.
setVisibleBackgroundColor(visibleBackgroundColor)	FilterCriteriaBuilder	Sets the background color used as filter criteria.
setVisibleForegroundColor(visibleForegroundColor)	FilterCriteriaBuilder	Sets the foreground color used as filter criteria.
setVisibleValues(values)	FilterCriteriaBuilder	Sets the values to show on a pivot table.
whenCellEmpty()	FilterCriteriaBuilder	Sets the filter criteria to show empty cells.
whenCellNotEmpty()	FilterCriteriaBuilder	Sets the filter criteria to show cells that aren't empty.
whenDateAfter(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are after the specified date.
whenDateAfter(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are after the specified relative date.
whenDateBefore(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are before the specified date.
whenDateBefore(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are before the specified relative date.
whenDateEqualTo(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are equal to the specified date.
whenDateEqualTo(date)	FilterCriteriaBuilder	Sets filter criteria that shows cells with dates that are equal to the specified relative date.
whenDateEqualToAny(dates)	FilterCriteriaBuilder	Sets the filter criteria to show cells with dates that are equal to any of the specified dates.
whenDateNotEqualTo(date)	FilterCriteriaBuilder	Sets the filter criteria to show cells that aren't equal to the specified date.
whenDateNotEqualToAny(dates)	FilterCriteriaBuilder	Sets the filter criteria to show cells with dates that aren't equal to any of the specified dates.
whenFormulaSatisfied(formula)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a specified formula (such as =B:B<C:C) that evaluates to true.
whenNumberBetween(start, end)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that falls between, or is either of, 2 specified numbers.
whenNumberEqualTo(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that's equal to the specified number.
whenNumberEqualToAny(numbers)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that's equal to any of the specified numbers.
whenNumberGreaterThan(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number greater than the specified number
whenNumberGreaterThanOrEqualTo(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number greater than or equal to the specified number.
whenNumberLessThan(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that's less than the specified number.
whenNumberLessThanOrEqualTo(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number less than or equal to the specified number.
whenNumberNotBetween(start, end)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number doesn't fall between, and is neither of, 2 specified numbers.
whenNumberNotEqualTo(number)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that isn't equal to the specified number.
whenNumberNotEqualToAny(numbers)	FilterCriteriaBuilder	Sets the filter criteria to show cells with a number that isn't equal to any of the specified numbers.
whenTextContains(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that contains the specified text.
whenTextDoesNotContain(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that doesn't contain the specified text.
whenTextEndsWith(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that ends with the specified text.
whenTextEqualTo(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that's equal to the specified text.
whenTextEqualToAny(texts)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that's equal to any of the specified text values.
whenTextNotEqualTo(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that isn't equal to the specified text.
whenTextNotEqualToAny(texts)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that isn't equal to any of the specified values.
whenTextStartsWith(text)	FilterCriteriaBuilder	Sets the filter criteria to show cells with text that starts with the specified text.
withCriteria(criteria, args)	FilterCriteriaBuilder	Sets the filter criteria to a boolean condition defined by BooleanCriteria values, such as CELL_EMPTY or NUMBER_GREATER_THAN.

## FrequencyType

### Properties

Property	Type	Description
FREQUENCY_TYPE_UNSUPPORTED	Enum	The frequency type is unsupported.
DAILY	Enum	Refresh daily.
WEEKLY	Enum	Refresh weekly, on given days of the week.
MONTHLY	Enum	Refresh monthly, on given days of the month.

## GradientCondition

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getMaxColorObject()	Color	Gets the color set for the maximum value of this gradient condition.
getMaxType()	InterpolationType	Gets the interpolation type for the maximum value of this gradient condition.
getMaxValue()	String	Gets the max value of this gradient condition.
getMidColorObject()	Color	Gets the color set for the midpoint value of this gradient condition.
getMidType()	InterpolationType	Gets the interpolation type for the midpoint value of this gradient condition.
getMidValue()	String	Gets the midpoint value of this gradient condition.
getMinColorObject()	Color	Gets the color set for the minimum value of this gradient condition.
getMinType()	InterpolationType	Gets the interpolation type for the minimum value of this gradient condition.
getMinValue()	String	Gets the minimum value of this gradient condition.

## Group

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
collapse()	Group	Collapses this group.
expand()	Group	Expands this group.
getControlIndex()	Integer	Returns the control toggle index of this group.
getDepth()	Integer	Returns the depth of this group.
getRange()	Range	Returns the range over which this group exists.
isCollapsed()	Boolean	Returns true if this group is collapsed.
remove()	void	Removes this group from the sheet, reducing the group depth of the range by one.

## GroupControlTogglePosition

### Properties

Property	Type	Description
BEFORE	Enum	The position where the control toggle is before the group (at lower indices).
AFTER	Enum	The position where the control toggle is after the group (at higher indices).

## InterpolationType

### Properties

Property	Type	Description
NUMBER	Enum	Use the number as as specific interpolation point for a gradient condition.
PERCENT	Enum	Use the number as a percentage interpolation point for a gradient condition.
PERCENTILE	Enum	Use the number as a percentile interpolation point for a gradient condition.
MIN	Enum	Infer the minimum number as a specific interpolation point for a gradient condition.
MAX	Enum	Infer the maximum number as a specific interpolation point for a gradient condition.

## LookerDataSourceSpec

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
copy()	DataSourceSpecBuilder	Creates a DataSourceSpecBuilder based on this data source's settings.
getExploreName()	String	Gets the name of the Looker explore in the model.
getInstanceUrl()	String	Gets the URL of the Looker instance.
getModelName()	String	Gets the name of the Looker model in the instance.
getParameters()	DataSourceParameter[]	Gets the parameters of the data source.
getType()	DataSourceType	Gets the type of the data source.

## LookerDataSourceSpecBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
build()	DataSourceSpec	Builds a data source specification from the settings in this builder.
copy()	DataSourceSpecBuilder	Creates a DataSourceSpecBuilder based on this data source's settings.
getExploreName()	String	Gets the name of the Looker explore in the model.
getInstanceUrl()	String	Gets the URL of the Looker instance.
getModelName()	String	Gets the name of the Looker model in the instance.
getParameters()	DataSourceParameter[]	Gets the parameters of the data source.
getType()	DataSourceType	Gets the type of the data source.
removeAllParameters()	LookerDataSourceSpecBuilder	Removes all the parameters.
removeParameter(parameterName)	LookerDataSourceSpecBuilder	Removes the specified parameter.
setExploreName(exploreName)	LookerDataSourceSpecBuilder	Sets the explore name in the Looker model.
setInstanceUrl(instanceUrl)	LookerDataSourceSpecBuilder	Sets the instance URL for Looker.
setModelName(modelName)	LookerDataSourceSpecBuilder	Sets the Looker model name in the Looker instance.
setParameterFromCell(parameterName, sourceCell)	LookerDataSourceSpecBuilder	Adds a parameter, or if the parameter with the name exists, updates its source cell for data source spec builders of type DataSourceType.BIGQUERY.

## NamedRange

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getName()	String	Gets the name of this named range.
getRange()	Range	Gets the range referenced by this named range.
remove()	void	Deletes this named range.
setName(name)	NamedRange	Sets/updates the name of the named range.
setRange(range)	NamedRange	Sets/updates the range for this named range.

## OverGridImage

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
assignScript(functionName)	OverGridImage	Assigns the function with the specified function name to this image.
getAltTextDescription()	String	Returns the alt text description for this image.
getAltTextTitle()	String	Returns the alt text title for this image.
getAnchorCell()	Range	Returns the cell where an image is anchored.
getAnchorCellXOffset()	Integer	Returns the horizontal pixel offset from the anchor cell.
getAnchorCellYOffset()	Integer	Returns the vertical pixel offset from the anchor cell.
getHeight()	Integer	Returns the actual height of this image in pixels.
getInherentHeight()	Integer	Returns the inherent height of this image in pixels.
getInherentWidth()	Integer	Returns the inherent height of this image in pixels.
getScript()	String	Returns the name of the function assigned to this image.
getSheet()	Sheet	Returns the sheet this image appears on.
getWidth()	Integer	Returns the actual width of this image in pixels.
remove()	void	Deletes this image from the spreadsheet.
replace(blob)	OverGridImage	Replaces this image with the one specified by the provided BlobSource.
replace(url)	OverGridImage	Replaces this image with the one from the specified URL.
resetSize()	OverGridImage	Resets this image to its inherent dimensions.
setAltTextDescription(description)	OverGridImage	Sets the alt-text description for this image.
setAltTextTitle(title)	OverGridImage	Sets the alt text title for this image.
setAnchorCell(cell)	OverGridImage	Sets the cell where an image is anchored.
setAnchorCellXOffset(offset)	OverGridImage	Sets the horizontal pixel offset from the anchor cell.
setAnchorCellYOffset(offset)	OverGridImage	Sets the vertical pixel offset from the anchor cell.
setHeight(height)	OverGridImage	Sets the actual height of this image in pixels.
setWidth(width)	OverGridImage	Sets the actual width of this image in pixels.

## PivotFilter

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getFilterCriteria()	FilterCriteria	Returns the filter criteria for this pivot filter.
getPivotTable()	PivotTable	Returns the PivotTable that this filter belongs to.
getSourceDataColumn()	Integer	Returns the number of the source data column this filter operates on.
getSourceDataSourceColumn()	DataSourceColumn	Returns the data source column the filter operates on.
remove()	void	Removes this pivot filter from the pivot table.
setFilterCriteria(filterCriteria)	PivotFilter	Sets the filter criteria for this pivot filter.

## PivotGroup

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addManualGroupingRule(groupName, groupMembers)	PivotGroup	Adds a manual grouping rule for this pivot group.
areLabelsRepeated()	Boolean	Returns whether labels are displayed as repeated.
clearGroupingRule()	PivotGroup	Removes any grouping rules from this pivot group.
clearSort()	PivotGroup	Removes any sorting applied to this group.
getDateTimeGroupingRule()	DateTimeGroupingRule	Returns the date-time grouping rule on the pivot group, or null if no date-time grouping rule is set.
getDimension()	Dimension	Returns whether this is a row or column group.
getGroupLimit()	PivotGroupLimit	Returns the pivot group limit on the pivot group.
getIndex()	Integer	Returns the index of this pivot group in the current group order.
getPivotTable()	PivotTable	Returns the PivotTable which this grouping belongs to.
getSourceDataColumn()	Integer	Returns the number of the source data column this group summarizes.
getSourceDataSourceColumn()	DataSourceColumn	Returns the data source column the pivot group operates on.
hideRepeatedLabels()	PivotGroup	Hides repeated labels for this grouping.
isSortAscending()	Boolean	Returns true if the sort is ascending, returns false if the sort order is descending.
moveToIndex(index)	PivotGroup	Moves this group to the specified position in the current list of row or column groups.
remove()	void	Removes this pivot group from the table.
removeManualGroupingRule(groupName)	PivotGroup	Removes the manual grouping rule with the specified groupName.
resetDisplayName()	PivotGroup	Resets the display name of this group in the pivot table to its default value.
setDateTimeGroupingRule(dateTimeGroupingRuleType)	PivotGroup	Sets the date-time grouping rule on the pivot group.
setDisplayName(name)	PivotGroup	Sets the display name of this group in the pivot table.
setGroupLimit(countLimit)	PivotGroup	Sets the pivot group limit on the pivot group.
setHistogramGroupingRule(minValue, maxValue, intervalSize)	PivotGroup	Sets a histogram grouping rule for this pivot group.
showRepeatedLabels()	PivotGroup	When there is more than one row or column grouping, this method displays this grouping's label for each entry of the subsequent grouping.
showTotals(showTotals)	PivotGroup	Sets whether to show total values for this pivot group in the table.
sortAscending()	PivotGroup	Sets the sort order to be ascending.
sortBy(value, oppositeGroupValues)	PivotGroup	Sorts this group by the specified PivotValue for the values from the oppositeGroupValues.
sortDescending()	PivotGroup	Sets the sort order to be descending.
totalsAreShown()	Boolean	Returns whether total values are currently shown for this pivot group.

## PivotGroupLimit

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getCountLimit()	Integer	Gets the count limit on rows or columns in the pivot group.
getPivotGroup()	PivotGroup	Returns the pivot group the limit belongs to.
remove()	void	Removes the pivot group limit.
setCountLimit(countLimit)	PivotGroupLimit	Sets the count limit on rows or columns in the pivot group.

## PivotTable

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addCalculatedPivotValue(name, formula)	PivotValue	Creates a new pivot value in the pivot table calculated from the specified formula with the specified name.
addColumnGroup(sourceDataColumn)	PivotGroup	Defines a new pivot column grouping in the pivot table.
addFilter(sourceDataColumn, filterCriteria)	PivotFilter	Creates a new pivot filter for the pivot table.
addPivotValue(sourceDataColumn, summarizeFunction)	PivotValue	Defines a new pivot value in the pivot table with the specified summarizeFunction.
addRowGroup(sourceDataColumn)	PivotGroup	Defines a new pivot row grouping in the pivot table.
asDataSourcePivotTable()	DataSourcePivotTable	Returns the pivot table as a data source pivot table if the pivot table is linked to a DataSource, or null otherwise.
getAnchorCell()	Range	Returns the Range representing the cell where this pivot table is anchored.
getColumnGroups()	PivotGroup[]	Returns an ordered list of the column groups in this pivot table.
getFilters()	PivotFilter[]	Returns an ordered list of the filters in this pivot table.
getPivotValues()	PivotValue[]	Returns an ordered list of the pivot values in this pivot table.
getRowGroups()	PivotGroup[]	Returns an ordered list of the row groups in this pivot table.
getSourceDataRange()	Range	Returns the source data range on which the pivot table is constructed.
getValuesDisplayOrientation()	Dimension	Returns whether values are displayed as rows or columns.
remove()	void	Deletes this pivot table.
setValuesDisplayOrientation(dimension)	PivotTable	Sets the layout of this pivot table to display values as columns or rows.

## PivotTableSummarizeFunction

### Properties

Property	Type	Description
CUSTOM	Enum	A custom function, this value is only valid for calculated fields.
SUM	Enum	The SUM function
COUNTA	Enum	The COUNTA function
COUNT	Enum	The COUNT function
COUNTUNIQUE	Enum	The COUNTUNIQUE function
AVERAGE	Enum	The AVERAGE function
MAX	Enum	The MAX function
MIN	Enum	The MIN function
MEDIAN	Enum	The MEDIAN function
PRODUCT	Enum	The PRODUCT function
STDEV	Enum	The STDEV function
STDEVP	Enum	The STDEVP function
VAR	Enum	The VAR function
VARP	Enum	The VARP function

## PivotValue

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getDisplayType()	PivotValueDisplayType	Returns the display type describing how this pivot value is currently displayed in the table.
getFormula()	String	Returns the formula used to calculate this value.
getPivotTable()	PivotTable	Returns the PivotTable which this value belongs to.
getSourceDataColumn()	Integer	Returns the number of the source data column the pivot value summarizes.
getSourceDataSourceColumn()	DataSourceColumn	Returns the data source column the pivot value summarizes.
getSummarizedBy()	PivotTableSummarizeFunction	Returns this group’s summarization function.
remove()	void	Remove this value from the pivot table.
setDisplayName(name)	PivotValue	Sets the display name for this value in the pivot table.
setFormula(formula)	PivotValue	Sets the formula used to calculate this value.
showAs(displayType)	PivotValue	Displays this value in the pivot table as a function of another value.
summarizeBy(summarizeFunction)	PivotValue	Sets the summarization function.

## PivotValueDisplayType

### Properties

Property	Type	Description
DEFAULT	Enum	Default.
PERCENT_OF_ROW_TOTAL	Enum	Displays pivot values as a percent of the total for that row.
PERCENT_OF_COLUMN_TOTAL	Enum	Displays pivot values as a percent of the total for that column.
PERCENT_OF_GRAND_TOTAL	Enum	Displays pivot values as a percent of the grand total.

## Protection

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addEditor(emailAddress)	Protection	Adds the given user to the list of editors for the protected sheet or range.
addEditor(user)	Protection	Adds the given user to the list of editors for the protected sheet or range.
addEditors(emailAddresses)	Protection	Adds the given array of users to the list of editors for the protected sheet or range.
addTargetAudience(audienceId)	Protection	Adds the specified target audience as an editor of the protected range.
canDomainEdit()	Boolean	Determines whether all users in the domain that owns the spreadsheet have permission to edit the protected range or sheet.
canEdit()	Boolean	Determines whether the user has permission to edit the protected range or sheet.
getDescription()	String	Gets the description of the protected range or sheet.
getEditors()	User[]	Gets the list of editors for the protected range or sheet.
getProtectionType()	ProtectionType	Gets the type of the protected area, either RANGE or SHEET.
getRange()	Range	Gets the range that is being protected.
getRangeName()	String	Gets the name of the protected range if it is associated with a named range.
getTargetAudiences()	TargetAudience[]	Returns the IDs of the target audiences that can edit the protected range.
getUnprotectedRanges()	Range[]	Gets an array of unprotected ranges within a protected sheet.
isWarningOnly()	Boolean	Determines if the protected area is using "warning based" protection.
remove()	void	Unprotects the range or sheet.
removeEditor(emailAddress)	Protection	Removes the given user from the list of editors for the protected sheet or range.
removeEditor(user)	Protection	Removes the given user from the list of editors for the protected sheet or range.
removeEditors(emailAddresses)	Protection	Removes the given array of users from the list of editors for the protected sheet or range.
removeTargetAudience(audienceId)	Protection	Removes the specified target audience as an editor of the protected range.
setDescription(description)	Protection	Sets the description of the protected range or sheet.
setDomainEdit(editable)	Protection	Sets whether all users in the domain that owns the spreadsheet have permission to edit the protected range or sheet.
setNamedRange(namedRange)	Protection	Associates the protected range with an existing named range.
setRange(range)	Protection	Adjusts the range that is being protected.
setRangeName(rangeName)	Protection	Associates the protected range with an existing named range.
setUnprotectedRanges(ranges)	Protection	Unprotects the given array of ranges within a protected sheet.
setWarningOnly(warningOnly)	Protection	Sets whether or not this protected range is using "warning based" protection.

## ProtectionType

### Properties

Property	Type	Description
RANGE	Enum	Protection for a range.
SHEET	Enum	Protection for a sheet.

## Range

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
activate()	Range	Sets the specified range as the active range, with the top left cell in the range as the current cell.
activateAsCurrentCell()	Range	Sets the specified cell as the current cell.
addDeveloperMetadata(key)	Range	Adds developer metadata with the specified key to the range.
addDeveloperMetadata(key, visibility)	Range	Adds developer metadata with the specified key and visibility to the range.
addDeveloperMetadata(key, value)	Range	Adds developer metadata with the specified key and value to the range.
addDeveloperMetadata(key, value, visibility)	Range	Adds developer metadata with the specified key, value, and visibility to the range.
applyColumnBanding()	Banding	Applies a default column banding theme to the range.
applyColumnBanding(bandingTheme)	Banding	Applies a specified column banding theme to the range.
applyColumnBanding(bandingTheme, showHeader, showFooter)	Banding	Applies a specified column banding theme to the range with specified header and footer settings.
applyRowBanding()	Banding	Applies a default row banding theme to the range.
applyRowBanding(bandingTheme)	Banding	Applies a specified row banding theme to the range.
applyRowBanding(bandingTheme, showHeader, showFooter)	Banding	Applies a specified row banding theme to the range with specified header and footer settings.
autoFill(destination, series)	void	Fills the destinationRange with data based on the data in this range.
autoFillToNeighbor(series)	void	Calculates a range to fill with new data based on neighboring cells and automatically fills that range with new values based on the data contained in this range.
breakApart()	Range	Break any multi-column cells in the range into individual cells again.
canEdit()	Boolean	Determines whether the user has permission to edit every cell in the range.
check()	Range	Changes the state of the checkboxes in the range to “checked”.
clear()	Range	Clears the range of contents and formats.
clear(options)	Range	Clears the range of contents, format, data validation rules, and/or comments, as specified with the given advanced options.
clearContent()	Range	Clears the content of the range, leaving the formatting intact.
clearDataValidations()	Range	Clears the data validation rules for the range.
clearFormat()	Range	Clears formatting for this range.
clearNote()	Range	Clears the note in the given cell or cells.
collapseGroups()	Range	Collapses all groups that are wholly contained within the range.
copyFormatToRange(gridId, column, columnEnd, row, rowEnd)	void	Copy the formatting of the range to the given location.
copyFormatToRange(sheet, column, columnEnd, row, rowEnd)	void	Copy the formatting of the range to the given location.
copyTo(destination)	void	Copies the data from a range of cells to another range of cells.
copyTo(destination, copyPasteType, transposed)	void	Copies the data from a range of cells to another range of cells.
copyTo(destination, options)	void	Copies the data from a range of cells to another range of cells.
copyValuesToRange(gridId, column, columnEnd, row, rowEnd)	void	Copy the content of the range to the given location.
copyValuesToRange(sheet, column, columnEnd, row, rowEnd)	void	Copy the content of the range to the given location.
createDataSourcePivotTable(dataSource)	DataSourcePivotTable	Creates an empty data source pivot table from the data source, anchored at the first cell in this range.
createDataSourceTable(dataSource)	DataSourceTable	Creates an empty data source table from the data source, anchored at the first cell in this range.
createDeveloperMetadataFinder()	DeveloperMetadataFinder	Returns a DeveloperMetadataFinderApi for finding developer metadata within the scope of this range.
createFilter()	Filter	Creates a filter and applies it to the specified range on the sheet.
createPivotTable(sourceData)	PivotTable	Creates an empty pivot table from the specified sourceData anchored at the first cell in this range.
createTextFinder(findText)	TextFinder	Creates a text finder for the range, which can find and replace text in this range.
deleteCells(shiftDimension)	void	Deletes this range of cells.
expandGroups()	Range	Expands the collapsed groups whose range or control toggle intersects with this range.
getA1Notation()	String	Returns a string description of the range, in A1 notation.
getBackground()	String	Returns the background color of the top-left cell in the range (for example, '#ffffff').
getBackgroundObject()	Color	Returns the background color of the top-left cell in the range.
getBackgroundObjects()	Color[][]	Returns the background colors of the cells in the range.
getBackgrounds()	String[][]	Returns the background colors of the cells in the range (for example, '#ffffff').
getBandings()	Banding[]	Returns all the bandings that are applied to any cells in this range.
getCell(row, column)	Range	Returns a given cell within a range.
getColumn()	Integer	Returns the starting column position for this range.
getDataRegion()	Range	Returns a copy of the range expanded in the four cardinal Directions to cover all adjacent cells with data in them.
getDataRegion(dimension)	Range	Returns a copy of the range expanded Direction.UP and Direction.DOWN if the specified dimension is Dimension.ROWS, or Direction.NEXT and Direction.PREVIOUS if the dimension is Dimension.COLUMNS.
getDataSourceFormula()	DataSourceFormula	Returns the DataSourceFormula for the first cell in the range, or null if the cell doesn't contain a data source formula.
getDataSourceFormulas()	DataSourceFormula[]	Returns the DataSourceFormulas for the cells in the range.
getDataSourcePivotTables()	DataSourcePivotTable[]	Gets all the data source pivot tables intersecting with the range.
getDataSourceTables()	DataSourceTable[]	Gets all the data source tables intersecting with the range.
getDataSourceUrl()	String	Returns a URL for the data in this range, which can be used to create charts and queries.
getDataTable()	DataTable	Return the data inside this object as a DataTable.
getDataTable(firstRowIsHeader)	DataTable	Return the data inside this range as a DataTable.
getDataValidation()	DataValidation	Returns the data validation rule for the top-left cell in the range.
getDataValidations()	DataValidation[][]	Returns the data validation rules for all cells in the range.
getDeveloperMetadata()	DeveloperMetadata[]	Gets the developer metadata associated with this range.
getDisplayValue()	String	Returns the displayed value of the top-left cell in the range.
getDisplayValues()	String[][]	Returns the rectangular grid of values for this range.
getFilter()	Filter	Returns the filter on the sheet this range belongs to, or null if there is no filter on the sheet.
getFontColorObject()	Color	Returns the font color of the cell in the top-left corner of the range.
getFontColorObjects()	Color[][]	Returns the font colors of the cells in the range.
getFontFamilies()	String[][]	Returns the font families of the cells in the range.
getFontFamily()	String	Returns the font family of the cell in the top-left corner of the range.
getFontLine()	String	Gets the line style of the cell in the top-left corner of the range ('underline', 'line-through', or 'none').
getFontLines()	String[][]	Gets the line style of the cells in the range ('underline', 'line-through', or 'none').
getFontSize()	Integer	Returns the font size in point size of the cell in the top-left corner of the range.
getFontSizes()	Integer[][]	Returns the font sizes of the cells in the range.
getFontStyle()	String	Returns the font style ('italic' or 'normal') of the cell in the top-left corner of the range.
getFontStyles()	String[][]	Returns the font styles of the cells in the range.
getFontWeight()	String	Returns the font weight (normal/bold) of the cell in the top-left corner of the range.
getFontWeights()	String[][]	Returns the font weights of the cells in the range.
getFormula()	String	Returns the formula (A1 notation) for the top-left cell of the range, or an empty string if the cell is empty or doesn't contain a formula.
getFormulaR1C1()	String	Returns the formula (R1C1 notation) for a given cell, or null if none.
getFormulas()	String[][]	Returns the formulas (A1 notation) for the cells in the range.
getFormulasR1C1()	String[][]	Returns the formulas (R1C1 notation) for the cells in the range.
getGridId()	Integer	Returns the grid ID of the range's parent sheet.
getHeight()	Integer	Returns the height of the range.
getHorizontalAlignment()	String	Returns the horizontal alignment of the text (left/center/right) of the cell in the top-left corner of the range.
getHorizontalAlignments()	String[][]	Returns the horizontal alignments of the cells in the range.
getLastColumn()	Integer	Returns the end column position.
getLastRow()	Integer	Returns the end row position.
getMergedRanges()	Range[]	Returns an array of Range objects representing merged cells that either are fully within the current range, or contain at least one cell in the current range.
getNextDataCell(direction)	Range	Starting at the cell in the first column and row of the range, returns the next cell in the given direction that is the edge of a contiguous range of cells with data in them or the cell at the edge of the spreadsheet in that direction.
getNote()	String	Returns the note associated with the given range.
getNotes()	String[][]	Returns the notes associated with the cells in the range.
getNumColumns()	Integer	Returns the number of columns in this range.
getNumRows()	Integer	Returns the number of rows in this range.
getNumberFormat()	String	Get the number or date formatting of the top-left cell of the given range.
getNumberFormats()	String[][]	Returns the number or date formats for the cells in the range.
getRichTextValue()	RichTextValue	Returns the Rich Text value for the top left cell of the range, or null if the cell value is not text.
getRichTextValues()	RichTextValue[][]	Returns the Rich Text values for the cells in the range.
getRow()	Integer	Returns the row position for this range.
getRowIndex()	Integer	Returns the row position for this range.
getSheet()	Sheet	Returns the sheet this range belongs to.
getTextDirection()	TextDirection	Returns the text direction for the top left cell of the range.
getTextDirections()	TextDirection[][]	Returns the text directions for the cells in the range.
getTextRotation()	TextRotation	Returns the text rotation settings for the top left cell of the range.
getTextRotations()	TextRotation[][]	Returns the text rotation settings for the cells in the range.
getTextStyle()	TextStyle	Returns the text style for the top left cell of the range.
getTextStyles()	TextStyle[][]	Returns the text styles for the cells in the range.
getValue()	Object	Returns the value of the top-left cell in the range.
getValues()	Object[][]	Returns the rectangular grid of values for this range.
getVerticalAlignment()	String	Returns the vertical alignment (top/middle/bottom) of the cell in the top-left corner of the range.
getVerticalAlignments()	String[][]	Returns the vertical alignments of the cells in the range.
getWidth()	Integer	Returns the width of the range in columns.
getWrap()	Boolean	Returns whether the text in the cell wraps.
getWrapStrategies()	WrapStrategy[][]	Returns the text wrapping strategies for the cells in the range.
getWrapStrategy()	WrapStrategy	Returns the text wrapping strategy for the top left cell of the range.
getWraps()	Boolean[][]	Returns whether the text in the cells wrap.
insertCells(shiftDimension)	Range	Inserts empty cells into this range.
insertCheckboxes()	Range	Inserts checkboxes into each cell in the range, configured with true for checked and false for unchecked.
insertCheckboxes(checkedValue)	Range	Inserts checkboxes into each cell in the range, configured with a custom value for checked and the empty string for unchecked.
insertCheckboxes(checkedValue, uncheckedValue)	Range	Inserts checkboxes into each cell in the range, configured with custom values for the checked and unchecked states.
isBlank()	Boolean	Returns true if the range is totally blank.
isChecked()	Boolean	Returns whether all cells in the range have their checkbox state as 'checked'.
isEndColumnBounded()	Boolean	Determines whether the end of the range is bound to a particular column.
isEndRowBounded()	Boolean	Determines whether the end of the range is bound to a particular row.
isPartOfMerge()	Boolean	Returns true if the cells in the current range overlap any merged cells.
isStartColumnBounded()	Boolean	Determines whether the start of the range is bound to a particular column.
isStartRowBounded()	Boolean	Determines whether the start of the range is bound to a particular row.
merge()	Range	Merges the cells in the range together into a single block.
mergeAcross()	Range	Merge the cells in the range across the columns of the range.
mergeVertically()	Range	Merges the cells in the range together.
moveTo(target)	void	Cut and paste (both format and values) from this range to the target range.
offset(rowOffset, columnOffset)	Range	Returns a new range that is offset from this range by the given number of rows and columns (which can be negative).
offset(rowOffset, columnOffset, numRows)	Range	Returns a new range that is relative to the current range, whose upper left point is offset from the current range by the given rows and columns, and with the given height in cells.
offset(rowOffset, columnOffset, numRows, numColumns)	Range	Returns a new range that is relative to the current range, whose upper left point is offset from the current range by the given rows and columns, and with the given height and width in cells.
protect()	Protection	Creates an object that can protect the range from being edited except by users who have permission.
randomize()	Range	Randomizes the order of the rows in the given range.
removeCheckboxes()	Range	Removes all checkboxes from the range.
removeDuplicates()	Range	Removes rows within this range that contain values that are duplicates of values in any previous row.
removeDuplicates(columnsToCompare)	Range	Removes rows within this range that contain values in the specified columns that are duplicates of values any previous row.
setBackground(color)	Range	Sets the background color of all cells in the range in CSS notation (such as '#ffffff' or 'white').
setBackgroundObject(color)	Range	Sets the background color of all cells in the range.
setBackgroundObjects(color)	Range	Sets a rectangular grid of background colors (must match dimensions of this range).
setBackgroundRGB(red, green, blue)	Range	Sets the background to the given color using RGB values (integers between 0 and 255 inclusive).
setBackgrounds(color)	Range	Sets a rectangular grid of background colors (must match dimensions of this range).
setBorder(top, left, bottom, right, vertical, horizontal)	Range	Sets the border property.
setBorder(top, left, bottom, right, vertical, horizontal, color, style)	Range	Sets the border property with color and/or style.
setDataValidation(rule)	Range	Sets one data validation rule for all cells in the range.
setDataValidations(rules)	Range	Sets the data validation rules for all cells in the range.
setFontColor(color)	Range	Sets the font color in CSS notation (such as '#ffffff' or 'white').
setFontColorObject(color)	Range	Sets the font color of the given range.
setFontColorObjects(colors)	Range	Sets a rectangular grid of font colors (must match dimensions of this range).
setFontColors(colors)	Range	Sets a rectangular grid of font colors (must match dimensions of this range).
setFontFamilies(fontFamilies)	Range	Sets a rectangular grid of font families (must match dimensions of this range).
setFontFamily(fontFamily)	Range	Sets the font family, such as "Arial" or "Helvetica".
setFontLine(fontLine)	Range	Sets the font line style of the given range ('underline', 'line-through', or 'none').
setFontLines(fontLines)	Range	Sets a rectangular grid of line styles (must match dimensions of this range).
setFontSize(size)	Range	Sets the font size, with the size being the point size to use.
setFontSizes(sizes)	Range	Sets a rectangular grid of font sizes (must match dimensions of this range).
setFontStyle(fontStyle)	Range	Set the font style for the given range ('italic' or 'normal').
setFontStyles(fontStyles)	Range	Sets a rectangular grid of font styles (must match dimensions of this range).
setFontWeight(fontWeight)	Range	Set the font weight for the given range (normal/bold).
setFontWeights(fontWeights)	Range	Sets a rectangular grid of font weights (must match dimensions of this range).
setFormula(formula)	Range	Updates the formula for this range.
setFormulaR1C1(formula)	Range	Updates the formula for this range.
setFormulas(formulas)	Range	Sets a rectangular grid of formulas (must match dimensions of this range).
setFormulasR1C1(formulas)	Range	Sets a rectangular grid of formulas (must match dimensions of this range).
setHorizontalAlignment(alignment)	Range	Set the horizontal (left to right) alignment for the given range (left/center/right).
setHorizontalAlignments(alignments)	Range	Sets a rectangular grid of horizontal alignments.
setNote(note)	Range	Sets the note to the given value.
setNotes(notes)	Range	Sets a rectangular grid of notes (must match dimensions of this range).
setNumberFormat(numberFormat)	Range	Sets the number or date format to the given formatting string.
setNumberFormats(numberFormats)	Range	Sets a rectangular grid of number or date formats (must match dimensions of this range).
setRichTextValue(value)	Range	Sets the Rich Text value for the cells in the range.
setRichTextValues(values)	Range	Sets a rectangular grid of Rich Text values.
setShowHyperlink(showHyperlink)	Range	Sets whether or not the range should show hyperlinks.
setTextDirection(direction)	Range	Sets the text direction for the cells in the range.
setTextDirections(directions)	Range	Sets a rectangular grid of text directions.
setTextRotation(degrees)	Range	Sets the text rotation settings for the cells in the range.
setTextRotation(rotation)	Range	Sets the text rotation settings for the cells in the range.
setTextRotations(rotations)	Range	Sets a rectangular grid of text rotations.
setTextStyle(style)	Range	Sets the text style for the cells in the range.
setTextStyles(styles)	Range	Sets a rectangular grid of text styles.
setValue(value)	Range	Sets the value of the range.
setValues(values)	Range	Sets a rectangular grid of values (must match dimensions of this range).
setVerticalAlignment(alignment)	Range	Set the vertical (top to bottom) alignment for the given range (top/middle/bottom).
setVerticalAlignments(alignments)	Range	Sets a rectangular grid of vertical alignments (must match dimensions of this range).
setVerticalText(isVertical)	Range	Sets whether or not to stack the text for the cells in the range.
setWrap(isWrapEnabled)	Range	Set the cell wrap of the given range.
setWrapStrategies(strategies)	Range	Sets a rectangular grid of wrap strategies.
setWrapStrategy(strategy)	Range	Sets the text wrapping strategy for the cells in the range.
setWraps(isWrapEnabled)	Range	Sets a rectangular grid of word wrap policies (must match dimensions of this range).
shiftColumnGroupDepth(delta)	Range	Changes the column grouping depth of the range by the specified amount.
shiftRowGroupDepth(delta)	Range	Changes the row grouping depth of the range by the specified amount.
sort(sortSpecObj)	Range	Sorts the cells in the given range, by column and order specified.
splitTextToColumns()	void	Splits a column of text into multiple columns based on an auto-detected delimiter.
splitTextToColumns(delimiter)	void	Splits a column of text into multiple columns using the specified string as a custom delimiter.
splitTextToColumns(delimiter)	void	Splits a column of text into multiple columns based on the specified delimiter.
trimWhitespace()	Range	Trims the whitespace (such as spaces, tabs, or new lines) in every cell in this range.
uncheck()	Range	Changes the state of the checkboxes in the range to “unchecked”.

## RangeList

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
activate()	RangeList	Selects the list of Range instances.
breakApart()	RangeList	Break all horizontally- or vertically-merged cells contained within the range list into individual cells again.
check()	RangeList	Changes the state of the checkboxes in the range to “checked”.
clear()	RangeList	Clears the range of contents, formats, and data validation rules for each Range in the range list.
clear(options)	RangeList	Clears the range of contents, format, data validation rules, and comments, as specified with the given options.
clearContent()	RangeList	Clears the content of each Range in the range list, leaving the formatting intact.
clearDataValidations()	RangeList	Clears the data validation rules for each Range in the range list.
clearFormat()	RangeList	Clears text formatting for each Range in the range list.
clearNote()	RangeList	Clears the note for each Range in the range list.
getRanges()	Range[]	Returns a list of one or more Range instances in the same sheet.
insertCheckboxes()	RangeList	Inserts checkboxes into each cell in the range, configured with true for checked and false for unchecked.
insertCheckboxes(checkedValue)	RangeList	Inserts checkboxes into each cell in the range, configured with a custom value for checked and the empty string for unchecked.
insertCheckboxes(checkedValue, uncheckedValue)	RangeList	Inserts checkboxes into each cell in the range, configured with custom values for the checked and unchecked states.
removeCheckboxes()	RangeList	Removes all checkboxes from the range.
setBackground(color)	RangeList	Sets the background color for each Range in the range list.
setBackgroundRGB(red, green, blue)	RangeList	Sets the background to the given RGB color.
setBorder(top, left, bottom, right, vertical, horizontal)	RangeList	Sets the border property for each Range in the range list.
setBorder(top, left, bottom, right, vertical, horizontal, color, style)	RangeList	Sets the border property with color and/or style for each Range in the range list.
setFontColor(color)	RangeList	Sets the font color for each Range in the range list.
setFontFamily(fontFamily)	RangeList	Sets the font family for each Range in the range list.
setFontLine(fontLine)	RangeList	Sets the font line style for each Range in the range list.
setFontSize(size)	RangeList	Sets the font size (in points) for each Range in the range list.
setFontStyle(fontStyle)	RangeList	Set the font style for each Range in the range list.
setFontWeight(fontWeight)	RangeList	Set the font weight for each Range in the range list.
setFormula(formula)	RangeList	Updates the formula for each Range in the range list.
setFormulaR1C1(formula)	RangeList	Updates the formula for each Range in the range list.
setHorizontalAlignment(alignment)	RangeList	Set the horizontal alignment for each Range in the range list.
setNote(note)	RangeList	Sets the note text for each Range in the range list.
setNumberFormat(numberFormat)	RangeList	Sets the number or date format for each Range in the range list.
setShowHyperlink(showHyperlink)	RangeList	Sets whether or not each Range in the range list should show hyperlinks.
setTextDirection(direction)	RangeList	Sets the text direction for the cells in each Range in the range list.
setTextRotation(degrees)	RangeList	Sets the text rotation settings for the cells in each Range in the range list.
setValue(value)	RangeList	Sets the value for each Range in the range list.
setVerticalAlignment(alignment)	RangeList	Set the vertical alignment for each Range in the range list.
setVerticalText(isVertical)	RangeList	Sets whether or not to stack the text for the cells for each Range in the range list.
setWrap(isWrapEnabled)	RangeList	Set text wrapping for each Range in the range list.
setWrapStrategy(strategy)	RangeList	Sets the text wrapping strategy for each Range in the range list.
trimWhitespace()	RangeList	Trims the whitespace (such as spaces, tabs, or new lines) in every cell in this range list.
uncheck()	RangeList	Changes the state of the checkboxes in the range to “unchecked”.

## RecalculationInterval

### Properties

Property	Type	Description
ON_CHANGE	Enum	Recalculate only when values are changed.
MINUTE	Enum	Recalculate when values are changed, and every minute.
HOUR	Enum	Recalculate when values are changed, and every hour.

## RelativeDate

### Properties

Property	Type	Description
TODAY	Enum	Dates compared against the current date.
TOMORROW	Enum	Dates compared against the date after the current date.
YESTERDAY	Enum	Dates compared against the date before the current date.
PAST_WEEK	Enum	Dates that fall within the past week period.
PAST_MONTH	Enum	Dates that fall within the past month period.
PAST_YEAR	Enum	Dates that fall within the past year period.

## RichTextValue

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
copy()	RichTextValueBuilder	Returns a builder for a Rich Text value initialized with the values of this Rich Text value.
getEndIndex()	Integer	Gets the end index of this value in the cell.
getLinkUrl()	String	Returns the link URL for this value.
getLinkUrl(startOffset, endOffset)	String	Returns the link URL for the text from startOffset to endOffset.
getRuns()	RichTextValue[]	Returns the Rich Text string split into an array of runs, wherein each run is the longest possible substring having a consistent text style.
getStartIndex()	Integer	Gets the start index of this value in the cell.
getText()	String	Returns the text of this value.
getTextStyle()	TextStyle	Returns the text style of this value.
getTextStyle(startOffset, endOffset)	TextStyle	Returns the text style of the text from startOffset to endOffset.

## RichTextValueBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
build()	RichTextValue	Creates a Rich Text value from this builder.
setLinkUrl(startOffset, endOffset, linkUrl)	RichTextValueBuilder	Sets the link URL for the given substring of this value, or clears it if linkUrl is null.
setLinkUrl(linkUrl)	RichTextValueBuilder	Sets the link URL for the entire value, or clears it if linkUrl is null.
setText(text)	RichTextValueBuilder	Sets the text for this value and clears any existing text style.
setTextStyle(startOffset, endOffset, textStyle)	RichTextValueBuilder	Applies a text style to the given substring of this value.
setTextStyle(textStyle)	RichTextValueBuilder	Applies a text style to the entire value.

## Selection

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getActiveRange()	Range	Returns the selected range in the active sheet, or null if there is no active range.
getActiveRangeList()	RangeList	Returns the list of active ranges in the active sheet or null if there are no active ranges.
getActiveSheet()	Sheet	Returns the active sheet in the spreadsheet.
getCurrentCell()	Range	Returns the current (highlighted) cell that is selected in one of the active ranges or null if there is no current cell.
getNextDataRange(direction)	Range	Starting from the current cell and active range and moving in the given direction, returns an adjusted range where the appropriate edge of the range has been shifted to cover the next data cell while still covering the current cell.

## Sheet

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
activate()	Sheet	Activates this sheet.
addDeveloperMetadata(key)	Sheet	Adds developer metadata with the specified key to the sheet.
addDeveloperMetadata(key, visibility)	Sheet	Adds developer metadata with the specified key and visibility to the sheet.
addDeveloperMetadata(key, value)	Sheet	Adds developer metadata with the specified key and value to the sheet.
addDeveloperMetadata(key, value, visibility)	Sheet	Adds developer metadata with the specified key, value, and visibility to the sheet.
appendRow(rowContents)	Sheet	Appends a row to the bottom of the current data region in the sheet.
asDataSourceSheet()	DataSourceSheet	Returns the sheet as a DataSourceSheet if the sheet is of type SheetType.DATASOURCE, or null otherwise.
autoResizeColumn(columnPosition)	Sheet	Sets the width of the given column to fit its contents.
autoResizeColumns(startColumn, numColumns)	Sheet	Sets the width of all columns starting at the given column position to fit their contents.
autoResizeRows(startRow, numRows)	Sheet	Sets the height of all rows starting at the given row position to fit their contents.
clear()	Sheet	Clears the sheet of content and formatting information.
clear(options)	Sheet	Clears the sheet of contents and/or format, as specified with the given advanced options.
clearConditionalFormatRules()	void	Removes all conditional format rules from the sheet.
clearContents()	Sheet	Clears the sheet of contents, while preserving formatting information.
clearFormats()	Sheet	Clears the sheet of formatting, while preserving contents.
clearNotes()	Sheet	Clears the sheet of all notes.
collapseAllColumnGroups()	Sheet	Collapses all column groups on the sheet.
collapseAllRowGroups()	Sheet	Collapses all row groups on the sheet.
copyTo(spreadsheet)	Sheet	Copies the sheet to a given spreadsheet, which can be the same spreadsheet as the source.
createDeveloperMetadataFinder()	DeveloperMetadataFinder	Returns a DeveloperMetadataFinder for finding developer metadata within the scope of this sheet.
createTextFinder(findText)	TextFinder	Creates a text finder for the sheet, which can find and replace text within the sheet.
deleteColumn(columnPosition)	Sheet	Deletes the column at the given column position.
deleteColumns(columnPosition, howMany)	void	Deletes a number of columns starting at the given column position.
deleteRow(rowPosition)	Sheet	Deletes the row at the given row position.
deleteRows(rowPosition, howMany)	void	Deletes a number of rows starting at the given row position.
expandAllColumnGroups()	Sheet	Expands all column groups on the sheet.
expandAllRowGroups()	Sheet	Expands all row groups on the sheet.
expandColumnGroupsUpToDepth(groupDepth)	Sheet	Expands all column groups up to the given depth, and collapses all others.
expandRowGroupsUpToDepth(groupDepth)	Sheet	Expands all row groups up to the given depth, and collapses all others.
getActiveCell()	Range	Returns the active cell in this sheet.
getActiveRange()	Range	Returns the selected range in the active sheet, or null if there is no active range.
getActiveRangeList()	RangeList	Returns the list of active ranges in the active sheet or null if there are no active ranges.
getBandings()	Banding[]	Returns all the bandings in this sheet.
getCharts()	EmbeddedChart[]	Returns an array of charts on this sheet.
getColumnGroup(columnIndex, groupDepth)	Group	Returns the column group at the given index and group depth.
getColumnGroupControlPosition()	GroupControlTogglePosition	Returns the GroupControlTogglePosition for all column groups on the sheet.
getColumnGroupDepth(columnIndex)	Integer	Returns the group depth of the column at the given index.
getColumnWidth(columnPosition)	Integer	Gets the width in pixels of the given column.
getConditionalFormatRules()	ConditionalFormatRule[]	Get all conditional format rules in this sheet.
getCurrentCell()	Range	Returns the current cell in the active sheet or null if there is no current cell.
getDataRange()	Range	Returns a Range corresponding to the dimensions in which data is present.
getDataSourceFormulas()	DataSourceFormula[]	Gets all the data source formulas.
getDataSourcePivotTables()	DataSourcePivotTable[]	Gets all the data source pivot tables.
getDataSourceTables()	DataSourceTable[]	Gets all the data source tables.
getDeveloperMetadata()	DeveloperMetadata[]	Get all developer metadata associated with this sheet.
getDrawings()	Drawing[]	Returns an array of drawings on the sheet.
getFilter()	Filter	Returns the filter in this sheet, or null if there is no filter.
getFormUrl()	String	Returns the URL for the form that sends its responses to this sheet, or null if this sheet has no associated form.
getFrozenColumns()	Integer	Returns the number of frozen columns.
getFrozenRows()	Integer	Returns the number of frozen rows.
getImages()	OverGridImage[]	Returns all over-the-grid images on the sheet.
getIndex()	Integer	Gets the position of the sheet in its parent spreadsheet.
getLastColumn()	Integer	Returns the position of the last column that has content.
getLastRow()	Integer	Returns the position of the last row that has content.
getMaxColumns()	Integer	Returns the current number of columns in the sheet, regardless of content.
getMaxRows()	Integer	Returns the current number of rows in the sheet, regardless of content.
getName()	String	Returns the name of the sheet.
getNamedRanges()	NamedRange[]	Gets all the named ranges in this sheet.
getParent()	Spreadsheet	Returns the Spreadsheet that contains this sheet.
getPivotTables()	PivotTable[]	Returns all the pivot tables on this sheet.
getProtections(type)	Protection[]	Gets an array of objects representing all protected ranges in the sheet, or a single-element array representing the protection on the sheet itself.
getRange(row, column)	Range	Returns the range with the top left cell at the given coordinates.
getRange(row, column, numRows)	Range	Returns the range with the top left cell at the given coordinates, and with the given number of rows.
getRange(row, column, numRows, numColumns)	Range	Returns the range with the top left cell at the given coordinates with the given number of rows and columns.
getRange(a1Notation)	Range	Returns the range as specified in A1 notation or R1C1 notation.
getRangeList(a1Notations)	RangeList	Returns the RangeList collection representing the ranges in the same sheet specified by a non-empty list of A1 notations or R1C1 notations.
getRowGroup(rowIndex, groupDepth)	Group	Returns the row group at the given index and group depth.
getRowGroupControlPosition()	GroupControlTogglePosition	Returns the GroupControlTogglePosition for all row groups on the sheet.
getRowGroupDepth(rowIndex)	Integer	Returns the group depth of the row at the given index.
getRowHeight(rowPosition)	Integer	Gets the height in pixels of the given row.
getSelection()	Selection	Returns the current Selection in the spreadsheet.
getSheetId()	Integer	Returns the ID of the sheet represented by this object.
getSheetName()	String	Returns the sheet name.
getSheetValues(startRow, startColumn, numRows, numColumns)	Object[][]	Returns the rectangular grid of values for this range starting at the given coordinates.
getSlicers()	Slicer[]	Returns an array of slicers on the sheet.
getTabColorObject()	Color	Gets the sheet tab color, or null if the sheet tab has no color.
getType()	SheetType	Returns the type of the sheet.
hasHiddenGridlines()	Boolean	Returns true if the sheet's gridlines are hidden; otherwise returns false.
hideColumn(column)	void	Hides the column or columns in the given range.
hideColumns(columnIndex)	void	Hides a single column at the given index.
hideColumns(columnIndex, numColumns)	void	Hides one or more consecutive columns starting at the given index.
hideRow(row)	void	Hides the rows in the given range.
hideRows(rowIndex)	void	Hides the row at the given index.
hideRows(rowIndex, numRows)	void	Hides one or more consecutive rows starting at the given index.
hideSheet()	Sheet	Hides this sheet.
insertChart(chart)	void	Adds a new chart to this sheet.
insertColumnAfter(afterPosition)	Sheet	Inserts a column after the given column position.
insertColumnBefore(beforePosition)	Sheet	Inserts a column before the given column position.
insertColumns(columnIndex)	void	Inserts a blank column in a sheet at the specified location.
insertColumns(columnIndex, numColumns)	void	Inserts one or more consecutive blank columns in a sheet starting at the specified location.
insertColumnsAfter(afterPosition, howMany)	Sheet	Inserts a given number of columns after the given column position.
insertColumnsBefore(beforePosition, howMany)	Sheet	Inserts a number of columns before the given column position.
insertImage(blobSource, column, row)	OverGridImage	Inserts a BlobSource as an image in the document at a given row and column.
insertImage(blobSource, column, row, offsetX, offsetY)	OverGridImage	Inserts a BlobSource as an image in the document at a given row and column, with a pixel offset.
insertImage(url, column, row)	OverGridImage	Inserts an image in the document at a given row and column.
insertImage(url, column, row, offsetX, offsetY)	OverGridImage	Inserts an image in the document at a given row and column, with a pixel offset.
insertRowAfter(afterPosition)	Sheet	Inserts a row after the given row position.
insertRowBefore(beforePosition)	Sheet	Inserts a row before the given row position.
insertRows(rowIndex)	void	Inserts a blank row in a sheet at the specified location.
insertRows(rowIndex, numRows)	void	Inserts one or more consecutive blank rows in a sheet starting at the specified location.
insertRowsAfter(afterPosition, howMany)	Sheet	Inserts a number of rows after the given row position.
insertRowsBefore(beforePosition, howMany)	Sheet	Inserts a number of rows before the given row position.
insertSlicer(range, anchorRowPos, anchorColPos)	Slicer	Adds a new slicer to this sheet.
insertSlicer(range, anchorRowPos, anchorColPos, offsetX, offsetY)	Slicer	Adds a new slicer to this sheet.
isColumnHiddenByUser(columnPosition)	Boolean	Returns whether the given column is hidden by the user.
isRightToLeft()	Boolean	Returns true if this sheet layout is right-to-left.
isRowHiddenByFilter(rowPosition)	Boolean	Returns whether the given row is hidden by a filter (not a filter view).
isRowHiddenByUser(rowPosition)	Boolean	Returns whether the given row is hidden by the user.
isSheetHidden()	Boolean	Returns true if the sheet is currently hidden.
moveColumns(columnSpec, destinationIndex)	void	Moves the columns selected by the given range to the position indicated by the destinationIndex.
moveRows(rowSpec, destinationIndex)	void	Moves the rows selected by the given range to the position indicated by the destinationIndex.
newChart()	EmbeddedChartBuilder	Returns a builder to create a new chart for this sheet.
protect()	Protection	Creates an object that can protect the sheet from being edited except by users who have permission.
removeChart(chart)	void	Removes a chart from the parent sheet.
setActiveRange(range)	Range	Sets the specified range as the active range in the active sheet, with the top left cell in the range as the current cell.
setActiveRangeList(rangeList)	RangeList	Sets the specified list of ranges as the active ranges in the active sheet.
setActiveSelection(range)	Range	Sets the active selection region for this sheet.
setActiveSelection(a1Notation)	Range	Sets the active selection, as specified in A1 notation or R1C1 notation.
setColumnGroupControlPosition(position)	Sheet	Sets the position of the column group control toggle on the sheet.
setColumnWidth(columnPosition, width)	Sheet	Sets the width of the given column in pixels.
setColumnWidths(startColumn, numColumns, width)	Sheet	Sets the width of the given columns in pixels.
setConditionalFormatRules(rules)	void	Replaces all currently existing conditional format rules in the sheet with the input rules.
setCurrentCell(cell)	Range	Sets the specified cell as the current cell.
setFrozenColumns(columns)	void	Freezes the given number of columns.
setFrozenRows(rows)	void	Freezes the given number of rows.
setHiddenGridlines(hideGridlines)	Sheet	Hides or reveals the sheet gridlines.
setName(name)	Sheet	Sets the sheet name.
setRightToLeft(rightToLeft)	Sheet	Sets or unsets the sheet layout to right-to-left.
setRowGroupControlPosition(position)	Sheet	Sets the position of the row group control toggle on the sheet.
setRowHeight(rowPosition, height)	Sheet	Sets the row height of the given row in pixels.
setRowHeights(startRow, numRows, height)	Sheet	Sets the height of the given rows in pixels.
setRowHeightsForced(startRow, numRows, height)	Sheet	Sets the height of the given rows in pixels.
setTabColor(color)	Sheet	Sets the sheet tab color.
setTabColorObject(color)	Sheet	Sets the sheet tab color.
showColumns(columnIndex)	void	Unhides the column at the given index.
showColumns(columnIndex, numColumns)	void	Unhides one or more consecutive columns starting at the given index.
showRows(rowIndex)	void	Unhides the row at the given index.
showRows(rowIndex, numRows)	void	Unhides one or more consecutive rows starting at the given index.
showSheet()	Sheet	Makes the sheet visible.
sort(columnPosition)	Sheet	Sorts a sheet by column, ascending.
sort(columnPosition, ascending)	Sheet	Sorts a sheet by column.
unhideColumn(column)	void	Unhides the column in the given range.
unhideRow(row)	void	Unhides the row in the given range.
updateChart(chart)	void	Updates the chart on this sheet.

## SheetType

### Properties

Property	Type	Description
GRID	Enum	A sheet containing a grid.
OBJECT	Enum	A sheet containing a single embedded object such as an EmbeddedChart.
DATASOURCE	Enum	A sheet containing a DataSource.

## Slicer

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getBackgroundColorObject()	Color	Return the background Color of the slicer.
getColumnPosition()	Integer	Returns the column position (relative to the data range of the slicer) on which the filter is applied in the slicer, or null if the column position is not set.
getContainerInfo()	ContainerInfo	Gets information about where the slicer is positioned in the sheet.
getFilterCriteria()	FilterCriteria	Returns the filter criteria of the slicer, or null if the filter criteria is not set.
getRange()	Range	Gets the data range on which the slicer is applied to.
getTitle()	String	Returns the title of the slicer.
getTitleHorizontalAlignment()	String	Gets the horizontal alignment of the title.
getTitleTextStyle()	TextStyle	Returns the text style of the slicer's title.
isAppliedToPivotTables()	Boolean	Returns whether the given slicer is applied to pivot tables.
remove()	void	Deletes the slicer.
setApplyToPivotTables(applyToPivotTables)	Slicer	Sets if the given slicer should be applied to pivot tables in the worksheet.
setBackgroundColor(color)	Slicer	Sets the background color of the slicer.
setBackgroundColorObject(color)	Slicer	Sets the background Color of the slicer.
setColumnFilterCriteria(columnPosition, filterCriteria)	Slicer	Sets the column index and filtering criteria of the slicer.
setPosition(anchorRowPos, anchorColPos, offsetX, offsetY)	Slicer	Sets the position where the slicer appears on the sheet.
setRange(rangeApi)	Slicer	Sets the data range on which the slicer is applied.
setTitle(title)	Slicer	Sets the title of the slicer.
setTitleHorizontalAlignment(horizontalAlignment)	Slicer	Sets the horizontal alignment of the title in the slicer.
setTitleTextStyle(textStyle)	Slicer	Sets the text style of the slicer.

## SortOrder

### Properties

Property	Type	Description
ASCENDING	Enum	Ascending sort order.
DESCENDING	Enum	Descending sort order.

## SortSpec

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getBackgroundColor()	Color	Returns the background color used for sorting, or null if absent.
getDataSourceColumn()	DataSourceColumn	Gets the data source column the sort spec acts on.
getDimensionIndex()	Integer	Returns the dimension index or null if not linked to a local filter.
getForegroundColor()	Color	Returns the foreground color used for sorting, or null if absent.
getSortOrder()	SortOrder	Returns the sort order.
isAscending()	Boolean	Returns whether the sort order is ascending.

## Spreadsheet

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
addDeveloperMetadata(key)	Spreadsheet	Adds developer metadata with the specified key to the top-level spreadsheet.
addDeveloperMetadata(key, visibility)	Spreadsheet	Adds developer metadata with the specified key and visibility to the spreadsheet.
addDeveloperMetadata(key, value)	Spreadsheet	Adds developer metadata with the specified key and value to the spreadsheet.
addDeveloperMetadata(key, value, visibility)	Spreadsheet	Adds developer metadata with the specified key, value, and visibility to the spreadsheet.
addEditor(emailAddress)	Spreadsheet	Adds the given user to the list of editors for the Spreadsheet.
addEditor(user)	Spreadsheet	Adds the given user to the list of editors for the Spreadsheet.
addEditors(emailAddresses)	Spreadsheet	Adds the given array of users to the list of editors for the Spreadsheet.
addMenu(name, subMenus)	void	Creates a new menu in the Spreadsheet UI.
addViewer(emailAddress)	Spreadsheet	Adds the given user to the list of viewers for the Spreadsheet.
addViewer(user)	Spreadsheet	Adds the given user to the list of viewers for the Spreadsheet.
addViewers(emailAddresses)	Spreadsheet	Adds the given array of users to the list of viewers for the Spreadsheet.
appendRow(rowContents)	Sheet	Appends a row to the bottom of the current data region in the sheet.
autoResizeColumn(columnPosition)	Sheet	Sets the width of the given column to fit its contents.
copy(name)	Spreadsheet	Copies the spreadsheet and returns the new one.
createDeveloperMetadataFinder()	DeveloperMetadataFinder	Returns a DeveloperMetadataFinder for finding developer metadata within the scope of this spreadsheet.
createTextFinder(findText)	TextFinder	Creates a text finder for the spreadsheet, which can be used to find and replace text within the spreadsheet.
deleteActiveSheet()	Sheet	Deletes the currently active sheet.
deleteColumn(columnPosition)	Sheet	Deletes the column at the given column position.
deleteColumns(columnPosition, howMany)	void	Deletes a number of columns starting at the given column position.
deleteRow(rowPosition)	Sheet	Deletes the row at the given row position.
deleteRows(rowPosition, howMany)	void	Deletes a number of rows starting at the given row position.
deleteSheet(sheet)	void	Deletes the specified sheet.
duplicateActiveSheet()	Sheet	Duplicates the active sheet and makes it the active sheet.
getActiveCell()	Range	Returns the active cell in this sheet.
getActiveRange()	Range	Returns the selected range in the active sheet, or null if there is no active range.
getActiveRangeList()	RangeList	Returns the list of active ranges in the active sheet or null if there are no active ranges.
getActiveSheet()	Sheet	Gets the active sheet in a spreadsheet.
getAs(contentType)	Blob	Return the data inside this object as a blob converted to the specified content type.
getBandings()	Banding[]	Returns all the bandings in this spreadsheet.
getBlob()	Blob	Return the data inside this object as a blob.
getColumnWidth(columnPosition)	Integer	Gets the width in pixels of the given column.
getCurrentCell()	Range	Returns the current cell in the active sheet or null if there is no current cell.
getDataRange()	Range	Returns a Range corresponding to the dimensions in which data is present.
getDataSourceFormulas()	DataSourceFormula[]	Gets all the data source formulas.
getDataSourcePivotTables()	DataSourcePivotTable[]	Gets all the data source pivot tables.
getDataSourceRefreshSchedules()	DataSourceRefreshSchedule[]	Gets the refresh schedules of this spreadsheet.
getDataSourceSheets()	DataSourceSheet[]	Returns all the data source sheets in the spreadsheet.
getDataSourceTables()	DataSourceTable[]	Gets all the data source tables.
getDataSources()	DataSource[]	Returns all the data sources in the spreadsheet.
getDeveloperMetadata()	DeveloperMetadata[]	Gets the developer metadata associated with the top-level spreadsheet.
getEditors()	User[]	Gets the list of editors for this Spreadsheet.
getFormUrl()	String	Returns the URL for the form that sends its responses to this spreadsheet, or null if this spreadsheet has no associated form.
getFrozenColumns()	Integer	Returns the number of frozen columns.
getFrozenRows()	Integer	Returns the number of frozen rows.
getId()	String	Gets a unique identifier for this spreadsheet.
getImages()	OverGridImage[]	Returns all over-the-grid images on the sheet.
getIterativeCalculationConvergenceThreshold()	Number	Returns the threshold value used during iterative calculation.
getLastColumn()	Integer	Returns the position of the last column that has content.
getLastRow()	Integer	Returns the position of the last row that has content.
getMaxIterativeCalculationCycles()	Integer	Returns the maximum number of iterations to use during iterative calculation.
getName()	String	Gets the name of the document.
getNamedRanges()	NamedRange[]	Gets all the named ranges in this spreadsheet.
getNumSheets()	Integer	Returns the number of sheets in this spreadsheet.
getOwner()	User	Returns the owner of the document, or null for a document in a shared drive.
getPredefinedSpreadsheetThemes()	SpreadsheetTheme[]	Returns the list of predefined themes.
getProtections(type)	Protection[]	Gets an array of objects representing all protected ranges or sheets in the spreadsheet.
getRange(a1Notation)	Range	Returns the range as specified in A1 notation or R1C1 notation.
getRangeByName(name)	Range	Returns a named range, or null if no range with the given name is found.
getRangeList(a1Notations)	RangeList	Returns the RangeList collection representing the ranges in the same sheet specified by a non-empty list of A1 notations or R1C1 notations.
getRecalculationInterval()	RecalculationInterval	Returns the calculation interval for this spreadsheet.
getRowHeight(rowPosition)	Integer	Gets the height in pixels of the given row.
getSelection()	Selection	Returns the current Selection in the spreadsheet.
getSheetById(id)	Sheet	Gets the sheet with the given ID.
getSheetByName(name)	Sheet	Returns a sheet with the given name.
getSheetId()	Integer	Returns the ID of the sheet represented by this object.
getSheetName()	String	Returns the sheet name.
getSheetValues(startRow, startColumn, numRows, numColumns)	Object[][]	Returns the rectangular grid of values for this range starting at the given coordinates.
getSheets()	Sheet[]	Gets all the sheets in this spreadsheet.
getSpreadsheetLocale()	String	Gets the spreadsheet locale.
getSpreadsheetTheme()	SpreadsheetTheme	Returns the current theme of the spreadsheet, or null if no theme is applied.
getSpreadsheetTimeZone()	String	Gets the time zone for the spreadsheet.
getUrl()	String	Returns the URL for the given spreadsheet.
getViewers()	User[]	Gets the list of viewers and commenters for this Spreadsheet.
hideColumn(column)	void	Hides the column or columns in the given range.
hideRow(row)	void	Hides the rows in the given range.
insertColumnAfter(afterPosition)	Sheet	Inserts a column after the given column position.
insertColumnBefore(beforePosition)	Sheet	Inserts a column before the given column position.
insertColumnsAfter(afterPosition, howMany)	Sheet	Inserts a given number of columns after the given column position.
insertColumnsBefore(beforePosition, howMany)	Sheet	Inserts a number of columns before the given column position.
insertDataSourceSheet(spec)	DataSourceSheet	Inserts a new DataSourceSheet in the spreadsheet and starts data execution.
insertImage(blobSource, column, row)	OverGridImage	Inserts a Spreadsheet as an image in the document at a given row and column.
insertImage(blobSource, column, row, offsetX, offsetY)	OverGridImage	Inserts a Spreadsheet as an image in the document at a given row and column, with a pixel offset.
insertImage(url, column, row)	OverGridImage	Inserts an image in the document at a given row and column.
insertImage(url, column, row, offsetX, offsetY)	OverGridImage	Inserts an image in the document at a given row and column, with a pixel offset.
insertRowAfter(afterPosition)	Sheet	Inserts a row after the given row position.
insertRowBefore(beforePosition)	Sheet	Inserts a row before the given row position.
insertRowsAfter(afterPosition, howMany)	Sheet	Inserts a number of rows after the given row position.
insertRowsBefore(beforePosition, howMany)	Sheet	Inserts a number of rows before the given row position.
insertSheet()	Sheet	Inserts a new sheet into the spreadsheet, using a default sheet name.
insertSheet(sheetIndex)	Sheet	Inserts a new sheet into the spreadsheet at the given index.
insertSheet(sheetIndex, options)	Sheet	Inserts a new sheet into the spreadsheet at the given index and uses optional advanced arguments.
insertSheet(options)	Sheet	Inserts a new sheet into the spreadsheet, using a default sheet name and optional advanced arguments.
insertSheet(sheetName)	Sheet	Inserts a new sheet into the spreadsheet with the given name.
insertSheet(sheetName, sheetIndex)	Sheet	Inserts a new sheet into the spreadsheet with the given name at the given index.
insertSheet(sheetName, sheetIndex, options)	Sheet	Inserts a new sheet into the spreadsheet with the given name at the given index and uses optional advanced arguments.
insertSheet(sheetName, options)	Sheet	Inserts a new sheet into the spreadsheet with the given name and uses optional advanced arguments.
insertSheetWithDataSourceTable(spec)	Sheet	Inserts a new sheet in the spreadsheet, creates a DataSourceTable spanning the entire sheet with the given data source specification, and starts data execution.
isColumnHiddenByUser(columnPosition)	Boolean	Returns whether the given column is hidden by the user.
isIterativeCalculationEnabled()	Boolean	Returns whether iterative calculation is activated in this spreadsheet.
isRowHiddenByFilter(rowPosition)	Boolean	Returns whether the given row is hidden by a filter (not a filter view).
isRowHiddenByUser(rowPosition)	Boolean	Returns whether the given row is hidden by the user.
moveActiveSheet(pos)	void	Moves the active sheet to the given position in the list of sheets.
moveChartToObjectSheet(chart)	Sheet	Creates a new SheetType.OBJECT sheet and moves the provided chart to it.
refreshAllDataSources()	void	Refreshes all supported data sources and their linked data source objects, skipping invalid data source objects.
removeEditor(emailAddress)	Spreadsheet	Removes the given user from the list of editors for the Spreadsheet.
removeEditor(user)	Spreadsheet	Removes the given user from the list of editors for the Spreadsheet.
removeMenu(name)	void	Removes a menu that was added by addMenu(name, subMenus).
removeNamedRange(name)	void	Deletes a named range with the given name.
removeViewer(emailAddress)	Spreadsheet	Removes the given user from the list of viewers and commenters for the Spreadsheet.
removeViewer(user)	Spreadsheet	Removes the given user from the list of viewers and commenters for the Spreadsheet.
rename(newName)	void	Renames the document.
renameActiveSheet(newName)	void	Renames the current active sheet to the given new name.
resetSpreadsheetTheme()	SpreadsheetTheme	Removes the applied theme and sets the default theme on the spreadsheet.
setActiveRange(range)	Range	Sets the specified range as the active range in the active sheet, with the top left cell in the range as the current cell.
setActiveRangeList(rangeList)	RangeList	Sets the specified list of ranges as the active ranges in the active sheet.
setActiveSelection(range)	Range	Sets the active selection region for this sheet.
setActiveSelection(a1Notation)	Range	Sets the active selection, as specified in A1 notation or R1C1 notation.
setActiveSheet(sheet)	Sheet	Sets the given sheet to be the active sheet in the spreadsheet.
setActiveSheet(sheet, restoreSelection)	Sheet	Sets the given sheet to be the active sheet in the spreadsheet, with an option to restore the most recent selection within that sheet.
setColumnWidth(columnPosition, width)	Sheet	Sets the width of the given column in pixels.
setCurrentCell(cell)	Range	Sets the specified cell as the current cell.
setFrozenColumns(columns)	void	Freezes the given number of columns.
setFrozenRows(rows)	void	Freezes the given number of rows.
setIterativeCalculationConvergenceThreshold(minThreshold)	Spreadsheet	Sets the minimum threshold value for iterative calculation.
setIterativeCalculationEnabled(isEnabled)	Spreadsheet	Sets whether iterative calculation is activated in this spreadsheet.
setMaxIterativeCalculationCycles(maxIterations)	Spreadsheet	Sets the maximum number of calculation iterations that should be performed during iterative calculation.
setNamedRange(name, range)	void	Names a range.
setRecalculationInterval(recalculationInterval)	Spreadsheet	Sets how often this spreadsheet should recalculate.
setRowHeight(rowPosition, height)	Sheet	Sets the row height of the given row in pixels.
setSpreadsheetLocale(locale)	void	Sets the spreadsheet locale.
setSpreadsheetTheme(theme)	SpreadsheetTheme	Sets a theme on the spreadsheet.
setSpreadsheetTimeZone(timezone)	void	Sets the time zone for the spreadsheet.
show(userInterface)	void	Displays a custom user interface component in a dialog centered in the user's browser's viewport.
sort(columnPosition)	Sheet	Sorts a sheet by column, ascending.
sort(columnPosition, ascending)	Sheet	Sorts a sheet by column.
toast(msg)	void	Shows a popup window in the lower right corner of the spreadsheet with the given message.
toast(msg, title)	void	Shows a popup window in the lower right corner of the spreadsheet with the given message and title.
toast(msg, title, timeoutSeconds)	void	Shows a popup window in the lower right corner of the spreadsheet with the given title and message, that stays visible for a certain length of time.
unhideColumn(column)	void	Unhides the column in the given range.
unhideRow(row)	void	Unhides the row in the given range.
updateMenu(name, subMenus)	void	Updates a menu that was added by addMenu(name, subMenus).
waitForAllDataExecutionsCompletion(timeoutInSeconds)	void	Waits until all the current executions in the spreadsheet complete, timing out after the provided number of seconds.

## SpreadsheetApp

### Properties

Property	Type	Description
AutoFillSeries	AutoFillSeries	An enumeration of the types of series used to calculate auto-filled values.
BandingTheme	BandingTheme	An enumeration of the possible banding themes.
BooleanCriteria	BooleanCriteria	An enumeration of conditional formatting boolean criteria.
BorderStyle	BorderStyle	An enumeration of the valid styles for setting borders on a Range.
ColorType	ColorType	An enumeration of possible color types.
CopyPasteType	CopyPasteType	An enumeration of the possible paste types.
DataExecutionErrorCode	DataExecutionErrorCode	An enumeration of the possible data execution error codes.
DataExecutionState	DataExecutionState	An enumeration of the possible data execution states.
DataSourceParameterType	DataSourceParameterType	An enumeration of the possible data source parameter types.
DataSourceRefreshScope	DataSourceRefreshScope	An enumeration of possible data source refresh scopes.
DataSourceType	DataSourceType	An enumeration of the possible data source types.
DataValidationCriteria	DataValidationCriteria	An enumeration representing the data validation criteria that can be set on a range.
DateTimeGroupingRuleType	DateTimeGroupingRuleType	An enumeration of date time grouping rule.
DeveloperMetadataLocationType	DeveloperMetadataLocationType	An enumeration of possible developer metadata location types.
DeveloperMetadataVisibility	DeveloperMetadataVisibility	An enumeration of the possible developer metadata visibilities.
Dimension	Dimension	An enumeration of the possible dimensions of a spreadsheet.
Direction	Direction	A enumeration of the possible directions that one can move within a spreadsheet using the arrow keys.
FrequencyType	FrequencyType	An enumeration of possible frequency types.
GroupControlTogglePosition	GroupControlTogglePosition	An enumeration of the positions that the group control toggle can be in.
InterpolationType	InterpolationType	An enumeration of conditional format gradient interpolation types.
PivotTableSummarizeFunction	PivotTableSummarizeFunction	An enumeration of the functions that may be used to summarize values in a pivot table.
PivotValueDisplayType	PivotValueDisplayType	An enumeration of the ways that a pivot value may be displayed.
ProtectionType	ProtectionType	An enumeration representing the parts of a spreadsheet that can be protected from edits.
RecalculationInterval	RecalculationInterval	An enumeration of the possible intervals that can be used in spreadsheet recalculation.
RelativeDate	RelativeDate	An enumeration of relative date options for calculating a value to be used in date-based BooleanCriteria.
SheetType	SheetType	An enumeration of the different types of sheets that can exist in a spreadsheet.
SortOrder	SortOrder	An enumeration of sort order.
TextDirection	TextDirection	An enumeration of valid text directions.
TextToColumnsDelimiter	TextToColumnsDelimiter	An enumeration of the preset delimiters for split text to columns.
ThemeColorType	ThemeColorType	An enumeration of possible theme color types.
ValueType	ValueType	An enumeration of value types returned by Range.getValue() and Range.getValues() from the Range class of the Spreadsheet service.
WrapStrategy	WrapStrategy	An enumeration of the strategies used for wrapping cells.

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
create(name)	Spreadsheet	Creates a new spreadsheet with the given name.
create(name, rows, columns)	Spreadsheet	Creates a new spreadsheet with the given name and the specified number of rows and columns.
enableAllDataSourcesExecution()	void	Turns data execution on for all types of data sources.
enableBigQueryExecution()	void	Turns data execution on for BigQuery data sources.
enableLookerExecution()	void	Turns data execution on for Looker data sources.
flush()	void	Applies all pending Spreadsheet changes.
getActive()	Spreadsheet	Returns the currently active spreadsheet, or null if there is none.
getActiveRange()	Range	Returns the selected range in the active sheet, or null if there is no active range.
getActiveRangeList()	RangeList	Returns the list of active ranges in the active sheet or null if there are no ranges selected.
getActiveSheet()	Sheet	Gets the active sheet in a spreadsheet.
getActiveSpreadsheet()	Spreadsheet	Returns the currently active spreadsheet, or null if there is none.
getCurrentCell()	Range	Returns the current (highlighted) cell that is selected in one of the active ranges in the active sheet or null if there is no current cell.
getSelection()	Selection	Returns the current Selection in the spreadsheet.
getUi()	Ui	Returns an instance of the spreadsheet's user-interface environment that allows the script to add features like menus, dialogs, and sidebars.
newCellImage()	CellImageBuilder	Creates a builder for a CellImage.
newColor()	ColorBuilder	Creates a builder for a Color.
newConditionalFormatRule()	ConditionalFormatRuleBuilder	Creates a builder for a conditional formatting rule.
newDataSourceSpec()	DataSourceSpecBuilder	Creates a builder for a DataSourceSpec.
newDataValidation()	DataValidationBuilder	Creates a builder for a data validation rule.
newFilterCriteria()	FilterCriteriaBuilder	Creates a builder for a FilterCriteria.
newRichTextValue()	RichTextValueBuilder	Creates a builder for a Rich Text value.
newTextStyle()	TextStyleBuilder	Creates a builder for a text style.
open(file)	Spreadsheet	Opens the spreadsheet that corresponds to the given File object.
openById(id)	Spreadsheet	Opens the spreadsheet with the given ID.
openByUrl(url)	Spreadsheet	Opens the spreadsheet with the given URL.
setActiveRange(range)	Range	Sets the specified range as the active range, with the top left cell in the range as the current cell.
setActiveRangeList(rangeList)	RangeList	Sets the specified list of ranges as the active ranges.
setActiveSheet(sheet)	Sheet	Sets the active sheet in a spreadsheet.
setActiveSheet(sheet, restoreSelection)	Sheet	Sets the active sheet in a spreadsheet, with the option to restore the most recent selection within that sheet.
setActiveSpreadsheet(newActiveSpreadsheet)	void	Sets the active spreadsheet.
setCurrentCell(cell)	Range	Sets the specified cell as the current cell.

## SpreadsheetTheme

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getConcreteColor(themeColorType)	Color	Returns the concrete Color for a valid theme color type.
getFontFamily()	String	Returns the font family of the theme, or null if it's a null theme.
getThemeColors()	ThemeColorType[]	Returns a list of all possible theme color types for the current theme.
setConcreteColor(themeColorType, color)	SpreadsheetTheme	Sets the concrete color associated with the ThemeColorType in this color scheme to the given color.
setConcreteColor(themeColorType, red, green, blue)	SpreadsheetTheme	Sets the concrete color associated with the ThemeColorType in this color scheme to the given color in RGB format.
setFontFamily(fontFamily)	SpreadsheetTheme	Sets the font family for the theme.

## TextDirection

### Properties

Property	Type	Description
LEFT_TO_RIGHT	Enum	Left-to-right text direction.
RIGHT_TO_LEFT	Enum	Right-to-left text direction.

## TextFinder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
findAll()	Range[]	Returns all cells matching the search criteria.
findNext()	Range	Returns the next cell matching the search criteria.
findPrevious()	Range	Returns the previous cell matching the search criteria.
getCurrentMatch()	Range	Returns the current cell matching the search criteria.
ignoreDiacritics(ignoreDiacritics)	TextFinder	If true, configures the search to ignore diacritics while matching; otherwise the search matches diacritics.
matchCase(matchCase)	TextFinder	If true, configures the search to match the search text's case exactly, otherwise the search defaults to case-insensitive matching.
matchEntireCell(matchEntireCell)	TextFinder	If true, configures the search to match the entire contents of a cell; otherwise, the search defaults to partial matching.
matchFormulaText(matchFormulaText)	TextFinder	If true, configures the search to return matches that appear within formula text; otherwise cells with formulas are considered based on their displayed value.
replaceAllWith(replaceText)	Integer	Replaces all matches with the specified text.
replaceWith(replaceText)	Integer	Replaces the search text in the currently matched cell with the specified text and returns the number of occurrences replaced.
startFrom(startRange)	TextFinder	Configures the search to start searching immediately after the specified cell range.
useRegularExpression(useRegEx)	TextFinder	If true, configures the search to interpret the search string as a regular expression; otherwise the search interprets the search string as normal text.

## TextRotation

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getDegrees()	Integer	Gets the angle between standard text orientation and the current text orientation.
isVertical()	Boolean	Returns true if the text is stacked vertically; returns false otherwise.

## TextStyle

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
copy()	TextStyleBuilder	Creates a text style builder initialized with the values of this text style.
getFontFamily()	String	Gets the font family of the text.
getFontSize()	Integer	Gets the font size of the text in points.
getForegroundColorObject()	Color	Gets the font color of the text.
isBold()	Boolean	Gets whether or not the text is bold.
isItalic()	Boolean	Gets whether or not the cell is italic.
isStrikethrough()	Boolean	Gets whether or not the cell has strikethrough.
isUnderline()	Boolean	Gets whether or not the cell is underlined.

## TextStyleBuilder

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
build()	TextStyle	Creates a text style from this builder.
setBold(bold)	TextStyleBuilder	Sets whether or not the text is bold.
setFontFamily(fontFamily)	TextStyleBuilder	Sets the text font family, such as "Arial".
setFontSize(fontSize)	TextStyleBuilder	Sets the text font size in points.
setForegroundColor(cssString)	TextStyleBuilder	Sets the text font color.
setForegroundColorObject(color)	TextStyleBuilder	Sets the text font color.
setItalic(italic)	TextStyleBuilder	Sets whether or not the text is italic.
setStrikethrough(strikethrough)	TextStyleBuilder	Sets whether or not the text has strikethrough.
setUnderline(underline)	TextStyleBuilder	Sets whether or not the text is underlined.

## TextToColumnsDelimiter

### Properties

Property	Type	Description
COMMA	Enum	"," delimiter.
SEMICOLON	Enum	";" delimiter.
PERIOD	Enum	"." delimiter.
SPACE	Enum	" " delimiter.

## ThemeColor

### Methods

| Method | Return type | Brief description |
| --- | --- | --- |
getColorType()	ColorType	Get the type of this color.
getThemeColorType()	ThemeColorType	Gets the theme color type of this color.

## ThemeColorType

### Properties

Property	Type	Description
UNSUPPORTED	Enum	Represents a theme color that is not supported.
TEXT	Enum	Represents the text color.
BACKGROUND	Enum	Represents the color to use for chart's background.
ACCENT1	Enum	Represents the first accent color.
ACCENT2	Enum	Represents the second accent color.
ACCENT3	Enum	Represents the third accent color.
ACCENT4	Enum	Represents the fourth accent color.
ACCENT5	Enum	Represents the fifth accent color.
ACCENT6	Enum	Represents the sixth accent color.
HYPERLINK	Enum	Represents the color to use for hyperlinks.

## ValueType

### Properties

Property	Type	Description
IMAGE	Enum	The value type when the cell contains an image.

## WrapStrategy

### Properties

Property	Type	Description
WRAP	Enum	Wrap lines that are longer than the cell width onto a new line.
OVERFLOW	Enum	Overflow lines into the next cell, so long as that cell is empty.
CLIP	Enum	Clip lines that are longer than the cell width.
