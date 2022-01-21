import { ACTIONS } from "./actions";


const cartReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CREATE:
            // TODO: empty the local storage
            return { ...state, loading: false, error: false, orders: null }
        case ACTIONS.ADD_TO_CART:
        case ACTIONS.ADD_ITEM:
        case ACTIONS.REMOVE_ITEM:
        case ACTIONS.ADD_PROVIDER:
            return { ...state, loading: false, error: false, order: action.payload }
        case ACTIONS.LOADING:
            return { ...state, loading: true, error: false }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: true }
        default:
            return state;
    }
}

export default cartReducer;