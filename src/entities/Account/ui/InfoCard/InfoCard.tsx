import { memo, useCallback } from 'react';
import { HStack, VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { Icon, IconTheme } from '@shared/ui/Icon';
import { IconChevron, IconEdit05 } from '@shared/assets/icons';
import { Chip, ChipTheme } from '@shared/ui/Chip';
import { useHover } from '@shared/lib/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { formatMoneyNumber } from '@shared/lib/utils';
import { IEntity } from '../../model/types/types';
import cls from './InfoCard.module.scss';
import { EditAccount } from '../EditAccount/EditAccount';

type InfoCardType = 'successful' | 'neutral' | 'unsuccessful';

interface InfoCardProps {
  link?: string;
  type: InfoCardType;
  chipText?: string;
  className?: string;
  entityData: IEntity;
}

const chipTheme: Record<InfoCardType, ChipTheme> = {
  successful: 'successful',
  neutral: 'grey',
  unsuccessful: 'danger',
};

export const InfoCard = memo(function InfoCard(props: InfoCardProps) {
  const { className, link, type = 'neutral', chipText, entityData } = props;

  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  const { name, currency } = entityData;
  const balance = Number(entityData.balance);

  const Trigger = useCallback(
    ({ onClick }: any) => (
      <Icon
        clickable
        theme={isHovered ? IconTheme.BRAND : IconTheme.SECONDARY}
        measure={24}
        Svg={IconEdit05}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    ),
    [handleMouseEnter, handleMouseLeave, isHovered],
  );

  return (
    <VStack
      as={Link}
      to={link ?? ''}
      max
      justify="between"
      align="start"
      gap="16"
      className={clsx(cls.infoCard, [className])}
    >
      <HStack max justify="between" align="center" gap="8">
        <Typography size="body1" color="secondary" weight="regular">
          {name}
        </Typography>
        <Icon
          theme={IconTheme.SECONDARY}
          measure={24}
          Svg={IconChevron}
          transform="rotate(-90)"
        />
      </HStack>
      <HStack max justify="between" align="center" gap="8">
        <Typography size="heading2" color="primary" weight="regular">
          {`${formatMoneyNumber(balance, currency)}`}
        </Typography>
        {chipText && <Chip size="l" text={chipText} theme={chipTheme[type]} />}
        <EditAccount Trigger={Trigger} entityData={entityData} />
      </HStack>
    </VStack>
  );
});
