import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
   themeMode: string;
   isLoading: boolean;
};

const initialState: InitialState = {
   themeMode: '',
   isLoading: false,
};

const appStateSlice = createSlice({
   name: 'appState',
   initialState,
   reducers: {
      setThemeMode(state, actions: PayloadAction<string>) {
         return { ...state, themeMode: actions.payload };
      },
      setIsLoading(state, actions: PayloadAction<boolean>) {
         return { ...state, isLoading: actions.payload };
      },
   },
});

export const { setThemeMode, setIsLoading } = appStateSlice.actions;
export default appStateSlice.reducer;
