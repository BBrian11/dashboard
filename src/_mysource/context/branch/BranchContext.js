import React, { createContext } from 'react';

export const initialState = {
    branches: [],
    address_types: [],
    loading: true,
    error: false,
    dialog: {
        open: false,
        type: null,
        data: null
    }
}

const BranchContext = createContext(initialState);

export default BranchContext;