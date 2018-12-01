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

import api from '../api';

function* registerSaga(data) {
  try {
    yield put(register.request());
    const response = yield call(api.register.bind(null, data));
    yield put(register.success(response));
    localStorage.setItem('token', JSON.stringify(response));
  } catch (error) {
    yield put(register.failure(error.message));
  } finally {
    yield put(register.fulfill());
  }
}

function* loginSaga(data) {
  try {
    yield put(login.request());
    const response = yield call(api.login.bind(null, data));
    yield put(login.success(response));
    localStorage.setItem('token', JSON.stringify(response));
  } catch (error) {
    yield put(login.failure(error.message));
  } finally {
    yield put(login.fulfill());
  }
}

function* forgotPasswordSaga(data) {
  try {
    yield put(forgotPassword.request());
    const response = yield call(api.forgotPassword.bind(null, data));
    yield put(forgotPassword.success(response));
  } catch (error) {
    yield put(forgotPassword.failure(error.message));
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
    yield put(resetPassword.failure(error.message));
  } finally {
    yield put(resetPassword.fulfill());
  }
}

function* userInfoSaga() {
  try {
    yield put(userInfo.request());
    const response = yield call(api.userInfo);
    yield put(userInfo.success(response));
  } catch (error) {
    yield put(userInfo.failure(error.message));
  } finally {
    yield put(userInfo.fulfill());
  }
}

function* fetchUserSaga() {
  try {
    yield put(fetchUser.request());
    const response = yield call(api.fetchUser);
    yield put(fetchUser.success(response));
  } catch (error) {
    yield put(fetchUser.failure(error.message));
  } finally {
    yield put(fetchUser.fulfill());
  }
}

function* logoutSaga() {
  try {
    yield put(logout.request());
    const response = yield call(api.logout);
    yield put(logout.success(response));
    yield put(userInfo.trigger());
    yield put(push('/'));
  } catch (error) {
    yield put(logout.failure(error.message));
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
