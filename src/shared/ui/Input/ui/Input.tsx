import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
  useState,
} from 'react';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { useFocus } from '@shared/lib/hooks';
import { useTranslation } from 'react-i18next';
import { IconCrossedEye, IconEye } from '@shared/assets/icons';
import { HTMLInputProps, OnInputChange } from '../types/input';
import cls from './Input.module.scss';

interface InputProps extends HTMLInputProps {
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  errorDescription?: string;
  value?: string | number;
  onChange?: OnInputChange;
  className?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  type?: React.HTMLInputTypeAttribute | 'decimal';
}

const errorDescriptionRequired = 'Required field';

// eslint-disable-next-line react/display-name
const InputComponent = forwardRef(function InputComponent(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    className,
    value,
    readOnly = false,
    invalid,
    placeholder = '',
    label,
    errorDescription,
    addonLeft,
    addonRight,
    onChange,
    required,
    ...otherProps
  } = props;

  const type: React.HTMLInputTypeAttribute =
    props.type === 'decimal' ? 'number' : (props.type ?? 'text');

  const inputMode =
    props.type === 'decimal' ? 'decimal' : (props.inputMode ?? 'text');

  const [isInvalidRequired, setIsInvalidRequired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const { t } = useTranslation();

  const { isFocused, onBlur, onFocus } = useFocus<HTMLInputElement>({
    onBlur: (...params) => {
      if (required && !value) {
        setIsInvalidRequired(true);
      }
      otherProps?.onBlur?.(...params);
    },
    onFocus: (...params) => {
      otherProps?.onFocus?.(...params);
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalidRequired(false);
    onChange?.(e.target.value, e);
  };

  const clsMods = {
    [cls.invalid]: isInvalidRequired || invalid,
    [cls.focused]: isFocused && !readOnly,
    [cls.readOnly]: readOnly,
  };

  return (
    <div className={className}>
      <label>
        {label && <span className={cls.label}>{label}</span>}
        <HStack gap="8" className={classNames(cls.fieldWrapper, clsMods)}>
          {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
          <input
            {...otherProps}
            ref={ref}
            inputMode={inputMode}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={onChangeHandler}
            type={type === 'password' && showPassword ? 'text' : type}
            className={cls.input}
            readOnly={readOnly}
            placeholder={placeholder}
            aria-invalid={isInvalidRequired}
          />
          {type === 'password' ? (
            <button
              type="button"
              className={cls.addonRight}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <IconEye color="var(--color-text-primary)" />
              ) : (
                <IconCrossedEye />
              )}
            </button>
          ) : (
            addonRight && <div className={cls.addonRight}>{addonRight}</div>
          )}
        </HStack>
        {errorDescription && invalid && (
          <span className={cls.description}>{errorDescription}</span>
        )}
        {isInvalidRequired && (
          <span className={cls.description}>{t(errorDescriptionRequired)}</span>
        )}
      </label>
    </div>
  );
});

export const Input = memo(InputComponent);

Input.displayName = 'Input';
