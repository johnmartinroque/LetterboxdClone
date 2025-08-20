import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function RecentActivity() {
  const { uid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        setError("");

        // reviews collection should have userId saved when user posts review
        const reviewsRef = collection(db, "reviews");
        const q = query(
          reviewsRef,
          where("userId", "==", uid),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setReviews(data);
      } catch (err) {
        console.error("Error fetching user reviews:", err);
        setError("Failed to load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [uid]);

  if (loading) return <Spinner animation="border" style={{ color: "white" }} />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0)
    return <p style={{ color: "#ccc" }}>No recent activity.</p>;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4 style={{ color: "white" }}>Recent Activity</h4>
      <ul className="list-unstyled">
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
              <Col className="d-flex text-start gap-2">
                <span>Reviewed</span>
                <Link to={`/film/${review.filmId}`} style={{ color: "#0af" }}>
                  <strong>{review.title}</strong>
                </Link>
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

            {/* Review date */}
            <Row className="mb-2">
              <Col className="text-start">
                {review.createdAt?.toDate
                  ? review.createdAt.toDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </Col>
            </Row>

            {/* Review text */}
            {review.reviewText && (
              <Row className="mb-2">
                <Col className="text-start">
                  <span>{review.reviewText}</span>
                </Col>
              </Row>
            )}

            {/* Likes */}
            <Row>
              <Col className="text-start">
                <i
                  className="fa-solid fa-heart"
                  style={{ color: "#ff8000" }}
                ></i>{" "}
                {review.likes || 0} likes
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
