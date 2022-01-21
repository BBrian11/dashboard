import React, { createContext } from 'react';

export const initialState = {
    products: [],
    categories: [],
    address_types: [],
    filtered_products: [],
    loading: true,
    error: false,
    dialog: {
        open: false,
        type: null,
        data: null
    }
}

const ProductContext = createContext(initialState);

export default ProductContext;