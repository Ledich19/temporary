import { styled, lighten, darken } from "@mui/material/styles";

export const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  zIndex: 10,
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.background.default, 0.85)
      : darken(theme.palette.background.default, 0.8),
}));

export const GroupItems = styled("ul")({
  padding: 0,
});
