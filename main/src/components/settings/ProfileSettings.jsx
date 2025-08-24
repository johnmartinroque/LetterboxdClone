import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import FourFavoriteFilms from "../film/FourFavoriteFilms";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function ProfileSettings() {
  const [username, setUsername] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <div>
      <Form>
        <Row>
          <Col className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label style={{ color: "white" }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGivenName">
                  <Form.Label style={{ color: "white" }}>Given Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter given name"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formFamilyName">
                  <Form.Label style={{ color: "white" }}>
                    Family Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter family name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: "white" }}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label style={{ color: "white" }}>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formWebsite">
                  <Form.Label style={{ color: "white" }}>Website</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter website URL"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label style={{ color: "white" }}>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
