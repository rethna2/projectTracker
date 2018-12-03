import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '../api';
import {
  fetchMyTimesheets,
  fetchMyReviewTimesheets,
  generateTimesheet,
  editTimesheet,
  deleteTimesheet,
  reviewTimesheet
} from '../routines';

function* fetchMyTimesheetsSaga() {
  try {
    yield put(fetchMyTimesheets.request());
    const response = yield api.fetchMyTimesheets();
    yield put(fetchMyTimesheets.success(response));
  } catch (error) {
    yield put(fetchMyTimesheets.failure(error.message));
  } finally {
    yield put(fetchMyTimesheets.fulfill());
  }
}

function* fetchMyReviewTimesheetsSaga() {
  try {
    yield put(fetchMyReviewTimesheets.request());
    const response = yield api.fetchMyReviewTimesheets();
    yield put(fetchMyReviewTimesheets.success(response));
  } catch (error) {
    yield put(fetchMyReviewTimesheets.failure(error.message));
  } finally {
    yield put(fetchMyReviewTimesheets.fulfill());
  }
}

function* generateTimesheetSaga() {
  try {
    yield put(generateTimesheet.request());
    const response = yield api.generateTimesheet();
    yield put(generateTimesheet.success(response));
  } catch (error) {
    yield put(generateTimesheet.failure(error.message));
  } finally {
    yield put(generateTimesheet.fulfill());
  }
}

function* editTimesheetSaga() {
  try {
    yield put(editTimesheet.request());
    const response = yield api.editTimesheet();
    yield put(editTimesheet.success(response));
  } catch (error) {
    yield put(editTimesheet.failure(error.message));
  } finally {
    yield put(editTimesheet.fulfill());
  }
}

function* deleteTimesheetSaga() {
  try {
    yield put(deleteTimesheet.request());
    const response = yield api.deleteTimesheet();
    yield put(deleteTimesheet.success(response));
  } catch (error) {
    yield put(deleteTimesheet.failure(error.message));
  } finally {
    yield put(deleteTimesheet.fulfill());
  }
}

function* reviewTimesheetSaga() {
  try {
    yield put(reviewTimesheet.request());
    const response = yield api.reviewTimesheet();
    yield put(reviewTimesheet.success(response));
  } catch (error) {
    yield put(reviewTimesheet.failure(error.message));
  } finally {
    yield put(reviewTimesheet.fulfill());
  }
}

export default [
  fork(takeEvery, fetchMyTimesheets.TRIGGER, fetchMyTimesheetsSaga),
  fork(takeEvery, fetchMyReviewTimesheets.TRIGGER, fetchMyReviewTimesheetsSaga),
  fork(takeEvery, generateTimesheet.TRIGGER, generateTimesheetSaga),
  fork(takeEvery, editTimesheet.TRIGGER, editTimesheetSaga),
  fork(takeEvery, deleteTimesheet.TRIGGER, deleteTimesheetSaga),
  fork(takeEvery, reviewTimesheet.TRIGGER, reviewTimesheetSaga)
];
