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
import { Col, Row } from "react-bootstrap";

function RecentReviews({ filmId }) {
  const [reviews, setReviews] = useState([]);

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

        const snapshot = await getDocs(q);
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      }
    };

    if (filmId) fetchReviews();
  }, [filmId]);

  return (
    <div>
      <h4>Recent Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet for this film.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <p key={review.id}>
              <Row>
                <Col className="d-flex text-start">
                  <p>Review by</p>
                  <strong>{review.username}</strong>
                  <strong>{review.rating}/5</strong>
                </Col>
              </Row>
              <Row>
                <Col className="text-start">
                  <strong> {review.reviewText}</strong>
                </Col>
              </Row>

              {/* 
              <small>
                {review.createdAt?.toDate().toLocaleString() ?? "N/A"}
              </small>
              */}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentReviews;
