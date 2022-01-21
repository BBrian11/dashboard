import { useMemo, useContext, useState } from "react";
import CartContext from '_mysource/context/cart/CartContext';
import OrderItemCard from "./OrderItemCard";
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Format from '_mysource/Format';
import Typography from '@mui/material/Typography';
import ConfirmDialog from "../../../../_mysource/shared-components/confirm-dialog/ConfirmDialog";
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';


const CartSidebarContent = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { order, createOrder } = useContext(CartContext);
    const disabled = (order && order.order_item_list.length > 0) ? false : true;
    const final_amount = Format.getInstance().price((order) ? order.final_amount : 0);
    const net_amount = Format.getInstance().price((order) ? order.net_amount : 0);

    const handlePlaceOrder = () => {
        createOrder(order);
    }

    const getOrderInfoForDialogBody = () => {
        if (!order) { return }
        let totalItems = 0;
        order.order_item_list.forEach(oi => { totalItems += oi.quantity; });
        const text = `Total: ${Format.getInstance().price(order.final_amount)}.
        Total Items: ${totalItems}.`

        return text;
    }

    const showSnackbar = (item) => {
        enqueueSnackbar('', {
            content: () => (
                <NotificationTemplate
                    item={item} />
            )
        });
    }

    const renderOrderItems = () => {
        order.order_item_list.sort((a, b) => {
            if (a.id > b.id) { return 1; }
            if (a.id < b.id) { return -1; }
            return 0;
        });

        return (
            <List className="py-0">
                {order.order_item_list.map(oi => (
                    <OrderItemCard key={`${oi.product_instance.id}${oi.product_instance.name}`}
                        order_item={oi} />
                ))}
            </List>
        )
    }

    return (
        <>
            {order && renderOrderItems()}
            <Divider className="card-divider w-full" />
            <div className="p-8 flex flex-col">
                <Typography className="text-11">Sub Total: {net_amount}</Typography>
                <Typography className="text-11">Total: {final_amount}</Typography>
            </div>
            <div className="p-8 flex flex-row items-center">
                <Button variant="outlined"
                    onClick={() => {
                        if (!order.provider) {
                            showSnackbar({ message: 'Seleecionar un proveedor', options: { variant: 'info' } });
                            return;
                        }

                        setDialogOpen(true)
                    }
                    }
                    disabled={disabled}>Placer Order</Button>
            </div>
            <ConfirmDialog
                title="Crear el pedido?"
                body={getOrderInfoForDialogBody()}
                open={dialogOpen}
                setOpen={setDialogOpen}
                onConfirm={handlePlaceOrder}
            />
        </>
    )
}

export default CartSidebarContent;