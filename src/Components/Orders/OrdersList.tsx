import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import { ordersService } from '../../services';

interface Order {
   id: string;
   name: string;
   email: string;
   cost: string;
   date: string;
} // todo пвпишеш вірні типи

export const OrdersList: React.FC = () => {
   const [ordersList, setOrdersList] = useState<Order[]>([]);

   useEffect(() => {
      async function getAllOrders() {
         const response = await ordersService.getAll().then((result) => result.data);
         setOrdersList([...ordersList, ...response]);
      }

      getAllOrders();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <DataGrid
         columns={[
            { field: 'id' },
            { field: 'name' },
            { field: 'email' },
            { field: 'cost' },
            { field: 'date' },
         ]}
         rows={ordersList}
      />
   );
};
