import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
