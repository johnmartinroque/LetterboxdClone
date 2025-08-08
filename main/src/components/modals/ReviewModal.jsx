import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/App.css";
import { useState, useEffect } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";

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
  const [watchedBefore, setWatchedBefore] = useState(true);
  const [addDiary, setAddDiary] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setRating(initialRating); // Update rating if it changes
  }, [initialRating]);

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
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
        addDiary: addDiary,
        watchedBefore: watchedBefore,
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
            <a href={`/film/${id}`} target="_blank" rel="noopener noreferrer">
              <img
                src={posterUrl}
                alt={title}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </a>
          </Col>
          <Col md={8}>
            <h4 style={{ color: "white" }}>{title}</h4>
            <p style={{ color: "white" }}>({releaseYear})</p>
            <Form>
              {/* Two Checkboxes */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="spoiler-check"
                  label={`Watched on ${new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`}
                  checked={addDiary}
                  onChange={(e) => setAddDiary(e.target.checked)}
                  style={{ color: "white" }}
                />
                <Form.Check
                  type="checkbox"
                  id="recommend-check"
                  label="I've Watched this before"
                  checked={watchedBefore}
                  onChange={(e) => setWatchedBefore(e.target.checked)}
                  style={{ color: "white" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="reviewTextarea">
                <Form.Label style={{ color: "white" }}>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your review here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <i class="fa-solid fa-heart" style={{ color: "#ff8000" }}></i>
              </Form.Group>
            </Form>
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
