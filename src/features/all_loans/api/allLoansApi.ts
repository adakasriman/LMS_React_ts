import { baseApi } from '@api/baseApi';

export const allLoansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLoans: builder.query<any, void>({
      query: () => '/all-loans',
    }),
  }),
});

export const { useGetAllLoansQuery } = allLoansApi;
