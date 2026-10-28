/* eslint-disable react/jsx-props-no-spreading */
import { memo, useEffect, useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { TablePagination } from '../TablePagination/TablePagination';
import { getColumnCheckbox } from '../TableCell/TableCheckbox/TableCheckbox';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableProps, TableWithSelectionProps } from '../../types/table';
import cls from './Table.module.scss';
import { TableBody } from '../TableBody/TableBody';

// eslint-disable-next-line react/display-name
const TableWithSelection = <T,>(props: TableWithSelectionProps<T>) => {
  const { setSelectedRows, children, rowSelection, data } = props;
  useSelectable({
    setSelected: setSelectedRows,
    rowSelection,
    data,
  });

  return <table className={cls.table}>{children}</table>;
};

function useSelectable<T>(props: {
  setSelected?: (dataList: T[]) => void;
  rowSelection: Record<string, boolean>;
  data?: T[];
}) {
  const { data, rowSelection, setSelected } = props;

  useEffect(() => {
    if (!data) {
      return;
    }
    const indexies = Object.keys(rowSelection);
    const dataList = indexies.map((index) => data[Number(index)]);
    setSelected?.(dataList);
  }, [setSelected, data, rowSelection]);
}

const TableComponent = <T,>(props: TableProps<T>) => {
  const {
    className,
    data = [],
    selectable,
    columns: defaultColumns,
    pagination,
    setPagination,
    totalCount,
  } = props;
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const columns = selectable
    ? [getColumnCheckbox<T>(), ...defaultColumns]
    : defaultColumns;

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      columnSizing: { select: 48 },
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  const tableContent = (
    <>
      <TableHeader table={table} />
      <TableBody table={table} />
    </>
  );

  let tableElement = <table className={cls.table}>{tableContent}</table>;

  if (selectable) {
    const { setSelectedRows } = props;
    tableElement = (
      <TableWithSelection
        setSelectedRows={setSelectedRows}
        data={data}
        rowSelection={rowSelection}
      >
        {tableContent}
      </TableWithSelection>
    );
  }

  return (
    <div className={clsx(className, cls.wrapper)}>
      <div className={cls.content}>
        <div className={cls.tableWrapper}>{tableElement}</div>
      </div>
      {pagination && <TablePagination totalCount={totalCount} table={table} />}
    </div>
  );
};

export const Table = memo(TableComponent) as typeof TableComponent;

TableComponent.displayName = 'Table';
