import { ACTIONS } from "./actions";
import cloneDeep from "lodash/cloneDeep";
import Product from './../../models/Product';

const productReducer = (state, action) => {
    const { products } = state;

    let filtered = [];

    //    console.log('current action', action);
    //    console.log('current state', state);

    switch (action.type) {
        case ACTIONS.RETRIEVE:
            return { ...state, loading: false, error: false, products: action.payload, filtered_products: action.payload }
        case ACTIONS.LOADING:
            return { ...state, loading: true, error: false }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: true }
        case ACTIONS.CREATE:
            return { ...state, loading: false, error: false, products: [...cloneDeep(products), action.payload] };
        case ACTIONS.UPDATE:
            filtered = products.filter(x => x.id !== action.payload.id);
            return { ...state, loading: false, error: false, products: [...cloneDeep(filtered), action.payload] }
        case ACTIONS.OPEN_NEW_DIALOG:
            return { ...state, dialog: { open: true, type: 'new', data: null } }
        case ACTIONS.OPEN_EDIT_DIALOG:
            return { ...state, dialog: { open: true, type: 'edit', data: action.payload } }
        case ACTIONS.CLOSE_DIALOG:
            return { ...state, dialog: { ...state.dialog, open: false, data: null } }
        case ACTIONS.RETRIEVE_CATEGORIES:
            return { ...state, loading: false, error: false, categories: action.payload }
        case ACTIONS.FILTER:
            return { ...state, filtered_products: action.payload }
        default:
            return state;
    }
}

export default productReducer;