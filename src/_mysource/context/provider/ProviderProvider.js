import React, { useRef, useEffect, useReducer } from 'react';
import ProviderService from '_mysource/services/ProviderService';
import ProviderContext, { initialState } from './ProviderContext';
import providerReducer from './providerReducer';
import { ACTIONS } from './actions';
import AddressTypeService from '_mysource/services/AddressTypeService';
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';


const ProviderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(providerReducer, initialState);
    const svc = useRef(new ProviderService());
    const svcAddressTypes = useRef(new AddressTypeService());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        retrieve();
        retrieveAddressTypes();
    }, [])

    const retrieve = () => {
        dispatchLoading();
        svc.current.retrieve()
            .then(results => {
                dispatch({ type: ACTIONS.RETRIEVE, payload: results });
            })
            .catch(error => {
                dispatchError(error);
            });
    }

    const create = (provider) => {
        dispatchLoading();
        svc.current.save(provider)
            .then(results => {
                dispatch({ type: ACTIONS.CREATE, payload: results[0] });
                showSnackbar({ message: 'Proveedor creado correctamente', options: { variant: 'success' }});
            })
            .catch(error => {
                dispatchError(error);
            });
    }

    const update = (provider) => {
        dispatchLoading();
        svc.current.save(provider)
            .then(results => {
                dispatch({ type: ACTIONS.UPDATE, payload: results[0] });
                showSnackbar({ message: 'Proveedor actualizado correctamente', options: { variant: 'success' }});
            })
            .catch(error => {
                dispatchError(error);
            });
    }

    const openNewDialog = () => {
        dispatch({ type: ACTIONS.OPEN_NEW_DIALOG });
    }

    const openEditDialog = (row) => {
        dispatch({ type: ACTIONS.OPEN_EDIT_DIALOG, payload: row });
    }

    const closeDialog = () => {
        dispatch({ type: ACTIONS.CLOSE_DIALOG });
    }

    const dispatchLoading = () => {
        dispatch({ type: ACTIONS.LOADING });
    }

    const dispatchError = (error) => {
        dispatch({ type: ACTIONS.ERROR });
        showSnackbar({ message: 'Problema al procesar', options: { variant: 'error' }});
    }

    const retrieveAddressTypes = () => {
        dispatchLoading();
        svcAddressTypes.current.retrieve()
            .then(results => {
                dispatch({ type: ACTIONS.RETRIEVE_ADDRESS_TYPES, payload: results });
            })
            .catch(error => {
                dispatchError(error);
            });
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
        create,
        update,
        retrieve,
        openNewDialog,
        openEditDialog,
        closeDialog
    }

    return (
        <ProviderContext.Provider
            value={newState}>
            {children}
        </ProviderContext.Provider>
    )
}

export default ProviderProvider;