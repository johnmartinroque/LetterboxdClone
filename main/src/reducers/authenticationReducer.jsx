import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_RESET,
  USER_LOGOUT,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
} from "../constants/authenticationConstants";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const userSignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_SIGNIN_RESET:
    case USER_LOGOUT:
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

const userInitialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userInfoReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_INFO_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
