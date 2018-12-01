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

const register = data =>
  axios
    .post(`/api/user/register`, data.payload)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

const login = data =>
  axios
    .post(`/api/user/login`, data.payload)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

const forgotPassword = data =>
  axios.post(`/api/user/forgotPassword`, data.payload).then(res => res.data);

const resetPassword = ({ token, emailId, data }) =>
  axios
    .post(`/api/user/resetPassword/${emailId}/${token}`, data)
    .then(res => ({ ...res.data, token: res.headers['x-auth'] }));

const userInfo = () => axios.get(`/api/user`).then(res => res.data);

const fetchUser = () => axios.get(`/api/users`).then(res => res.data);

const logout = () => axios.get(`/api/user/logout`).then(res => res.data);

const fetchProjects = () => axios.get(`/api/project`).then(res => res.data);

const addProject = data =>
  axios
    .post(`/api/project`, data.payload)
    .then(res => res.data)
    .catch(err => err);

const editProject = (projectId, data) =>
  axios.post(`/api/project/${projectId}`, data).then(res => res.data);

const fetchTasks = projectId =>
  axios.get(`/api/task/${projectId}`).then(res => res.data);

const addTask = (projectId, data) =>
  axios.post(`/api/task/${projectId}`, data).then(res => res.data);

const editTask = (projectId, taskId, data) =>
  axios.post(`/api/task/${projectId}/${taskId}`, data).then(res => res.data);

const updateTimelog = (taskname, data) =>
  axios.post(`/api/task/${taskname}`, data).then(res => res.data);

const fetchPeople = () => axios.get(`/api/people`).then(res => res.data);

const addPeople = data =>
  axios.post(`/api/people`, data.payload).then(res => res.data);

const editPeople = (peopleId, data) =>
  axios.post(`/api/people/${peopleId}`, data).then(res => res.data);

const fetchProjectData = projectId =>
  axios.get(`/api/recentActivity/${projectId}`).then(res => res.data);

const fetchTimesheets = () => axios.get(`/api/timesheet`).then(res => res.data);

const addTimesheet = data =>
  axios.post(`/api/timesheet`, data.payload).then(res => res.data);

const editTimesheet = (timesheetIndex, timesheetId, data) =>
  axios
    .post(`/api/timesheet/${timesheetIndex}/${timesheetId}`, data)
    .then(res => res.data);

const fetchReports = () => axios.get(`/api/reports`).then(res => res.data);

export default {
  fetchProjects,
  addProject,
  editProject,
  fetchTasks,
  addTask,
  editTask,
  updateTimelog,
  fetchPeople,
  addPeople,
  editPeople,
  fetchTimesheets,
  fetchProjectData,
  addTimesheet,
  editTimesheet,
  register,
  login,
  userInfo,
  fetchUser,
  forgotPassword,
  resetPassword,
  logout,
  fetchReports
};
