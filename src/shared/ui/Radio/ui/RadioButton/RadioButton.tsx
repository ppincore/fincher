import { ForwardedRef, ReactNode, forwardRef, memo, useCallback } from 'react';
import classNames from 'clsx';
import {
  OnChangeRadioButton,
  HTMLRadioButtonProps,
} from '../../types/radioButton';
import cls from './RadioButton.module.scss';

interface RadioButtonProps extends HTMLRadioButtonProps {
  label?: ReactNode;
  size?: 's' | 'm';
  disabled?: boolean;
  value?: boolean;
  onChange?: OnChangeRadioButton;
  className?: string;
}

// eslint-disable-next-line react/display-name
const RadioButtonComponent = forwardRef(function RadioButtonComponent(
  props: RadioButtonProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    className,
    value,
    onChange,
    label,
    size = 's',
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
      <label className={classNames(cls.radioButton, cls[size])}>
        <input
          {...otherProps}
          ref={ref}
          checked={value}
          onChange={onChangeHandler}
          disabled={disabled}
          type="radio"
          className={cls.input}
        />
        <span className={cls.checkmark} />
        {label && <span className={cls.label}>{label}</span>}
      </label>
    </div>
  );
});

export const RadioButton = memo(RadioButtonComponent);

RadioButton.displayName = 'RadioButton';
