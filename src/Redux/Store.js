import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./RootReducer";

const middleware = [thunk];

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
