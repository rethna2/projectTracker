import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

export const userInfo = createRoutine('USER_INFO');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
export const login = createRoutine('LOGIN');
export const forgotPassword = createRoutine('FORGOT_PASSWORD');
export const resetPassword = createRoutine('RESET_PASSWORD');
export const logout = createRoutine('LOGOUT');

export const fetchProjects = createRoutine('FETCH_PROJECTS');
export const addProject = createRoutine('ADD_PROJECT');
export const editProject = createRoutine('EDIT_PROJECT');
export const deleteProject = createRoutine('DELETE_PROJECT');
export const fetchProjectData = createRoutine('FETCH_PROJECT_DATA');
export const exportProject = createRoutine('EXPORT_PROJECT');
export const importProject = createRoutine('IMPORT_PROJECT');

export const fetchTasks = createRoutine('FETCH_TASKS');
export const addTask = createRoutine('ADD_TASK');
export const editTask = createRoutine('EDIT_TASK');
export const deleteTask = createRoutine('DELETE_TASK');
export const fetchTaskData = createRoutine('FETCH_TASK_DATA');

export const logTime = createRoutine('LOG_TIME');
export const editTime = createRoutine('EDIT_TIME');
export const deleteTime = createRoutine('DELETE_TIME');
export const fetchProjectTime = createRoutine('FETCH_PROJECT_TIME');
export const fetchTaskTime = createRoutine('FETCH_TASK_TIME');

export const fetchMyTimesheets = createRoutine('FETCH_MY_TIMESHEETS');
export const fetchMyReviewTimesheets = createRoutine(
  'FETCH_MY_REVIEW_TIMESHEETS'
);
export const generateTimesheet = createRoutine('GENERATE_TIMESHEET');
export const editTimesheet = createRoutine('EDIT_TIMESHEET');
export const deleteTimesheet = createRoutine('DELETE_TIMESHEET');
export const reviewTimesheet = createRoutine('REVIEW_TIMESHEET');

export const registerHandler = bindRoutineToReduxForm(register);
export const loginHandler = bindRoutineToReduxForm(login);
export const resetPasswordHandler = bindRoutineToReduxForm(resetPassword);
