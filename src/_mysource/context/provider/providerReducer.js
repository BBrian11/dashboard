import { ACTIONS } from "./actions";
import cloneDeep from "lodash/cloneDeep";

const providerReducer = (state, action) => {
    const { providers } = state;

    //    console.log('current action', action);
    //    console.log('current state', state);

    switch (action.type) {
        case ACTIONS.RETRIEVE:
            return { ...state, loading: false, error: false, providers: action.payload }
        case ACTIONS.LOADING:
            return { ...state, loading: true, error: false }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: true }
        case ACTIONS.CREATE:
            return { ...state, loading: false, error: false, providers: [...cloneDeep(providers), action.payload] };
        case ACTIONS.UPDATE:
            const filtered = providers.filter(x => x.id !== action.payload.id);
            return { ...state, loading: false, error: false, providers: [...cloneDeep(filtered), action.payload] }
        case ACTIONS.OPEN_NEW_DIALOG:
            return { ...state, dialog: { open: true, type: 'new', data: null } }
        case ACTIONS.OPEN_EDIT_DIALOG:
            return { ...state, dialog: { open: true, type: 'edit', data: action.payload } }
        case ACTIONS.CLOSE_DIALOG:
            return { ...state, dialog: { ...state.dialog, open: false, data: null } }
        case ACTIONS.RETRIEVE_ADDRESS_TYPES:
            return { ...state, loading: false, error: false, address_types: action.payload }
        default:
            return state;
    }
}

export default providerReducer;