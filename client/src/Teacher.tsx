import * as React from "react";
import { useTable } from "react-table";

type Data = {
  day: string;
  group: string;
  theme: string;
  homework: string;
};

const borderStyle = {
  border: "1px solid gray",
  padding: "8px 10px",
};

function useInstance(instance: any) {
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
}

export default function Teacher() {
  const orig_data = [
    {
      day: "Monday",
      data: [
        {
          group: "group name",
          theme: "theme name",
          homework: "homework name",
        },
        {
          group: "group name",
          theme: "theme name",
          homework: "homework name",
        },
      ],
    },
    {
      day: "Tuesday",
      data: [
        {
          group: "group name",
          theme: "theme name",
          homework: "homework name",
        },
        {
          group: "group name",
          theme: "theme name",
          homework: "homework name",
        },
        {
          group: "group name",
          theme: "theme name",
          homework: "homework name",
        },
      ],
    },
  ];
  const new_data: Array<Data> = [];
  orig_data.forEach((day_obj) => {
    day_obj.data.forEach((day) => {
      new_data.push({
        day: day_obj.day,
        group: day.group,
        theme: day.theme,
        homework: day.homework,
      });
    });
  });
  const data = React.useMemo(() => new_data, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "День",
        accessor: "day",
        enableRowSpan: true,
      },
      {
        Header: "Группа",
        accessor: "group",
      },
      {
        Header: "Тема",
        accessor: "theme",
      },
      {
        Header: "Домашняя работа",
        accessor: "homework",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    rowSpanHeaders,
  }: any = useTable<any>({ columns, data }, (hooks) => {
    hooks.useInstance.push(useInstance);
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps()} style={borderStyle}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i: any) => {
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
                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                cell.isRowSpanned = true;
              }
            }
          }
          return null;
        })}
        {rows.map((row: any) => {
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                if (cell.isRowSpanned) return null;
                else
                  return (
                    <td
                      style={borderStyle}
                      rowSpan={cell.rowSpan}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
