import React, { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { CategoriesList, CategoryForm } from '../../Components';
import { CategoriesGrid, CategoriesGridItem } from './Categiries.styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllCategories } from '../../store/categories/operations';

const Categories: React.FC = () => {
   const dispatch = useAppDispatch();
   const { isLoading } = useAppSelector((store) => store.categories);

   useEffect(() => {
      dispatch(getAllCategories());
   }, []);

   return (
      <CategoriesGrid container spacing={2}>
         {isLoading && (
            <Box
               sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  top: 0,
                  right: 0,
                  zIndex: 5,
               }}
            >
               <CircularProgress
                  sx={{
                     position: 'fixed',
                     left: '50%',
                     top: '50%',
                     transform: 'translate(50%,50%)',
                  }}
                  color="inherit"
               />
            </Box>
         )}
         <CategoriesGridItem item xs={12} md={4}>
            <CategoriesList />
         </CategoriesGridItem>
         <CategoriesGridItem item xs={12} md={8}>
            <CategoryForm />
         </CategoriesGridItem>
      </CategoriesGrid>
   );
};

export default Categories;
