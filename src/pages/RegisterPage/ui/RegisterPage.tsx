import { memo } from 'react';
import { RegisterForm } from '@features/Authentication';
import { HStack, VStack } from '@shared/ui/Stack';
import { AuthFooter } from '@widgets/AuthFooter';
import { AuthHeader } from '@widgets/AuthHeader';
import cls from './RegisterPage.module.scss';

const RegisterPage = memo(function RegisterPage() {
  return (
    <VStack max fullFill className={cls.registerPage}>
      <AuthHeader />
      <HStack className={cls.form} justify="center">
        <RegisterForm />
      </HStack>
      <AuthFooter />
    </VStack>
  );
});
RegisterPage.displayName = 'RegisterPage';

export default RegisterPage;
