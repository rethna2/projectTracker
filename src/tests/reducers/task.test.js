import task from '../../reducers/task';

const initialState = {
  list: null,
  data: null,
  loadingList: false,
  loading: false,
  updating: false,
  deleting: false,
  error: null
};

describe('task reducer', () => {
  it('should return the initial state', () => {
    expect(task(undefined, {})).toEqual(initialState);
  });
});
