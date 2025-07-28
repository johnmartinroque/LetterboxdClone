import {
  FETCH_DIRECTOR_DETAIL_FAIL,
  FETCH_DIRECTOR_DETAIL_REQUEST,
  FETCH_DIRECTOR_DETAIL_SUCCESS,
} from "../constants/directorConstants";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchDirectorDetail = (id) => async (dispatch) => {
  dispatch({ type: FETCH_DIRECTOR_DETAIL_REQUEST });

  try {
    const [infoRes, creditsRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`
      ),
    ]);

    if (!infoRes.ok || !creditsRes.ok) {
      throw new Error("Failed to fetch director details");
    }

    const info = await infoRes.json();
    const credits = await creditsRes.json();

    const directedMovies = credits.crew.filter(
      (movie) => movie.job === "Director"
    );

    dispatch({
      type: FETCH_DIRECTOR_DETAIL_SUCCESS,
      payload: {
        info,
        movies: directedMovies,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_DIRECTOR_DETAIL_FAIL,
      payload: error.message || "Something went wrong.",
    });
  }
};
