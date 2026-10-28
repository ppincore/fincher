import { memo } from 'react';
import { LoginForm } from '@features/Authentication';
import { HStack, VStack } from '@shared/ui/Stack';
import { AuthFooter } from '@widgets/AuthFooter';
import { AuthHeader } from '@widgets/AuthHeader';
import cls from './LoginPage.module.scss';

const LoginPage = memo(function LoginPage() {
  return (
    <VStack max fullFill className={cls.loginPage}>
      <AuthHeader />
      <HStack className={cls.form} justify="center">
        <LoginForm />
      </HStack>
      <AuthFooter />
    </VStack>
  );
});
LoginPage.displayName = 'LoginPage';

export default LoginPage;
