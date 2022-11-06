import { FETCH_SITE_CONFIGS } from "../ActionTypes/ActionTypes";

const initialState = {
    loading: true,
    config:[],
}

const SiteconfigReducers = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_SITE_CONFIGS:
            return{
                ...state,
                loading:false,
                config:action.payload,
            }
            default:
                return state;
    }
}

export default SiteconfigReducers;