import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as api from '../api';
import {
  fetchProjects,
  addProject,
  editProject,
  deleteProject,
  fetchProjectData
} from '../routines';

function* fetchProjectsSaga() {
  try {
    yield put(fetchProjects.request());
    const response = yield api.fetchProjects();
    yield call(delay, 2000);
    yield put(fetchProjects.success(response));
  } catch (error) {
    yield put(fetchProjects.failure(error.message));
  } finally {
    yield put(fetchProjects.fulfill());
  }
}

function* fetchProjectDataSaga({ payload }) {
  try {
    yield put(fetchProjectData.request());
    console.log('payload', payload);
    const response = yield api.fetchProjectData(payload.projectId);
    yield put(fetchProjectData.success(response));
  } catch (error) {
    yield put(fetchProjectData.failure(error.message));
  } finally {
    yield put(fetchProjectData.fulfill());
  }
}

function* addProjectSaga({ payload }) {
  try {
    yield put(addProject.request());
    const response = yield api.addProject(payload);
    yield put(addProject.success(response));
    yield put(fetchProjects.trigger());
    yield put(push(`/project`));
  } catch (error) {
    yield put(addProject.failure(error.message));
  } finally {
    yield put(addProject.fulfill());
  }
}

function* editProjectSaga({ payload }) {
  try {
    yield put(editProject.request());
    const response = yield api.editProject(payload.id, payload.data);
    yield put(editProject.success(response));
    yield put(fetchProjects.trigger());
    yield put(push(`/project`));
  } catch (error) {
    yield put(editProject.failure(error.message));
  } finally {
    yield put(editProject.fulfill());
  }
}

function* deleteProjectSaga({ payload }) {
  try {
    yield put(deleteProject.request());
    const response = yield api.deleteProject(payload.id);
    yield put(deleteProject.success(response));
    yield put(fetchProjects.trigger());
    yield put(push(`/project`));
  } catch (error) {
    yield put(deleteProject.failure(error.message));
  } finally {
    yield put(deleteProject.fulfill());
  }
}

export default [
  fork(takeEvery, fetchProjects.TRIGGER, fetchProjectsSaga),
  fork(takeEvery, fetchProjectData.TRIGGER, fetchProjectDataSaga),
  fork(takeEvery, addProject.TRIGGER, addProjectSaga),
  fork(takeEvery, editProject.TRIGGER, editProjectSaga),
  fork(takeEvery, deleteProject.TRIGGER, deleteProjectSaga)
];
