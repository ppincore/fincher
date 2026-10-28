import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import classNames from 'clsx';
import { HStack, VStack } from '@shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Input } from '@shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useAppDispatch } from '@shared/lib/hooks';
import { userSelectors, userActions } from '@entities/User';
import { useNavigate } from 'react-router-dom';
import {
  getRouteMain,
  getRouteRegister,
  getRouteResetPassword,
} from '@shared/const/router';
import { useSelector } from 'react-redux';
import { Checkbox } from '@shared/ui/Checkbox';
import { Typography } from '@shared/ui/Typography';
import { AppLink, AppLinkTheme } from '@shared/ui/AppLink';
import { isFetchError } from '@shared/lib/typeGuards';
import { USER_EMAIL_LOCAL_STORAGE_KEY } from '@shared/const/browserStorage';
import { AuthenticationData } from '../../model/types/authentication';
import { useAuthByEmail } from '../../api/authenticationApi';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

const devLoginForm = __IS_DEV__
  ? {
      email: process.env.DEV_LOGIN ?? '',
      password: process.env.DEV_PASSWORD ?? '',
    }
  : {
      email: localStorage.getItem(USER_EMAIL_LOCAL_STORAGE_KEY) || '',
      password: '',
    };

export const LoginForm = memo(function LoginForm(props: LoginFormProps) {
  const { className } = props;
  const { t: tAuth } = useTranslation('authentication');
  const [toAuth, { isLoading }] = useAuthByEmail();
  const [loginForm, setLoginForm] = useState<AuthenticationData>(devLoginForm);
  const [loginError, setLoginError] = useState<string>();
  const [remember, setRemember] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useSelector(userSelectors.getUserAuthData);

  useEffect(() => {
    if (isAuth) {
      navigate(getRouteMain());
    }
  }, [isAuth, navigate]);

  const onAuth = useCallback(async () => {
    if (!loginForm.email || !loginForm.password) {
      // TODO: add better validation
      setLoginError('Email and password must be fulfilled');
      return;
    }

    const result = await toAuth(loginForm);
    if (isFetchError(result)) {
      setLoginError(result.error.data?.message ?? 'Server error');
      return;
    }

    if ('data' in result && result.data) {
      const { accessToken: token } = result.data;
      if (!token) {
        // TODO: add toast
        // toast.error({
        //   title: tAuth('Auth error'),
        // });
        return;
      }

      dispatch(userActions.login(token));

      if (remember) {
        localStorage.setItem(USER_EMAIL_LOCAL_STORAGE_KEY, loginForm.email);
      }

      navigate(getRouteMain());
    }
  }, [dispatch, loginForm, navigate, remember, toAuth]);

  const onInputChange: (
    value: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => void = useCallback((v, e) => {
    setLoginForm((prevForm) => ({ ...prevForm, [e.target.name]: v }));
    setLoginError('');
  }, []);

  return (
    <VStack
      justify="start"
      className={classNames(cls.loginForm, {}, [className])}
      gap="32"
    >
      <VStack justify="start" gap="0">
        <Typography size="heading1" weight="semibold" color="primary">
          {tAuth('Login')}
        </Typography>
        {!loginError ? (
          <Typography size="body1" weight="regular" color="secondary">
            {tAuth('Log in description')}
          </Typography>
        ) : (
          <Typography size="body1" weight="regular" color="danger">
            {tAuth(loginError)}
          </Typography>
        )}
      </VStack>
      <VStack gap="16" max fullFill>
        <Input
          value={loginForm.email}
          onChange={onInputChange}
          placeholder={tAuth('Email')}
          label={tAuth('Email')}
          name="email"
          type="email"
          invalid={!!loginError}
        />
        <Input
          value={loginForm.password}
          onChange={onInputChange}
          placeholder={tAuth('Password')}
          label={tAuth('Password')}
          name="password"
          type="password"
          invalid={!!loginError}
        />
      </VStack>
      <VStack max gap="16" fullFill>
        <HStack max justify="between">
          <Checkbox
            onChange={setRemember}
            value={remember}
            label={tAuth('Remember')}
          />
          <AppLink to={getRouteResetPassword()} theme={AppLinkTheme.LINK}>
            {tAuth('Forget password?')}
          </AppLink>
        </HStack>
        <Button
          onClick={onAuth}
          theme={ButtonTheme.PRIMARY}
          className={cls.btn}
          size={ButtonSize.L}
          isLoading={isLoading}
        >
          {tAuth('Log in')}
        </Button>
        <HStack gap="8" max justify="center">
          <Typography size="body2" weight="semibold" color="primary">
            {tAuth('No account?')}
          </Typography>
          <AppLink to={getRouteRegister()} theme={AppLinkTheme.LINK}>
            {tAuth('Create account')}
          </AppLink>
        </HStack>
      </VStack>
    </VStack>
  );
});
