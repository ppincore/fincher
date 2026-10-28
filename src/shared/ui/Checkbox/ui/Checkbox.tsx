import { ForwardedRef, ReactNode, forwardRef, memo, useCallback } from 'react';
import classNames from 'clsx';
import { IconCheck14 as Check } from '@shared/assets/icons';
import { OnChangeCheckbox, HTMLCheckboxProps } from '../types/checkbox';
import cls from './Checkbox.module.scss';
import { CheckboxSize } from '../consts/checkbox';

interface CheckboxProps extends HTMLCheckboxProps {
  label?: ReactNode;
  size?: CheckboxSize;
  disabled?: boolean;
  value?: boolean;
  onChange?: OnChangeCheckbox;
  className?: string;
}

// eslint-disable-next-line react/display-name
const CheckboxComponent = forwardRef(function CheckboxComponent(
  props: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    className,
    value,
    onChange,
    label,
    size = CheckboxSize.S,
    disabled = false,
    ...otherProps
  } = props;

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked, e);
    },
    [onChange],
  );

  return (
    <div className={classNames(cls.wrapper, className)}>
      <label className={classNames(cls.checkbox, cls[size])}>
        <input
          {...otherProps}
          ref={ref}
          checked={value}
          onChange={onChangeHandler}
          disabled={disabled}
          type="checkbox"
          className={cls.input}
        />
        <span className={cls.checkmark}>
          <Check className={cls.checkIcon} />
        </span>
        {label && <span className={cls.label}>{label}</span>}
      </label>
    </div>
  );
});

export const Checkbox = memo(CheckboxComponent);

Checkbox.displayName = 'Checkbox';
