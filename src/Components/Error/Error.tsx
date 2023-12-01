import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

import { AppRoutes } from '../../routing/appRoutes';
import { ButtonStyled, ContainerStyled } from './Error.styled';

export const Error: React.FC = () => (
   <ContainerStyled maxWidth="xs">
      <Typography variant="h2" color="error">
         404 Not Found
      </Typography>
      <Typography variant="body1">You have reached a page that doesn&apos;t exist.</Typography>
      <RouterLink to={AppRoutes.HOME} style={{ textDecoration: 'none' }}>
         <ButtonStyled variant="contained">Go Home</ButtonStyled>
      </RouterLink>
   </ContainerStyled>
);
