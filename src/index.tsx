import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { MyThemeProvider } from './themes';
import { router } from './routing/router';
import { store } from './store/store';

const rootElement = document.getElementById('root');

if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
         <Provider store={store}>
            <MyThemeProvider>
               <RouterProvider router={router} />
            </MyThemeProvider>
         </Provider>
      </React.StrictMode>
   );
} else {
   console.error("No element with id 'root' found");
}
