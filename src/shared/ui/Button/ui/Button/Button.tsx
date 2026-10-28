import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
} from 'react';
import classNames from 'clsx';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import cls from './Button.module.scss';
import { ButtonSize, ButtonTheme } from '../../consts/button';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  size: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  square?: boolean;
  children?: ReactNode;
  className?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

const ButtonComponent = forwardRef(function ButtonComponent(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    className,
    theme = ButtonTheme.PRIMARY,
    children,
    square,
    size = ButtonSize.M,
    isLoading = false,
    disabled = false,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const isText = ButtonTheme.TEXT === theme;

  const showLoader = isLoading && !isText;

  const classMods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.loading]: showLoader,
  };

  const additionalClasses = [className, cls[theme], cls[size]];

  const content = (
    <>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </>
  );

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      type="button"
      className={classNames(cls.button, classMods, additionalClasses)}
      {...otherProps}
    >
      {showLoader ? (
        <ButtonLoader square={square}>{content}</ButtonLoader>
      ) : (
        content
      )}
    </button>
  );
});

export const Button = memo(ButtonComponent) as typeof ButtonComponent;

Button.displayName = 'Button';
