import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  NEWLIST_SEARCH_FILMS_REQUEST,
  NEWLIST_SEARCH_FILMS_SUCCESS,
  NEWLIST_SEARCH_FILMS_FAIL,
  NEWLIST_ADD_FILM,
  NEWLIST_REMOVE_FILM,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  FEATURED_LISTS_REQUEST,
  FEATURED_LISTS_SUCCESS,
  FEATURED_LISTS_FAIL,
} from "../constants/listConstants";
import { db } from "../firebase";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchFeaturedLists = () => async (dispatch) => {
  try {
    dispatch({ type: FEATURED_LISTS_REQUEST });

    const q = query(collection(db, "lists"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const listsData = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const list = { id: doc.id, ...doc.data() };

        // Fetch poster paths for films
        const filmsWithPosters = await Promise.all(
          (list.films || []).map(async (film) => {
            try {
              const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
                  film.title
                )}`
              );
              const data = await res.json();
              const movie = data.results?.[0];

              return {
                ...film,
                posterPath: movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null,
              };
            } catch (err) {
              console.error("Poster fetch error for", film.title, err);
              return { ...film, posterPath: null };
            }
          })
        );

        return { ...list, films: filmsWithPosters };
      })
    );

    dispatch({
      type: FEATURED_LISTS_SUCCESS,
      payload: listsData,
    });
  } catch (error) {
    dispatch({
      type: FEATURED_LISTS_FAIL,
      payload: error.message,
    });
  }
};

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

export const fetchListDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_DETAILS_REQUEST });

    const docRef = doc(db, "lists", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("List not found");
    }

    const data = docSnap.data();

    // Fetch poster path for each film using fetch instead of axios
    const filmsWithPosters = await Promise.all(
      (data.films || []).map(async (film) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
              film.title
            )}`
          );
          const result = await response.json();
          const movie = result.results?.[0];

          return {
            ...film,
            posterPath: movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null,
          };
        } catch (err) {
          console.error(`Failed to fetch poster for ${film.title}:`, err);
          return { ...film, posterPath: null };
        }
      })
    );

    // Get the backdrop photo for the first movie in the array, if exists
    let firstMovieBackdrop = null;
    if (data.films && data.films.length > 0) {
      try {
        const firstFilmTitle = data.films[0].title;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            firstFilmTitle
          )}`
        );
        const result = await response.json();
        const firstMovie = result.results?.[0];
        if (firstMovie?.backdrop_path) {
          firstMovieBackdrop = `https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`;
        }
      } catch (err) {
        console.error("Failed to fetch backdrop for first movie:", err);
      }
    }

    dispatch({
      type: LIST_DETAILS_SUCCESS,
      payload: {
        id: docSnap.id,
        ...data,
        films: filmsWithPosters,
        firstMovieBackdrop,
      },
    });
  } catch (error) {
    dispatch({
      type: LIST_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
