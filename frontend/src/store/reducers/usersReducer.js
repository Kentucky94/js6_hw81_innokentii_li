import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
  user: null,
  registerError: null,
  loginError: null,
  logoutError: null,
};

const usersReducer = (state = initialState, action) => {
  switch(action.type){
    case REGISTER_USER_SUCCESS:
      return {...state, registerError: null};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.error};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user, loginError: null};
    case LOGIN_USER_FAILURE:
      return {...state, loginError: action.error};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null, logoutError: null};
    case LOGOUT_USER_FAILURE:
      return {...state, logoutError: action.error};
    default:
      return state;
  }
};

export default usersReducer;