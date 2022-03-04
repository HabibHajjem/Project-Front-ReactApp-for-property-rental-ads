import { CLEAR_POST, CLEAR_USERPOSTS, FILTER, GET_MYPOSTS, GET_POSTS, GET_POST_BY_ID, TOGGLE_EDIT_FALSE, TOGGLE_EDIT_TRUE, TOGGLE_HOME_FALSE, TOGGLE_HOME_TRUE, TOGGLE_LOADING, TOGGLE_LOADING_TRUE, TOGGLE_PENDING_FALSE, TOGGLE_PENDING_TRUE, TOGGLE_SHOW_FALSE, TOGGLE_SHOW_TRUE } from '../types/postTypes'

const initialState = {
    posts:[],
    myposts:[],
    post:null,
    isHome:false,
    isEdit:false,
    isMyAnnonces:false,
    filter:null,
    loading:true,
    pending:true,
    show:false
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {...state, posts:payload}
    case GET_MYPOSTS:
      return {...state, myposts:payload}
    case GET_POST_BY_ID:
      return{...state, post:payload }
    case CLEAR_POST:
      return{...state, post:null}
    case TOGGLE_HOME_TRUE:
      return {...state, isHome:true}
    case TOGGLE_HOME_FALSE:
      return {...state, isHome:false}
    case TOGGLE_EDIT_TRUE:
      return {...state, isEdit:true}
    case TOGGLE_EDIT_FALSE:
      return {...state, isEdit:false}
    case FILTER:
      return{...state, filter:payload}
    case TOGGLE_LOADING:
      return{...state, loading:false}
    case TOGGLE_LOADING_TRUE:
      return{...state, loading:true}
    case TOGGLE_PENDING_TRUE:
      return{...state, pending:true}
    case TOGGLE_PENDING_FALSE:
      return{...state, pending:false}
    case TOGGLE_SHOW_TRUE:
      return{...state, show:true}
    case TOGGLE_SHOW_FALSE:
      return{...state, show:false}
    default:
      return state;
  }
};


