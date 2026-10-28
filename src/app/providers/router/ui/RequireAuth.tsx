import { userSelectors } from '@entities/User';
import { getRouteLogin } from '@shared/const/router';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props;

  const auth = useSelector(userSelectors.getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={getRouteLogin()} state={{ from: location }} replace />;
  }

  return children;
};

RequireAuth.displayName = 'RequireAuth';
