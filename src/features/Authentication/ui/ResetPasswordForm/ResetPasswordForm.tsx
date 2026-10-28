import { memo, useCallback, useState } from 'react';
import classNames from 'clsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VStack } from '@shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { isFetchError } from '@shared/lib/typeGuards';
import { getRouteLogin } from '@shared/const/router';
import { Typography } from '@shared/ui/Typography';
import { Input, OnInputChange } from '@shared/ui/Input';
import {
  useResetPassword,
  useSendResetPasswordEmail,
} from '../../api/authenticationApi';
import cls from './ResetPasswordForm.module.scss';

interface ResetPasswordFormProps {
  className?: string;
}

export const ResetPasswordForm = memo(function ResetPasswordForm(
  props: ResetPasswordFormProps,
) {
  const { className } = props;

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <VStack
      className={classNames(cls.resetPasswordForm, {}, [className])}
      gap="32"
      fullFill
    >
      {token ? <NewPasswordForm /> : <SendEmailForm />}
    </VStack>
  );
});

ResetPasswordForm.displayName = 'ResetPasswordForm';

// eslint-disable-next-line react/display-name
function SendEmailForm() {
  const { t: tAuth } = useTranslation('authentication');
  const [toSendEmail, { isLoading }] = useSendResetPasswordEmail();
  // const toast = useToast();
  const [toSendEmailError, setToSendEmailError] = useState<string>();
  const [email, setEmail] = useState('');

  const onSendResetPasswordEmail = useCallback(async () => {
    if (!email) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth('Email must be fulfilled'),
      // });
      return;
    }

    const result = await toSendEmail({ email });
    if (isFetchError(result)) {
      setToSendEmailError(result.error.data?.message ?? 'Server error');
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth(result.error.data?.message ?? ''),
      // });
      return;
    }

    if ('data' in result) {
      // const timeOut = 10000;
      // TODO: add translations
      // toast.success({
      //   title: tAuth('Reset password success'),
      //   description: tAuth('Check your email'),
      //   duration: timeOut,
      // });
    }
  }, [email, toSendEmail]);

  return (
    <VStack max fullFill gap="32">
      <VStack fullFill max gap="12">
        <VStack align="center" max>
          <Typography color="primary" size="heading1" weight="semibold">
            {tAuth('Reset')}
          </Typography>
          {!toSendEmailError ? (
            <Typography color="secondary" size="body1" weight="regular">
              {tAuth('Reset description')}
            </Typography>
          ) : (
            <Typography size="body1" weight="regular" color="danger">
              {tAuth(toSendEmailError)}
            </Typography>
          )}
        </VStack>
        <Input
          value={email}
          onChange={setEmail}
          placeholder={tAuth('Email')}
          label={tAuth('Email')}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </VStack>
      <Button
        onClick={onSendResetPasswordEmail}
        theme={ButtonTheme.PRIMARY}
        size={ButtonSize.S}
        disabled={!email}
        isLoading={isLoading}
      >
        {tAuth('Continue')}
      </Button>
    </VStack>
  );
}

// eslint-disable-next-line react/display-name
function NewPasswordForm() {
  const { t: tAuth } = useTranslation('authentication');
  const [toResetPassword, { isLoading }] = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [resetForm, setResetForm] = useState({
    password: '',
    passwordConfirm: '',
  });
  const updateResetForm: OnInputChange = useCallback((v, e) => {
    setResetForm((prev) => ({ ...prev, [e.target.name]: v }));
  }, []);
  const navigate = useNavigate();

  // const toast = useToast();

  const onResetPassword = useCallback(async () => {
    if (!token) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth('Token is required'),
      // });
      return;
    }

    if (!resetForm.password || !resetForm.passwordConfirm) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth('Password must be fulfilled'),
      // });
      return;
    }

    const isPasswordConfirmed =
      resetForm.passwordConfirm === resetForm.password;
    if (!isPasswordConfirmed) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth('Different passwords'),
      // });
      return;
    }

    const { password } = resetForm;

    const result = await toResetPassword({ password, token });
    if (isFetchError(result)) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Reset password error'),
      //   description: tAuth(result.error.data?.message ?? ''),
      // });
      return;
    }

    if ('data' in result) {
      const timeOut = 10000;

      // TODO: add translations
      // toast.success({
      //   title: tAuth('Reset password success'),
      //   description: tAuth('Password changed'),
      //   duration: timeOut,
      // });

      setTimeout(() => {
        navigate(getRouteLogin());
      }, timeOut);
    }
  }, [navigate, resetForm, toResetPassword, token]);

  return (
    <VStack fullFill gap="12">
      <VStack align="center" max>
        <Typography color="primary" size="heading1" weight="semibold">
          {tAuth('New password')}
        </Typography>
        <Typography color="secondary" size="body1" weight="regular">
          {tAuth('New password description')}
        </Typography>
      </VStack>
      <VStack max fullFill gap="24">
        <VStack max fullFill gap="12">
          <Input
            value={resetForm.password}
            placeholder={tAuth('Password')}
            label={tAuth('Password')}
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            onChange={updateResetForm}
          />
          <Input
            value={resetForm.passwordConfirm}
            placeholder={tAuth('Confirm password')}
            label={tAuth('Confirm password')}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="new-password"
            onChange={updateResetForm}
          />
        </VStack>
      </VStack>
      <Button
        onClick={onResetPassword}
        theme={ButtonTheme.PRIMARY}
        size={ButtonSize.S}
        disabled={resetForm.password !== resetForm.passwordConfirm}
        isLoading={isLoading}
      >
        {tAuth('Continue')}
      </Button>
    </VStack>
  );
}
