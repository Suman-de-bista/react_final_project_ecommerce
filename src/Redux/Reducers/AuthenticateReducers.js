import { FETCH_PROFILE, RESET_LOGIN_STORE, USER_LOGIN, USER_REGISTER } from "../ActionTypes/ActionTypes";

const initialState = {
    loading: true,
    login:[],
    profile:[]
}

const AuthenticateReducers = (state = initialState, action)=>{
    switch(action.type){
        case USER_LOGIN:
            return{
                ...state,
                loading:false,
                login:action.payload,
            }
        case USER_REGISTER:
            return{
                ...state,
                loading:false,
                login:action.payload,
            }
        case FETCH_PROFILE:
            return{
                ...state,
                loading:false,
                profile:action.payload,
            }
        case RESET_LOGIN_STORE:
                return{
                    ...state,
                    loading:true,
                    login:[]
                }
            default:
                return state;
    }
}

export default AuthenticateReducers;