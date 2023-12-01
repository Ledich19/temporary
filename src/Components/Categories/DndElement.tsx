import React from 'react';

import { useDraggable, useDroppable } from '@dnd-kit/core';

interface IProps {
   categoryId: string;
   children: React.ReactNode;
}

export const DndElement: React.FC<IProps> = ({ children, categoryId }) => {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: `${categoryId}`,
   });
   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   const droppable = useDroppable({
      id: `${categoryId}`,
   });

   const styleD = {
      color: droppable.isOver ? 'green' : undefined,
   };

   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div role="button" ref={setNodeRef} style={style} {...listeners} {...attributes}>
         <div ref={droppable.setNodeRef} style={styleD}>
            {children}
         </div>
      </div>
   );
};
