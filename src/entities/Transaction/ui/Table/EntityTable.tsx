import { memo, useState } from 'react';
import clsx from 'clsx';
import { Table } from '@shared/ui/Table';
import { useTable } from '@shared/ui/Table/hooks/hooks';
import { VStack } from '@shared/ui/Stack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormId } from '../../model/const/const';
import { filterFormSchema } from '../../model/const/validation';
import cls from './EntityTable.module.scss';
import { API, IEntity } from '../../model/types/types';
import { entityColumns } from '../../model/const/table';
import { apiHooks } from '../../api';
import { TableFilter } from './TableFilter/TableFilter';

interface EntityTableProps {
  className?: string;
  selectable?: boolean;
  isWithFilter?: boolean;
}

export const EntityTable = memo(function EntityTable(props: EntityTableProps) {
  const { className, selectable, isWithFilter } = props;

  const { pagination, setPagination, setSelected } = useTable<IEntity>();
  const [filters, setFilters] = useState<API.Filter>({});

  const formMethods = useForm<API.Filter>({
    resolver: yupResolver(filterFormSchema as any),
    mode: 'onChange',
  });

  const { handleSubmit } = formMethods;
  const onSubmit = handleSubmit((data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ''),
    );
    setFilters({ ...filteredData });
  });

  const { data } = apiHooks.useListEntities({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sortBy: 'dateTime',
    sort: 'DESC',
    ...filters,
  });

  const DataTable = (
    <Table
      className={clsx(cls.table, className)}
      totalCount={data?.totalCount}
      data={data?.items}
      columns={entityColumns}
      pagination={pagination}
      setPagination={setPagination}
      setSelectedRows={setSelected}
      selectable={selectable}
    />
  );

  if (!isWithFilter) {
    return DataTable;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formMethods}>
      <form
        id={FormId.FILTER}
        onSubmit={onSubmit}
        onReset={() => {
          setFilters({});
        }}
      />
      <VStack gap="16" max fullFill>
        <TableFilter />
        {DataTable}
      </VStack>
    </FormProvider>
  );
});

EntityTable.displayName = 'EntityTable';
