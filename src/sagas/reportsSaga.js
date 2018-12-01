import { fetchReports } from '../routines';
import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../api';
 
function* fetchReportsSaga() {
  try {
    yield put(fetchReports.request());
    const response = yield call(api.fetchReports);
    yield call(delay, 2000);
    yield put(fetchReports.success(response));
  } catch (error) {
    yield put(fetchReports.failure(error.message));
  } finally {
    yield put(fetchReports.fulfill());
  }
}

export default [
  fork(takeEvery,fetchReports.TRIGGER, fetchReportsSaga),
]