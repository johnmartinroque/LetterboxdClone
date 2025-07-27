import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>
              We are a film database providing detailed information about films,
              actors, and more.
            </p>
          </Col>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Contact</h5>
            <p>Email: contact@moviedb.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} MovieDB | All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
