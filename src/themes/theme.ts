import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#E56466',
      },
      info: {
         main: '#3E90F0',
      },
      background: {
         default: '#f5f5f5',
         paper: '#fff',
      },
      text: {
         primary: '#0C1A3B',
         secondary: '#222897',
         disabled: 'rgba(48, 57, 91, 1)',
      },
      // warning: {
      //     main: '#FFCC00',
      // },
      // success: {
      //     main: '#4EC568',
      // },
      // error: {
      //     main: '#DA2121',
      // },
   },
   components: {
      MuiOutlinedInput: {
         styleOverrides: {
            // стилі для інпута
            root: {
               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3E90F0',
               },
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            // стилі для лейбл
            outlined: {
               '&.Mui-focused': {
                  color: '#3E90F0',
               },
            },
         },
      },
   },
});

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#f5f5f5',
      },
      info: {
         main: '#3E90F0',
      },
      background: {
         default: '#0C1A3B',
         paper: '#1B3158',
      },
      text: {
         primary: '#e0e0e0',
         secondary: '#0C1A3B',
         disabled: '#112444',
      },
      // warning: {
      //     main: '#ccae00',
      // },
      // success: {
      //     main: '#3a8349',
      // },
      // error: {
      //     main: '#9d1b1b',
      // },
   },
   components: {
      MuiInputLabel: {
         styleOverrides: {
            outlined: {
               color: '#e0e0e0',
            },
         },
      },
   },
});

export { darkTheme, lightTheme };
