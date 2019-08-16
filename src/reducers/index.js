import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import project from './project';
import task from './task';
import time from './time';
import user from './user';
import timesheet from './timesheet';
import message from './message';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    project,
    task,
    time,
    timesheet,
    message,
    form: formReducer
  });
