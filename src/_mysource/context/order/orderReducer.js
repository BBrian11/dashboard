import { ACTIONS } from "./actions";
import cloneDeep from "lodash/cloneDeep";


const orderReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.RETRIEVE:
            return { ...state, loading: false, error: false, orders: action.payload }
        default:
            return state;
    }
}

export default orderReducer;