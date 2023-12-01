import React from 'react';

import { DataGridStyled } from './Users.styled';

type UserData = {
   id: number;
   photoUrl: string;
   name: string;
   email: string;
   role: string;
   active: boolean;
   createdAt: string;
};

type UsersListProps = {
   data: UserData[];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderPhotoCell: React.FC = (params: any) => (
   <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
      <img
         src={params.value}
         alt="Product Photo"
         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
   </div>
);
const columns = [
   { field: 'id', headerName: 'ID', width: 70 },
   {
      field: 'photoUrl',
      renderCell: renderPhotoCell,
      headerName: 'Avatar',
   },
   { field: 'name', headerName: 'Name' },
   { field: 'email', headerName: 'Email' },
   { field: 'role', headerName: 'Role' },
   { field: 'active', headerName: 'Active' },
   { field: 'createdAt', headerName: 'Created at' },
];

export const UsersList: React.FC<UsersListProps> = ({ data }) => (
   <DataGridStyled
      columns={columns}
      rows={data}
      initialState={{
         pagination: {
            paginationModel: { page: 0, pageSize: 20 },
         },
      }}
      pageSizeOptions={[10, 20, 50]}
   />
);
