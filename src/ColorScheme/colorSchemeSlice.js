import { createSlice } from '@reduxjs/toolkit';

export const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState: {
    obj: {}
  },
  reducers: {
    setColorScheme: (state, action) => { state.obj = action.payload; },
  },
});

export const { setColorScheme } = colorSchemeSlice.actions;

export const selectColorScheme = (state) => state.colorScheme.obj;

export default colorSchemeSlice.reducer;
