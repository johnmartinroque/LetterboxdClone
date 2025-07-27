import {
  FETCH_TRENDING_REQUEST,
  FETCH_TRENDING_SUCCESS,
  FETCH_TRENDING_FAIL,
  FETCH_FILM_DETAIL_REQUEST,
  FETCH_FILM_DETAIL_SUCCESS,
  FETCH_FILM_DETAIL_FAIL,
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
