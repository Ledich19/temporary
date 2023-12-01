import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoriesData } from "../../interfaces";
import {
  addOptionsToCategory,
  getAllCategories,
  getOptionsForCategory,
  updateCategory,
} from "./operations";

type InitialState = {
  categories: ICategoriesData[];
  selectedCategory: ICategoriesData | null;
  optionsForCategory: string[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  categories: [],
  selectedCategory: null,
  optionsForCategory: [],
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
      error: action.payload.message || "Unknown error",
    };
  }
  return state;
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory(state, actions: PayloadAction<ICategoriesData>) {
      return { ...state, selectedCategory: actions.payload || null };
    },
    setIsLoading(state, actions: PayloadAction<boolean>) {
      return { ...state, isLoading: actions.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, handlePending)
      .addCase(getAllCategories.fulfilled, (state: InitialState, action) => ({
        ...state,
        isLoading: false,
        categories: action.payload,
      }))
      .addCase(getAllCategories.rejected, handleRejected)

      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state: InitialState, action) => {
        if (!action.payload) return state;
        const { data, category } = action.payload;
        return {
          ...state,
          isLoading: false,
          categories: data,
          selectedCategory: category,
          error: null,
        };
      })
      .addCase(updateCategory.rejected, handleRejected)

      .addCase(getOptionsForCategory.pending, handlePending)
      .addCase(
        getOptionsForCategory.fulfilled,
        (state: InitialState, action) => {
          if (!action.payload) return state;
          return {
            ...state,
            isLoading: false,
            optionsForCategory: action.payload,
            error: null,
          };
        }
      )
      .addCase(getOptionsForCategory.rejected, handleRejected)

      .addCase(addOptionsToCategory.pending, handlePending)
      .addCase(
        addOptionsToCategory.fulfilled,
        (state: InitialState, action) => {
          if (!action.payload) return state;
          return {
            ...state,
            isLoading: false,
            optionsForCategory: action.payload,
            error: null,
          };
        }
      )
      .addCase(addOptionsToCategory.rejected, handleRejected);
  },
});

export const { setSelectedCategory, setIsLoading } = categoriesSlice.actions;
export default categoriesSlice.reducer;
