import { AppLinkSize, AppLinkTheme } from '../const/appLink';

export interface AppLinkRoute {
  theme?: AppLinkTheme.ROUTE;
  currentPage?: boolean;
  size?: AppLinkSize.L;
}

export interface AppLinkAnchor {
  theme?: AppLinkTheme.LINK;
  currentPage?: never;
  size?: AppLinkSize;
}
