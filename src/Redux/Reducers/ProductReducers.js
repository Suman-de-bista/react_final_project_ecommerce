import { FETCH_CATEGORY, FETCH_HOMEPAGE, FETCH_PRODUCTS } from "../ActionTypes/ActionTypes";

const initialState = {
    loading: true,
    category: [],
    homepage:[],
    product:[]
}

const ProductReducers = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_CATEGORY:
            return{
                ...state,
                loading:false,
                category:action.payload,
            }
        case FETCH_HOMEPAGE:
            return{
                ...state,
                loading:false,
                homepage:action.payload,
            }
        case FETCH_PRODUCTS:
            return{
                ...state,
                loading:false,
                product:action.payload,
            }
        default:
            return state;
    }
}

export default ProductReducers;