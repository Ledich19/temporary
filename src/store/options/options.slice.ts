import { createSlice } from '@reduxjs/toolkit';
import { createOptions, getAllOptions, removeOption } from './operations';
import { IBaseOption } from '../../interfaces/options';

type InitialState = {
   options: IBaseOption[];
   isLoading: boolean;
   error: string | null;
};

const initialState: InitialState = {
   options: [],
   isLoading: false,
   error: null,
};

const handlePending = (state: InitialState): InitialState => ({
   ...state,
   isLoading: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRejected = (state: InitialState, action: any): InitialState => {
   if (action.payload) {
      return {
         ...state,
         isLoading: false,
         error: action.payload.message || 'Unknown error',
      };
   }
   return state;
};

const optionsSlice = createSlice({
   name: 'options',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllOptions.pending, handlePending)
         .addCase(getAllOptions.fulfilled, (state: InitialState, action) => ({
            ...state,
            isLoading: false,
            options: action.payload,
         }))
         .addCase(getAllOptions.rejected, handleRejected)

         .addCase(createOptions.pending, handlePending)
         .addCase(createOptions.fulfilled, (state: InitialState) => ({
            ...state,
            isLoading: false,
         }))
         .addCase(createOptions.rejected, handleRejected)

         .addCase(removeOption.pending, handlePending)
         .addCase(removeOption.fulfilled, (state: InitialState) => ({
            ...state,
            isLoading: false,
         }))
         .addCase(removeOption.rejected, handleRejected);
   },
});

export const {} = optionsSlice.actions;
export default optionsSlice.reducer;
