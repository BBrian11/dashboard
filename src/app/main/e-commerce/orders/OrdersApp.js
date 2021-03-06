import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import OrdersHeader from './OrdersHeader';
import OrdersList from './OrdersList';
import OrdersSidebarContent from './OrdersSidebarContent';
import OrderProvider from '../../../../_mysource/context/order/OrderProvider';



const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up('lg')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function OrdersApp(props) {
  const pageLayout = useRef(null);


  return (
    <>
      <OrderProvider>
        <Root
          header={<OrdersHeader pageLayout={pageLayout} />}
          content={<OrdersList />}
          leftSidebarContent={<OrdersSidebarContent />}
          sidebarInner
          ref={pageLayout}
          innerScroll
        />
      </OrderProvider>
    </>
  );
}

//export default withReducer('contactsApp', reducer)(ProvidersApp);
export default OrdersApp;
