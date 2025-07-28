import {
  FETCH_DIRECTOR_DETAIL_FAIL,
  FETCH_DIRECTOR_DETAIL_REQUEST,
  FETCH_DIRECTOR_DETAIL_SUCCESS,
} from "../constants/directorConstants";

const directorInitialState = {
  info: null,
  movies: [],
  loading: false,
  error: null,
};

export const directorDetailReducer = (state = directorInitialState, action) => {
  switch (action.type) {
    case FETCH_DIRECTOR_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DIRECTOR_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        movies: action.payload.movies,
      };
    case FETCH_DIRECTOR_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
