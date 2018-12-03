import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { logTime, editTime, fetchProjectTime } from '../routines';
import * as api from '../api';

function* logTimeSaga({ payload }) {
  try {
    yield put(logTime.request());
    const response = yield api.logTime(
      payload.projectId,
      payload.taskId,
      payload.data
    );
    yield put(logTime.success(response));
  } catch (error) {
    yield put(logTime.failure(error.message));
  } finally {
    yield put(logTime.fulfill());
  }
}

function* editTimeSaga({ payload }) {
  try {
    yield put(editTime.request());
    const response = yield api.logTime(
      payload.projectId,
      payload.taskId,
      payload.timeId,
      payload.data
    );
    yield put(editTime.success(response));
  } catch (error) {
    yield put(editTime.failure(error.message));
  } finally {
    yield put(editTime.fulfill());
  }
}

function* fetchProjectTimeSaga({ payload }) {
  try {
    yield put(fetchProjectTime.request());
    const response = yield api.fetchProjectTime(payload);
    yield put(fetchProjectTime.success(response));
  } catch (error) {
    yield put(fetchProjectTime.failure(error.message));
  } finally {
    yield put(fetchProjectTime.fulfill());
  }
}

export default [
  fork(takeEvery, logTime.TRIGGER, logTimeSaga),
  fork(takeEvery, editTime.TRIGGER, editTimeSaga),
  fork(takeEvery, fetchProjectTime.TRIGGER, fetchProjectTimeSaga)
];
