import { doc, getDoc } from "firebase/firestore";
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
import { db } from "../firebase";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchTrendingFilms = () => async (dispatch) => {
  dispatch({ type: FETCH_TRENDING_REQUEST });

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();

    dispatch({ type: FETCH_TRENDING_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: FETCH_TRENDING_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};

export const fetchFilmDetail = (id) => async (dispatch) => {
  dispatch({ type: FETCH_FILM_DETAIL_REQUEST });

  try {
    const [detailRes, creditsRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
      ),
    ]);

    if (!detailRes.ok || !creditsRes.ok) {
      throw new Error("Failed to fetch film details.");
    }

    const detail = await detailRes.json();
    const credits = await creditsRes.json();

    dispatch({
      type: FETCH_FILM_DETAIL_SUCCESS,
      payload: { detail, credits },
    });
  } catch (error) {
    dispatch({
      type: FETCH_FILM_DETAIL_FAIL,
      payload: error.message || "Something went wrong.",
    });
  }
};

export const searchFilms = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_FILMS_REQUEST });

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
      type: SEARCH_FILMS_SUCCESS,
      payload: filmsWithDirector,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_FILMS_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};

export const fetchFavoriteFilms = (uid) => async (dispatch) => {
  dispatch({ type: FETCH_FAVORITE_FILMS_REQUEST });
  try {
    const profileRef = doc(db, "profile", uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      throw new Error("Profile not found");
    }

    const data = profileSnap.data();
    dispatch({
      type: FETCH_FAVORITE_FILMS_SUCCESS,
      payload: data.favoriteFilms || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_FAVORITE_FILMS_FAIL,
      payload: error.message || "Failed to fetch favorite films",
    });
  }
};
