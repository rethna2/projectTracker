import { takeEvery, delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { call, put, fork, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  register,
  login,
  userInfo,
  forgotPassword,
  resetPassword,
  logout
} from '../routines';

import * as api from '../api';

function* registerSaga({ payload }) {
  try {
    yield put(register.request());
    const response = yield api.register(payload.values);
    yield put(register.success(response));
    localStorage.setItem('token', JSON.stringify(response));
    yield put(push('/project'));
  } catch (error) {
    yield put(register.failure(new SubmissionError({ _error: error.msg })));
  } finally {
    yield put(register.fulfill());
  }
}

function* loginSaga({ payload }) {
  try {
    yield put(login.request());
    const response = yield api.login(payload.values);
    yield put(login.success(response));
    localStorage.setItem('token', JSON.stringify(response));
    yield put(push('/project'));
  } catch (error) {
    yield put(login.failure(new SubmissionError({ _error: error.msg })));
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
    const response = yield api.resetPassword(payload.values);
    yield put(resetPassword.success(response));
    localStorage.setItem('token', JSON.stringify(response));
    yield put(push('/project'));
  } catch (error) {
    console.log(error);
    yield put(
      resetPassword.failure(new SubmissionError({ _error: 'Server Error' }))
    );
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
  fork(takeEvery, forgotPassword.TRIGGER, forgotPasswordSaga),
  fork(takeEvery, resetPassword.TRIGGER, resetPasswordSaga),
  fork(takeEvery, logout.TRIGGER, logoutSaga)
];
