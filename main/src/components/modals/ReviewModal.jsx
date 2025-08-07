import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/App.css";
import { useState, useEffect } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Rating } from "react-simple-star-rating";

function ReviewModal({
  show,
  onHide,
  title,
  releaseDate,
  posterPath,
  rating: initialRating,
  id,
  username,
}) {
  const [rating, setRating] = useState(initialRating || 0);
  const [text, setText] = useState("");

  useEffect(() => {
    setRating(initialRating); // Update rating if it changes
  }, [initialRating]);

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w200${posterPath}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  const movieReviewsRef = collection(db, "reviews");

  const handleRating = (rate) => {
    setRating(rate); // update rating in state
  };

  const addReview = async () => {
    try {
      await addDoc(movieReviewsRef, {
        filmId: id,
        createdAt: Timestamp.now(),
        rating: rating,
        reviewText: text,
        username: username,
      });
      onHide(); // Close modal after saving
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal" size="xl">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "white" }}>Add a Review</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <img src={posterUrl} alt={title} style={{ width: "100%" }} />
          </Col>
          <Col md={8}>
            <h4 style={{ color: "white" }}>{title}</h4>
            <p style={{ color: "white" }}>({releaseYear})</p>
            <textarea
              style={{ width: "100%", height: "150px" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your review here..."
            />
            <div style={{ marginTop: "1rem" }}>
              <Rating
                onClick={handleRating}
                allowFraction
                initialValue={rating}
                ratingValue={rating}
                maxValue={5}
                size={30}
                transition
                fillColor="#ffe601ff"
                emptyColor="#ccc"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} style={{ color: "white" }}>
          Cancel
        </Button>
        <Button className="save-button" onClick={addReview}>
          Save Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
