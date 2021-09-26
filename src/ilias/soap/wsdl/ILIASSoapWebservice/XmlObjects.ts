import {WSDL} from 'soap';
import {ColumnDefinition, RowEntry, ResultSetRoot} from './xml/ResultSetXml';

export type XmlObjectType<T> = XmlObject<T> & T | T;

export interface XmlObject<T> {
    attributes: {
        [attributeName: string]: string
    };
    $value?: T;
}

export function extractValue <T> (value: XmlObjectType<T> | undefined) : T | undefined {
    if ( ! value)
        return undefined;

    if (value.hasOwnProperty('$value'))
        return (<XmlObject<T>>value).$value;
    return <T> value;
}

/**
 * A XML Result Set is a implementation in Ilias to build result rows by declaring their fields in a header like
 * section.
 *
 * @param rows to place in the XML ResultSet.
 * @param wsdl to use its `objectToXML` method.
 * @param columns to describe them in the first part of the XML ResultSet.
 *                It seems that the order of them isn't important.
 */
export function createXmlResultSet<T, K extends keyof T> (rows: Array<T>, wsdl: WSDL, columns: Array<K>): string {
    if (columns.length === 0)
        throw new Error("At least one column");

    const columnDefinitions: Array<ColumnDefinition> = columns.map((colName, index) => {
        return {
            attributes: {
                idx: index,
                name: colName.toString()
            }
        };
    });

    const rowEntries: Array<RowEntry> = rows.map(row => {
        return {
            column: columns.map(colName => row[colName].toString())
        }
    });

    const resultObject: ResultSetRoot = {
        result: {
            colspecs: {
                colspec: columnDefinitions
            },
            rows: {
                row: rowEntries
            }
        }
    };

    return wsdl.objectToXML(
        resultObject,
        '', // no name present in the wsdl
        '', // therefore no ns prefix
        '' // nor ns uri
    );
}

export function extractResultSetRows (resultSet: ResultSetRoot): Array<object> {
    const fields = extractFieldNames(resultSet);

    return resultSet.result.rows.row.map(({ column }) => {
        const rowObject = {};

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            rowObject[field] = column[i];
        }

        return rowObject;
    });
}

export function extractFieldNames (resultSet: ResultSetRoot): Array<string> {
    return resultSet.result.colspecs.colspec
        .map(({ attributes }) => {
            return attributes;
        })
        .sort((attrib1, attrib2) => {
            return attrib1.idx - attrib2.idx;
        })
        .map(({ name }) => name);
}
