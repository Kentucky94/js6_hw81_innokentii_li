import axiosOrders from "../../axiosOrders";

export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const FETCH_MESSAGES_SUCCESS  = 'FETCH_MESSAGES_SUCCESS';

export const createMessageSuccess = () => ({type: CREATE_MESSAGE_SUCCESS});
export const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});

export const createMessage = messageData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/messages', messageData);

      dispatch(createMessageSuccess());
      dispatch(fetchMessages());
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchMessages = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/messages');

      dispatch(fetchMessagesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};