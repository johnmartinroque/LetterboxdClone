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
  RATINGS_REQUEST,
  RATINGS_SUCCESS,
  RATINGS_FAIL,
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
