import time from '../../reducers/time';

const initialState = {
  data: null, //will be used to store projectTime or taskTime
  loading: false,
  updating: false,
  deleting: false,
  error: null
};

describe('time reducer', () => {
  it('should return the initial state', () => {
    expect(time(undefined, {})).toEqual(initialState);
  });
});
