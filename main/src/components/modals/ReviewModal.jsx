import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../css/App.css";

function ReviewModal({ show, onHide, title, releaseDate, posterPath }) {
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w200${posterPath}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "white" }}>I watched ...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <img src={posterUrl} alt={title} style={{ width: "100%" }} />
          </Col>
          <Col md={8}>
            <h4 style={{ color: "white" }}>{title}</h4>
            <p style={{ color: "white" }}>({releaseYear})</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} style={{ color: "white" }}>
          Close
        </Button>
        <Button className="save-button">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
