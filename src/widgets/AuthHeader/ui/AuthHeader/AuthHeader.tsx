import { memo } from 'react';
import classNames from 'clsx';
import { HStack } from '@shared/ui/Stack';
import { LangSwitcher } from '@features/LangSwitcher';
// import { Logo } from '@shared/ui/Logo';
import { ThemeSwitcher } from '@features/ThemeSwitcher';
import cls from './AuthHeader.module.scss';

interface AuthHeaderProps {
  className?: string;
}

export const AuthHeader = memo(function AuthHeader(props: AuthHeaderProps) {
  const { className } = props;

  return (
    <HStack
      className={classNames(cls.authHeader, {}, [className])}
      max
      justify="between"
      align="center"
    >
      {/* <Logo /> */}

      <HStack align="center" gap="8">
        <ThemeSwitcher />
        <LangSwitcher />
      </HStack>
    </HStack>
  );
});

AuthHeader.displayName = 'AuthHeader';
