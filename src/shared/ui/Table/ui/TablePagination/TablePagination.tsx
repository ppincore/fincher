import classNames from 'clsx';
import { Table } from '@tanstack/react-table';
import { HStack } from '@shared/ui/Stack';
import { Pagination } from '@shared/ui/Pagination';
import cls from './TablePagination.module.scss';

interface TablePaginationProps<T> {
  className?: string;
  table: Table<T>;
  totalCount?: number;
}

export const TablePagination = <T,>(props: TablePaginationProps<T>) => {
  const { className, table, totalCount = table.getRowCount() } = props;

  return (
    <HStack
      max
      gap="8"
      justify="between"
      className={classNames(cls.tablePagination, {}, [className])}
    >
      <div />
      <Pagination
        totalCount={totalCount}
        currentPage={table.getState().pagination.pageIndex}
        onPageChange={table.setPageIndex}
        pageSize={table.getState().pagination.pageSize}
      />
    </HStack>
  );
};

TablePagination.displayName = 'TablePagination';
