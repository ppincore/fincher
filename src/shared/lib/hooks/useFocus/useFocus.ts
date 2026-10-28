import { FocusEventHandler, useCallback, useState } from 'react';

interface UseFocusProps<HTMLElement = HTMLDivElement> {
  default?: boolean;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
}

interface UseFocusReturn<HTMLElement = HTMLDivElement> {
  isFocused?: boolean;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
}

export function useFocus<HTMLElement>(
  props: UseFocusProps<HTMLElement>,
): UseFocusReturn<HTMLElement> {
  const {
    default: defaultFocus = false,
    onBlur: onBlurDefault,
    onFocus: onFocusDefault,
  } = props;
  const [isFocused, setIsFocused] = useState(defaultFocus ?? false);

  const onFocus: FocusEventHandler<HTMLElement> = useCallback(
    (...params) => {
      setIsFocused(true);
      onFocusDefault?.(...params);
    },
    [onFocusDefault],
  );

  const onBlur: FocusEventHandler<HTMLElement> = useCallback(
    (...params) => {
      setIsFocused(false);
      onBlurDefault?.(...params);
    },
    [onBlurDefault],
  );

  return {
    isFocused,
    onFocus,
    onBlur,
  };
}
