import { ADD_TO_CART, FETCH_CART } from "../ActionTypes/ActionTypes";

const initialState = {
    loading:true,
    cartItems: [],
    recentlyAdded:[],
  };
  
  const CartReducer = (state = initialState, action) => {
      switch (action.type) {
        case ADD_TO_CART:
          return {
            ...state,
            loading:false,
            recentlyAdded: action.payload,
          };
    
        case FETCH_CART:
          return{
            ...state,
            loading:false,
            cartItems:action.payload,
          }
    
        case "increaseItem":
          state.quantity += 1;
          const increaseItemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
          );
          state.cartItems[increaseItemIndex].cartQuantity += 1;
          console.log(state.quantity);
          return {
            ...state,
          };
    
        case "decreaseItem":
          state.quantity -= 1;
          const decreaseItemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
          );
          const decreaseQuantity =
            state.cartItems[decreaseItemIndex].cartQuantity - 1;
          state.cartItems[decreaseItemIndex].cartQuantity =
            decreaseQuantity > 0
              ? decreaseQuantity
              : (state.cartItem = state.cartItems.splice(decreaseItemIndex, 1));
    
          return {
            ...state,
          };
        default:
          return state;
      }
    };
    export default CartReducer;