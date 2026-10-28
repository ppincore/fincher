import { ReactNode, memo } from 'react';
import { VStack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import cls from './ContentFragment.module.scss';

interface ContentFragmentProps {
  className?: string;
  children: ReactNode;
  label: string;
}

export const ContentFragment = memo(function ContentFragment(
  props: ContentFragmentProps,
) {
  const { className, children, label } = props;

  return (
    <VStack gap="6" justify="center" align="start" className={className}>
      <Typography size="body2" weight="medium" color="primary">
        {label}
      </Typography>
      <div className={cls.content}>{children}</div>
    </VStack>
  );
});

ContentFragment.displayName = 'ContentFragment';
