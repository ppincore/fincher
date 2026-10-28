import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@shared/const/browserStorage';
import { parseJwt } from '@shared/lib/utils/jwt';
import { userApi } from '../../api/userApi';
import { User, UserSchema } from '../types/user';

const offAuthState: UserSchema = {
  _inited: true,
  token: 'mockToken',
  userData: {},
};

const isAuthDisabled = process.env.IS_AUTH_DISABLED === 'true';

const initialState: UserSchema = isAuthDisabled
  ? offAuthState
  : {
      _inited: false,
    };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      if (!token) {
        return;
      }

      state.userData = parseJwt<User>(token);
      state.token = token;

      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
    },
    initAuthData: (state) => {
      if (state._inited) {
        return;
      }
      state._inited = true;
    },
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
      state.userData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getDetails.matchFulfilled,
      (state, action: PayloadAction<User>) => {
        const userData = action.payload;
        const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
        if (userData && token) {
          state.userData = userData;
          state.token = token;
        }
        userSlice.caseReducers.initAuthData(state);
      },
    );
    builder.addMatcher(userApi.endpoints.getDetails.matchRejected, (state) => {
      if (!isAuthDisabled) {
        userSlice.caseReducers.logout(state);
      }
      userSlice.caseReducers.initAuthData(state);
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
