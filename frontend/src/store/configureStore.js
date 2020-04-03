import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./reducers/usersReducer";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware,
];

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));

export default store