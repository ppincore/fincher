import { AppRouteProps } from '@shared/types/router';
import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@widgets/PageLoader';
import { routeItemsArray } from '../config/routerConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(function AppRouter() {
  const routes = useMemo(() => routeItemsArray.map(renderWithWrapper), []);

  return <Routes>{routes}</Routes>;
});

function renderWithWrapper(route: AppRouteProps) {
  const element = (
    <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
  );

  const path = `${route.path}`;
  const subRoutes = route?.subRoutes;
  let subRoutesElement;

  if (subRoutes) {
    subRoutesElement = Object.values(subRoutes).map(renderWithWrapper);
  }

  return (
    <Route
      key={path}
      path={path}
      element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
    >
      {subRoutesElement}
    </Route>
  );
}

AppRouter.displayName = 'AppRouter';
