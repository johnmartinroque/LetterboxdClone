import {
  NEWLIST_SEARCH_FILMS_REQUEST,
  NEWLIST_SEARCH_FILMS_SUCCESS,
  NEWLIST_SEARCH_FILMS_FAIL,
  NEWLIST_ADD_FILM,
  NEWLIST_REMOVE_FILM,
} from "../constants/listConstants";

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
