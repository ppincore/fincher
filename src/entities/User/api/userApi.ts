import { rtkApi } from '@shared/api/rtkApi';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@shared/const/browserStorage';
import { parseJwt } from '@shared/lib/utils';
import { User } from '../model/types/user';

export const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getDetails: build.query<User, void>({
      query: () => {
        const accessToken =
          localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) ?? '';
        const userData = parseJwt<User>(accessToken);
        return {
          url: `/users/${userData.id}`,
        };
      },
    }),
  }),
});

const useUserData = userApi.useGetDetailsQuery;

export { useUserData };
