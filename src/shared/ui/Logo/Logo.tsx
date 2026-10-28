import { memo } from 'react';
import classNames from 'clsx';
import { Link } from 'react-router-dom';
import { Links } from '@shared/const/links';
import { Typography } from '@shared/ui/Typography';
import { useTranslation } from 'react-i18next';
// import { LogoIcon } from './LogoIcon';
import cls from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo = memo(function Logo(props: LogoProps) {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Link
      to={Links.logoClick}
      className={classNames(cls.logo, {}, [className])}
    >
      {/* <LogoIcon /> */}
      <Typography
        size="heading2"
        weight="semibold"
        color="primary"
        // eslint-disable-next-line i18next/no-literal-string
      >
        {t('Finance')}
      </Typography>
    </Link>
  );
});

Logo.displayName = 'Logo';
