import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import appStateReducers from "./application/appStateReducers";
import categoriesReducers from "./categories/categories.slice";
import productsSlice from "./products/products.slice";
import manufacturersSlice from "./manufacturers/manufacturers.slice";
import optionsSlice from "./options/options.slice";
import imagesSlice from "./images/images.slice";

export const store = configureStore({
  reducer: {
    appState: appStateReducers,
    categories: categoriesReducers,
    products: productsSlice,
    manufacturers: manufacturersSlice,
    options: optionsSlice,
    images: imagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
