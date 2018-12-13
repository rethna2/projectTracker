import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token =
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token')).token;
    config.headers['Cache-Control'] = 'no-cache';
    if (token) {
      config.headers['x-auth'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    /*
  if (error.response.status === 401) {
      console.log('unauthorized, logging out ...');
      auth.logout();
      router.replace('/auth/login');
  }
  */
    return Promise.reject(error.response.data);
  }
);

// user -----------------------------------------------------------------------

export const register = data =>
  axios
    .post(`/api/user/register`, data)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

export const login = data =>
  axios
    .post(`/api/user/login`, data)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

export const forgotPassword = data =>
  axios.post(`/api/user/forgotPassword`, data).then(res => res.data);

export const resetPassword = ({ token, emailId, data }) =>
  axios
    .post(`/api/user/resetPassword/${emailId}/${token}`, data)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

export const userInfo = () => axios.get(`/api/user`).then(res => res.data);

export const logout = () => axios.get(`/api/user/logout`).then(res => res.data);

// project -----------------------------------------------------------------------

export const fetchProjects = () =>
  axios.get(`/api/project`).then(res => res.data);

export const addProject = data =>
  axios.post(`/api/project`, data).then(res => res.data);

export const editProject = ({ projectId, data }) =>
  axios.post(`/api/project/${projectId}`, data).then(res => res.data);

export const deleteProject = ({ projectId }) =>
  axios.delete(`/api/project/${projectId}`).then(res => res.data);

export const fetchProjectData = ({ projectId }) =>
  axios.get(`/api/recentactivity/${projectId}`).then(res => res.data);

export const exportProject = ({ projectId }) =>
  axios.get(`/api/project/export/${projectId}`).then(res => res.data);

export const importProject = ({ data }) =>
  axios.post(`/api/project/import/`, { ...data }).then(res => res.data);

// task  -----------------------------------------------------------------------

export const fetchTasks = projectId =>
  axios.get(`/api/task/${projectId}`).then(res => res.data);

export const addTask = (projectId, data) =>
  axios.post(`/api/task/${projectId}`, data).then(res => res.data);

export const editTask = (projectId, taskId, data) =>
  axios.post(`/api/task/${projectId}/${taskId}`, data).then(res => res.data);

export const deleteTask = (projectId, taskId) =>
  axios.delete(`/api/task/${projectId}/${taskId}`).then(res => res.data);

export const fetchTaskData = ({ taskId }) =>
  axios.get(`/api/recentactivity/task/${taskId}`).then(res => res.data);

// time -----------------------------------------------------------------------

export const logTime = ({ projectId, taskId, data }) =>
  axios.post(`/api/time/${projectId}/${taskId}`, data).then(res => res.data);

export const editTime = ({ projectId, taskId, timeId, data }) =>
  axios
    .post(`/api/time/${projectId}/${taskId}/${timeId}`, data)
    .then(res => res.data);

export const deleteTime = ({ projectId, taskId, timeId }) =>
  axios
    .delete(`/api/time/${projectId}/${taskId}/${timeId}`)
    .then(res => res.data);

export const fetchProjectTime = ({ projectId, from, to, user }) =>
  axios
    .get(`/api/time/project/${projectId}?from=${from}&to=${to}&user=${user}`)
    .then(res => res.data);

export const fetchTaskTime = ({ taskId }) =>
  axios.get(`/api/time/task/${taskId}`).then(res => res.data);

// timesheet -----------------------------------------------------------------------

export const fetchMyTimesheets = () =>
  axios.get(`/api/timesheet/me`).then(res => res.data);

export const fetchMyReviewTimesheets = () =>
  axios.get(`/api/timesheet/review`).then(res => res.data);

export const generateTimesheet = data =>
  axios.post(`/api/timesheet`, data).then(res => res.data);

export const editTimesheet = ({ timesheetId, data }) =>
  axios.post(`/api/timesheet/${timesheetId}`, data).then(res => res.data);

export const deleteTimesheet = ({ timesheetId }) =>
  axios.delete(`/api/timesheet/${timesheetId}`).then(res => res.data);

export const reviewTimesheet = ({ timesheetId, data }) =>
  axios
    .post(`/api/timesheet/review/${timesheetId}`, data)
    .then(res => res.data);
