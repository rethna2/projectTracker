import {
  register,
  login,
  userInfo,
  forgotPassword,
  resetPassword,
  logout,
  fetchUser
} from '../routines';
import { takeEvery, delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { call, put, fork } from 'redux-saga/effects';

import * as api from '../api';

function* registerSaga({ payload }) {
  try {
    yield put(register.request());
    const response = yield api.register(payload);
    yield put(register.success(response));
    localStorage.setItem('token', JSON.stringify(response));
  } catch (error) {
    yield put(register.failure(error.msg));
  } finally {
    yield put(register.fulfill());
  }
}

function* loginSaga({ payload }) {
  try {
    yield put(login.request());
    const response = yield api.login(payload);
    yield put(login.success(response));
    localStorage.setItem('token', JSON.stringify(response));
  } catch (error) {
    yield put(login.failure(error.msg));
  } finally {
    yield put(login.fulfill());
  }
}

function* forgotPasswordSaga({ payload }) {
  try {
    yield put(forgotPassword.request());
    const response = yield api.forgotPassword(payload);
    yield put(forgotPassword.success(response));
  } catch (error) {
    yield put(forgotPassword.failure(error.msg));
  } finally {
    yield put(forgotPassword.fulfill());
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    yield put(resetPassword.request());
    const response = yield api.resetPassword(payload);
    yield put(resetPassword.success(response));
    localStorage.setItem('token', JSON.stringify(response));
    yield put(push('/project'));
  } catch (error) {
    yield put(resetPassword.failure(error.msg));
  } finally {
    yield put(resetPassword.fulfill());
  }
}

function* userInfoSaga() {
  try {
    yield put(userInfo.request());
    const response = yield api.userInfo();
    yield put(userInfo.success(response));
  } catch (error) {
    yield put(userInfo.failure(error.msg));
  } finally {
    yield put(userInfo.fulfill());
  }
}

function* fetchUserSaga() {
  try {
    yield put(fetchUser.request());
    const response = yield api.fetchUser();
    yield put(fetchUser.success(response));
  } catch (error) {
    yield put(fetchUser.failure(error.msg));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* logoutSaga() {
  try {
    yield put(logout.request());
    const response = yield api.logout();
    yield put(logout.success(response));
    yield put(userInfo.trigger());
    yield put(push('/'));
  } catch (error) {
    yield put(logout.failure(error.msg));
  } finally {
    yield put(logout.fulfill());
  }
}

export default [
  fork(takeEvery, register.TRIGGER, registerSaga),
  fork(takeEvery, login.TRIGGER, loginSaga),
  fork(takeEvery, userInfo.TRIGGER, userInfoSaga),
  fork(takeEvery, fetchUser.TRIGGER, fetchUserSaga),
  fork(takeEvery, forgotPassword.TRIGGER, forgotPasswordSaga),
  fork(takeEvery, resetPassword.TRIGGER, resetPasswordSaga),
  fork(takeEvery, logout.TRIGGER, logoutSaga)
];
