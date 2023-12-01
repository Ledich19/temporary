/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, PropsWithChildren } from "react";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Stack,
  Checkbox,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ICategoriesData } from "../../../interfaces";
import { getAllOptions } from "../../../store/options/operations";
import { IBaseOption } from "../../../interfaces/options";
import { GroupHeader, GroupItems } from "./Options.styled";

interface IProps extends PropsWithChildren {
  selectedOptions: string[];
  setSelectedOptions: (arr: string[]) => void;
  availableOptions: { [key: string]: string[] };
}

export const Options: React.FC<IProps> = ({
  selectedOptions,
  setSelectedOptions,
  availableOptions,
}) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((store) => store.options);

  useEffect(() => {
    dispatch(getAllOptions());
  }, [dispatch]);

  type WithParentInfo<T> = T & { parentName: string; parentId: string };
  const extractCategoriesFromArray = <T extends ICategoriesData | IBaseOption>(
    arr: T[],
    parentName: string,
    parentId: string
  ): WithParentInfo<T>[] =>
    arr.reduce((acc: WithParentInfo<T>[], item: T) => {
      const itemWithParentName: WithParentInfo<T> = {
        ...item,
        parentName: parentName,
        parentId,
      };
      if (!item.children || item.children.length === 0) {
        acc.push(itemWithParentName);
      } else {
        const childLeaves = extractCategoriesFromArray(
          item.children as T[],
          item.name,
          item.id
        );
        acc.push(...childLeaves);
      }
      return acc;
    }, []);

  console.log("availableOptions", availableOptions);

  const optionsArray = extractCategoriesFromArray(
    options.options,
    "root",
    "root"
  ).filter((option) => {
    const id = option.parentId;
    if (availableOptions) {
      return Object.values(availableOptions).flat().includes(id);
    }
    return false;
  });

  return (
    <Stack direction="row">
      <Autocomplete
        sx={{ flex: "1 1" }}
        multiple
        disableCloseOnSelect
        id="product-options"
        options={optionsArray}
        groupBy={(option) => option.parentName}
        getOptionLabel={(option) => option.name}
        value={optionsArray.filter((option) =>
          selectedOptions.includes(option.id)
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        onChange={(_, newValue) => {
          const ids = newValue.map((value) => value.id);
          setSelectedOptions(ids);
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              checked={selected}
              inputProps={{ "aria-label": "controlled" }}
              sx={{ marginRight: 8 }}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Options"
            placeholder="Options"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {options.isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
};
