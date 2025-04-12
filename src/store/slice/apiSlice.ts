import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = 'https://blog-platform.kata.academy/api';

const apiSlice = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: ['Article', 'Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset, token }) => ({
        url: `/articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: () => [{ type: 'Articles', id: 'all' }],
    }),
    getArticle: builder.query({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: (slug) => [{ type: 'Article', id: slug }],
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
        body: { user: data },
      }),
    }),
    editProfile: builder.mutation({
      query: ({ data, token }) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: { user: data },
      }),
    }),
    createArticle: builder.mutation({
      query: ({ data, token }) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: { article: data },
      }),
    }),
    deleteArticle: builder.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    editArticle: builder.mutation({
      query: ({ slug, token, data }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: { article: data },
      }),
      invalidatesTags: ({ slug }) => [{ type: 'Article', id: slug }],
    }),
    toggleFavoriteArticle: builder.mutation({
      query: ({ slug, token, favorite }) => ({
        url: `/articles/${slug}/favorite`,
        method: favorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ({ slug }) => [
        { type: 'Article', id: slug },
        { type: 'Articles', id: 'all' },
      ],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditProfileMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useToggleFavoriteArticleMutation,
} = apiSlice;
export default apiSlice;
