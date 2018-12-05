import {
  register,
  login,
  userInfo,
  forgotPassword,
  resetPassword,
  logout,
  fetchUser
} from '../routines';

const initialState = {
  data: {},
  userData: [],
  loading: true,
  loginState: false,
  error: null
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case register.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case register.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case login.TRIGGER:
      return {
        ...state,
        loading: true,
        loginState: false
      };
    case login.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case login.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loginState: true
      };
    case login.FULFILL:
      return {
        ...state,
        loginState: true,
        loading: false
      };
    case forgotPassword.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case forgotPassword.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case resetPassword.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case resetPassword.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case userInfo.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case userInfo.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case userInfo.FULFILL:
      return {
        ...state,
        loading: false
      };
    case fetchUser.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case fetchUser.SUCCESS:
      return {
        ...state,
        userData: action.payload
      };
    case logout.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case logout.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
