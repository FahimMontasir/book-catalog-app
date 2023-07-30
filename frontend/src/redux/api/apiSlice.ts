import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-one.vercel.app/api/v1',
    prepareHeaders: (headers, { getState }: any) => {
      const { userToken } = getState().localUser;

      if (userToken) {
        headers.set('authorization', userToken);
      }

      return headers;
    },
  }),
  tagTypes: ['review', 'book'],
  endpoints: () => ({}),
});
