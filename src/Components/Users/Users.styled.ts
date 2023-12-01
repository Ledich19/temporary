import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const DataGridStyled = styled(DataGrid)(({ theme }) => ({
   '& .MuiDataGrid-columnHeader': {
      backgroundColor: theme.palette.background.paper,
   },
   '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.text.primary,
   },
   '& .MuiDataGrid-row:nth-of-type(2n)': {
      backgroundColor: theme.palette.text.disabled,
   },
}));
