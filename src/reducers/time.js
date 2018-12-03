import { fetchTasks, addTask, editTask, logTime } from '../routines';

const initialState = {
  data: [],
  loading: false,
  updating: false,
  error: null
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case logTime.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case logTime.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case logTime.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case logTime.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
