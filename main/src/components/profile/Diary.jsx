import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import "../../css/Diary.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Diary() {
  const { uid } = useParams(); // userId from URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        if (!uid) return;

        // get reviews with addDiary = true
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

        // fetch film details from TMDB
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
              console.error("Error fetching movie:", err);
              return review; // fallback
            }
          })
        );

        setReviews(enrichedReviews);
      } catch (error) {
        console.error("Error fetching diary reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [uid]);

  return (
    <div>
      <h4>User Diary</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="month-column">MONTH</th>
            <th className="day-column">DAY</th>
            <th className="film-column">FILM</th>
            <th className="released-column">RELEASED</th>
            <th className="rating-column">RATING</th>
            <th className="like-column">LIKE</th>
            <th className="rewatch-column">REWATCH</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : reviews.length === 0 ? (
            <tr>
              <td colSpan="7">No diary entries found.</td>
            </tr>
          ) : (
            reviews.map((review) => {
              const date = review.createdAt?.toDate
                ? review.createdAt.toDate()
                : null;
              const month = date
                ? date.toLocaleString("default", { month: "long" })
                : "N/A";
              const day = date ? date.getDate() : "N/A";

              return (
                <tr key={review.id}>
                  <td className="month-column">
                    {month} {date?.getFullYear()}
                  </td>
                  <td className="day-column">{day}</td>
                  <td className="film-column">
                    {review.filmPoster && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${review.filmPoster}`}
                        alt={review.filmTitle}
                        style={{
                          width: "40px",
                          marginRight: "8px",
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                    {review.filmTitle || review.filmId}
                  </td>
                  <td className="released-column">{review.released}</td>
                  <td className="rating-column">
                    {[...Array(Math.floor(review.rating || 0))].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                    {review.rating % 1 !== 0 && (
                      <i className="fa-solid fa-star-half-stroke"></i>
                    )}
                  </td>
                  <td className="like-column">
                    {review.likes > 0 && (
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td className="rewatch-column">
                    {review.watchedBefore && (
                      <i className="fa-solid fa-repeat"></i>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Diary;
