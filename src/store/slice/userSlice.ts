import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    getUser(state) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }
    },
  },
});

export const { setUser, logOut, getUser } = userSlice.actions;
export default userSlice.reducer;
