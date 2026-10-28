import { FC, ReactNode } from 'react';
import { disableReactDevTools } from '../lib/disableReactDevTools';

interface DevtoolsProviderProps {
  children?: ReactNode;
  withDevTools?: boolean;
}

export const DevtoolsProvider: FC<DevtoolsProviderProps> = (props) => {
  const { children, withDevTools = __IS_DEV__ } = props;

  if (__PROJECT__ === 'frontend' && !withDevTools) {
    disableReactDevTools();
  }

  return children;
};

DevtoolsProvider.displayName = 'DevtoolsProvider';
