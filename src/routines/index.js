import { createRoutine } from 'redux-saga-routines';

export const fetchProjects = createRoutine('FETCH_PROJECTS');
export const addProject = createRoutine('ADD_PROJECT');
export const editProject = createRoutine('EDIT_PROJECT');
export const fetchProjectData = createRoutine('FETCH_PROJECT_DATA');

export const fetchTasks = createRoutine('FETCH_TASKS');
export const addTask = createRoutine('ADD_TASK');
export const editTask = createRoutine('EDIT_TASK');
export const updateTimelog = createRoutine('UPDATE_TIMELOG');

export const fetchPeople = createRoutine('FETCH_PEOPLE');
export const addPeople = createRoutine('ADD_PEOPLE');
export const editPeople = createRoutine('EDIT_PEOPLE');

export const fetchTimesheets = createRoutine('FETCH_TIMESHEETS');
export const addTimesheet = createRoutine('ADD_TIMESHEET');
export const editTimesheet = createRoutine('EDIT_TIMESHEET');

export const fetchReports = createRoutine('FETCH_REPORTS');

export const userInfo = createRoutine('USER_INFO');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
export const login = createRoutine('LOGIN');
export const forgotPassword = createRoutine('FORGOT_PASSWORD');
export const resetPassword = createRoutine('RESET_PASSWORD');
export const logout = createRoutine('LOGOUT');

