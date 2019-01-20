import { takeLatest, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
  fetchTaskData
} from '../routines';
import * as api from '../api';

function* fetchTasksSaga({ payload }) {
  try {
    yield put(fetchTasks.request());
    const response = yield api.fetchTasks(payload);
    yield put(fetchTasks.success(response));
  } catch (error) {
    yield put(fetchTasks.failure(error.msg));
  } finally {
    yield put(fetchTasks.fulfill());
  }
}

function* addTaskSaga({ payload }) {
  try {
    yield put(addTask.request());
    const response = yield api.addTask(payload.projectId, payload.data);
    yield put(addTask.success(response));
    yield put(fetchTasks.trigger(payload.projectId));
    yield put(push(`/project/${payload.projectId}/task`));
  } catch (error) {
    yield put(addTask.failure(error.msg));
  } finally {
    yield put(addTask.fulfill());
  }
}

function* editTaskSaga({ payload }) {
  try {
    yield put(editTask.request());
    const response = yield api.editTask(
      payload.projectId,
      payload.id,
      payload.data
    );
    yield put(editTask.success(response));
    yield put(fetchTasks.trigger(payload.projectId));
    yield put(push(`/project/${payload.projectId}/task`));
  } catch (error) {
    yield put(editTask.failure(error.msg));
  } finally {
    yield put(editTask.fulfill());
  }
}

function* deleteTaskSaga({ payload }) {
  try {
    yield put(deleteTask.request());
    const response = yield api.deleteTask(payload.projectId, payload.id);
    yield put(deleteTask.success(response));
    yield put(fetchTasks.trigger(payload.projectId));
    yield put(push(`/project/${payload.projectId}/task`));
  } catch (error) {
    yield put(deleteTask.failure(error.msg));
  } finally {
    yield put(deleteTask.fulfill());
  }
}

function* fetchTaskDataSaga({ payload }) {
  try {
    yield put(fetchTaskData.request());
    const response = yield api.fetchTaskData(payload);
    yield put(fetchTaskData.success(response));
  } catch (error) {
    yield put(fetchTaskData.failure(error.msg));
  } finally {
    yield put(fetchTaskData.fulfill());
  }
}

export default [
  fork(takeLatest, fetchTasks.TRIGGER, fetchTasksSaga),
  fork(takeLatest, addTask.TRIGGER, addTaskSaga),
  fork(takeLatest, editTask.TRIGGER, editTaskSaga),
  fork(takeLatest, deleteTask.TRIGGER, deleteTaskSaga),
  fork(takeLatest, fetchTaskData.TRIGGER, fetchTaskDataSaga)
];
