import React, { useRef, useEffect, useReducer } from 'react';
import ProductService from '_mysource/services/ProductService';
import CartContext, { initialState } from './CartContext';
import cartReducer from './cartReducer';
import { ACTIONS } from './actions';
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';
import ProductInstance from './../../models/ProductInstance';
import Order from './../../models/Order';
import OrderItem from './../../models/OrderItem';
import OrderService from '_mysource/services/OrderService';


const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const svc = useRef(new ProductService());
    const svcOrder = useRef(new OrderService());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const createOrder = async (order) => {
        try {
            if (!order.provider) {
                showSnackbar({ message: 'Seleecionar un proveedor', options: { variant: 'error' } });
                return;
            }

            dispatchLoading();
            order.order_status = { id: -1 } // dummy value when creation. Validation schema requires an object.
            const orderdb = (await svcOrder.current.save(order))[0];
            dispatch({ type: ACTIONS.CREATE });
            showSnackbar({ message: 'Orden creada correctamente', options: { variant: 'success' } });
        } catch (error) {
            dispatchError(error);
        }
    }

    /**
     * Sets the provider to a new order. Current order status is lost.
     * @param {*} provider 
     */
    const setOrderProvider = (provider) => {
        const o = new Order();
        o.provider = provider;
        dispatch({ type: ACTIONS.ADD_PROVIDER, payload: o });
    }

    const addToCart = (product) => {
        const { order } = state;

        // If product already exists inform
        if (order && order.order_item_list.length > 0 && order.order_item_list.find(x => x.product_instance.product_id === product.id)) {
            showSnackbar({ message: 'Producto agregado previamente', options: { variant: 'info' } });
            return;
        }

        const pi = new ProductInstance();
        pi.name = product.name;
        pi.price = parseInt(product.price);
        pi.description = product.description;
        pi.product_id = product.id;

        const oi = new OrderItem();
        oi.id = Date.now(); // timestamp unique number used as a temprary id to easy find the order item when modify
        oi.quantity = 1;
        oi.amount = pi.price;
        oi.product_instance = pi;

        const o = (order) ? order : new Order();
        o.order_item_list = [...o.order_item_list, oi]

        updateOrderTotals(o);

        dispatch({ type: ACTIONS.ADD_TO_CART, payload: o });
    }

    const addItem = (order_item) => {
        const { order } = state;

        if (!order) { return; };
        const oi = order.order_item_list.find(x => x.id === order_item.id);
        const newOrderItems = order.order_item_list.filter(x => x.id !== order_item.id);
        oi.quantity += 1;
        order.order_item_list = [...newOrderItems, oi]
        updateOrderTotals(order);

        dispatch({ type: ACTIONS.ADD_ITEM, payload: order });
    }

    const removeItem = (order_item) => {
        const { order } = state;

        if (!order) { return; };
        const oi = order.order_item_list.find(x => x.id === order_item.id);
        const newOrderItems = order.order_item_list.filter(x => x.id !== order_item.id);
        oi.quantity -= 1;
        order.order_item_list = (oi.quantity === 0) ? [...newOrderItems] : [...newOrderItems, oi];
        updateOrderTotals(order);

        dispatch({ type: ACTIONS.REMOVE_ITEM, payload: order });
    }

    const showSnackbar = (item) => {
        enqueueSnackbar('', {
            content: () => (
                <NotificationTemplate
                    item={item} />
            )
        });
    }

    const updateOrderTotals = (order) => {
        if (!order) { return }

        let net_amount = 0;
        let final_amount = 0;

        order.order_item_list.forEach(oi => {
            oi.amount = oi.product_instance.price * oi.quantity;
            net_amount += oi.amount;
        });

        final_amount = net_amount; // TODO. discounts
        order.final_amount = final_amount;
        order.net_amount = net_amount;
    }

    const dispatchError = (error) => {
        dispatch({ type: ACTIONS.ERROR });
        showSnackbar({ message: 'Problema al procesar', options: { variant: 'error' } });
    }

    const dispatchLoading = () => {
        dispatch({ type: ACTIONS.LOADING });
    }

    const newState = {
        ...initialState,
        ...state,
        addToCart,
        addItem,
        removeItem,
        createOrder,
        setOrderProvider
    }

    return (
        <CartContext.Provider
            value={newState}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;