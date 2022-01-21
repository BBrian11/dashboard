import React, { createContext } from 'react';

export const initialState = {
    providers: [],
    address_types: [],
    loading: true,
    error: false,
    dialog: {
        open: false,
        type: null,
        data: null
    }
}

const ProviderContext = createContext(initialState);

export default ProviderContext;