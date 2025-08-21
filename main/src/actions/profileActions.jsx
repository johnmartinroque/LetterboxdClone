import {
  DIARY_FAIL,
  DIARY_REQUEST,
  DIARY_SUCCESS,
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
