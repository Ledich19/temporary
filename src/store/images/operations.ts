import { createAsyncThunk } from "@reduxjs/toolkit";
import { imagesService } from "../../services/imageService";

export const createImage = createAsyncThunk(
  "images/addImage",
  (data: File, thunkAPI) => {
    const formData = new FormData();
    formData.append("image", data);
    return imagesService
      .create(formData)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message));
  }
);

export const removeImage = createAsyncThunk(
  "images/removeImage",
  (id: string, thunkAPI) =>
    imagesService
      .remove(id)
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
