import { ADD_TO_CART, FETCH_CART } from "../ActionTypes/ActionTypes";

const initialState = {
  loading: true,
  cartItems: [],
  recentlyAdded: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
        recentlyAdded: action.payload,
      };

    case FETCH_CART:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
export default CartReducer;
