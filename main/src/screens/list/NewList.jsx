import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SearchFilmNewList from "../../components/lists/SearchFilmNewlist";

function NewList() {
  const [selectedFilms, setSelectedFilms] = useState([]);

  const handleAddFilm = (film) => {
    // Avoid duplicates
    if (!selectedFilms.find((f) => f.id === film.id)) {
      setSelectedFilms((prev) => [...prev, film]);
    }
  };

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
            <SearchFilmNewList onAddFilm={handleAddFilm} />
          </Col>
          <Col md={4}>
            <select className="form-control" />
            <Button>list</Button>
            <Button>tiles</Button>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={8}>
            <h5 style={{ color: "white" }}>Your List</h5>
            {selectedFilms.length === 0 && (
              <p style={{ color: "#bbb" }}>No films added yet</p>
            )}
            {selectedFilms.map((film) => (
              <div
                key={film.id}
                style={{
                  padding: "8px 12px",
                  background: "#334",
                  marginBottom: "5px",
                  borderRadius: "4px",
                }}
              >
                <strong style={{ color: "white" }}>{film.title}</strong>{" "}
                <span style={{ color: "#ccc" }}>
                  {film.release_date && `(${film.release_date.slice(0, 4)})`}
                </span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewList;
