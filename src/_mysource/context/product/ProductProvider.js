import React, { useRef, useEffect, useReducer } from 'react';
import ProductService from '_mysource/services/ProductService';
import ProductContext, { initialState } from './ProductContext';
import providerReducer from './productReducer';
import { ACTIONS } from './actions';
import { useSnackbar } from 'notistack';
import NotificationTemplate from '_mysource/shared-components/snackbar/NotificationTemplate';
import BranchOfficeService from './../../services/BranchOfficeService';
import CategoryService from './../../services/CategoryService';


const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(providerReducer, initialState);
    const svc = useRef(new ProductService());
    const svcBranch = useRef(new BranchOfficeService());
    const svcCategory = useRef(new CategoryService());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        //    retrieve();
        //    retrieveBranches();
        //    retrieveCategories();
    }, [])

    const retrieve = (branch = null, provider = null, activeonly = false) => {
        dispatchLoading();
        svc.current.retrieve(branch, provider, activeonly)
            .then(results => {
                dispatch({ type: ACTIONS.RETRIEVE, payload: results });
            }).catch(error => {
                dispatchError(error);
            });
    }

    const retrieveById = (id) => {
        dispatchLoading();
        svc.current.retrieveById(id)
            .then(results => {
                dispatch({ type: ACTIONS.RETRIEVE, payload: results });
            })
            .catch(error => {
                dispatchError(error);
            });
    }

    const create = async (product) => {
        try {
            dispatchLoading();
            const productdb = (await svc.current.save(product))[0];
            const { id } = productdb;
            let { image_list } = productdb;

            // New Images ************
            const newimg_list = product.image_list.filter(i => i.id === null); // New images don't have id
            if (newimg_list.length > 0) {
                const results = await Promise.all(newimg_list.map(i => svc.current.saveImage(id, i._file)));
                image_list = [...productdb.image_list, ...results];
            }
            // ***********************

            productdb.image_list = [...image_list]
            dispatch({ type: ACTIONS.CREATE, payload: productdb });
            showSnackbar({ message: 'Producto creado correctamente', options: { variant: 'success' } });
        } catch (error) {
            dispatchError(error);
        }
    }

    const update = async (product) => {
        try {
            dispatchLoading();
            const productdb = (await svc.current.save(product))[0];
            const { id } = productdb;
            let { image_list } = productdb;

            // New Images ************
            const newimg_list = product.image_list.filter(i => i.id === null); // New images don't have id
            if (newimg_list.length > 0) {
                const results = await Promise.all(newimg_list.map(i => svc.current.saveImage(id, i._file)));
                image_list = [...productdb.image_list, ...results];
            }
            // ***********************

            // Removed Images ********
            // Images in db that are not present in new array needs to be removed from db
            const image_id_list_db = state.products.find(p => p.id === id).image_list.map(i => (i.id));
            const image_id_list_new = product.image_list.filter(i => i.id !== null).map(i => (i.id)); // Images with id
            const difference = image_id_list_db.filter(x => !image_id_list_new.includes(x));
            if (difference.length > 0) {
                await Promise.all(difference.map(id => svc.current.deleteImage(id)));
                image_list = image_list.filter(i => !difference.includes(i.id));
            }
            // ***********************

            productdb.image_list = [...image_list]
            dispatch({ type: ACTIONS.UPDATE, payload: productdb });
            showSnackbar({ message: 'Producto actualizado correctamente', options: { variant: 'success' } });
        } catch (error) {
            console.log(error)
            dispatchError(error);
        }
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
        showSnackbar({ message: 'Problema al procesar', options: { variant: 'error' } });
    }

    const retrieveCategories = () => {
        dispatchLoading();
        svcCategory.current.retrieve()
            .then(results => {
                dispatch({ type: ACTIONS.RETRIEVE_CATEGORIES, payload: results });
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

    const searchProducts = (filters) => {
        const { name, branch_id } = filters;
        let payload = [];

        if (!name && !branch_id) {
            payload = state.products;
        } else {
            payload = state.products.filter(x => x.name.trim().toLowerCase().includes(name.trim().toLowerCase()));
        }

        dispatch({ type: ACTIONS.FILTER, payload: [...payload] });
    }

    const newState = {
        ...initialState,
        ...state,
        create,
        update,
        retrieve,
        retrieveById,
        retrieveCategories,
        openNewDialog,
        openEditDialog,
        closeDialog,
        searchProducts
    }

    return (
        <ProductContext.Provider
            value={newState}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;