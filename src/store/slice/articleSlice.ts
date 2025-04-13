import { createSlice } from '@reduxjs/toolkit';

import { IArticle } from '../types-and-interfaces/article';

const initialState = {
  articles: <IArticle[]>[],
};

const articleSlice = createSlice({
  name: 'createdArticle',
  initialState,
  reducers: {
    setArticle(state, action) {
      const article = action.payload;
      state.articles = [...state.articles, article];
    },
    deleteArticle(state, action) {
      state.articles = state.articles.filter((article) => article.slug !== action.payload.slug);
    },
    updateArticle(state, action) {
      const newArticle = action.payload;
      state.articles = state.articles.map((article) => (article.slug === newArticle.slug ? newArticle : article));
    },
  },
});

export const { setArticle, deleteArticle, updateArticle } = articleSlice.actions;
export default articleSlice.reducer;
