import { Link } from 'react-router-dom';
import React from 'react';

import { Header } from '../Components';

type HeaderProps = {
   currentPageName?: string;
   setIsSidebar?: (isSidebar: boolean) => void;
   isSidebar?: boolean;
};
const Login: React.FC<HeaderProps> = () => (
   /*
    test
     */
   <>
      <Header currentPageName="Login" setIsSidebar={() => {}} isSidebar={false} />
      <div style={{ marginTop: '10vh' }}>
         <Link to="/dashboard">
            <button type="button">temporarily go to dashboard</button>
         </Link>
      </div>
   </>
);
export default Login;
