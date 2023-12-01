import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // todo зробила щоб не падав проект видалиш
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ThemeSwitcher } from '../../themes';

type HeaderProps = {
   currentPageName: string;
   setIsSidebar: (isSidebar: boolean) => void;
   isSidebar: boolean;
};

// todo зробила щоб не падав проект видалиш
export const Header: React.FC<HeaderProps> = ({ currentPageName, setIsSidebar, isSidebar }) => {
   console.log(currentPageName);
   const handleSidebarToggle = () => {
      setIsSidebar(!isSidebar);
   };

   return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
         <Toolbar>
            <Button onClick={handleSidebarToggle}>
               <DashboardIcon style={{ color: '#f5f5f5' }} />
            </Button>
            <Typography>Sharm - Admin</Typography>
            <ThemeSwitcher />
         </Toolbar>
      </AppBar>
   );
}; // todo зробила щоб не падав проект видалиш

// import {StyledAppBar, StyledToolbar, StyledTypography} from "./Header.styled";

// export const Header:React.FC = ({currentPageName, setIsSidebar}) => {
//     // console.log('Header', currentPageName)
//
//     const handleSidebarToggle = () => {
//         setIsSidebar(prev => !prev);
//     };
//     return (
//         // <StyledAppBar>
//         //     <StyledToolbar>
//         //         <Button onClick={handleSidebarToggle}>
//         //             <DashboardIcon style={{color: "#f5f5f5"}}/>
//         //         </Button>
//         //         <StyledTypography>Sharm - Admin</StyledTypography>
//         //         <ThemeSwitcher/>
//         //     </StyledToolbar>
//         // </StyledAppBar>
//     );
// };
