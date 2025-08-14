import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import "../../css/App.css";
function ListedFilmModal({ show, onHide, film, onUpdate }) {
  const [notes, setNotes] = useState("");
  const [watchedBefore, setWatchedBefore] = useState(false);

  useEffect(() => {
    if (film) {
      setNotes(film.notes || "");
      setWatchedBefore(film.watchedBefore || false);
    }
  }, [film]);

  if (!film) return null;

  const posterUrl = film.poster_path
    ? `https://image.tmdb.org/t/p/original${film.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  const handleUpdate = () => {
    onUpdate({
      ...film,
      notes,
      watchedBefore,
    });
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="custom-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "white" }}>Edit List Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img
              src={posterUrl}
              alt={film.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
          </Col>
          <Col md={8}>
            <h4 style={{ color: "white" }}>{film.title}</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Notes contain spoiler"
                  checked={watchedBefore}
                  onChange={(e) => setWatchedBefore(e.target.checked)}
                  style={{ color: "white" }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListedFilmModal;
