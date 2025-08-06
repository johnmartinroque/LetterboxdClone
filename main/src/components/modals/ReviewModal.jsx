import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReviewModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>I watched ...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={2}>
            <h1>HELLO</h1>
          </Col>
          <Col md={8}>
            <h1>HELLO</h1>
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
