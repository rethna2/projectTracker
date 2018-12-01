import { addTimesheet, editTimesheet, fetchTimesheets } from "../routines";
import { takeEvery, delay } from "redux-saga";
import { call, put, fork } from "redux-saga/effects";
import api from "../api";

function* fetchTimesheetsSaga(data) {
  try {
    yield put(fetchTimesheets.request());
    const response = yield call(api.fetchTimesheets.bind(null, data.payload));
    yield put(fetchTimesheets.success(response));
  } catch (error) {
    yield put(fetchTimesheets.failure(error.message));
  } finally {
    yield put(fetchTimesheets.fulfill());
  }
}

function* addTimesheetSaga(data) {
  try {
    yield put(addTimesheet.request());
    const response = yield call(api.addTimesheet.bind(null, data));
    yield put(addTimesheet.success(response));
    yield put(fetchTimesheets.trigger());
  } catch (error) {
    yield put(addTimesheet.failure(error.message));
  } finally {
    yield put(addTimesheet.fulfill());
  }
}

function* editTimesheetSaga(data) {
  try {
    yield put(editTimesheet.request());
    const response = yield call(
      api.editTimesheet.bind(
        null,
        data.payload.id,
        data.payload.timesheetId,
        data.payload.data
      )
    );
    yield put(editTimesheet.success(response));
    yield put(fetchTimesheets.trigger());
  } catch (error) {
    yield put(editTimesheet.failure(error.message));
  } finally {
    yield put(editTimesheet.fulfill());
  }
}

export default [
  fork(takeEvery, fetchTimesheets.TRIGGER, fetchTimesheetsSaga),
  fork(takeEvery, addTimesheet.TRIGGER, addTimesheetSaga),
  fork(takeEvery, editTimesheet.TRIGGER, editTimesheetSaga)
];
