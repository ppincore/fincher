/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo } from 'react';
import classNames from 'clsx';
import { IconLucidArrow } from '@shared/assets/icons';
import { Icon, IconTheme } from '@shared/ui/Icon';
import { PageNumber } from '../PageNumber/PageNumber';
import { usePagination } from '../../lib/hooks/usePagination';
import cls from './Pagination.module.scss';

interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = memo(function Pagination(props: PaginationProps) {
  const {
    className,
    onPageChange,
    totalCount,
    siblingCount = 0,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  const isOnLastPage = currentPage === lastPage;
  const isOnFirstPage = currentPage === 1;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (isOnLastPage) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (isOnFirstPage) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  return (
    <div>
      <ul className={classNames(cls.pagination, className)}>
        <li>
          <button
            className={classNames(cls.arrowBtn, cls.left)}
            type="button"
            disabled={isOnFirstPage}
            onClick={onPrevious}
          >
            <Icon
              transform="rotate(-180)"
              Svg={IconLucidArrow}
              measure="1.25rem"
              theme={IconTheme.PRIMARY}
            />
          </button>
        </li>
        {paginationRange.map((pageNumber, i) => (
          <PageNumber
            key={`${pageNumber}${i}`}
            pageNumber={pageNumber}
            selected={pageNumber === currentPage}
            onClick={onPageChange}
          />
        ))}
        <li>
          <button
            className={classNames(cls.arrowBtn, cls.right)}
            type="button"
            disabled={isOnLastPage}
            onClick={onNext}
          >
            <Icon
              Svg={IconLucidArrow}
              measure="1.25rem"
              theme={IconTheme.PRIMARY}
            />
          </button>
        </li>
      </ul>
    </div>
  );
});

Pagination.displayName = 'Pagination';
