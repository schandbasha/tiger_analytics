import { ActionTypes } from "../constants/action-types"
const intialState = {}

export const selectedProductsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return { ...state, ...payload }
        default:
            return state
    }
}
