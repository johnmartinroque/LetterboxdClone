import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FavoriteFilms from "../../components/profile/FavoriteFilms";

function ProfileSelf({ user }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const profileUrl = `http://localhost:3000/user/${user.id}/`;

  return (
    <div>
      <Container>
        <Row className="pt-5 pb-5">
          <Col className="d-flex">
            <h2>{user.username}</h2>
            <Button
              onClick={() => navigate("/settings")}
              style={{ marginLeft: "2rem" }}
            >
              Edit Profile
            </Button>
            <CopyToClipboard text={profileUrl} onCopy={() => setCopied(true)}>
              <Button
                variant={copied ? "success" : "primary"}
                style={{ marginLeft: "2rem" }}
              >
                {copied ? "Copied!" : "Copy Profile URL"}
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileSelf;
