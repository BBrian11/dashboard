import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ProductsHeader from './ProductsHeader';
import ProductsList from './ProductsList';
import ProductsSidebarContent from './ProductsSidebarContent';
import ProductProvider from '../../../../_mysource/context/product/ProductProvider';
import ProductDialog from './product-dialog/ProductDialog';


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

function ProductsApp(props) {
  const pageLayout = useRef(null);


  return (
    <>
      <ProductProvider>
        <Root
          header={<ProductsHeader pageLayout={pageLayout} />}
          content={<ProductsList />}
          leftSidebarContent={<ProductsSidebarContent />}
          sidebarInner
          ref={pageLayout}
          innerScroll
        />
        <ProductDialog />
      </ProductProvider>
    </>
  );
}

//export default withReducer('contactsApp', reducer)(ProvidersApp);
export default ProductsApp;
