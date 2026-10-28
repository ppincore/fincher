import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@widgets/Page';
import classNames from 'clsx';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(function NotFoundPage(
  props: NotFoundPageProps,
) {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.notFoundPage, {}, [className])}>
      404 {t('Page not found')}
    </Page>
  );
});

NotFoundPage.displayName = 'NotFoundPage';
