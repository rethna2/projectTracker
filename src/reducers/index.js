import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import projects from './project';
import tasks from './task';
import user from './user';
import reports from './report';

export default history =>
  combineReducers({
    router: connectRouter(history),
    projects,
    tasks,
    user,
    reports,
    form: formReducer
  });
