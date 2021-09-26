/**
 * Example:
 *      <result>
 *          <colspecs>
 *              <colspec idx="0" name="user_id"></colspec>
 *              <colspec idx="1" name="status"></colspec>
 *          </colspecs>
 *          <rows>
 *              <row>
 *                  <column>2366114</column>
 *                  <column>7</column>
 *              </row>
 *              <!-- other row tags -->
 *          </rows>
 *      </result>
 */
export interface ResultSetRoot {
    result: ResultSet
}

export interface ResultSet {
    colspecs: ColumnDefinitions,
    rows: RowSet
}

export interface ColumnDefinitions {
    colspec: Array<ColumnDefinition>
}

export interface ColumnDefinition {
    attributes: ColumnAttributeDefinition
}

export interface ColumnAttributeDefinition {
    idx: number, // TODO parsable "string"
    name: string
}

export interface RowSet {
    row: Array<RowEntry>
}

export interface RowEntry {
    column: Array<string>
}
