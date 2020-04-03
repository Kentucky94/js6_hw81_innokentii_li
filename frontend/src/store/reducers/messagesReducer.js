import {FETCH_MESSAGES_SUCCESS} from "../actions/messgesActions";

const initialState = {
  messages: [],
};

const messagesReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_MESSAGES_SUCCESS:
      return {...state, messages: action.messages};
    default:
      return state;
  }
};

export default messagesReducer;