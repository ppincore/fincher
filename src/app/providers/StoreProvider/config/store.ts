import { Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { rtkApi } from '@shared/api/rtkApi';
import { userReducer } from '@entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkApi.middleware),
  });

  // @ts-ignore //!FIX Later
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
