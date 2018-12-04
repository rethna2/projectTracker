import {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
  fetchTaskData
} from '../routines';

const initialState = {
  list: null,
  data: null,
  loadingList: false,
  loading: false,
  updating: false,
  error: null
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case fetchTasks.TRIGGER:
      return {
        ...state,
        loadingList: true
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchTasks.FULFILL:
      return {
        ...state,
        loadingList: false
      };
    case fetchTaskData.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchTaskData.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchTaskData.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchTaskData.FULFILL:
      return {
        ...state,
        loading: false
      };
    case addTask.TRIGGER:
    case editTask.TRIGGER:
    case deleteTask.TRIGGER:
      return {
        ...state,
        updating: true
      };
    case addTask.FULFILL:
    case editTask.FULFILL:
    case deleteTask.FULFILL:
      return {
        ...state,
        updating: false
      };
    default:
      return state;
  }
}
