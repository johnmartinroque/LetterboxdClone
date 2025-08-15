import {
  NEWLIST_SEARCH_FILMS_REQUEST,
  NEWLIST_SEARCH_FILMS_SUCCESS,
  NEWLIST_SEARCH_FILMS_FAIL,
  NEWLIST_ADD_FILM,
  NEWLIST_REMOVE_FILM,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  FEATURED_LISTS_REQUEST,
  FEATURED_LISTS_SUCCESS,
  FEATURED_LISTS_FAIL,
} from "../constants/listConstants";

export const featuredListsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case FEATURED_LISTS_REQUEST:
      return { loading: true, lists: [] };
    case FEATURED_LISTS_SUCCESS:
      return { loading: false, lists: action.payload };
    case FEATURED_LISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
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

export const listDetailsReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case LIST_DETAILS_REQUEST:
      return { loading: true, list: {} }; // <-- Clear the old list
    case LIST_DETAILS_SUCCESS:
      return { loading: false, list: action.payload };
    case LIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
