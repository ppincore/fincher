import { Sections } from '@shared/const/router';
import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';

export interface RouteLink {
  text: string;
  Icon: ReactElement;
  section?: Sections;
  path?: string;
}

export type AppRouteLinks = Partial<Record<Sections, RouteLink[]>>;

export type AppRouteProps = RouteProps & {
  link?: RouteLink;
  headerLabel?: { text: string; Icon: JSX.Element };
  authOnly?: boolean;
  subRoutes?: Record<string, AppRouteProps>;
};
