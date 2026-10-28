import { memo } from 'react';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { AppLink } from '@shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { Links } from '@shared/const/links';
import cls from './AuthFooter.module.scss';

interface AuthFooterProps {
  className?: string;
}

const contactLink = Links.connectUs;

export const AuthFooter = memo(function AuthFooter(props: AuthFooterProps) {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <HStack
      className={classNames(cls.authFooter, {}, [className])}
      max
      justify="between"
      align="center"
    >
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Typography color="secondary" size="body2">
        ©2025 BNB
      </Typography>
      <AppLink to={contactLink} target="_blank">
        {t('Contact us')}
      </AppLink>
    </HStack>
  );
});

AuthFooter.displayName = 'AuthFooter';
