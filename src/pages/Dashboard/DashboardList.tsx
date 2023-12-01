import { Link } from 'react-router-dom';
import React from 'react';
import { List, ListItem, ListItemButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DrawerStyled, ListItemTextStyled, Logout, LogoutIconStyled } from './Dashboard.styles';

type SideListProps = {
   isSidebar: boolean;
   links: { path: string; label: string; icon: React.ReactElement }[];
   pathname: string;
};
const DashboardList: React.FC<SideListProps> = ({ isSidebar, links, pathname }) => {
   const theme = useTheme();
   const handleLogout = () => {
      // Логіка розлогінення
   };

   return (
      <DrawerStyled variant="permanent" open={isSidebar}>
         <Toolbar />
         <>
               <List>
                  {links.map((link) => (
                     <ListItem key={link.path} sx={{ padding: '0 0 0 8px' }}>
                        <Link
                           to={link.path}
                           style={{
                              width: '100%',
                              textDecoration: 'none',
                              color:
                                 link.path === pathname
                                    ? theme.palette.primary.main
                                    : theme.palette.info.main,
                           }}
                        >
                           <ListItemButton
                              sx={{
                                 justifyContent: isSidebar ? 'initial' : 'center',
                                 padding: '4px 16px 4px 16px',
                              }}
                           >
                              {link.icon}
                              {isSidebar && <ListItemTextStyled primary={link.label} />}
                           </ListItemButton>
                        </Link>
                     </ListItem>
                  ))}
               </List>
            
            <Logout>
               {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
               <Link to={'/'} onClick={handleLogout}>
                  <LogoutIconStyled />
               </Link>
            </Logout>
         </>
      </DrawerStyled>
   );
};

export default DashboardList;
