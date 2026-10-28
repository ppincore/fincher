import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(function LangSwitcher(
  props: LangSwitcherProps,
) {
  const { className, short } = props;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      size={ButtonSize.S}
      theme={ButtonTheme.OUTLINE}
      className={clsx([className])}
      onClick={toggle}
    >
      {t(short ? 'Lng' : 'Language')}
    </Button>
  );
});
