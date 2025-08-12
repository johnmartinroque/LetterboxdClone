import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function NewList() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 style={{ color: "white" }}>New List</h1>
            <div
              style={{
                borderBottom: "1px solid #ccc",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h5>Name</h5>
            <input type="text" className="form-control" />
            <h5>Tags</h5>
            <input type="text" className="form-control" />
            <h5>Who can view</h5>
            <select className="form-control" />
          </Col>
          <Col className="d-flex flex-column">
            <h5>Description</h5>
            <textarea style={{ height: "15rem" }} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={8} className="d-flex ">
            {/* search film here */}
          </Col>
          <Col md={4}>
            <select className="form-control" />
            <Button>list</Button>
            <Button>tiles</Button>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewList;
