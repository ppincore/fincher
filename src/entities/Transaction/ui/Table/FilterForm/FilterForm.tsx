/* eslint-disable react/jsx-props-no-spreading */
import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { VStack } from '@shared/ui/Stack';
import { AccountSelect } from '@entities/Account';
import { Select, SelectOption } from '@shared/ui/Select';
import { getSelectOptionsFromEnum } from '@shared/lib/utils/enum';
import { TransactionType } from '../../../model/const/const';
import cls from './FilterForm.module.scss';

interface FilterFormProps {
  className?: string;
}

export const FilterForm = memo(function FilterForm(props: FilterFormProps) {
  const { className } = props;
  const { t } = useTranslation();
  const { control } = useFormContext();

  const TransactionSelect = useMemo(() => {
    const transactionOptions: SelectOption<TransactionType>[] =
      getSelectOptionsFromEnum(TransactionType).map((option) => {
        option.label = t(option.label);
        return option;
      });

    return (
      <Controller
        name="transactionType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isNullable
            className={cls.radio}
            options={transactionOptions}
            value={field.value}
          />
        )}
      />
    );
  }, [control, t]);

  return (
    <VStack
      max
      fullFill
      gap="16"
      justify="center"
      className={clsx(cls.filterForm, className)}
    >
      {TransactionSelect}
      <Controller
        name="accountId"
        control={control}
        render={({ field }) => (
          <AccountSelect isNullable isWithBalance {...field} />
        )}
      />
    </VStack>
  );
});

FilterForm.displayName = 'FilterForm';
