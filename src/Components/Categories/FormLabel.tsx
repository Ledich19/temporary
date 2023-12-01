import React, { useState, useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';

import { ICategoriesData } from '../../interfaces';

interface IFormProps {
   formData: ICategoriesData;
   onSubmit: (data: ICategoriesData) => void;
}

export const FormLabel: React.FC<IFormProps> = ({ formData, onSubmit }) => {
   const [localFormData, setLocalFormData] = useState<ICategoriesData>(formData);

   useEffect(() => {
      setLocalFormData(formData);
   }, [formData]);

   if (!localFormData) return null;

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      const updatedFormData = {
         ...localFormData!,
         [id]: value,
      };

      setLocalFormData(updatedFormData);
      onSubmit(updatedFormData);
   };

   return (
      <>
         {Object.entries(localFormData)
            .filter(([key, value]) => typeof value === 'string' && key !== 'id')
            .map(([key, value]) => (
               <div key={key}>
                  <FormControl>
                     <TextField
                        id={key}
                        label={key}
                        value={value}
                        onChange={handleInputChange}
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </FormControl>
               </div>
            ))}
      </>
   );
};
