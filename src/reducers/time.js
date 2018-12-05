import {
  fetchProjectTime,
  fetchTaskTime,
  logTime,
  editTime,
  deleteTime
} from '../routines';

const initialState = {
  data: null, //will be used to store projectTime or taskTime
  loading: false,
  updating: false,
  error: null
};

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case logTime.TRIGGER:
    case editTime.TRIGGER:
    case deleteTime.TRIGGER:
      return {
        ...state,
        updating: true
      };
    case logTime.FAILURE:
    case editTime.FAILURE:
    case deleteTime.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case logTime.FULFILL:
    case editTime.FULFILL:
    case deleteTime.FULFILL:
      return {
        ...state,
        updating: false
      };
    case fetchProjectTime.TRIGGER:
    case fetchTaskTime.TRIGGER:
      return {
        ...state,
        loading: true,
        data: null
      };
    case fetchProjectTime.SUCCESS:
    case fetchTaskTime.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case fetchProjectTime.FAILURE:
    case fetchTaskTime.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchProjectTime.FULFILL:
    case fetchTaskTime.FULFILL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
