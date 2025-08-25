import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  RECENT_REVIEWS_FAIL,
  RECENT_REVIEWS_REQUEST,
  RECENT_REVIEWS_SUCCESS,
  POPULAR_REVIEWS_REQUEST,
  POPULAR_REVIEWS_SUCCESS,
  POPULAR_REVIEWS_FAIL,
  USER_REVIEWS_REQUEST,
  USER_REVIEWS_SUCCESS,
  USER_REVIEWS_FAIL,
} from "../constants/reviewConstans";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchRecentReviews = (filmId) => async (dispatch) => {
  try {
    dispatch({ type: RECENT_REVIEWS_REQUEST });

    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("filmId", "==", filmId),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);
    const reviewsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: RECENT_REVIEWS_SUCCESS,
      payload: reviewsData,
    });
  } catch (error) {
    dispatch({
      type: RECENT_REVIEWS_FAIL,
      payload: error.message || "Error fetching recent reviews",
    });
  }
};

export const fetchPopularReviews = (filmId) => async (dispatch) => {
  try {
    dispatch({ type: POPULAR_REVIEWS_REQUEST });

    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("filmId", "==", filmId),
      limit(10) // Remove orderBy for now
    );

    const snapshot = await getDocs(q);

    // Map docs and add likes count based on likers array length
    const reviewsData = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        likes: data.likers?.length || 0, // add likes property here
      };
    });

    // Sort reviews descending by likes on client
    reviewsData.sort((a, b) => b.likes - a.likes);

    dispatch({
      type: POPULAR_REVIEWS_SUCCESS,
      payload: reviewsData,
    });
  } catch (error) {
    dispatch({
      type: POPULAR_REVIEWS_FAIL,
      payload: error.message || "Error fetching popular reviews",
    });
  }
};

export const fetchUserReviews = (uid) => async (dispatch) => {
  try {
    dispatch({ type: USER_REVIEWS_REQUEST });

    const q = query(collection(db, "reviews"), where("userId", "==", uid));
    const querySnap = await getDocs(q);

    const rawReviews = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Enrich with TMDB details
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

    dispatch({ type: USER_REVIEWS_SUCCESS, payload: enrichedReviews });
  } catch (error) {
    dispatch({
      type: USER_REVIEWS_FAIL,
      payload: error.message || "Failed to fetch user reviews",
    });
  }
};
