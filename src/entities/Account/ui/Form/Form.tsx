/* eslint-disable react/jsx-props-no-spreading */
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { HStack, VStack } from '@shared/ui/Stack';
import { Select } from '@shared/ui/Select';
import { Input } from '@shared/ui/Input';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { currencyOptions } from '@shared/const/money';
import cls from './Form.module.scss';

export interface FormProps {
  className?: string;
}

const EntityForm = memo(function EntityForm(props: FormProps) {
  const { className } = props;
  const { t } = useTranslation();
  const { control } = useFormContext();
  return (
    <VStack gap="16" fullFill max className={clsx(className, cls.form)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            errorDescription={t(fieldState.error?.message ?? '')}
            invalid={fieldState.invalid}
            label={t('Account Name')}
            {...field}
          />
        )}
      />
      <HStack
        align="start"
        justify="start"
        gap="12"
        max
        fullFill
        className={cls.rowTwo}
      >
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <Select
              label={t('Currency')}
              options={currencyOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="balance"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              onChange={(value) => {
                if (value === '' || /^\d*\.?\d{0,2}$/.test(String(value))) {
                  field.onChange(value);
                }
              }}
              type="decimal"
              errorDescription={t(fieldState.error?.message ?? '')}
              invalid={fieldState.invalid}
              label={t('Balance')}
            />
          )}
        />
      </HStack>
    </VStack>
  );
});

export default EntityForm;
