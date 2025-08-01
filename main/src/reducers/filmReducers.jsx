import {
  FETCH_TRENDING_REQUEST,
  FETCH_TRENDING_SUCCESS,
  FETCH_TRENDING_FAIL,
  FETCH_FILM_DETAIL_REQUEST,
  FETCH_FILM_DETAIL_SUCCESS,
  FETCH_FILM_DETAIL_FAIL,
} from "../constants/filmConstants";

const initialState = {
  films: [], // ✅ ensure films is an array
  loading: false,
  error: null,
};

export const filmTrendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDING_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRENDING_SUCCESS:
      return { ...state, loading: false, films: action.payload };
    case FETCH_TRENDING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const detailInitialState = {
  detail: null,
  credits: null,
  loading: false,
  error: null,
};

export const filmDetailReducer = (state = detailInitialState, action) => {
  switch (action.type) {
    case FETCH_FILM_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FILM_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.detail,
        credits: action.payload.credits,
      };
    case FETCH_FILM_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
