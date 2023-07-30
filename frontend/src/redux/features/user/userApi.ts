import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: `/auth/refresh-token`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshTokenMutation } =
  userApi;
