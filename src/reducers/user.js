import {
  register,
  login,
  userInfo,
  forgotPassword,
  resetPassword,
  logout
} from '../routines';

const initialState = {
  data: {},
  userData: [],
  loading: true,
  loginCIP: false,
  registerCIP: false,
  error: null
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case register.TRIGGER:
      return {
        ...state,
        registerCIP: true
      };
    case register.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case register.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case register.FULFILL:
      return {
        ...state,
        registerCIP: false
      };
    case login.TRIGGER:
      return {
        ...state,
        loginCIP: true
      };
    case login.FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case login.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case login.FULFILL:
      return {
        ...state,
        loginCIP: false
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
