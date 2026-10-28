import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState } from './const';

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
});

export const combinedReducer = { [sliceName]: slice.reducer } as const;
export const { actions } = slice;
