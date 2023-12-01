import React from "react";
import List from "@mui/material/List";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ICategoriesData } from "../../interfaces";
import { CategoryItem } from "./CategoryItem";
import { CategoryAddForm } from "./CategoryAddForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedCategory } from "../../store/categories/categories.slice";
import { updateCategory } from "../../store/categories/operations";

export const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(
    (store) => store.categories
  );

  const handleCategorySelect = (category: ICategoriesData) => {
    dispatch(setSelectedCategory(category));
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const findObjectById = (
    item: ICategoriesData,
    id: string
  ): ICategoriesData | null => {
    if (item.id === id) {
      return item;
    }
    for (const child of item.children) {
      const foundObject = findObjectById(child, id);
      if (foundObject) {
        return foundObject;
      }
    }
    return null;
  };

  const isValidMove = (
    childId: string,
    parentId: string,
    data: ICategoriesData[]
  ) => {
    let sourceObject = null;
    for (const item of data) {
      const foundObject = findObjectById(item, childId);
      if (foundObject) {
        sourceObject = foundObject;
        break;
      }
    }
    return !findObjectById(sourceObject, parentId);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const activeId = (e.active?.id as string) || "";
    const overId = (e.over?.id as string) || "";
    if (!activeId || !isValidMove(activeId, overId, categories)) return;
    const data = {
      parentId: overId || null,
      toRoot: !overId,
    };
    dispatch(updateCategory({ id: activeId, data }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <CategoryAddForm currentFormData={selectedCategory?.id} />
      <List
        sx={{
          width: "100%",
          borderRight: "1px solid",
          flex: 1,
          overflow: "auto",
        }}
        component="nav"
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onCategorySelect={handleCategorySelect}
            selectedCategoryId={selectedCategory?.id}
          />
        ))}
      </List>
    </DndContext>
  );
};
