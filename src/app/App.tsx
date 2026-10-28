import { AppRouter } from '@app/providers/router';
import {
  listenLogoutEvent,
  userActions,
  userSelectors,
  useUserData,
} from '@entities/User';
import { useAppDispatch } from '@shared/lib/hooks';
import { PageLoader } from '@widgets/PageLoader';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const inited = useSelector(userSelectors.getUserInited);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { unsubscribeEvent } = listenLogoutEvent(() => {
      dispatch(userActions.logout());
    });
    return unsubscribeEvent;
  }, [dispatch]);

  useUserData();

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <div className="app">
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
