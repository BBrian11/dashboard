import { useEffect, useContext, useState } from "react";
import CartContext from '_mysource/context/cart/CartContext';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Format from '_mysource/Format';


const OrderItemCard = ({ order_item }) => {
    const { addItem, removeItem, order } = useContext(CartContext);

    const handleAddItem = () => {
        addItem(order_item);
    }

    const handleRemoveItem = () => {
        removeItem(order_item);
    }

    return (
        <ListItem>
            <ListItemText
                classes={{ primary: 'font-medium text-11', secondary: 'text-10' }}
                primary={order_item.product_instance.name}
                secondary={Format.getInstance().price(order_item.amount)}
            />
            <ListItemSecondaryAction>
                <IconButton aria-label="more" size="small" onClick={handleRemoveItem}>
                    <Icon>remove_circle</Icon>
                </IconButton>
                {order_item.quantity}
                <IconButton aria-label="more" size="small" onClick={handleAddItem}>
                    <Icon>add_circle</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default OrderItemCard;
