import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { IconChevron } from '@shared/assets/icons';
import { Icon } from '@shared/ui/Icon';
import cls from './Select.module.scss';
import type {
  HTMLSelectProps,
  SelectOnChange,
  SelectOption,
} from '../types/select';

interface SelectProps<ValueT> extends HTMLSelectProps {
  className?: string;
  label?: string;
  options?: SelectOption<ValueT>[];
  value?: ValueT;
  onChange?: SelectOnChange<ValueT>;
  isNullable?: boolean;
}

const SelectComponent = forwardRef(function SelectComponent<
  ValueT extends string,
>(props: SelectProps<ValueT>, ref: ForwardedRef<HTMLSelectElement>) {
  const {
    className,
    label,
    options,
    value,
    onChange,
    name,
    disabled,
    isNullable,
    ...otherProps
  } = props;

  const optionsList = useMemo(() => {
    const items =
      options?.map(({ value, label: text }) => (
        <option className={cls.option} value={value} key={value}>
          {text}
        </option>
      )) ?? [];

    if (isNullable) {
      items.unshift(
        <option className={cls.option} value="" key="__empty">
          -
        </option>,
      );
    }

    return items;
  }, [isNullable, options]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value as ValueT, e);
    },
    [onChange],
  );

  return (
    <div className={clsx(cls.wrapper, {}, [className])}>
      {label && <span className={cls.label}>{`${label}:`}</span>}
      <div className={cls.selectWrapper}>
        <select
          ref={ref}
          {...otherProps}
          disabled={disabled}
          className={cls.select}
          value={value}
          onChange={onChangeHandler}
          name={name}
        >
          {optionsList}
        </select>
        <Icon className={cls.chevron} Svg={IconChevron} />
      </div>
    </div>
  );
});

export const Select = memo(SelectComponent) as typeof SelectComponent;

SelectComponent.displayName = 'Select';
