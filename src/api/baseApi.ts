// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { token } from '../utils/token-utils';
import Cookies from 'js-cookie';

export const baseApi = createApi({
  reducerPath: 'baseApiWithoutAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});

export const baseApiWithAuth = createApi({
  reducerPath: 'baseApiWithAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${Cookies.get('token')}`);
      headers.set('sessionid', Cookies.get('sessionid')!);
      return headers;
    },
  }),
  tagTypes: ['Dashboard'],
  endpoints: () => ({}),
});
