import { useState } from 'react';
import { TablePagination } from '../types/table';

interface UseTableProps {
  defaultPagination?: TablePagination;
}

export function useTable<IEntity>(props?: UseTableProps) {
  const {
    defaultPagination = {
      pageIndex: 1,
      pageSize: 10,
    },
  } = props ?? {};

  const [selected, setSelected] = useState<IEntity[]>([]);
  const [pagination, setPagination] = useState(defaultPagination);

  return {
    selected,
    setSelected,
    pagination,
    setPagination,
  };
}
