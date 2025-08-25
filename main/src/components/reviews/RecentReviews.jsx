import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentReviews } from "../../actions/reviewActions";
import { Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

function RecentReviews({ filmId, refreshTrigger, onLikeToggle }) {
  const dispatch = useDispatch();
  const { loading, reviews, error } = useSelector(
    (state) => state.recentReviews
  );

  const userId = auth.currentUser?.uid;

  const [likesState, setLikesState] = useState({}); // track if user liked
  const [likesCount, setLikesCount] = useState({}); // track total likes

  useEffect(() => {
    if (filmId) dispatch(fetchRecentReviews(filmId));
  }, [dispatch, filmId, refreshTrigger]);

  useEffect(() => {
    if (reviews.length > 0 && userId) {
      const state = {};
      const count = {};
      reviews.forEach((r) => {
        state[r.id] = r.likers?.includes(userId) || false;
        count[r.id] = r.likers?.length || 0;
      });
      setLikesState(state);
      setLikesCount(count);
    }
  }, [reviews, userId]);

  const toggleLike = async (reviewId) => {
    if (!userId) return alert("You must be logged in to like reviews");

    try {
      const reviewRef = doc(db, "reviews", reviewId);
      const isLiked = likesState[reviewId];

      if (isLiked) {
        await updateDoc(reviewRef, { likers: arrayRemove(userId) });
        setLikesCount((prev) => ({ ...prev, [reviewId]: prev[reviewId] - 1 }));
      } else {
        await updateDoc(reviewRef, { likers: arrayUnion(userId) });
        setLikesCount((prev) => ({ ...prev, [reviewId]: prev[reviewId] + 1 }));
      }

      setLikesState((prev) => ({ ...prev, [reviewId]: !isLiked }));
      onLikeToggle();
    } catch (err) {
      console.error("Error updating review like:", err);
    }
  };

  return (
    <div style={{ width: "50rem", minHeight: "20rem" }}>
      <h4>Recent Reviews</h4>
      {reviews.length > 0 && (
        <Link to={`/film/${filmId}/reviews`}>See More</Link>
      )}
      {loading ? (
        <Spinner animation="border" style={{ color: "white" }} />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet for this film.</p>
      ) : (
        <ul className="list-unstyled">
          {reviews.slice(0, 3).map((review) => (
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
                  <strong>
                    <Link
                      to={`/user/${review.userId}`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {review.username}
                    </Link>
                  </strong>
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
                          .toLocaleDateString("en-US") ?? "N/A"
                      }`
                    : `Watched on ${
                        review.createdAt
                          ?.toDate()
                          .toLocaleDateString("en-US") ?? "N/A"
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
                <Col className="text-start d-flex align-items-center gap-2">
                  <i
                    className="fa-solid fa-heart"
                    style={{
                      color: likesState[review.id] ? "#ff8000" : "#ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleLike(review.id)}
                  ></i>
                  {likesCount[review.id] || 0} likes
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentReviews;
