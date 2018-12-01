import { fetchPeople, addPeople, editPeople } from '../routines';
import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../api';
 
function* fetchPeopleSaga() {
  try {
    yield put(fetchPeople.request());
    const response = yield call(api.fetchPeople);
    yield put(fetchPeople.success(response));
    yield call(delay, 2000);
  } catch (error) {
    yield put(fetchPeople.failure(error.message));
  } finally {
    yield put(fetchPeople.fulfill());
  }
}

function* addPeopleSaga(data) {
  try {
    yield put(addPeople.request());
    const response = yield call(api.addPeople.bind(null, data));
    yield put(addPeople.success(response));
    yield put(fetchPeople.trigger());
  } catch (error) {
    yield put(addPeople.failure(error.message));
  } finally {
    yield put(addPeople.fulfill());
  }
}

function* editPeopleSaga(data) {
  try {
    yield put(editPeople.request());
    const response = yield call(api.editPeople.bind(null, data.payload.id, data.payload.data));
    yield put(editPeople.success(response));
    yield put(fetchPeople.trigger());
  } catch (error) {
    yield put(editPeople.failure(error.message));
  } finally {
    yield put(editPeople.fulfill());
  }
}

export default [
  fork(takeEvery,fetchPeople.TRIGGER, fetchPeopleSaga),
  fork(takeEvery,addPeople.TRIGGER, addPeopleSaga),
  fork(takeEvery,editPeople.TRIGGER, editPeopleSaga),
]
