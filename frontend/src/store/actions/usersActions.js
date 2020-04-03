import axiosOrders from "../../axiosOrders";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = userData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/users', userData);

      dispatch(registerUserSuccess());
    }catch(error){
      console.log(error);
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/users/sessions', userData);

      dispatch(loginUserSuccess());
    }catch(error){
      console.log(error);
    }
  }
};

export const logoutUser = () => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/users/sessions');

      dispatch(logoutUserSuccess());
    }catch(error){
      console.log(error);
    }
  }
};

