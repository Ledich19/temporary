/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Tooltip,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  createManufacturer,
  getAllManufacturers,
  removeManufacture,
} from "../../../store/manufacturers/operations";
import { Close, Delete, DomainAdd } from "@mui/icons-material";
import { StyledTextarea } from "../ProductForm.styled";

interface IProps {
  selectedManufacturer: string;
  setSelectedManufacturer: (arr: string) => void;
}

export const Manufacturer: React.FC<IProps> = ({
  selectedManufacturer,
  setSelectedManufacturer,
}) => {
  const dispatch = useAppDispatch();
  const { manufacturers, isLoading, error } = useAppSelector(
    (store) => store.manufacturers
  );
  const [openAddManufacturer, setOpenManufacturer] = useState(false);
  const [manufacturerName, setManufacturerName] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [manufacturerDescription, setManufacturerDescription] =
    useState<string>("");

  useEffect(() => {
    dispatch(getAllManufacturers());
  }, [dispatch]);

  const handleCloseManufacturer = () => {
    setOpenManufacturer(false);
    setManufacturerName("");
    setManufacturerDescription("");
  };
  const handleAddManufacturer = () => {
    setOpenManufacturer(true);
    setManufacturerName("");
    setManufacturerDescription("");
  };
  const handleCreateManufacturer = async () => {
    const data = {
      name: manufacturerName,
      description: manufacturerDescription,
    };
    dispatch(createManufacturer(data)).then(() => {
      handleCloseManufacturer();
    });
  };
  const handleDeleteManufacturer = (id: string) => {
    dispatch(removeManufacture(id)).then(() => {
      setOpenDelete(null);
    });
  };

  return (
    <Stack direction="row">
      <Autocomplete
        sx={{ flex: "1 1" }}
        value={
          manufacturers.find((el) => el.id === selectedManufacturer) || null
        }
        onChange={(_, newValue) => setSelectedManufacturer(newValue.id || null)}
        id="product-manufacturers"
        options={manufacturers}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <li {...props}>
            <span style={{ flex: 1 }}>{option.name}</span>
            <IconButton size="small" onClick={() => setOpenDelete(option.id)}>
              <Delete />
            </IconButton>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="виробник"
            variant="outlined"
            key={params.id}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Tooltip title="Додати виробника">
        <Button variant="outlined" onClick={handleAddManufacturer}>
          <DomainAdd />
        </Button>
      </Tooltip>

      <Dialog open={openAddManufacturer} onClose={handleCloseManufacturer}>
        <IconButton
          aria-label="close"
          onClick={handleCloseManufacturer}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <TextField
            value={manufacturerName}
            onChange={(e) => setManufacturerName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Назва виробника"
            type="email"
            fullWidth
            variant="standard"
          />
          <StyledTextarea
            value={manufacturerDescription}
            onChange={(e) => setManufacturerDescription(e.target.value)}
            aria-label="Опис"
            placeholder="Опис"
            minRows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateManufacturer}>Додати</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete ? true : false}
        keepMounted
        onClose={() => setOpenDelete(null)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Хочете видалити виробника?"}</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDelete(null)}>
            Ні
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDeleteManufacturer(openDelete)}
          >
            Так
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error ? true : false}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
