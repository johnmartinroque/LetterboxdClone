import { doc, getDoc } from "firebase/firestore";
import {
  NEWLIST_SEARCH_FILMS_REQUEST,
  NEWLIST_SEARCH_FILMS_SUCCESS,
  NEWLIST_SEARCH_FILMS_FAIL,
  NEWLIST_ADD_FILM,
  NEWLIST_REMOVE_FILM,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
} from "../constants/listConstants";
import { db } from "../firebase";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const searchFilmsNewList = (query) => async (dispatch) => {
  dispatch({ type: NEWLIST_SEARCH_FILMS_REQUEST });

  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US`
    );

    if (!searchRes.ok) throw new Error("Failed to search films");

    const searchData = await searchRes.json();

    // Fetch directors for each movie
    const filmsWithDirector = await Promise.all(
      searchData.results.map(async (film) => {
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${TMDB_API_KEY}`
        );

        if (!creditsRes.ok) return { ...film, director: "Unknown" };

        const creditsData = await creditsRes.json();
        const director = creditsData.crew.find((p) => p.job === "Director");

        return {
          ...film,
          director: director ? director.name : "Unknown",
        };
      })
    );

    dispatch({
      type: NEWLIST_SEARCH_FILMS_SUCCESS,
      payload: filmsWithDirector,
    });
  } catch (error) {
    dispatch({
      type: NEWLIST_SEARCH_FILMS_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};

export const addFilmToNewList = (film) => ({
  type: NEWLIST_ADD_FILM,
  payload: film,
});

export const removeFilmFromNewList = (filmId) => ({
  type: NEWLIST_REMOVE_FILM,
  payload: filmId,
});

export const fetchListDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_DETAILS_REQUEST });

    const docRef = doc(db, "lists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({
        type: LIST_DETAILS_SUCCESS,
        payload: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      throw new Error("List not found");
    }
  } catch (error) {
    dispatch({
      type: LIST_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
