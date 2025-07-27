import {
  FETCH_ACTOR_DETAIL_FAIL,
  FETCH_ACTOR_DETAIL_REQUEST,
  FETCH_ACTOR_DETAIL_SUCCESS,
} from "../constants/actorConstants";

const actorInitialState = {
  info: null,
  movies: [],
  loading: false,
  error: null,
};

export const actorDetailReducer = (state = actorInitialState, action) => {
  switch (action.type) {
    case FETCH_ACTOR_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ACTOR_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        movies: action.payload.movies,
      };
    case FETCH_ACTOR_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
