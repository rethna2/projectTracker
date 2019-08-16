import io from 'socket.io-client';
import { eventChannel, delay } from 'redux-saga';
import {
  take,
  takeLatest,
  call,
  put,
  fork,
  race,
  cancelled,
  select
} from 'redux-saga/effects';

import * as constants from '../constants';

const socketServerURL = 'http://localhost:3001';
let socket;
let roomname;
const connect = () => {
  socket = io(socketServerURL, {
    transports: ['websocket', 'polling', 'flashsocket']
  });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL, {
    transports: ['websocket', 'polling', 'flashsocket']
  });
  return new Promise(resolve => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

// This is how channel is created
const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = data => {
      emit(data);
    };
    socket.on('new message', handler);
    socket.on('doc update', handler);
    socket.emit('join room', { roomname });
    return () => {
      socket.off('new message', handler);
    };
  });

const listenDisconnectSaga = function*() {
  while (true) {
    yield call(disconnect);
    yield put({ type: constants.SERVER_OFF });
  }
};

const listenConnectSaga = function*() {
  while (true) {
    yield call(reconnect);
    yield put({ type: constants.SERVER_ON });
  }
};

// Saga to switch on channel.
const listenServerSaga = function*() {
  try {
    yield put({ type: constants.CHANNEL_ON });
    roomname = yield select(state => state.message.roomname);
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000)
    });
    if (timeout) {
      yield put({ type: constants.SERVER_OFF });
    }
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({ type: constants.SERVER_ON });

    while (true) {
      const payload = yield take(socketChannel);
      let username = yield select(state => state.message.username);
      console.log('username', username, payload);
      //if (payload.username !== username) {
      if (payload.text) {
        yield put({ type: constants.ADD_CHAT, payload });
      } else {
        yield put({
          type: constants.DOC_UPDATE_RECEIVED,
          payload: payload.content
        });
      }
      // }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: constants.CHANNEL_OFF });
    }
  }
};

// saga listens for start and stop actions
const startStopChannel = function*() {
  console.log('startStopChannel');
  while (true) {
    yield race({
      task: call(listenServerSaga),
      cancel: take(constants.STOP_CHANNEL)
    });
  }
};

const sendChatSaga = function*({ payload }) {
  console.log('send chat', payload);
  socket.emit('new message', payload);
};

const docUpdateSaga = function*({ payload }) {
  console.log('docUpdateSaga');
  if (!socket) {
    console.log('socket null');
    return;
  }
  let username = yield select(state => state.message.username);
  socket.emit('new message', { content: payload, username });
};

export default [
  fork(takeLatest, constants.START_CHANNEL, startStopChannel),
  fork(takeLatest, constants.SEND_CHAT, sendChatSaga),
  fork(takeLatest, constants.DOC_UPDATE, docUpdateSaga)
];
