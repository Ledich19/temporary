import { ICategoriesData } from '../interfaces';

const findCategoryById = (
   categories: ICategoriesData[],
   id: string
): ICategoriesData | undefined => {
   for (const category of categories) {
      if (category.id === id) {
         return category;
      }
      if (category.children && category.children.length > 0) {
         const childResult = findCategoryById(category.children, id);
         if (childResult) {
            return childResult;
         }
      }
   }
   return undefined;
};

const updateCategoryRecursively = (
   categories: ICategoriesData[],
   updatedCategory: ICategoriesData
): ICategoriesData[] =>
   categories.map((category) => {
      if (category.id === updatedCategory.id) {
         return updatedCategory;
      }
      if (category.children && category.children.length > 0) {
         return {
            ...category,
            children: updateCategoryRecursively(category.children, updatedCategory),
         };
      }
      return category;
   });

const categoryUtils = {
   findCategoryById,
   updateCategoryRecursively,
};
export default categoryUtils;
