import { RadioGroup as HRadioGroup } from '@headlessui/react';
import classNames from 'clsx';
import { Typography } from '@shared/ui/Typography';
import { VStack } from '@shared/ui/Stack';
import { ForwardedRef, forwardRef } from 'react';
import { RadioOption } from '../../types/radioGroup';
import cls from './RadioGroup.module.scss';

interface RadioGroupProps<ValueT, DataT> {
  className?: string;
  options: RadioOption<ValueT, DataT>[];
  defaultSelected?: RadioOption<ValueT, DataT>;
  withDefault?: boolean;
  selectedValue?: ValueT;
  selected?: RadioOption<ValueT, DataT>;
  onChange?: (option: RadioOption<ValueT, DataT>) => void;
}

const RadioGroupComponent = <ValueT extends string, DataT extends object>(
  props: RadioGroupProps<ValueT, DataT>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    className,
    selected,
    selectedValue,
    onChange,
    defaultSelected,
    withDefault,
    options,
  } = props;

  return (
    <HRadioGroup
      ref={ref}
      value={selectedValue ?? selected}
      defaultValue={defaultSelected ?? (withDefault ? options[0] : undefined)}
      onChange={onChange}
      className={classNames(cls.radioGroup, className)}
    >
      {options.map((option) => {
        const OptionIcon = option.icon;
        return (
          <HRadioGroup.Option
            key={option.value}
            value={selectedValue ? option.value : option}
            as={VStack}
            gap="4"
            align="center"
            justify="center"
          >
            {({ checked, disabled }) => (
              <>
                <button
                  disabled={disabled}
                  type="button"
                  className={classNames(cls.radioButton, {
                    [cls.checked]: checked,
                  })}
                >
                  {OptionIcon && <OptionIcon className={cls.icon} />}
                </button>
                <HRadioGroup.Label
                  as={Typography}
                  size="caption1"
                  align="center"
                  color="primary"
                  weight="medium"
                >
                  {option.text}
                </HRadioGroup.Label>
              </>
            )}
          </HRadioGroup.Option>
        );
      })}
    </HRadioGroup>
  );
};

RadioGroupComponent.displayName = 'RadioGroup';

export const RadioGroup = forwardRef(RadioGroupComponent);
