import React, { useState } from "react";
import {
  Button,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch } from "../../store/hooks";
import { addCategory } from "../../store/categories/operations";

interface CategoryInfoProps {
  currentFormData: string;
  // handleAdd: (name: string, parentId: string, calback: () => void) => void;
}

export const CategoryAddForm: React.FC<CategoryInfoProps> = ({
  currentFormData,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleClickOpen = (parentEl: string | null) => {
    setOpen(true);
    setParent(parentEl);
  };

  const handleClose = () => {
    setOpen(false);
    setParent(null);
  };

  const handleAddCategory = async () => {
    dispatch(addCategory({ name: categoryName, parentId: parent })).then(() => {
      setOpen(false);
      setParent(null);
      setCategoryName("");
    });
  };

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Button
        variant="outlined"
        endIcon={<PlaylistAddIcon />}
        onClick={() => handleClickOpen(null)}
      >
        Додати корінну категорію
      </Button>
      <Button
        disabled={!currentFormData}
        variant="outlined"
        endIcon={<PlaylistAddIcon />}
        onClick={() => handleClickOpen(currentFormData)}
      >
        Додати категорію
      </Button>

      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <TextField
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Category name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відміна</Button>
          <Button onClick={handleAddCategory}>Додати</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
