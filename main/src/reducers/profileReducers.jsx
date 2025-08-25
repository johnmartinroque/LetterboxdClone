import {
  DIARY_FAIL,
  DIARY_REQUEST,
  DIARY_SUCCESS,
  WATCHLIST_FAIL,
  WATCHLIST_REQUEST,
  WATCHLIST_SUCCESS,
} from "../constants/profileConstants";

export const diaryReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case DIARY_REQUEST:
      return { loading: true, reviews: [] };
    case DIARY_SUCCESS:
      return { loading: false, reviews: action.payload };
    case DIARY_FAIL:
      return { loading: false, error: action.payload, reviews: [] };
    default:
      return state;
  }
};

export const watchlistReducer = (state = { films: [] }, action) => {
  switch (action.type) {
    case WATCHLIST_REQUEST:
      return { loading: true, films: [] };
    case WATCHLIST_SUCCESS:
      return { loading: false, films: action.payload };
    case WATCHLIST_FAIL:
      return { loading: false, error: action.payload, films: [] };
    default:
      return state;
  }
};
