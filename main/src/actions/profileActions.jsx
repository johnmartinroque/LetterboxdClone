import {
  DIARY_FAIL,
  DIARY_REQUEST,
  DIARY_SUCCESS,
  WATCHLIST_FAIL,
  WATCHLIST_REQUEST,
  WATCHLIST_SUCCESS,
} from "../constants/profileConstants";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchDiary = (uid) => async (dispatch) => {
  try {
    dispatch({ type: DIARY_REQUEST });

    // Get reviews with addDiary = true
    const q = query(
      collection(db, "reviews"),
      where("userId", "==", uid),
      where("addDiary", "==", true)
    );
    const querySnap = await getDocs(q);
    const rawReviews = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch TMDB details
    const enrichedReviews = await Promise.all(
      rawReviews.map(async (review) => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${review.filmId}?api_key=${TMDB_API_KEY}&language=en-US`
          );
          const movie = await res.json();
          return {
            ...review,
            filmTitle: movie.title,
            filmPoster: movie.poster_path,
            released: movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A",
          };
        } catch (err) {
          console.error("TMDB fetch error:", err);
          return review;
        }
      })
    );

    dispatch({ type: DIARY_SUCCESS, payload: enrichedReviews });
  } catch (error) {
    dispatch({
      type: DIARY_FAIL,
      payload: error.message || "Failed to fetch diary reviews",
    });
  }
};

export const fetchWatchlist = (uid) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLIST_REQUEST });

    // ✅ Correct collection is "statistics"
    const q = query(
      collection(db, "statistics"),
      where("watchlist", "array-contains", uid)
    );
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      dispatch({ type: WATCHLIST_SUCCESS, payload: [] });
      return;
    }

    const rawFilms = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Enrich with TMDB data
    const enrichedFilms = await Promise.all(
      rawFilms.map(async (film) => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${film.filmId}?api_key=${TMDB_API_KEY}&language=en-US`
          );
          const movie = await res.json();

          return {
            ...film,
            filmTitle: movie.title,
            filmPoster: movie.poster_path,
            released: movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A",
          };
        } catch (err) {
          console.error("TMDB fetch error:", err);
          return film;
        }
      })
    );

    dispatch({ type: WATCHLIST_SUCCESS, payload: enrichedFilms });
  } catch (error) {
    dispatch({
      type: WATCHLIST_FAIL,
      payload: error.message || "Failed to fetch watchlist",
    });
  }
};
