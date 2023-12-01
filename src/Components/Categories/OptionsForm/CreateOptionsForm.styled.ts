import {
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CreateOptionFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  position: "relative",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const CloseBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
}));