import { fetchTasks, addTask, editTask, deleteTask } from '../routines';

const initialState = {
  data: [],
  loading: false,
  updating: false,
  error: null
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case fetchTasks.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchTasks.FULFILL:
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
