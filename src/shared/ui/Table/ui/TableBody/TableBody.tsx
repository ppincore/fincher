import { Table, flexRender } from '@tanstack/react-table';
import classNames from 'clsx';
import cls from './TableBody.module.scss';

interface TableBodyProps<T> {
  className?: string;
  table: Table<T>;
}

export const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { className, table } = props;

  return (
    <tbody className={classNames(cls.tableBody, className)}>
      {table.getRowModel().rows.map((row) => (
        <tr className={cls.tableRow} key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              style={{
                width: `${cell.column.getSize() / 16}rem`,
              }}
              className={cls.tableCell}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';
