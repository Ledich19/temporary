import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoriesData, IProductData } from "../../interfaces";
import { getAllProducts } from "./operations";

type InitialState = {
  products: IProductData[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  products: [],
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, actions: PayloadAction<ICategoriesData>) {
      return { ...state, selectedCategory: actions.payload || null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.fulfilled, (state: InitialState, action) => ({
        ...state,
        isLoading: false,
        products: action.payload,
      }))
      .addCase(getAllProducts.rejected, handleRejected)

      // .addCase(createProduct.pending, handlePending)
      // .addCase(createProduct.fulfilled, (state: InitialState, action) => ({
      //    ...state,
      //    isLoading: false,
      //    products: state.products.concat(action.payload),
      // }))
      // .addCase(createProduct.rejected, handleRejected);

      // .addCase(createImage.pending, handlePending)
      // .addCase(createImage.fulfilled, (state: InitialState, action) => ({
      //   ...state,
      //   isLoading: false,
      //   products: action.payload,
      // }))
      // .addCase(createImage.rejected, handleRejected);
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
