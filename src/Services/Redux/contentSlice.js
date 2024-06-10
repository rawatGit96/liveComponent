/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContentTab: 1,
  uploadContent: null,
};

const ContentSlice = createSlice({
  name: "ContentSlice",
  initialState,
  reducers: {
    setSelectedContentTab: (state, action) => {
      state.selectedContentTab = action.payload ?? 1;
    },
    setUploadContent: (state, action) => {
      state.uploadContent = action.payload ?? null;
    },
    clearUploadContent: (state, action) => {
      state.uploadContent = null;
    },
  },
});

export const { setSelectedContentTab, setUploadContent, clearUploadContent } =
  ContentSlice.actions;
export default ContentSlice.reducer;
