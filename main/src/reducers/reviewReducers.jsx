import {
  RECENT_REVIEWS_FAIL,
  RECENT_REVIEWS_REQUEST,
  RECENT_REVIEWS_SUCCESS,
} from "../constants/reviewConstans";

export const recentReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case RECENT_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };

    case RECENT_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };

    case RECENT_REVIEWS_FAIL:
      return { loading: false, error: action.payload, reviews: [] };

    default:
      return state;
  }
};
