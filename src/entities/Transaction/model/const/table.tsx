import { ColumnDef } from '@tanstack/react-table';
import { TableCell, TableCellHeader } from '@shared/ui/Table';
import { formatDateTime, formatMoneyNumber } from '@shared/lib/utils';
import { useTranslation } from 'react-i18next';
import { TransactionChipTheme } from '../../model/const/const';
import { IEntity } from '../types/types';

const columns: Record<
  keyof Omit<IEntity, 'id' | 'accountId'>,
  ColumnDef<IEntity, IEntity[keyof IEntity]>
> = {
  transactionType: {
    size: 120,
    maxSize: 120,
    id: 'transactionType',
    accessorKey: 'transactionType',
    header: () => <TableCellHeader text="Type" />,
    cell: (props) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      const transactionType = props.getValue<IEntity['transactionType']>();
      if (!transactionType) {
        return <TableCell text="-" />;
      }

      return (
        <TableCell
          chip={{
            text: t(transactionType),
            theme: TransactionChipTheme[transactionType],
          }}
        />
      );
    },
  },
  dateTime: {
    id: 'dateTime',
    accessorKey: 'dateTime',
    size: 100,
    maxSize: 120,
    header: () => <TableCellHeader text="Date and time" />,
    cell: (props) => {
      const dateTime = props.getValue<IEntity['dateTime']>();
      if (!dateTime) {
        return <TableCell text="-" />;
      }

      return <TableCell text={formatDateTime(dateTime)} />;
    },
  },
  description: {
    size: 550,
    maxSize: 550,
    id: 'description',
    accessorKey: 'description',
    header: () => <TableCellHeader text="Comment" />,
    cell: (props) => (
      <TableCell text={props.getValue<IEntity['description']>()} />
    ),
  },
  amount: {
    id: 'amount',
    accessorKey: 'amount',
    size: 100,
    maxSize: 120,
    header: () => <TableCellHeader text="Amount" />,
    cell: (props) => {
      const account = props.row.getValue<IEntity['account']>('account');
      const amount = formatMoneyNumber(
        Number(props.getValue<IEntity['amount']>()),
        account?.currency,
      );
      return <TableCell text={amount} />;
    },
  },
  account: {
    id: 'account',
    accessorKey: 'account',
    size: 100,
    maxSize: 120,
    header: () => <TableCellHeader text="Account" />,
    cell: (props) => {
      const account = props.getValue<IEntity['account']>();
      if (!account) {
        return <TableCell text="-" />;
      }

      return <TableCell text={account.name} />;
    },
  },
};

export const entityColumns: ColumnDef<IEntity, IEntity[keyof IEntity]>[] = [
  columns.account,
  columns.transactionType,
  columns.amount,
  columns.dateTime,
  columns.description,
];
