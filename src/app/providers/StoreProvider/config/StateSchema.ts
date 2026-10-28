import { UserSchema } from '@entities/User';
import { rtkApi } from '@shared/api/rtkApi';
import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  user: UserSchema;

  // Async
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
