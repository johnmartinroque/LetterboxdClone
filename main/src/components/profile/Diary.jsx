import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import "../../css/Diary.css";

function Diary() {
  const { uid } = useParams(); // userId from URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        if (!uid) return;

        const q = query(
          collection(db, "reviews"),
          where("userId", "==", uid),
          where("addDiary", "==", true)
        );

        const querySnap = await getDocs(q);
        const data = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(data);
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
                    {review.filmTitle || review.filmId}
                  </td>
                  <td className="released-column">
                    {review.released || "N/A"}
                  </td>
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
