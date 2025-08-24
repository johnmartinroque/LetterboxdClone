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
} from "../constants/reviewConstans";

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
