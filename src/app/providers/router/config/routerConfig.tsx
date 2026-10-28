/* eslint-disable react/jsx-props-no-spreading */
import { ConfirmEmailPage } from '@pages/ConfirmEmailPage';
import { LoginPage } from '@pages/LoginPage';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProfilePage } from '@pages/ProfilePage';
import { RegisterPage } from '@pages/RegisterPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { TransactionPage } from '@pages/TransactionPage';
import { IconFolder, IconHomeLine, IconSettings01 } from '@shared/assets/icons';
import {
  AppRoutes,
  getRouteConfirmEmail,
  getRouteLogin,
  getRouteMain,
  getRouteProfile,
  getRouteRegister,
  getRouteResetPassword,
  getRouteTransactions,
} from '@shared/const/router';
import { MainLayout } from '@shared/layouts/MainLayout';
import type { AppRouteProps } from '@shared/types/router';
import { Icon } from '@shared/ui/Icon';
import { Navbar } from '@widgets/Navbar';
import { Sidebar } from '@widgets/Sidebar';
import { generatePath, Outlet, PathParam } from 'react-router-dom';

export const RouteList: Record<string, AppRouteProps> = {
  [AppRoutes.SIDEBAR_LAYOUT]: {
    element: (
      <MainLayout
        sidebar={<Sidebar />}
        header={<Navbar />}
        content={<Outlet />}
      />
    ),
    path: '',
    subRoutes: {
      [AppRoutes.MAIN]: {
        link: {
          text: 'Main',
          Icon: <Icon size="24" Svg={IconHomeLine} />,
        },
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
      },
      [AppRoutes.TRANSACTIONS]: {
        link: {
          text: 'Transactions',
          Icon: <Icon size="24" Svg={IconFolder} />,
        },
        path: getRouteTransactions(),
        element: <TransactionPage />,
        authOnly: true,
      },
      [AppRoutes.PROFILE]: {
        link: {
          text: 'Profile',
          Icon: <Icon size="24" Svg={IconSettings01} />,
        },
        path: getRouteProfile(),
        element: <ProfilePage />,
        authOnly: true,
      },
    },
  },

  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.REGISTER]: {
    path: getRouteRegister(),
    element: <RegisterPage />,
  },
  [AppRoutes.CONFIRM_EMAIL]: {
    path: getRouteConfirmEmail(),
    element: <ConfirmEmailPage />,
  },
  [AppRoutes.RESET_PASSWORD]: {
    path: getRouteResetPassword(),
    element: <ResetPasswordPage />,
  },
  // last-one
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
} as const;

export const routeItemsArray: AppRouteProps[] = Object.values(RouteList);

export const getRouteLinks = () => {
  const getAvailableRoutes = (routes: Record<string, AppRouteProps>) => {
    const getRoutesLinks = (routes: Record<string, AppRouteProps>) =>
      Object.values(routes).flatMap<AppRouteProps>((route) => {
        const result: AppRouteProps[] = [];
        if (route?.link) {
          result.push(route);
        }
        if (route?.subRoutes) {
          result.push(...getRoutesLinks(route.subRoutes));
        }
        return result;
      });

    const routesLinks = getRoutesLinks(routes);

    return routesLinks.map((route) => ({ ...route.link!, path: route.path }));
  };
  const availableLinks = getAvailableRoutes(RouteList);

  return availableLinks;
};

export const getRouteHeader = (
  pathToFind: string,
  params?: {
    [key in PathParam<string>]: string | null;
  },
) => {
  let foundRoute: AppRouteProps;
  const getFromRoutes = (routes: Record<string, AppRouteProps>) => {
    function findRouteHeader(routes: Record<string, AppRouteProps>): void {
      Object.values(routes).forEach((route) => {
        if (route?.subRoutes) {
          findRouteHeader(route.subRoutes);
          return;
        }

        try {
          const pathToCheck = generatePath(route.path ?? '', params);

          if (pathToCheck === pathToFind) {
            foundRoute = route;
          }
        } catch (e) {
          /* empty */
        }
      });
    }

    findRouteHeader(routes);
    return foundRoute;
  };

  return getFromRoutes(RouteList);
};
