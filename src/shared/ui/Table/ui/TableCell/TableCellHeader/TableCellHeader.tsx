import { memo } from 'react';
import { HStack } from '@shared/ui/Stack';
import { Icon } from '@shared/ui/Icon';
import { Typography } from '@shared/ui/Typography';
import { IconSort, IconSortAsc, IconSortDesc } from '@shared/assets/icons';
import { useTranslation } from 'react-i18next';
import { TableHeaderCellI } from '../../../types/table';

type TableCellHeaderProps = TableHeaderCellI & { className?: string };

const OrderIcon = {
  asc: IconSortAsc,
  desc: IconSortDesc,
} as const;

export const TableCellHeader = memo(function TableCellHeader(
  props: TableCellHeaderProps,
) {
  const {
    className,
    sortable,
    align = 'start',
    text = '',
    translationNamespace,
    isWithTranslation = true,
  } = props;
  const { t } = useTranslation(translationNamespace);

  const cellText = (
    <Typography color="primary" weight="semibold" size="body2">
      {isWithTranslation ? t(text) : text}
    </Typography>
  );

  let icon;

  if (sortable) {
    const { order, sorted } = props;
    let sortingIcon = IconSort;
    if (sorted && order) {
      sortingIcon = OrderIcon[order];
    }
    icon = <Icon Svg={sortingIcon} measure="1.5rem" />;

    return (
      <button className={className} type="button">
        <HStack max justify={align} align="center" gap="12">
          {cellText}
          {icon}
        </HStack>
      </button>
    );
  }

  return (
    <HStack justify={align} align="center" gap="12" className={className}>
      {cellText}
    </HStack>
  );
});

TableCellHeader.displayName = 'TableCellHeader';
