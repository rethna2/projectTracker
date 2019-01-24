import project from '../../reducers/project';

let initialState = {
  list: null,
  data: null,
  loadingList: false,
  loading: false,
  updating: false,
  deleting: false,
  error: null
};

describe('project reducer', () => {
  it('should return the initial state', () => {
    expect(project(undefined, {})).toEqual(initialState);
  });
});
