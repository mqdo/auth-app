import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './auth';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginWithGoogle.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginWithFacebook.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginWithGithub.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.id = payload.user;
        state.isAuthenticated = true;
      }
    );
  },
});

export const { reducer: userReducer } = userSlice;
