import { rtkApi } from '@shared/api/rtkApi';
import { capitalizeFirstChar } from '@shared/lib/utils';
import { API_TAG } from '@shared/api/const';
import type { IForm, API } from '../model/types/types';

const controller = 'transactions';
const ENTITY_TAG = API_TAG.TRANSACTION;
const controllerBig = capitalizeFirstChar(controller);
const urlController = controller;

const ACCOUNT_TAG = API_TAG.ACCOUNT;

const api = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    //* CREATE
    [`${controller}Create`]: build.mutation<API.EntityResponse, IForm>({
      query: (body) => ({
        url: `/${urlController}`,
        method: 'POST',
        body: transformAmountToString(body),
      }),
      invalidatesTags: [ENTITY_TAG, ACCOUNT_TAG],
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
      API.RequestParams
    >({
      query: (params) => ({
        url: `/${urlController}/search`,
        params,
      }),
      providesTags: [ENTITY_TAG],
    }),

    //* UPDATE
    [`${controller}Update`]: build.mutation<
      API.EntityResponse,
      { updatedEntity: IForm; id: string }
    >({
      query: (body) => ({
        url: `/${urlController}/${body.id}`,
        method: 'PUT',
        body: transformAmountToString(body.updatedEntity),
      }),
      invalidatesTags: [ENTITY_TAG, ACCOUNT_TAG],
    }),

    //* DELETE
    [`${controller}Delete`]: build.mutation<void, API.DeleteData>({
      query: (id) => ({
        url: `/${urlController}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ENTITY_TAG, ACCOUNT_TAG],
    }),
  }),
});

const useCreateEntity = api[`use${controllerBig}CreateMutation`];
const useDetailsEntity = api[`use${controllerBig}GetDetailsQuery`];
const useListEntities = api[`use${controllerBig}GetEntitiesQuery`];
const useUpdateEntity = api[`use${controllerBig}UpdateMutation`];
const useDeleteEntity = api[`use${controllerBig}DeleteMutation`];

export const apiHooks = {
  useCreateEntity,
  useDetailsEntity,
  useUpdateEntity,
  useDeleteEntity,
  useListEntities,
};

function transformAmountToString(body: Partial<IForm>) {
  const isAmountBody = typeof body?.amount !== 'undefined';
  const amount = isAmountBody ? { amount: String(body.amount) } : {};
  return { ...body, ...amount };
}
