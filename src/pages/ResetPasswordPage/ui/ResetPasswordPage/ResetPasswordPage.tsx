import { memo } from 'react';
import classNames from 'clsx';
import { AuthHeader } from '@widgets/AuthHeader';
import { AuthFooter } from '@widgets/AuthFooter';
import { HStack, VStack } from '@shared/ui/Stack';
import { ResetPasswordForm } from '@features/Authentication';
import cls from './ResetPasswordPage.module.scss';

export interface ResetPasswordPageProps {
  className?: string;
}

const ResetPasswordPage = memo(function ResetPasswordPage(
  props: ResetPasswordPageProps,
) {
  const { className } = props;

  return (
    <VStack
      max
      fullFill
      className={classNames(cls.resetPasswordPage, className)}
    >
      <AuthHeader />
      <HStack className={cls.form} justify="center">
        <ResetPasswordForm />
      </HStack>
      <AuthFooter />
    </VStack>
  );
});

ResetPasswordPage.displayName = 'ResetPasswordPage';

export default ResetPasswordPage;
