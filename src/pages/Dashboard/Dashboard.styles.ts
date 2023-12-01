import { styled } from '@mui/material/styles';
import { Drawer, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export const DrawerStyled = styled(Drawer)(() => ({
   top: '64px',
   flexShrink: 0,
   width: 'auto',
}));

export const Main = styled('main')({
   marginLeft: 170,
   padding: '80px 0',
   overflow: 'auto',
   position: 'relative',
});

export const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
   marginLeft: '16px',
   transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1)',

   '&:hover': {
      color: theme.palette.primary.main,
   },
}));

export const Logout = styled('div')({
   marginTop: 'auto',
   marginBottom: '5vh',
});

export const LogoutIconStyled = styled(LogoutIcon)(({ theme }) => ({
   color: theme.palette.info.main,
   fontSize: '36px',
   display: 'block',
   margin: 'auto',
   transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1)',

   '&:hover': {
      color: theme.palette.primary.main,
   },
}));
