import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actions/usersActions";

const saveToLocalStorage = state => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }catch(error){
    console.log('State not saved');
  }
};

export const loadFromLocalStorage = () => {
  try{
    const serializedStore = localStorage.getItem('state');
    if(serializedStore === null) return undefined;
    return JSON.parse(serializedStore)
  }catch(error){
    console.log('Could not load from local storage');
    return undefined;
  }
};

const actions = [LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS];

export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if(actions.includes(action.type)){
    console.log('Saving');
    saveToLocalStorage({
      users: {
        user: store.getState().users.user
      }
    })
  }

  return result;
};