import { configureStore } from '@reduxjs/toolkit';

import apiSlice from './slice/apiSlice';
import userSlice from './slice/userSlice';
import articleSlice from './slice/articleSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice,
    createdArticle: articleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
