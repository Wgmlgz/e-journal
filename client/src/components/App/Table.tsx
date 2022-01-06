import React from 'react';
import {
  useTable,
  Column,
  TablePropGetter,
  TableProps,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
} from 'react-table';

interface Props {
  columns: Column<any>[];
  data: any[];
  onEdit?: (id: number) => any;
  onRemove?: (id: number) => any;
}
const borderStyle = {
  border: '1px solid gray',
  padding: '8px 10px',
};

const useInstance = (instance: any) => {
  const { allColumns } = instance;

  let rowSpanHeaders: any[] = [];

  allColumns.forEach((column: any, i: any) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
};

export default function Table(props: Props) {
  const columns = React.useMemo(() => props.columns, [props.columns]);
  const data = React.useMemo(() => props.data, [props.data]);

  interface useTableRes {
    getTableProps: (propGetter?: TablePropGetter<any>) => TableProps;
    getTableBodyProps: (
      propGetter?: TableBodyPropGetter<any>
    ) => TableBodyProps;
    headerGroups: HeaderGroup<any>[];
    rows: Row<any>[];
    prepareRow: (row: Row<any>) => void;
    rowSpanHeaders?: any;
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    rowSpanHeaders,
  }: useTableRes = useTable<any>({ columns, data }, (hooks) => {
    hooks.useInstance.push(useInstance);
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={borderStyle}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          for (let j = 0; j < row.allCells.length; j++) {
            let cell: any = row.allCells[j];
            let rowSpanHeader = rowSpanHeaders.find(
              (x: any) => x.id === cell.column.id
            );

            if (rowSpanHeader !== undefined) {
              if (
                rowSpanHeader.topCellValue === null ||
                rowSpanHeader.topCellValue !== cell.value
              ) {
                cell.isRowSpanned = false;
                rowSpanHeader.topCellValue = cell.value;
                rowSpanHeader.topCellIndex = i;
                cell.rowSpan = 1;
              } else {
                (rows[rowSpanHeader.topCellIndex].allCells[j] as any).rowSpan++;
                cell.isRowSpanned = true;
              }
            }
          }
          return null;
        })}
        {rows.map((row, i) => (
          <tr
            onDoubleClick={() => props.onEdit && props.onEdit(i)}
            {...row.getRowProps()}
          >
            {row.cells.map((cell: any) => {
              return cell.isRowSpanned ? null : (
                <td
                  style={borderStyle}
                  rowSpan={cell.rowSpan}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </td>
              );
            })}
            <td>
              {props.onRemove && (
                <button onClick={() => props.onRemove && props.onRemove(i)}>
                  удалить
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
