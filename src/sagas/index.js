import projectsSaga from './projectsSaga';
import tasksSaga from './tasksSaga';
import timeSaga from './timeSaga';
import userSaga from './userSaga';
import timesheetSaga from './timesheetSaga';

import { routinePromiseWatcherSaga } from 'redux-saga-routines';

export default function* rootSaga() {
  yield []
    .concat(userSaga)
    .concat(projectsSaga)
    .concat(tasksSaga)
    .concat(timeSaga)
    .concat(timesheetSaga)
    .concat(routinePromiseWatcherSaga);
}
