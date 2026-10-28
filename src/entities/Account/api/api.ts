import { rtkApi } from '@shared/api/rtkApi';
import { capitalizeFirstChar } from '@shared/lib/utils';
import { API_TAG } from '@shared/api/const';
import type { IForm, API } from '../model/types/types';

const controller = 'accounts';
const ENTITY_TAG = API_TAG.ACCOUNT;
const controllerBig = capitalizeFirstChar(controller);
const urlController = controller;

const TRANSACTION_TAG = API_TAG.TRANSACTION;

const api = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    //* CREATE
    [`${controller}Create`]: build.mutation<API.EntityResponse, IForm>({
      query: (body) => ({
        url: `/${urlController}`,
        method: 'POST',
        body: transformBalanceToString(body),
      }),
      invalidatesTags: [ENTITY_TAG],
    }),

    //* READ ONE
    [`${controller}GetDetails`]: build.query<API.EntityResponse, string>({
      query: (id) => ({
        url: `/${urlController}/${id}`,
      }),
    }),

    //* READ ALL
    [`${controller}GetEntities`]: build.query<
      API.ListEntityResponse,
      API.RequestParams | void
    >({
      query: (params) => ({
        url: `/${urlController}/search`,
        params: params ?? {},
      }),
      providesTags: [ENTITY_TAG],
    }),

    //* READ ALL SHORT
    [`${controller}GetShortEntities`]: build.query<
      API.ShortListEntityResponse,
      API.RequestParams | void
    >({
      query: (params) => ({
        url: `/${urlController}/search`,
        params: params ?? {},
      }),
      providesTags: [ENTITY_TAG],
      transformResponse: (response: API.ListEntityResponse) => response.items,
    }),

    //* UPDATE
    [`${controller}Update`]: build.mutation<
      API.EntityResponse,
      { updatedEntity: IForm; id: string }
    >({
      query: (body) => ({
        url: `/${urlController}/${body.id}`,
        method: 'PUT',
        body: transformBalanceToString(body.updatedEntity),
      }),
      invalidatesTags: [ENTITY_TAG],
    }),

    //* DELETE
    [`${controller}Delete`]: build.mutation<void, string>({
      query: (id) => ({
        url: `/${urlController}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ENTITY_TAG, TRANSACTION_TAG],
    }),
  }),
});

const useCreateEntity = api[`use${controllerBig}CreateMutation`];
const useDetailsEntity = api[`use${controllerBig}GetDetailsQuery`];
const useShortListEntities = api[`use${controllerBig}GetShortEntitiesQuery`];
const useListEntities = api[`use${controllerBig}GetEntitiesQuery`];
const useUpdateEntity = api[`use${controllerBig}UpdateMutation`];
const useDeleteEntity = api[`use${controllerBig}DeleteMutation`];

export const apiHooks = {
  useCreateEntity,
  useDetailsEntity,
  useUpdateEntity,
  useDeleteEntity,
  useListEntities,
  useShortListEntities,
};

function transformBalanceToString(body: Partial<IForm>) {
  const isBalanceInBody = typeof body?.balance !== 'undefined';
  const balance = isBalanceInBody ? { balance: String(body.balance) } : {};
  return { ...body, ...balance };
}
