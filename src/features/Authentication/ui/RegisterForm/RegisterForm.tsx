import { memo, useCallback, useState } from 'react';
import classNames from 'clsx';
import { HStack, VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Button, ButtonSize } from '@shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '@shared/ui/AppLink';
import { Checkbox } from '@shared/ui/Checkbox';
import { getRouteLogin } from '@shared/const/router';
import { Input, OnInputChange } from '@shared/ui/Input';
import { isFetchError } from '@shared/lib/typeGuards';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../api/authenticationApi';
import { RegisterFormData } from '../../model/types/authentication';
import cls from './RegisterForm.module.scss';

interface RegisterFormProps {
  className?: string;
}

const defaultRegisterForm: RegisterFormData = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
};

export const RegisterForm = memo(function RegisterForm(
  props: RegisterFormProps,
) {
  const { className } = props;
  const { t } = useTranslation('authentication');
  const [toRegister, { isLoading }] = useRegister();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    ...defaultRegisterForm,
  });
  const [registerError, setRegisterError] = useState<string>();
  const [registerInvalid, setRegisterInvalid] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    username: false,
  });
  const [isAgree, setIsAgree] = useState(false);

  const isPasswordConfirmed =
    registerForm.password === registerForm.passwordConfirm;
  const registerForbidden = !isAgree && !isPasswordConfirmed;

  const onInputChange: OnInputChange = useCallback((v, e) => {
    setRegisterForm((prevForm) => ({ ...prevForm, [e.target.name]: v }));
    setRegisterError('');
    setRegisterInvalid({
      email: false,
      password: false,
      passwordConfirm: false,
      username: false,
    });
  }, []);

  const onRegister = useCallback(async () => {
    if (
      !registerForm.email ||
      !registerForm.username ||
      !registerForm.password ||
      !registerForm.passwordConfirm
    ) {
      // TODO: add better validation
      setRegisterError('Fields required');
      return;
    }

    const isPasswordConfirmed =
      registerForm.passwordConfirm === registerForm.password;
    if (!isPasswordConfirmed) {
      // TODO: add better validation
      setRegisterError('Different passwords');
      setRegisterInvalid((prev) => ({
        ...prev,
        password: true,
        passwordConfirm: true,
      }));
      return;
    }

    const result = await toRegister(registerForm);
    if (isFetchError(result)) {
      setRegisterError(result.error.data?.message ?? 'Server error');
    }

    if ('data' in result) {
      const timeOut = 10000;
      const message = 'Check your email';
      setRegisterError(message);

      setTimeout(() => {
        navigate(getRouteLogin());
      }, timeOut);
    }
  }, [navigate, registerForm, toRegister]);

  return (
    <form>
      <VStack
        className={classNames(cls.registerForm, {}, [className])}
        gap="32"
      >
        <VStack max>
          <Typography color="primary" size="heading1" weight="semibold">
            {t('Create account')}
          </Typography>

          {registerError ? (
            <Typography size="body1" weight="regular" color="danger">
              {t(registerError)}
            </Typography>
          ) : (
            <Typography color="secondary" size="body1" weight="regular">
              {t('Create account description')}
            </Typography>
          )}
        </VStack>
        <VStack max fullFill gap="16">
          <Input
            required
            value={registerForm.email}
            invalid={registerInvalid.email}
            onChange={onInputChange}
            placeholder={t('Email')}
            label={t('Email')}
            name="email"
            type="email"
            autoComplete="username"
          />
          <Input
            required
            value={registerForm.username}
            invalid={registerInvalid.username}
            onChange={onInputChange}
            placeholder={t('Username')}
            label={t('Username')}
            name="username"
            type="text"
            autoComplete="username"
          />
          <Input
            required
            value={registerForm.password}
            onChange={onInputChange}
            placeholder={t('Password')}
            label={t('Password')}
            name="password"
            type="password"
            autoComplete="new-password"
            invalid={registerInvalid.password || !isPasswordConfirmed}
          />
          <Input
            required
            value={registerForm.passwordConfirm}
            onChange={onInputChange}
            placeholder={t('Confirm password')}
            label={t('Confirm password')}
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            invalid={registerInvalid.passwordConfirm || !isPasswordConfirmed}
          />
        </VStack>
        <VStack max fullFill gap="16">
          <HStack gap="4">
            <Checkbox
              value={isAgree}
              onChange={setIsAgree}
              label={t('Accept terms')}
            />
            <AppLink to="" theme={AppLinkTheme.LINK}>
              {t('agreements')}
            </AppLink>
          </HStack>
          <Button
            onClick={onRegister}
            isLoading={isLoading}
            disabled={registerForbidden}
            size={ButtonSize.S}
          >
            {t('Create')}
          </Button>
          <HStack gap="8" max justify="center">
            <Typography size="body2" weight="semibold" color="primary">
              {t('Has account?')}
            </Typography>
            <AppLink to={getRouteLogin()} theme={AppLinkTheme.LINK}>
              {t('Login')}
            </AppLink>
          </HStack>
        </VStack>
      </VStack>
    </form>
  );
});
