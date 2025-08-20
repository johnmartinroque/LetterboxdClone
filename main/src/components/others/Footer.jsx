import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Left side */}
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </Col>

          {/* Right side - Social Links */}
          <Col md={6} className="text-center text-md-end">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            ></a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            ></a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            ></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
