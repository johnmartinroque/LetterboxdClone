import React, { useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecentReviews } from "../../actions/reviewActions";

function FilmReviews() {
  const { id: filmId } = useParams();
  const dispatch = useDispatch();
  const { loading, reviews, error } = useSelector(
    (state) => state.recentReviews
  );

  useEffect(() => {
    if (filmId) {
      dispatch(fetchRecentReviews(filmId));
    }
  }, [dispatch, filmId]);

  if (loading) return <Spinner animation="border" style={{ color: "white" }} />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews yet for this film.</p>;

  return (
    <div style={{ width: "50rem", color: "white" }}>
      <h3>All Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            borderTop: "1px solid #fff",
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
              <strong>{review.reviewText}</strong>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="text-start">
              <i className="fa-solid fa-heart" style={{ color: "#ff8000" }}></i>{" "}
              {review.likes} likes
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default FilmReviews;
