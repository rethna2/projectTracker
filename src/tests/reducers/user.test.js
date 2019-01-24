import user from '../../reducers/user';

const initialState = {
  data: {},
  userData: [],
  loading: true,
  loginCIP: false,
  registerCIP: false,
  error: null
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });
});
