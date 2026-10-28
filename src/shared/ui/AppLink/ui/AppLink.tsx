import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'clsx';
import { AppLinkAnchor, AppLinkRoute } from '../type/appLink';
import { AppLinkSize, AppLinkTheme } from '../const/appLink';
import cls from './AppLink.module.scss';

type AppLinkProps = LinkProps & {
  children?: ReactNode;
  className?: string;

  'data-testid'?: string;
} & (AppLinkRoute | AppLinkAnchor);

export const AppLink = (props: AppLinkProps) => {
  const {
    theme = AppLinkTheme.LINK,
    children,
    to,
    size: propsSize = AppLinkSize.M,
    className,
    'data-testid': dataTestId = 'AppLink',
    ...otherProps
  } = props;

  const isRoute = theme === AppLinkTheme.ROUTE;

  const size = isRoute ? AppLinkSize.L : propsSize;
  const currentPage = props?.currentPage;
  delete otherProps.currentPage;

  return (
    <Link
      {...otherProps}
      data-testid={dataTestId}
      to={to}
      className={classNames(cls.appLink, { [cls.current]: currentPage }, [
        className,
        cls[theme],
        cls[size],
      ])}
    >
      {children}
    </Link>
  );
};

AppLink.displayName = 'AppLink';
