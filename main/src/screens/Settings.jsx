import React from "react";
import { Col, Row } from "react-bootstrap";

function Settings() {
  return (
    <div>
      <Row>
        <Col>
          <h1>Account Settings</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column">
          <h5>Username</h5>
          <input type="text" className="form-control" />
          <Row>
            <Col>
              <h5>Given Name</h5>
              <input type="text" className="form-control" />
            </Col>
            <Col>
              <h5>Family Name</h5>
              <input type="text" className="form-control" />
            </Col>
          </Row>
          <Row>
            <h5>Email Address</h5>
            <input type="email" className="form-control" />
          </Row>
          <Row>
            <Col>
              <h5>Location</h5>
              <input type="text" className="form-control" />
            </Col>
            <Col>
              <h5>Website</h5>
              <input type="text" className="form-control" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Bio</h5>
              <textarea style={{ height: "15rem" }} className="form-control" />
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Settings;
