import {
  fetchMyTimesheets,
  fetchMyReviewTimesheets,
  generateTimesheet,
  editTimesheet,
  deleteTimesheet,
  reviewTimesheet
} from '../routines';

const initialState = {
  timesheet: [],
  timesheetReview: [],
  loading: false,
  loadingReview: false,
  error: null
};

export default function timesheetReducer(state = initialState, action) {
  switch (action.type) {
    case fetchMyTimesheets.TRIGGER:
      return { ...state, loading: true };
    case fetchMyTimesheets.SUCCESS:
      return {
        ...state,
        timesheet: action.payload
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
        timesheetReview: action.payload
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
    default:
      return state;
  }
}
