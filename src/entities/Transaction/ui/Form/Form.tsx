/* eslint-disable react/jsx-props-no-spreading */
import { memo, useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { HStack, VStack } from '@shared/ui/Stack';
import { Input } from '@shared/ui/Input';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { RadioOption } from '@shared/ui/Radio/types/radioGroup';
import { IconCreditCardDown, IconCreditCardUp } from '@shared/assets/icons';
import { Radio } from '@shared/ui/Radio';
import { format } from 'date-fns';
import { AccountSelect } from '@entities/Account';
import { TransactionType } from '../../model/const/const';
import cls from './Form.module.scss';

export interface FormProps {
  className?: string;
}

const EntityForm = memo(function EntityForm(props: FormProps) {
  const { className } = props;
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const transactionType = useWatch({ control, name: 'transactionType' });

  useEffect(() => {
    setValue('dateTime', new Date());
  }, [setValue]);

  const TransactionRadio = useMemo(() => {
    const transactionRadioOptions: RadioOption[] = [
      {
        text: t('Expense'),
        value: TransactionType.EXPENSE,
        icon: IconCreditCardDown,
      },
      {
        text: t('Income'),
        value: TransactionType.INCOME,
        icon: IconCreditCardUp,
      },
    ];

    return (
      <Controller
        name="transactionType"
        control={control}
        render={({ field }) => (
          <Radio.Group
            {...field}
            className={cls.radio}
            options={transactionRadioOptions}
            selectedValue={field.value}
            defaultSelected={transactionRadioOptions[0]}
          />
        )}
      />
    );
  }, [control, t]);

  return (
    <VStack
      gap="16"
      fullFill
      max
      justify="center"
      className={clsx(className, cls.form)}
    >
      {TransactionRadio}

      <Controller
        name="accountId"
        control={control}
        render={({ field }) => <AccountSelect isWithBalance {...field} />}
      />

      {transactionType === TransactionType.INCOME && (
        <Controller
          name="source"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={t('Source')}
              {...field}
              errorDescription={t(fieldState.error?.message || '')}
              invalid={fieldState.invalid}
            />
          )}
        />
      )}

      {/* {transactionType === TransactionType.EXPENSE && (
        <HStack gap="12" max fullFill className={cls.rowThree}>
          <Controller
            name="fn"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="number"
                label={t('FN')}
                {...field}
                errorDescription={t(fieldState.error?.message || '')}
                invalid={fieldState.invalid}
              />
            )}
          />
          <Controller
            name="fp"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="number"
                label={t('FP')}
                {...field}
                errorDescription={t(fieldState.error?.message || '')}
                invalid={fieldState.invalid}
              />
            )}
          />
          <Controller
            name="fd"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="number"
                label={t('FD')}
                {...field}
                errorDescription={t(fieldState.error?.message || '')}
                invalid={fieldState.invalid}
              />
            )}
          />
        </HStack>
      )} */}

      <Controller
        name="description"
        control={control}
        render={({ field }) => <Input label={t('Description')} {...field} />}
      />
      <HStack gap="12" className={cls.rowTwo}>
        <Controller
          name="dateTime"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="datetime-local"
              value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
              onChange={(newDate) => {
                field.onChange(new Date(newDate));
              }}
              label={t('Date and time')}
              errorDescription={t(fieldState.error?.message || '')}
              invalid={fieldState.invalid}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              type="decimal"
              label={t('Amount')}
              {...field}
              onChange={(value) => {
                if (value === '' || /^\d*\.?\d{0,2}$/.test(String(value))) {
                  field.onChange(value);
                }
              }}
              errorDescription={t(fieldState.error?.message || '')}
              invalid={fieldState.invalid}
            />
          )}
        />
      </HStack>
    </VStack>
  );
});

export default EntityForm;
