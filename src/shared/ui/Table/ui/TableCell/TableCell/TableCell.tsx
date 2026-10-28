/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode, memo } from 'react';
import { HStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Chip } from '@shared/ui/Chip';
import { useTranslation } from 'react-i18next';
import { TableCellI } from '../../../types/table';

interface TableCellProps extends TableCellI {
  className?: string;
  children?: ReactNode;
}

export const TableCell = memo(function TableCell(props: TableCellProps) {
  const {
    className,
    align = 'start',
    text = '',
    chip,
    translationNamespace,
    isWithTranslation,
  } = props;
  const { t } = useTranslation(translationNamespace);

  return (
    <HStack className={className} max gap="8" justify={align}>
      {text && (
        <Typography size="body2" color="secondary">
          {isWithTranslation ? t(text) : text}
        </Typography>
      )}
      {chip && <Chip theme="brand" size="s" {...chip} />}
    </HStack>
  );
});

TableCell.displayName = 'TableCell';
