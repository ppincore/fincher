import { memo } from 'react';
import { Page } from '@widgets/Page';
import { TransactionsTable } from '@entities/Transaction';

const TransactionPage = memo(function TransactionPage() {
  return (
    <Page>
      <TransactionsTable selectable isWithFilter />
    </Page>
  );
});

TransactionPage.displayName = 'TransactionPage';

export default TransactionPage;
