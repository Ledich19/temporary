import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Stack,
  Typography,
  DialogActions,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { MoveUp, Save } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateNewFolder } from "@mui/icons-material";

import { ICategoriesData } from "../../interfaces";
import { FormLabel } from "./FormLabel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  updateCategory,
  removeCategory,
  getOptionsForCategory,
  addOptionsToCategory,
} from "../../store/categories/operations";
import { Options } from "./Options";
import { CreateOptionForm } from "./OptionsForm/CreateOptionForm";
import { IOptionsFormState, OptionsAction } from "../../interfaces/options";

export const CategoryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((store) => store.categories);
  const [open, setOpen] = React.useState(false);
  const [currentFormData, setCurrentFormData] = useState<ICategoriesData>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [optionsForm, setOptionsForm] = useState<IOptionsFormState>({
    options: null,
    actions: OptionsAction.create,
  });

  useEffect(() => {
    setCurrentFormData(selectedCategory);
    if (!selectedCategory) return;
    dispatch(getOptionsForCategory(selectedCategory.id)).then((data) => {
      setSelectedOptions(data.payload);
    });
  }, [selectedCategory, dispatch]);

  const handleUpdateCategory = async (data: ICategoriesData) => {
    dispatch(updateCategory({ id: data.id, data: { name: data.name } }));
    dispatch(
      addOptionsToCategory({ categoryId: data.id, options: selectedOptions })
    );
  };

  const handleDeleteCategory = async (data: ICategoriesData) => {
    if (!data) return;
    dispatch(removeCategory(data.id));
    setOpen(false);
  };
  const handleMoveToRootCategory = async () => {
    if (!selectedCategory) return;
    const data = {
      toRoot: true,
    };
    dispatch(updateCategory({ id: selectedCategory.id, data }));
  };

  return (
    <Box>
      {selectedCategory && (
        <>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Зберегти зміни">
              <Button
                variant="outlined"
                endIcon={<Save />}
                onClick={() => handleUpdateCategory(currentFormData)}
              >
                Зберегти
              </Button>
            </Tooltip>
            <Tooltip title="Перемістити в корінь">
              <Button variant="outlined" onClick={handleMoveToRootCategory}>
                <MoveUp />
              </Button>
            </Tooltip>
            <Tooltip title="Видалити">
              <Button
                variant="outlined"
                onClick={() => setOpen(currentFormData && true)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Створити option">
              <Button
                variant="outlined"
                onClick={() => setOptionsForm({
                  options: true,
                  actions: OptionsAction.create
                })
              }
              >
                <CreateNewFolder />
              </Button>
            </Tooltip>

            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Ви хочете видалити категорію
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Ні</Button>
                <Button
                  onClick={() => handleDeleteCategory(currentFormData)}
                  autoFocus
                >
                  Так
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
          <Stack mt={3} spacing={2}>
            <FormLabel
              formData={currentFormData}
              onSubmit={setCurrentFormData}
            />
            <Typography variant="h5" component="h2">
              id: {selectedCategory?.id}
            </Typography>
            {/* // ? add show categiries */}
            {/* Binded categories */}
            <Options
              openOptionsForm={optionsForm.options}
              setOptionsForm={setOptionsForm}
              categoryId={selectedCategory.id}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            {/* Binded categories */}
          </Stack>

          <CreateOptionForm
            optionsFormState={optionsForm}
            handleClose={() =>
              setOptionsForm((state) => ({ ...state, options: false }))
            }
          />
        </>
      )}
    </Box>
  );
};
