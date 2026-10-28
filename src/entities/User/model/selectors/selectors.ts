import { StateSchema } from '@app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getUserAuthData = (state: StateSchema) => state.user.userData;
export const getUserEmail = createSelector(
  getUserAuthData,
  (data) => data?.email ?? '',
);

export const getUserInited = (state: StateSchema) => state.user._inited;

export const userSelectors = {
  getUserAuthData,
  getUserEmail,
  getUserInited,
};
