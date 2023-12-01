import React, { useMemo, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListAltIcon from '@mui/icons-material/ListAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import { Header, Loader } from '../../Components';
import { Main } from './Dashboard.styles';
import { AppRoutes } from '../../routing/appRoutes';
import DashboardList from './DashboardList';
import { useAppSelector } from '../../store/hooks';

const Dashboard: React.FC = () => {
   const { isLoading } = useAppSelector((state) => state.appState);
   const [isSidebar, setIsSidebar] = useState<boolean>(true);

   // const navigate = useNavigate();
   //
   // useEffect(() => {
   //     navigate('/dashboard/orders');
   // }, [navigate]);

   const links = useMemo(
      () => [
         { path: AppRoutes.ACCOUNT, label: 'Аккаунт', icon: <ManageAccountsIcon /> },
         { path: AppRoutes.USERS, label: 'Користувачі', icon: <SwitchAccountIcon /> },
         { path: AppRoutes.PRODUCT, label: 'Продукти', icon: <ListAltIcon /> },
         { path: AppRoutes.CATEGORIES, label: 'Категорії', icon: <ListAltIcon /> },
         { path: AppRoutes.SHOPS, label: 'Магазини', icon: <StoreIcon /> },
         { path: AppRoutes.ORDER, label: 'Замовлення', icon: <ShoppingCartIcon /> },
         { path: AppRoutes.DELIVERY, label: 'Доставка', icon: <LocalShippingIcon /> },
         { path: AppRoutes.STATISTICS, label: 'Статистика', icon: <QueryStatsIcon /> },
         { path: AppRoutes.MESSAGES, label: 'Повідомлення', icon: <SpeakerNotesIcon /> },
      ],
      []
   ); // todo [] потів в залежності поставити юзера

   const { pathname } = useLocation();
   const currentPageName = links.find((link) => link.path === pathname)?.label || 'Unknown';

   return (
      <>
         <CssBaseline />
         <Header
            currentPageName={currentPageName}
            setIsSidebar={setIsSidebar}
            isSidebar={isSidebar}
         />
         <DashboardList isSidebar={isSidebar} links={links} pathname={pathname} />
         <Main>
            {isSidebar && (
               <Container>
                  <Outlet />
               </Container>
            )}
            {isLoading && <Loader />}
         </Main>
      </>
   );
};

export default Dashboard;
