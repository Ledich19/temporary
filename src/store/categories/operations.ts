import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesService } from "../../services/categoriesService";
import categoryUtils from "../../utils/categoryUtils";
import { ICategoriesData, ICategoryUpdate } from "../../interfaces";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) =>
    categoriesService
      .getAll()
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data: { id: string; data: ICategoryUpdate }, thunkAPI) =>
    categoriesService
      .update(data.id, data.data)
      .then((response: AxiosResponse) => {
        if (Array.isArray(response.data)) {
          const newSelectedCategory = categoryUtils.findCategoryById(
            response.data,
            data.id
          );
          return { data: response.data, category: newSelectedCategory };
        }
        const state = thunkAPI.getState() as {
          categories: {
            categories: ICategoriesData[];
          };
        };
        const newCategories = categoryUtils.updateCategoryRecursively(
          state.categories.categories,
          response.data
        );
        return { data: newCategories, category: response.data };
      })
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id: string, thunkAPI) =>
    categoriesService
      .remove(id)
      .then(() => {
        thunkAPI.dispatch(getAllCategories());
      })
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (data: { name: string; parentId: string | null }, thunkAPI) =>
    categoriesService
      .add(data)
      .then(() => {
        thunkAPI.dispatch(getAllCategories());
      })
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const getOptionsForCategory = createAsyncThunk(
  "categories/getOptionsForCategory",
  async (categoryId: string, thunkAPI) =>
    categoriesService
      .getBindOptions(categoryId)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);

export const addOptionsToCategory = createAsyncThunk(
  "categories/addOptionsToCategory",
  async (data: { categoryId: string; options: string[] }, thunkAPI) =>
    categoriesService
      .bindOption(data.categoryId, data.options)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);
//
export const deleteOptionsToCategory = createAsyncThunk(
  "categories/addOptionsToCategory",
  async (data: { categoryId: string; optionId: string }, thunkAPI) =>
    categoriesService
      .unbindOption(data.categoryId, data.optionId)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message))
);
