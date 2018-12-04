import projectSaga from './projectSaga';
import taskSaga from './taskSaga';
import timeSaga from './timeSaga';
import userSaga from './userSaga';
import timesheetSaga from './timesheetSaga';

import { routinePromiseWatcherSaga } from 'redux-saga-routines';

export default function* rootSaga() {
  yield []
    .concat(userSaga)
    .concat(projectSaga)
    .concat(taskSaga)
    .concat(timeSaga)
    .concat(timesheetSaga)
    .concat(routinePromiseWatcherSaga);
}
