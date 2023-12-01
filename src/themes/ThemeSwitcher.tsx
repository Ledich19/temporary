import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setThemeMode } from '../store/application/appStateReducers';

export const ThemeSwitcher = () => {
   const { themeMode } = useAppSelector((state) => state.appState);
   const dispatch = useAppDispatch();

   const toggleTheme = () => {
      const currentTheme = themeMode === 'light' ? 'dark' : 'light';
      dispatch(setThemeMode(currentTheme));
   };

   return (
      <IconButton onClick={toggleTheme}>
         {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
   );
};
