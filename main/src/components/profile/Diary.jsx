import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Diary.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiary } from "../../actions/profileActions";

function Diary() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const { loading, reviews, error } = useSelector((state) => state.diary);

  useEffect(() => {
    if (uid) dispatch(fetchDiary(uid));
  }, [dispatch, uid]);

  return (
    <div>
      <h4>User Diary</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MONTH</th>
            <th>DAY</th>
            <th>FILM</th>
            <th>RELEASED</th>
            <th>RATING</th>
            <th>LIKE</th>
            <th>REWATCH</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" style={{ color: "red" }}>
                {error}
              </td>
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
                  <td>
                    {month} {date?.getFullYear()}
                  </td>
                  <td>{day}</td>
                  <td>
                    <Link to={`/user/${review.userId}/film/${review.filmId}`}>
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
                    </Link>
                    <Link to={`/user/${review.userId}/`}>
                      {review.filmTitle || review.filmId}
                    </Link>
                  </td>
                  <td>{review.released}</td>
                  <td>
                    {[...Array(Math.floor(review.rating || 0))].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                    {review.rating % 1 !== 0 && (
                      <i className="fa-solid fa-star-half-stroke"></i>
                    )}
                  </td>
                  <td>
                    {review.likes > 0 && (
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {review.watchedBefore && (
                      <i className="fa-solid fa-repeat"></i>
                    )}
                  </td>
                  <td></td>
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
