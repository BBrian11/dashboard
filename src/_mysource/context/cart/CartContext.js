import { createContext } from 'react';

export const initialState = {
    order: null,
    loading: false,
    error: false
}

const CartContext = createContext(initialState);

export default CartContext;