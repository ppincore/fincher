import classNames from 'clsx';
import { Table, flexRender } from '@tanstack/react-table';
import cls from './TableHeader.module.scss';

interface TableHeaderProps<T> {
  className?: string;
  table: Table<T>;
}

export const TableHeader = <T,>(props: TableHeaderProps<T>) => {
  const { className, table } = props;

  return (
    <thead className={classNames(cls.tableHeader, [className])}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              style={{
                width: `${header.column.getSize() / 16}rem`,
              }}
              className={cls.tableHeaderCell}
              key={header.id}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

TableHeader.displayName = 'TableHeader';
