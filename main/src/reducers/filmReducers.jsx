import {
  FETCH_TRENDING_REQUEST,
  FETCH_TRENDING_SUCCESS,
  FETCH_TRENDING_FAIL,
  FETCH_FILM_DETAIL_REQUEST,
  FETCH_FILM_DETAIL_SUCCESS,
  FETCH_FILM_DETAIL_FAIL,
  SEARCH_FILMS_REQUEST,
  SEARCH_FILMS_SUCCESS,
  SEARCH_FILMS_FAIL,
  FETCH_FAVORITE_FILMS_REQUEST,
  FETCH_FAVORITE_FILMS_SUCCESS,
  FETCH_FAVORITE_FILMS_FAIL,
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

export const searchFilmsReducer = (state = { films: [] }, action) => {
  switch (action.type) {
    case SEARCH_FILMS_REQUEST:
      return { loading: true, films: [] };
    case SEARCH_FILMS_SUCCESS:
      return { loading: false, films: action.payload };
    case SEARCH_FILMS_FAIL:
      return { loading: false, error: action.payload, films: [] };
    default:
      return state;
  }
};

export const favoriteFilmsReducer = (
  state = { loading: false, favoriteFilms: [], error: null },
  action
) => {
  switch (action.type) {
    case FETCH_FAVORITE_FILMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FAVORITE_FILMS_SUCCESS:
      return { loading: false, favoriteFilms: action.payload, error: null };
    case FETCH_FAVORITE_FILMS_FAIL:
      return { loading: false, favoriteFilms: [], error: action.payload };
    default:
      return state;
  }
};
