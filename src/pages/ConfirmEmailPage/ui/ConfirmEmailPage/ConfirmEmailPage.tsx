import { memo, useCallback, useEffect, useState } from 'react';
import classNames from 'clsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from '@shared/ui/Loader';
// import { useToast } from '@shared/ui/Toast';
import { useTranslation } from 'react-i18next';
import { VStack } from '@shared/ui/Stack';
import { useConfirmEmail } from '@features/Authentication/api/authenticationApi';
import { getRouteLogin } from '@shared/const/router';
import { isFetchError } from '@shared/lib/typeGuards';
import { Typography } from '@shared/ui/Typography';
import { AuthFooter } from '@widgets/AuthFooter';
import { AuthHeader } from '@widgets/AuthHeader';
import cls from './ConfirmEmailPage.module.scss';

export interface ConfirmEmailPageProps {
  className?: string;
}

const REDIRECT_DELAY = 3000;

const ConfirmEmailPage = memo(function ConfirmEmailPage(
  props: ConfirmEmailPageProps,
) {
  const { className } = props;

  const { t: tAuth } = useTranslation('authentication');
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('token');
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const toast: any = { error: () => {}, success: () => {} };
  const [toConfirmEmail, { isUninitialized }] = useConfirmEmail();
  const [emailConfirmDescription, setEmailConfirmDescription] =
    useState<string>('Email confirm description');

  const confirmEmail = useCallback(async () => {
    if (!isUninitialized) {
      return;
    }
    if (!confirmToken) {
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Confirm error'),
      //   description: tAuth('No confirm token'),
      // });
      return;
    }

    const result = await toConfirmEmail({ token: confirmToken });

    if (isFetchError(result)) {
      setEmailConfirmDescription(
        result.error.data?.message ?? 'Email error confirmation',
      );
      // TODO: add translations
      // toast.error({
      //   title: tAuth('Confirm error'),
      //   description: tAuth(result.error.data?.message ?? ''),
      // });
      setTimeout(() => {
        navigate(getRouteLogin());
      }, REDIRECT_DELAY);
      return;
    }

    if ('data' in result) {
      setEmailConfirmDescription('Email confirmed');
      // TODO: add translations
      // toast.success({
      //   title: tAuth('Confirm success'),
      //   description: tAuth('Email confirmed'),
      //   duration: timeOut,
      // });
      setTimeout(() => {
        navigate(getRouteLogin());
      }, REDIRECT_DELAY);
    }
  }, [confirmToken, isUninitialized, navigate, toConfirmEmail]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <VStack max fullFill className={cls.confirmEmailPage}>
      <AuthHeader />
      <VStack
        justify="center"
        align="center"
        className={classNames(cls.confirmEmailPage, className)}
        gap="32"
      >
        {/* // TODO: add translations */}
        <VStack justify="center" align="center" gap="8">
          <Typography color="primary" size="heading1" weight="semibold">
            {tAuth('Email confirmation')}
          </Typography>
          <Typography color="secondary" size="body1">
            {tAuth(emailConfirmDescription)}
          </Typography>
        </VStack>
        <Loader className={cls.loader} />
      </VStack>
      <AuthFooter />
    </VStack>
  );
});

export default ConfirmEmailPage;
