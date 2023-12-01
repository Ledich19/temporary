import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBaseIdManufacturers, ICategoriesData } from "../../interfaces";
import {
  createManufacturer,
  getAllManufacturers,
  removeManufacture,
} from "./operations";

type InitialState = {
  manufacturers: IBaseIdManufacturers[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  manufacturers: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: InitialState): InitialState => ({
  ...state,
  isLoading: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRejected = (state: InitialState, action: any): InitialState => {
  if (action.payload) {
    return {
      ...state,
      isLoading: false,
      error: action.payload || "Unknown error",
    };
  }
  return state;
};

const manufacturersSlice = createSlice({
  name: "manufacturers",
  initialState,
  reducers: {
    setSelectedCategory(state, actions: PayloadAction<ICategoriesData>) {
      return { ...state, selectedCategory: actions.payload || null };
    },
    setManufacturerError(state, actions: PayloadAction<string | null>) {
      return { ...state, error: actions.payload || null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllManufacturers.pending, handlePending)
      .addCase(
        getAllManufacturers.fulfilled,
        (state: InitialState, action) => ({
          ...state,
          isLoading: false,
          manufacturers: action.payload,
        })
      )
      .addCase(getAllManufacturers.rejected, handleRejected)

      .addCase(createManufacturer.pending, handlePending)
      .addCase(createManufacturer.fulfilled, (state: InitialState, action) => ({
        ...state,
        isLoading: false,
        manufacturers: state.manufacturers.concat(action.payload),
      }))
      .addCase(createManufacturer.rejected, handleRejected)

      .addCase(removeManufacture.pending, handlePending)
      .addCase(removeManufacture.fulfilled, (state: InitialState, action) => ({
        ...state,
        isLoading: false,
        manufacturers: state.manufacturers.filter(
          (item) => item.id !== action.payload
        ),
      }))
      .addCase(removeManufacture.rejected, handleRejected);
  },
});

export const { setSelectedCategory } = manufacturersSlice.actions;
export default manufacturersSlice.reducer;
