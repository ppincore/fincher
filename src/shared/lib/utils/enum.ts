import { SelectOption } from '@shared/ui/Select';

export function getSelectOptionsFromEnum<
  TEnum extends Record<string, TEnum[keyof TEnum]>,
>(enumObj: TEnum): SelectOption<TEnum[keyof TEnum]>[] {
  const options = Object.entries(enumObj).map(([_, value]) => ({
    label: String(value),
    value,
  }));

  return options;
}
