import {
  fetchMyTimesheets,
  fetchMyReviewTimesheets,
  generateTimesheet,
  editTimesheet,
  deleteTimesheet,
  reviewTimesheet
} from '../routines';

const initialState = {
  list: [],
  reviewList: [],
  loading: false,
  loadingReview: false,
  updating: false,
  error: null
};

export default function timesheetReducer(state = initialState, action) {
  switch (action.type) {
    case fetchMyTimesheets.TRIGGER:
      return { ...state, loading: true };
    case fetchMyTimesheets.SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case fetchMyTimesheets.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchMyTimesheets.FULFILL:
      return {
        ...state,
        loading: false
      };
    case fetchMyReviewTimesheets.TRIGGER:
      return { ...state, loadingReview: true };
    case fetchMyReviewTimesheets.SUCCESS:
      return {
        ...state,
        reviewList: action.payload
      };
    case fetchMyReviewTimesheets.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchMyReviewTimesheets.FULFILL:
      return {
        ...state,
        loadingReview: false
      };
    case generateTimesheet.TRIGGER:
    case editTimesheet.TRIGGER:
    case deleteTimesheet.TRIGGER:
    case reviewTimesheet.TRIGGER:
      return { ...state, updating: true };
    case generateTimesheet.FAILURE:
    case editTimesheet.FAILURE:
    case deleteTimesheet.FAILURE:
    case reviewTimesheet.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case generateTimesheet.FULFILL:
    case editTimesheet.FULFILL:
    case deleteTimesheet.FULFILL:
    case reviewTimesheet.FULFILL:
      return {
        ...state,
        updating: false
      };
    default:
      return state;
  }
}
