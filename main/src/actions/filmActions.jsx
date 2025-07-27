import {
  FETCH_TRENDING_REQUEST,
  FETCH_TRENDING_SUCCESS,
  FETCH_TRENDING_FAIL,
} from "../constants/filmConstants";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchTrendingFilms = () => async (dispatch) => {
  dispatch({ type: FETCH_TRENDING_REQUEST });

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();

    dispatch({ type: FETCH_TRENDING_SUCCESS, payload: data.results });
    console.log("Fetched films:", data.results);
  } catch (error) {
    dispatch({
      type: FETCH_TRENDING_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};
