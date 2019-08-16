import * as constants from '../constants';

const initialState = {
  chat: [
    {
      username: 'Rethna',
      text: 'Hello!'
    },
    {
      username: 'Ganesh',
      text: 'Hi!'
    }
  ],
  doc: null,
  channelStatus: 'off',
  serverStatus: 'unknown',
  username: null,
  roomname: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.START_CHANNEL:
      return { ...state, username: action.username, roomname: action.roomname };
    case constants.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case constants.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case constants.ADD_CHAT:
      return { ...state, chat: [...state.chat, action.payload] };
    case constants.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case constants.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    case constants.DOC_UPDATE:
      return { ...state, doc: action.payload };
    case constants.DOC_UPDATE_RECEIVED:
      return { ...state, doc: action.payload };
    default:
      return state;
  }
};
