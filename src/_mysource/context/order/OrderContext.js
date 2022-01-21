import { createContext } from 'react';

export const initialState = {
    orders: [],
    loading: false,
    error: false,
    dialog: {
        open: false,
        type: null,
        data: null
    }
}

const OrderContext = createContext(initialState);

export default OrderContext;