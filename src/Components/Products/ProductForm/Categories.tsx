/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, PropsWithChildren } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getAllCategories,
  getOptionsForCategory,
} from "../../../store/categories/operations";
import { ICategoriesData } from "../../../interfaces";
import { IBaseOption } from "../../../interfaces/options";

interface IProps extends PropsWithChildren {
  selectedCategories: string[];
  setSelectedCategories: (arr: string[]) => void;
  availableOptions: { [key: string]: string[] };
  setAvailableOptions: (arg: { [key: string]: string[] }) => void;
}

export const Categories: React.FC<IProps> = ({
  selectedCategories,
  setSelectedCategories,
  availableOptions,
  setAvailableOptions,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const extractCategoriesFromArray = <T extends ICategoriesData | IBaseOption>(
    arr: T[]
  ): T[] =>
    arr.reduce((acc: T[], item: T) => {
      if (!item.children || item.children.length === 0) {
        acc.push(item);
      } else {
        const childLeaves = extractCategoriesFromArray(item.children as T[]);
        acc.push(...childLeaves);
      }
      return acc;
    }, []);

  const categoriesArray = extractCategoriesFromArray(categories.categories);

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      loading={categories.isLoading}
      id="product-categories"
      options={categoriesArray}
      getOptionLabel={(option) => option.name}
      value={categoriesArray.filter((category) =>
        selectedCategories.includes(category.id)
      )}
      onChange={(_, newValue) => {
        const ids = newValue.map((value) => value.id);
        console.log(newValue);
        console.log(selectedCategories);
        if (newValue.length > selectedCategories.length) {
          const missingElement = newValue.find(
            (category) =>
              !selectedCategories.some(
                (newCategory) => newCategory === category.id
              )
          );
          dispatch(getOptionsForCategory(missingElement.id)).then((res) => {
            console.log("OPTIONS", res.payload);
            setSelectedCategories(ids);
            setAvailableOptions({
              ...availableOptions,
              [missingElement.id]: res.payload,
            });
          });
        }
        if (newValue.length < selectedCategories.length) {
          const missingElement = selectedCategories.find(
            (category) =>
              !newValue.some(
                (deletedCategory) => deletedCategory.id === category
              )
          );

          console.log("DELETE", missingElement);
          delete availableOptions.missingElement;
          setSelectedCategories(ids);
          setAvailableOptions({ ...availableOptions });
        }
        // !
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Категорії"
          placeholder="Категорії"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {categories.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
