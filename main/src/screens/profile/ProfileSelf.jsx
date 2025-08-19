import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ProfileSelf({ user }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const profileUrl = `http://localhost:3000/user/${user.id}/`;

  return (
    <div>
      <Container>
        <Row>
          <Col className="d-flex">
            <h2>{user.username}</h2>
            <img
              src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
              style={{ width: "3rem" }}
            />
            <Button onClick={() => navigate("/settings")}>Edit Profile</Button>
            <CopyToClipboard text={profileUrl} onCopy={() => setCopied(true)}>
              <Button variant={copied ? "success" : "primary"}>
                {copied ? "Copied!" : "Copy Profile URL"}
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
        <h1>Your Profile</h1>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>This view is editable.</p>
        {/* Add edit buttons, settings, etc. */}
      </Container>
    </div>
  );
}

export default ProfileSelf;
