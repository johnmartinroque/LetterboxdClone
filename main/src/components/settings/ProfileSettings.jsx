import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import FourFavoriteFilms from "../film/FourFavoriteFilms";

function ProfileSettings() {
  return (
    <div>
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
          <Row>
            <Button style={{ width: "10rem" }}>Save Changes</Button>
          </Row>
        </Col>
        <Col>
          <FourFavoriteFilms />
        </Col>
      </Row>
    </div>
  );
}

export default ProfileSettings;
