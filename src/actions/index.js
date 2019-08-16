import * as constants from '../constants';

export const startChannel = (username, roomname) => ({
  type: constants.START_CHANNEL,
  username,
  roomname
});
export const stopChannel = () => ({ type: constants.STOP_CHANNEL });
export const sendChat = payload => ({ type: constants.SEND_CHAT, payload });
export const docUpdate = payload => ({ type: constants.DOC_UPDATE, payload });
export const docUpdateReceived = payload => ({
  type: constants.DOC_UPDATE_RECEIVED,
  payload
});
