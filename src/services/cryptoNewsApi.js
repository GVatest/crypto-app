import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": "30ced2c7d0msh72e3275b0ac645bp150649jsn1a36274294e7",
  "Accept-Language": "en-US,en;q=0.5",
};

const params = { safeSearch: "Off", textFormat: "Raw" };

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
  params: params,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&cc=en-US&count=${count}&freshness=Day`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
