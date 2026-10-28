import { memo } from 'react';
import { HStack, VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Icon, IconTheme } from '@shared/ui/Icon';
import { IconPlus } from '@shared/assets/icons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './AddAccountButtonCard.module.scss';

interface AddAccountButtonCardProps {
  className?: string;
  onClick: () => void;
}

export const AddAccountButtonCard = memo(function AddAccountButtonCard(
  props: AddAccountButtonCardProps,
) {
  const { className, onClick } = props;
  const { t } = useTranslation();

  return (
    <VStack
      as="button"
      onClick={onClick}
      type="button"
      justify="center"
      align="center"
      gap="16"
      className={clsx(cls.card, [className])}
    >
      <HStack max justify="center" align="center" gap="8">
        <Typography size="body1" color="secondary" weight="regular">
          {t('Add new account')}
        </Typography>
        <Icon theme={IconTheme.SECONDARY} measure={24} Svg={IconPlus} />
      </HStack>
    </VStack>
  );
});
