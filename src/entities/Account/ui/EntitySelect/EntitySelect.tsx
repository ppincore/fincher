import { ForwardedRef, forwardRef, memo, useEffect, useMemo } from 'react';
import { Select, SelectOption } from '@shared/ui/Select';
import { useTranslation } from 'react-i18next';
import { HTMLSelectProps } from '@shared/ui/Select/types/select';
import { formatMoneyNumber } from '@shared/lib/utils';
import { apiHooks } from '../../api/api';

interface EntitySelectProps extends HTMLSelectProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  isWithBalance?: boolean;
  isNullable?: boolean;
}

const EntitySelectComponent = forwardRef(function EntitySelectComponent(
  props: EntitySelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const {
    className,
    value,
    onChange,
    isWithBalance,
    isNullable,
    ...otherProps
  } = props;
  const { t } = useTranslation();

  const { data: entitiesList } = apiHooks.useShortListEntities({
    sortBy: 'name',
  });

  useEffect(() => {
    if (isNullable) {
      return;
    }
    if (!value && entitiesList && entitiesList.length > 0) {
      onChange?.(entitiesList[0].id);
    }
  }, [entitiesList, isNullable, onChange, value]);

  const entitiesOptions: SelectOption<string>[] | undefined = useMemo(
    () =>
      entitiesList?.map((entity) => ({
        value: entity.id,
        label:
          entity.name +
          (isWithBalance
            ? ` (${formatMoneyNumber(Number(entity.balance), entity.currency)})`
            : ''),
      })),
    [entitiesList, isWithBalance],
  );

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      label={t('Account')}
      ref={ref}
      isNullable={isNullable}
      options={entitiesOptions}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
});

export const EntitySelect = memo(
  EntitySelectComponent,
) as typeof EntitySelectComponent;

EntitySelect.displayName = 'EntitySelect';
