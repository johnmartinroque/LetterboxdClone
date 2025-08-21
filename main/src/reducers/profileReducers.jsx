import {
  DIARY_FAIL,
  DIARY_REQUEST,
  DIARY_SUCCESS,
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
