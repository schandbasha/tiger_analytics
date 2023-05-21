import { combineReducers } from "redux"
import { selectedProductsReducer } from "./productsReducer"
const reducers = combineReducers({
    product: selectedProductsReducer,
})
export default reducers
