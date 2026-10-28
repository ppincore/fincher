import { memo, useCallback } from 'react';
import clsx from 'clsx';
import { ContentCard } from '@shared/ui/Content';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';
import { isFetchError } from '@shared/lib/typeGuards';
import { userSelectors } from '@entities/User';
import { useSelector } from 'react-redux';
import { useSendResetPasswordEmail } from '../../api/authenticationApi';

interface ProfileFormProps {
  className?: string;
}

export const ProfileForm = memo(function ProfileForm(props: ProfileFormProps) {
  const { className } = props;
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('authentication');
  const email = useSelector(userSelectors.getUserEmail);
  const [toSendEmail, { isLoading }] = useSendResetPasswordEmail();

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
    <VStack fullFill max className={clsx(className)}>
      <ContentCard headingText={t('Settings')}>
        <HStack gap="8" justify="between" align="center" max>
          <VStack gap="4">
            <Typography size="body1" weight="regular">
              {tAuth('Password')}
            </Typography>
            <Typography color="secondary" size="caption1" weight="medium">
              {t('Update password via email')}
            </Typography>
          </VStack>
          <Button
            isLoading={isLoading}
            size={ButtonSize.S}
            theme={ButtonTheme.OUTLINE}
            onClick={onSendResetPasswordEmail}
          >
            {t('Change password')}
          </Button>
        </HStack>
      </ContentCard>
    </VStack>
  );
});

ProfileForm.displayName = 'ProfileForm';
