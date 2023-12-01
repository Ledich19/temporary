import React, { useEffect, useState } from 'react';

import { UsersList } from '../../Components';

const Users: React.FC = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch('https://64934ce0428c3d2035d1a156.mockapi.io/api/v1/users')
         .then((res) => res.json())
         .then((data) => setUsers(data))
         .catch((err) => console.log(err));
   }, []);

   return <UsersList data={users} />;
};

export default Users;
