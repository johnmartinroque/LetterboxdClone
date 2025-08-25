import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { fetchUserReviews } from "../../actions/reviewActions";

function UserReviews() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const { loading, reviews, error } = useSelector((state) => state.userReviews);

  useEffect(() => {
    if (uid) dispatch(fetchUserReviews(uid));
  }, [dispatch, uid]);

  return (
    <div>
      <h3>User Reviews</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map((review) => (
            <li
              key={review.id}
              style={{
                borderTop: "1px solid #ffff",
                paddingTop: "10px",
                marginTop: "10px",
              }}
            >
              <Row>
                <Col className="d-flex text-start gap-2 align-items-center">
                  {review.filmPoster && (
                    <Link to={`/film/${review.filmId}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w92${review.filmPoster}`}
                        alt={review.filmTitle}
                        style={{
                          width: "50px",
                          marginRight: "10px",
                          borderRadius: "4px",
                        }}
                      />
                    </Link>
                  )}
                  <div>
                    <div>
                      <span>Review by </span>
                      <Link to={`/user/${review.userId}`}>
                        {review.username}
                      </Link>
                    </div>
                    <div>
                      <Link to={`/film/${review.filmId}`}>
                        <strong>{review.filmTitle || review.filmId}</strong>
                      </Link>{" "}
                      ({review.released})
                    </div>
                    <Rating
                      readonly
                      allowFraction
                      initialValue={review.rating}
                      size={20}
                      fillColor="#ffe601ff"
                      emptyColor="#ccc"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="text-start">
                  {review.watchedBefore
                    ? `Rewatched on ${
                        review.createdAt?.toDate().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) ?? "N/A"
                      }`
                    : `Watched on ${
                        review.createdAt?.toDate().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) ?? "N/A"
                      }`}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="text-start">
                  <strong
                    style={{
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "100%",
                      display: "inline-block",
                    }}
                  >
                    {review.reviewText}
                  </strong>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="text-start">
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: "#ff8000" }}
                  ></i>{" "}
                  {review.likers?.length || 0} likes
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserReviews;
