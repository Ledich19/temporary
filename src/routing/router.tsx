import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AppRoutes } from './appRoutes';
import {
   Dashboard,
   Login,
   Account,
   Users,
   Products,
   Shops,
   Orders,
   Delivery,
   Statistics,
   Messages,
   Categories,
} from '../pages';
import { Error } from '../Components';

export const router = createBrowserRouter([
   {
      path: AppRoutes.HOME,
      element: <Login />,
   },
   {
      path: AppRoutes.DASHBOARD,
      element: <Dashboard />,
      children: [
         {
            path: AppRoutes.ACCOUNT,
            element: <Account />,
         },
         {
            path: AppRoutes.USERS,
            element: <Users />,
         },
         {
            path: AppRoutes.PRODUCT,
            element: <Products />,
         },
         {
            path: AppRoutes.CATEGORIES,
            element: <Categories />,
         },
         {
            path: AppRoutes.SHOPS,
            element: <Shops />,
         },
         {
            path: AppRoutes.ORDER,
            element: <Orders />,
         },
         {
            path: AppRoutes.DELIVERY,
            element: <Delivery />,
         },
         {
            path: AppRoutes.STATISTICS,
            element: <Statistics />,
         },
         {
            path: AppRoutes.MESSAGES,
            element: <Messages />,
         },
      ],
   },
   {
      path: '*',
      element: <Error />,
   },
]);
