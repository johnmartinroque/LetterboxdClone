import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReviewModal({ show, onHide, title, releaseDate, posterPath }) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w200${posterPath}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>I watched ...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <img src={posterUrl} alt={title} style={{ width: "100%" }} />
          </Col>
          <Col md={8}>
            <h4>{title}</h4>
            <p>({releaseYear})</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
