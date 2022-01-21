import React, { useRef, useEffect, useReducer } from 'react';
import OrderService from '_mysource/services/OrderService';
import OrderContext, { initialState } from './OrderContext';
import orderReducer from './orderReducer';
import { ACTIONS } from './actions';
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';
import cloneDeep from 'lodash/cloneDeep';
import ProductInstance from '../../models/ProductInstance';
import Order from '../../models/Order';
import OrderItem from '../../models/OrderItem';


const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, initialState);
    const svc = useRef(new OrderService());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const retrieve = async (branchId = null, providerId = null) => {
        try {
            dispatchLoading();
            const results = await svc.current.retrieve(branchId, providerId);
            dispatch({ type: ACTIONS.RETRIEVE, payload: results });
        } catch (error) {
            dispatchError(error);
        }
    }

    const openEditDialog = (row) => {

    }

    const closeDialog = () => {

    }

    const dispatchLoading = () => {
        dispatch({ type: ACTIONS.LOADING });
    }

    const dispatchError = (error) => {
        dispatch({ type: ACTIONS.ERROR });
        showSnackbar({ message: 'Problema al procesar', options: { variant: 'error' } });
    }

    const showSnackbar = (item) => {
        enqueueSnackbar('', {
            content: () => (
                <NotificationTemplate
                    item={item} />
            )
        });
    }


    const newState = {
        ...initialState,
        ...state,
        retrieve
    }

    return (
        <OrderContext.Provider
            value={newState}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;