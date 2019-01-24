import timesheet from '../../reducers/timesheet';

const initialState = {
  list: [],
  reviewList: [],
  loading: false,
  loadingReview: false,
  updating: false,
  error: null
};

describe('timesheet reducer', () => {
  it('should return the initial state', () => {
    expect(timesheet(undefined, {})).toEqual(initialState);
  });
});
