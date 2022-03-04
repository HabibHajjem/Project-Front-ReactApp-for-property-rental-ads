import { CURRENT, FAIL, SIGN_IN, SIGN_UP, LOG_OUT, CLEARERRORS, GET_USERS, GET_USER, CLEAR_USER, TOGGLE_LOADING_FALSE, GET_USERPOSTS, CLEAR_USERPOSTS } from "../types/authTypes"

const initialState = {
    user:null,
    users:null,
    userById:null,
    userPosts:null,
    errors:null,
    auth:false,
    loading:true
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
        case SIGN_IN:
            localStorage.setItem('token', action.payload.token)
            return {...state, user: action.payload.user, auth:true}
        case CURRENT:
            return {...state, user: action.payload, auth : true}    
        case LOG_OUT:
            localStorage.removeItem('token')
            return {...state, user:null, auth:false}
        case FAIL:
            return {...state, errors : action.payload.errors}
        case CLEARERRORS:
            return {...state, errors:null}
        case GET_USERS:
            return {...state, users:action.payload}
        case GET_USER:
            return{...state, userById:action.payload}
        case CLEAR_USER:
            return{...state, userById:null}
        case TOGGLE_LOADING_FALSE:
            return{...state, loading:false}
        case GET_USERPOSTS:
            return{...state,userPosts:action.payload}
        case CLEAR_USERPOSTS:
            return{...state, userPosts:null}
    default:
        return state
    }
}
