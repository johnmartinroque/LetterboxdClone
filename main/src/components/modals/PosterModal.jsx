import React from "react";
import { Modal, Button } from "react-bootstrap";

const PosterModal = ({ show, imageUrl, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton={true} onHide={onClose}></Modal.Header>
      <Modal.Body>
        <img
          src={imageUrl}
          alt="Full screen"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PosterModal;
