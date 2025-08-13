import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SearchFilmNewList from "../../components/lists/SearchFilmNewlist";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function NewList() {
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [isRanked, setIsRanked] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddFilm = (film) => {
    if (!selectedFilms.find((f) => f.id === film.id)) {
      setSelectedFilms((prev) => [...prev, film]);
    }
  };

  const handleRemoveFilm = (filmId) => {
    setSelectedFilms((prev) => prev.filter((film) => film.id !== filmId));
  };

  // Drag end handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(selectedFilms);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setSelectedFilms(reordered);
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
            <Form>
              <Form.Control
                type="text"
                placeholder="Type tag and press Tab or Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Tab" || e.key === "Enter") {
                    e.preventDefault();
                    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                      setTags([...tags, tagInput.trim()]);
                    }
                    setTagInput(""); // clear after adding
                  }
                }}
              />
              <div
                className="mt-2 d-flex flex-wrap gap-2"
                style={{
                  maxWidth: "100%",
                  wordBreak: "break-word",
                }}
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge"
                    style={{
                      backgroundColor: "#ff8000",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "0.85rem",
                      whiteSpace: "normal",
                      cursor: "pointer",
                    }}
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    title="Click to remove"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Form>
            <h5>Who can view</h5>
            <select className="form-control" />
            <Form>
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Ranked list"
                checked={isRanked}
                onChange={(e) => setIsRanked(e.target.checked)}
              />
            </Form>
          </Col>
          <Col className="d-flex flex-column">
            <h5>Description</h5>
            <textarea style={{ height: "15rem" }} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={8} className="d-flex ">
            <SearchFilmNewList onAddFilm={handleAddFilm} isRanked={isRanked} />
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

            {isRanked ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="filmList" direction="vertical">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {selectedFilms.map((film, index) => (
                        <Draggable
                          key={film.id}
                          draggableId={film.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: "8px 12px",
                                background: "#334",
                                marginBottom: "5px",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {isRanked && (
                                <span
                                  style={{
                                    color: "#aaa",
                                    marginRight: "8px",
                                    minWidth: "24px",
                                  }}
                                >
                                  #{index + 1}
                                </span>
                              )}
                              {film.poster_path && (
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
                                  alt={`${film.title} poster`}
                                  style={{ width: "50px", borderRadius: "4px" }}
                                />
                              )}
                              <strong style={{ color: "white" }}>
                                {film.title}
                              </strong>{" "}
                              <span
                                style={{ color: "#ccc", marginLeft: "6px" }}
                              >
                                {film.release_date &&
                                  `(${film.release_date.slice(0, 4)})`}
                              </span>
                              <i
                                className="fa-solid fa-trash"
                                style={{
                                  color: "#f55",
                                  marginLeft: "auto",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                }}
                                onClick={() => handleRemoveFilm(film.id)}
                              ></i>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              selectedFilms.map((film) => (
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
              ))
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewList;
