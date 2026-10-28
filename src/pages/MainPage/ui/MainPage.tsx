import { memo } from 'react';
import { Page } from '@widgets/Page';
import { AccountInfoCardList } from '@entities/Account';
import { VStack } from '@shared/ui/Stack';
import { TransactionsTable } from '@entities/Transaction';
import { Typography } from '@shared/ui/Typography';
import { useTranslation } from 'react-i18next';

const MainPage = memo(function MainPage() {
  const { t } = useTranslation();
  return (
    <Page>
      <VStack max style={{ width: '100%' }} gap="32">
        <AccountInfoCardList addable />
        <VStack gap="8" style={{ height: '100%' }} max>
          <Typography
            as="h4"
            style={{ paddingLeft: 'var(--padding-16)' }}
            weight="semibold"
            size="heading4"
            color="primary"
          >
            {t('Last transactions')}
          </Typography>
          <TransactionsTable />
        </VStack>
      </VStack>
    </Page>
  );
});

MainPage.displayName = 'MainPage';

export default MainPage;
