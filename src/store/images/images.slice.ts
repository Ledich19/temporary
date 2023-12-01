import { createSlice } from "@reduxjs/toolkit";
import { removeImage } from "./operations";
import { createImage } from "./operations";

type InitialState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
};

const handlePending = (state: InitialState): InitialState => ({
  ...state,
  isLoading: true,
});

const handleRejected = (state: InitialState, action: any): InitialState => {
  if (action.payload) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.message || "Unknown error",
    };
  }
  return state;
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createImage.pending, handlePending)
      .addCase(createImage.fulfilled, (state: InitialState) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(createImage.rejected, handleRejected)
      .addCase(removeImage.pending, handlePending)
      .addCase(removeImage.rejected, handleRejected);
  },
});

export const {} = imagesSlice.actions;
export default imagesSlice.reducer;
