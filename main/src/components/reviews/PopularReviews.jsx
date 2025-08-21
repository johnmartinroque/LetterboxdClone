import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchPopularReviews } from "../../actions/reviewActions";

function PopularReviews({ filmId }) {
  const dispatch = useDispatch();

  const { loading, reviews, error } = useSelector(
    (state) => state.popularReviews
  );

  useEffect(() => {
    if (filmId) {
      dispatch(fetchPopularReviews(filmId));
    }
  }, [dispatch, filmId]);

  useEffect(() => {
    if (filmId) {
      console.log("Dispatching fetchPopularReviews for filmId:", filmId);
      dispatch(fetchPopularReviews(filmId));
    }
  }, [dispatch, filmId]);

  return (
    <div style={{ width: "50rem", minHeight: "10rem" }}>
      <h4>Popular Reviews</h4>
      {reviews.length > 0 && (
        <Link to={`/film/${filmId}/reviews`}>See More</Link>
      )}
      {loading ? (
        <Spinner animation="border" style={{ color: "white" }} />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reviews.length === 0 ? (
        <p>No popular reviews yet for this film.</p>
      ) : (
        <ul className="list-unstyled">
          {reviews
            .sort((a, b) => b.likes - a.likes) // Sort by likes descending
            .slice(0, 3) // Only show top 3
            .map((review) => (
              <li
                key={review.id}
                style={{
                  borderTop: "1px solid #ffff",
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <Row>
                  <Col className="d-flex text-start gap-2">
                    <span>Review by</span>
                    <strong>{review.username}</strong>
                    <Rating
                      readonly
                      allowFraction
                      initialValue={review.rating}
                      size={20}
                      fillColor="#ffe601ff"
                      emptyColor="#ccc"
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col className="text-start">
                    {review.watchedBefore
                      ? `Rewatched on ${
                          review.createdAt
                            ?.toDate()
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }) ?? "N/A"
                        }`
                      : `Watched on ${
                          review.createdAt
                            ?.toDate()
                            .toLocaleDateString("en-US", {
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
                    {review.likes} likes
                  </Col>
                </Row>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default PopularReviews;
