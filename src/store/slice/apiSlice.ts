import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = 'https://blog-platform.kata.academy/api';

const apiSlice = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : null;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Article', 'Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => ({
        url: `/articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Articles', id: 'all' }],
    }),
    getArticle: builder.query({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
        method: 'GET',
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
      invalidatesTags: ['Article', 'Articles'],
    }),
    editProfile: builder.mutation({
      query: ({ data }) => ({
        url: '/user',
        method: 'PUT',
        body: { user: data },
      }),
    }),
    createArticle: builder.mutation({
      query: ({ data }) => ({
        url: '/articles',
        method: 'POST',

        body: { article: data },
      }),
    }),
    deleteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    editArticle: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',

        body: { article: data },
      }),
      invalidatesTags: ({ slug }) => [{ type: 'Article', id: slug }],
    }),
    toggleFavoriteArticle: builder.mutation({
      query: ({ slug, favorite }) => ({
        url: `/articles/${slug}/favorite`,
        method: favorite ? 'DELETE' : 'POST',
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
