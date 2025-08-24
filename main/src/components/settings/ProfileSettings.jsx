import React from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import FourFavoriteFilms from "../film/FourFavoriteFilms";

function ProfileSettings() {
  return (
    <div>
      <Form>
        <Row>
          <Col className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label style={{ color: "white" }}>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGivenName">
                  <Form.Label style={{ color: "white" }}>Given Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter given name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formFamilyName">
                  <Form.Label style={{ color: "white" }}>
                    Family Name
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter family name" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: "white" }}>Email Address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label style={{ color: "white" }}>Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formWebsite">
                  <Form.Label style={{ color: "white" }}>Website</Form.Label>
                  <Form.Control type="text" placeholder="Enter website URL" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label style={{ color: "white" }}>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Tell us about yourself"
              />
            </Form.Group>

            <Button variant="primary" style={{ width: "10rem" }}>
              Save Changes
            </Button>
          </Col>

          <Col>
            <FourFavoriteFilms />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProfileSettings;
