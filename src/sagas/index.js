import projectSaga from './projectSaga';
import taskSaga from './taskSaga';
import timeSaga from './timeSaga';
import userSaga from './userSaga';
import timesheetSaga from './timesheetSaga';

export default function* rootSaga() {
  yield []
    .concat(userSaga)
    .concat(projectSaga)
    .concat(taskSaga)
    .concat(timeSaga)
    .concat(timesheetSaga);
}
