import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsService } from "../../services";
import { IProductCreateRequest } from "../../interfaces";

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  (_, thunkAPI) =>
    productsService
      .getAll()
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const createProduct = createAsyncThunk(
  "products/addProduct",
  (data: IProductCreateRequest, thunkAPI) =>
    productsService
      .create(data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

// const formData = new FormData();
// console.log('data.data', data.data);

// Object.keys(data.data).forEach((key) => {
//    const value = data.data[key as keyof IProductCreateRequest];
//    console.log(key, value);

//    if (value !== undefined) {
//       formData.append(key, value.toString());
//    }
// });

// data.files.forEach((image) => {
//    formData.append(`images`, image);
// });
