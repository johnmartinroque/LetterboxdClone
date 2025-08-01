import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path as needed
import { Col, Row, Spinner } from "react-bootstrap";

function RecentReviews({ filmId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(
          reviewsRef,
          where("filmId", "==", filmId),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        setLoading(true);
        const snapshot = await getDocs(q);
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filmId) fetchReviews();
  }, [filmId]);

  return (
    <div>
      <h4>Recent Reviews</h4>
      {loading ? (
        <Spinner animation="border" style={{ color: "white" }} />
      ) : reviews.length === 0 ? (
        <p>No reviews yet for this film.</p>
      ) : (
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
                  <span>Review by</span>
                  <strong>{review.username}</strong>
                  <strong>{review.rating}/5</strong>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="text-start">
                  <strong>{review.reviewText}</strong>
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

              {/* Uncomment to show date
              <small>
                {review.createdAt?.toDate().toLocaleString() ?? "N/A"}
              </small>
              */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentReviews;
