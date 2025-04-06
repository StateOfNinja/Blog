import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = 'https://blog-platform.kata.academy/api';

const apiSlice = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => `/articles?limit=${limit}&offset=${offset}`,
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: { user: data },
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email: data.email,
            password: data.password,
          },
        },
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery, useRegisterUserMutation, useLoginUserMutation } = apiSlice;
export default apiSlice;
