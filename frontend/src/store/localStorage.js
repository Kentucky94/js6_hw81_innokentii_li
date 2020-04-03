import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actions/usersActions";

const saveToLocalStorage = state => {
  try{
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  }catch(error){
    console.log('Could not save user');
  }
};

export const loadFromLocalStorage = () => {
  try{
    const serializedState = localStorage.getItem('state');

    if(serializedState === null) return undefined;

    return JSON.parse(serializedState);
  }catch(error){
    return undefined;
  }
};

const actions = [LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS];

export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if(actions.includes(action.type)){
    console.log('Saving user');

    saveToLocalStorage({
      users: {
        user: store.getState().users.user
      }
    })
  }

  return result;
};