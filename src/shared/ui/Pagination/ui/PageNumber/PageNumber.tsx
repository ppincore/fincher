import { memo } from 'react';
import classNames from 'clsx';
import { Typography } from '@shared/ui/Typography';
import { DOTS } from '../../lib/hooks/usePagination';
import cls from './PageNumber.module.scss';

interface PageNumberProps {
  pageNumber: number | typeof DOTS;
  selected: boolean;
  className?: string;
  onClick: (page: number) => void;
}

export const PageNumber = memo(function PageNumber(props: PageNumberProps) {
  const { className, pageNumber, selected = false, onClick } = props;

  const isDots = pageNumber === DOTS;

  let paginationItemContent = (
    <Typography size="body2" color="primary" weight="semibold" align="center">
      {String(DOTS)}
    </Typography>
  );

  if (!isDots) {
    paginationItemContent = (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button onClick={() => onClick(pageNumber)} type="button">
        <Typography
          size="body2"
          color={!selected ? 'primary' : 'brand'}
          weight="semibold"
          align="center"
        >
          {String(pageNumber)}
        </Typography>
      </button>
    );
  }

  return (
    <li
      className={classNames(cls.pageNumber, { [cls.dots]: isDots }, [
        className,
      ])}
    >
      {paginationItemContent}
    </li>
  );
});

PageNumber.displayName = 'PageNumber';
