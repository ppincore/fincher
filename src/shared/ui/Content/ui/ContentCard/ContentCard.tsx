import { ReactNode, memo } from 'react';
import classNames from 'clsx';
import { Typography } from '@shared/ui/Typography';
import { HStack, VStack } from '@shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Chip, ChipTheme } from '@shared/ui/Chip';
import cls from './ContentCard.module.scss';

interface ContentCardProps {
  className?: string;
  children?: ReactNode;
  headingText: string;
  chipText?: string;
  chipTheme?: ChipTheme;
  actionBtn?: {
    text: string;
    onClick: () => void;
  };
}

export const ContentCard = memo(function ContentCard(props: ContentCardProps) {
  const {
    className,
    children,
    headingText,
    actionBtn,
    chipText,
    chipTheme = 'grey',
  } = props;

  return (
    <VStack
      max
      gap="8"
      className={classNames(cls.contentCard, {}, [className])}
    >
      <HStack max gap="8" justify="between">
        <HStack gap="8" align="center">
          <Typography color="secondary" size="heading4">
            {headingText}
          </Typography>
          {chipText && <Chip text={chipText} size="m" theme={chipTheme} />}
        </HStack>
        {actionBtn && (
          <Button
            size={ButtonSize.S}
            theme={ButtonTheme.TEXT}
            onClick={actionBtn.onClick}
          >
            {actionBtn.text}
          </Button>
        )}
      </HStack>
      <div className={cls.body}>{children}</div>
    </VStack>
  );
});

ContentCard.displayName = 'ContentCard';
