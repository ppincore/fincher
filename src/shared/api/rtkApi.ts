import { triggerLogoutEvent } from '@entities/User/model/event/logout';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { API_TAG } from '@shared/api/const';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@shared/const/browserStorage';
import { FetchBaseQueryErrorCustom } from '@shared/types/api';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    triggerLogoutEvent();
  }
  return result;
};

export const rtkApi = createApi({
  reducerPath: 'api',
  tagTypes: Object.values(API_TAG),
  baseQuery: baseQueryWithReauth as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryErrorCustom,
    {},
    FetchBaseQueryMeta
  >,
  endpoints: (_builder) => ({}),
});
