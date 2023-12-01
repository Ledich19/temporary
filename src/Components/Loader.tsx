import { Rings } from 'react-loader-spinner';
import React from 'react';

export const Loader: React.FC = () => (
   <Rings
      height="80"
      width="80"
      color="rgba(72, 61, 139, 0.69)"
      radius={6}
      wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
      wrapperClass=""
      visible
      ariaLabel="rings-loading"
   />
);
