import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as api from '../api';
import {
  fetchProjects,
  addProject,
  editProject,
  deleteProject,
  fetchProjectData,
  exportProject,
  importProject
} from '../routines';

function* fetchProjectsSaga() {
  try {
    yield put(fetchProjects.request());
    const response = yield api.fetchProjects();
    yield call(delay, 2000);
    yield put(fetchProjects.success(response));
  } catch (error) {
    yield put(fetchProjects.failure(error.msg));
  } finally {
    yield put(fetchProjects.fulfill());
  }
}

function* fetchProjectDataSaga({ payload }) {
  try {
    yield put(fetchProjectData.request());
    const response = yield api.fetchProjectData(payload);
    yield put(fetchProjectData.success(response));
  } catch (error) {
    yield put(fetchProjectData.failure(error.msg));
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
    yield put(addProject.failure(error.msg));
  } finally {
    yield put(addProject.fulfill());
  }
}

function* editProjectSaga({ payload }) {
  try {
    yield put(editProject.request());
    const response = yield api.editProject(payload);
    yield put(editProject.success(response));
    yield put(fetchProjects.trigger());
    yield put(push(`/project`));
  } catch (error) {
    yield put(editProject.failure(error.msg));
  } finally {
    yield put(editProject.fulfill());
  }
}

function* deleteProjectSaga({ payload }) {
  try {
    yield put(deleteProject.request());
    const response = yield api.deleteProject(payload);
    yield put(deleteProject.success(response));
    yield put(fetchProjects.trigger());
    yield put(push(`/project`));
  } catch (error) {
    yield put(deleteProject.failure(error.msg));
  } finally {
    yield put(deleteProject.fulfill());
  }
}

function* exportProjectSaga({ payload }) {
  try {
    yield put(exportProject.request());
    const response = yield api.exportProject(payload);
    yield put(exportProject.success(response));
  } catch (error) {
    yield put(exportProject.failure(error.msg));
  } finally {
    yield put(exportProject.fulfill());
  }
}

function* importProjectSaga({ payload }) {
  try {
    yield put(importProject.request());
    const response = yield api.importProject(payload);
    yield put(importProject.success(response));
  } catch (error) {
    yield put(importProject.failure(error.msg));
  } finally {
    yield put(importProject.fulfill());
  }
}

export default [
  fork(takeEvery, fetchProjects.TRIGGER, fetchProjectsSaga),
  fork(takeEvery, fetchProjectData.TRIGGER, fetchProjectDataSaga),
  fork(takeEvery, addProject.TRIGGER, addProjectSaga),
  fork(takeEvery, editProject.TRIGGER, editProjectSaga),
  fork(takeEvery, deleteProject.TRIGGER, deleteProjectSaga),
  fork(takeEvery, exportProject.TRIGGER, exportProjectSaga),
  fork(takeEvery, importProject.TRIGGER, importProjectSaga)
];
