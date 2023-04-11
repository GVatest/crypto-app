import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coingecko.com/api/v3/";

const createRequest = (url) => ({ url });

export const exchangesApi = createApi({
  reducerPath: "exchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetExchangesQuery } = exchangesApi;
