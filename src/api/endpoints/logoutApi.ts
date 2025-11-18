// ✅ logout should be a mutation, not query
import { baseApiWithAuth } from '@api/baseApi';

export const userApi = baseApiWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = userApi;
