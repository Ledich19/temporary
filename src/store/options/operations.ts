import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { optionsService } from "../../services/optionsService";
import { ICreateOption } from "../../interfaces/options";

export const getAllOptions = createAsyncThunk(
  "options/getAll",
  async (_, thunkAPI) =>
    optionsService
      .getAll()
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const createOptions = createAsyncThunk(
  "options/create",
  async (data: ICreateOption, thunkAPI) =>
    optionsService
      .create(data)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const updateOption = createAsyncThunk(
  "options/update",
  async (data: { id: string; data: ICreateOption }, thunkAPI) =>
    optionsService
      .update(data.id, data.data)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const removeOption = createAsyncThunk(
  "options/remove",
  async (id: string, thunkAPI) =>
    optionsService
      .remove(id)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);
