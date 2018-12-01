import projectsSaga from './projectsSaga';
import tasksSaga from './tasksSaga';
import peopleSaga from './peopleSaga';
import timesheetsSaga from './timesheetsSaga';
import userSaga from './userSaga';
import reportsSaga from './reportsSaga';

import { routinePromiseWatcherSaga } from 'redux-saga-routines';

export default function* rootSaga(){
  yield []
  .concat(projectsSaga)
  .concat(tasksSaga)
  .concat(peopleSaga)
  .concat(timesheetsSaga)
  .concat(userSaga)
  .concat(reportsSaga)
  .concat(routinePromiseWatcherSaga);
}
