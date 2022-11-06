import { combineReducers } from "redux";
import AuthenticateReducers from "./Reducers/AuthenticateReducers";
import CartReducer from "./Reducers/CartReducer";
import ProductReducers from "./Reducers/ProductReducers";
import SiteconfigReducers from "./Reducers/SiteconfigReducers";

const RootReducer = combineReducers({
    products: ProductReducers,
    siteConfig: SiteconfigReducers,
    Auth: AuthenticateReducers,
    cart: CartReducer,
})

export default RootReducer;