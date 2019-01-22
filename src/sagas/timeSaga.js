import { takeLatest, put, fork } from 'redux-saga/effects';

import {
  logTime,
  editTime,
  deleteTime,
  fetchProjectTime,
  fetchTaskTime,
  fetchTasks
} from '../routines';
import * as api from '../api';

function* logTimeSaga({ payload }) {
  try {
    yield put(logTime.request());
    const response = yield api.logTime(payload);
    yield put(logTime.success(response));
    yield put(fetchTasks(payload.projectId));
  } catch (error) {
    yield put(logTime.failure(error.msg));
  } finally {
    yield put(logTime.fulfill());
  }
}

function* editTimeSaga({ payload }) {
  try {
    yield put(editTime.request());
    const response = yield api.editTime(payload);
    yield put(editTime.success(response));
    fetchTasks(payload.projectId);
  } catch (error) {
    yield put(editTime.failure(error.msg));
  } finally {
    yield put(editTime.fulfill());
  }
}

function* deleteTimeSaga({ payload }) {
  try {
    yield put(deleteTime.request());
    const response = yield api.deleteTime(payload);
    yield put(deleteTime.success(response));
    fetchTasks(payload.projectId);
  } catch (error) {
    yield put(deleteTime.failure(error.msg));
  } finally {
    yield put(deleteTime.fulfill());
  }
}

function* fetchProjectTimeSaga({ payload }) {
  try {
    yield put(fetchProjectTime.request());
    const response = yield api.fetchProjectTime(payload);
    yield put(fetchProjectTime.success(response));
  } catch (error) {
    yield put(fetchProjectTime.failure(error.msg));
  } finally {
    yield put(fetchProjectTime.fulfill());
  }
}

function* fetchTaskTimeSaga({ payload }) {
  try {
    yield put(fetchTaskTime.request());
    const response = yield api.fetchTaskTime(payload);
    yield put(fetchTaskTime.success(response));
  } catch (error) {
    yield put(fetchTaskTime.failure(error.msg));
  } finally {
    yield put(fetchTaskTime.fulfill());
  }
}

export default [
  fork(takeLatest, logTime.TRIGGER, logTimeSaga),
  fork(takeLatest, editTime.TRIGGER, editTimeSaga),
  fork(takeLatest, deleteTime.TRIGGER, deleteTimeSaga),
  fork(takeLatest, fetchProjectTime.TRIGGER, fetchProjectTimeSaga),
  fork(takeLatest, fetchTaskTime.TRIGGER, fetchTaskTimeSaga)
];
