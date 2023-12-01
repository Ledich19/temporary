import { styled } from '@mui/material/styles';
import { Container, Button } from '@mui/material';

export const ContainerStyled = styled(Container)(() => ({
   textAlign: 'center',
   marginTop: '40px',
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
   marginTop: '20px',
   color: '#f5f5f5',
   background: theme.palette.primary.main,
   transition: 'background 500ms cubic-bezier(0.4, 0, 0.2, 1)',

   '&:hover': {
      background: theme.palette.info.dark,
   },
}));
