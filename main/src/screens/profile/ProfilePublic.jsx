import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function ProfilePublic({ user }) {
  return (
    <div>
      <Container>
        <Row className="pt-5 pb-5">
          <Col>
            <h1>{user.username}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePublic;
