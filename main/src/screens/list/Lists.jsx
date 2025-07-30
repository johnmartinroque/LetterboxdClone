import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Lists() {
  const navigate = useNavigate("");

  const startList = () => {
    navigate("/list/new");
  };

  return (
    <div>
      <Row className="mt-5 text-center">
        <Col>
          <h1 style={{ color: "white" }}>
            Collect, curate, and share. Lists are the perfect way to group
            films.
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Button style={{ width: "10rem" }} onClick={startList}>
          Stat your own list
        </Button>
      </Row>
    </div>
  );
}

export default Lists;
