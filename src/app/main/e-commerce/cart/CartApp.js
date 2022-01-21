import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef } from 'react';
import CartHeader from './CartHeader';
import CartToolbar from './CartToolbar';
import CartContent from './CartContent';
import CartSidebarHeader from './CartSidebarHeader';
import CartSidebarContent from './CartSidebarContent';
import ProductProvider from '../../../../_mysource/context/product/ProductProvider';
import CartProvider from './../../../../_mysource/context/cart/CartProvider';


const Root = styled(FusePageSimple)({
    '& .FusePageSimple-header': {},
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
});

function CartApp() {
    const pageLayout = useRef(null);

    return (
        <ProductProvider>
            <CartProvider>
                <Root
                    header={<CartHeader pageLayout={pageLayout} />}
                    contentToolbar={<CartToolbar />}
                    content={<CartContent />}
                    rightSidebarHeader={<CartSidebarHeader />}
                    rightSidebarContent={<CartSidebarContent />}
                    innerScroll
                    ref={pageLayout}
                />
            </CartProvider>
        </ProductProvider>
    );
}

export default CartApp;
