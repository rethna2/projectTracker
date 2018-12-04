import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import project from './project';
import task from './task';
import time from './time';
import user from './user';
import timesheet from './timesheet';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    project,
    task,
    time,
    timesheet,
    form: formReducer
  });
