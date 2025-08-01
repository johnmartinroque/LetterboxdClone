import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_RESET,
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
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};
