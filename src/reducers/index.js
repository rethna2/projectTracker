import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import projects from './project';
import tasks from './task';
import time from './time';
import user from './user';
import timesheet from './timesheet';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    projects,
    tasks,
    time,
    timesheet,
    form: formReducer
  });
