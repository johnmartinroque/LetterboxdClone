import {
  NEWLIST_SEARCH_FILMS_REQUEST,
  NEWLIST_SEARCH_FILMS_SUCCESS,
  NEWLIST_SEARCH_FILMS_FAIL,
  NEWLIST_ADD_FILM,
  NEWLIST_REMOVE_FILM,
} from "../constants/listConstants";

export const searchFilmsNewListReducer = (state = { films: [] }, action) => {
  switch (action.type) {
    case NEWLIST_SEARCH_FILMS_REQUEST:
      return { loading: true, films: [] };
    case NEWLIST_SEARCH_FILMS_SUCCESS:
      return { loading: false, films: action.payload };
    case NEWLIST_SEARCH_FILMS_FAIL:
      return { loading: false, error: action.payload, films: [] };
    default:
      return state;
  }
};

export const newListSelectedFilmsReducer = (
  state = { selected: [] },
  action
) => {
  switch (action.type) {
    case NEWLIST_ADD_FILM:
      // Prevent duplicates
      if (state.selected.find((f) => f.id === action.payload.id)) {
        return state;
      }
      return { ...state, selected: [...state.selected, action.payload] };

    case NEWLIST_REMOVE_FILM:
      return {
        ...state,
        selected: state.selected.filter((film) => film.id !== action.payload),
      };

    default:
      return state;
  }
};
