import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { manufacturersService } from "../../services/manufacturersService";

export const getAllManufacturers = createAsyncThunk(
  "manufacturers/getAll",
  async (_, thunkAPI) =>
    manufacturersService
      .getAll()
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const createManufacturer = createAsyncThunk(
  "manufacturers/addManufacture",
  async (data: { name: string; description: string }, thunkAPI) =>
    manufacturersService
      .create(data)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const removeManufacture = createAsyncThunk(
  "manufacturers/removeManufacture",
  async (id: string, thunkAPI) =>
    manufacturersService
      .remove(id)
      .then(() => id)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);
