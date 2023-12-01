import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

import { ICategoriesData } from '../../interfaces';
import { DndElement } from './DndElement';

interface IProps {
   category: ICategoriesData;
   onCategorySelect: (category: ICategoriesData) => void;
   selectedCategoryId: string;
}

export const CategoryItem: React.FC<IProps> = ({
   category,
   onCategorySelect,
   selectedCategoryId,
}) => {
   const theme = useTheme();

   const [isOpen, setIsOpen] = useState(false);

   const isItemSelected = category.id === selectedCategoryId;
   const hasChildren = category.children && category.children.length > 0;
   const handleCategoryClick = () => {
      onCategorySelect(category);
      setIsOpen(!isOpen);
   };

   return (
      <>
         <DndElement categoryId={category.id}>
            <ListItemButton
               onClick={handleCategoryClick}
               style={{
                  backgroundColor: isItemSelected ? theme.palette.info.main : 'transparent',
                  borderRadius: '12px',
               }}
            >
               {hasChildren &&
                  (isOpen ? (
                     <RemoveCircleOutlineIcon color="action" sx={{ marginRight: 1.5 }} />
                  ) : (
                     <AddCircleOutlineIcon color="action" sx={{ marginRight: 1.5 }} />
                  ))}
               <ListItemText primary={category.name} />
            </ListItemButton>
         </DndElement>
         {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
               <Box sx={{ paddingLeft: 4 }}>
                  {category.children?.map((child) => (
                     <CategoryItem
                        key={child.id}
                        category={child}
                        onCategorySelect={onCategorySelect}
                        selectedCategoryId={selectedCategoryId}
                     />
                  ))}
               </Box>
            </Collapse>
         )}
      </>
   );
};
