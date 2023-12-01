import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const CategoriesGrid = styled(Grid)(() => ({
   height: 'calc(100vh - 160px)',
   flex: 1,
}));
export const CategoriesGridItem = styled(Grid)(() => ({
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
}));
