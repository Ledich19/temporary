/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, PropsWithChildren } from "react";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Stack,
  Checkbox,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllOptions } from "../../store/options/operations";
import {
  addOptionsToCategory,
  deleteOptionsToCategory,
  getOptionsForCategory,
} from "../../store/categories/operations";
import { EditNote } from "@mui/icons-material";
import { IBaseOption, IOptionsFormState, OptionsAction } from "../../interfaces/options";

interface IProps extends PropsWithChildren {
  categoryId: string;
  selectedOptions: string[];
  setSelectedOptions: (arr: string[]) => void;
  openOptionsForm: boolean | IBaseOption;
  setOptionsForm: (el: IOptionsFormState) => void;
}

export const Options: React.FC<IProps> = ({
  selectedOptions,
  setSelectedOptions,
  categoryId,
  setOptionsForm
}) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((store) => store.options);

  useEffect(() => {
    dispatch(getAllOptions());
  }, [dispatch]);

  const optionsArray = options.options;

  return (
    <Stack direction="column">
      <Autocomplete
        sx={{ flex: "1 1" }}
        multiple
        disableCloseOnSelect
        id="product-options"
        options={optionsArray}
        getOptionLabel={(option) => option.name}
        value={optionsArray.filter((option) =>
          selectedOptions.includes(option.id)
        )}
        onChange={(_, newValue) => {
          if (newValue.length < selectedOptions.length) {
            const missingElement = selectedOptions.find(
              (option) => !newValue.some((newOption) => newOption.id === option)
            );
            dispatch(
              deleteOptionsToCategory({
                categoryId,
                optionId: missingElement,
              })
            ).then((data) => {
              if (data.meta.requestStatus !== "fulfilled") return;
              dispatch(getOptionsForCategory(categoryId)).then((data) => {
                setSelectedOptions(data.payload);
              });
            });
          } else {
            const ids = newValue.map((value) => value.id);
            dispatch(
              addOptionsToCategory({
                categoryId,
                options: ids,
              })
            ).then((data) => {
              console.log(data);
              setSelectedOptions(data.payload);
            });
          }
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Tooltip
              title={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {option.children.map((child) => (
                    <div key={child.id}>{child.name}</div>
                  ))}
                </div>
              }
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Checkbox
                    checked={selected}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{ marginRight: 8 }}
                  />

                  {option.name}
                </Box>

                <Button
                  sx={{}}
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionsForm({
                      options: option,
                      actions: OptionsAction.update
                    })
                  }}
                >
                  <EditNote />
                </Button>
              </Box>
            </Tooltip>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="прив'язати оптіонс:"
            placeholder="прив'язати оптіонс:"
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
