import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListedFilmModal from "../../components/modals/ListedFilmModal"; // optional
import SearchFilmNewList from "../../components/lists/SearchFilmNewlist"; // reusing this

function FourFavoriteFilms() {
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeFilm, setActiveFilm] = useState(null);

  const handleAddFilm = (film) => {
    if (selectedFilms.length >= 4) {
      alert("You can only choose up to 4 films.");
      return;
    }
    if (!selectedFilms.find((f) => f.id === film.id)) {
      setSelectedFilms((prev) => [...prev, film]);
    }
  };

  const handleRemoveFilm = (filmId) => {
    setSelectedFilms((prev) => prev.filter((film) => film.id !== filmId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(selectedFilms);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedFilms(reordered);
  };

  const handleOpenModal = (film) => {
    setActiveFilm(film);
    setShowModal(true);
  };

  const handleUpdateFilm = (updatedFilm) => {
    setSelectedFilms((prev) =>
      prev.map((film) => (film.id === updatedFilm.id ? updatedFilm : film))
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>Your Top 4 Favorite Films</h1>
          <p style={{ color: "#bbb" }}>
            Drag to reorder. You can add up to 4 films.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <SearchFilmNewList onAddFilm={handleAddFilm} />
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          {selectedFilms.length === 0 && (
            <p style={{ color: "#ccc" }}>No films selected yet.</p>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="favorites" direction="vertical">
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
                            padding: "10px",
                            background: "#334",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <span
                            style={{
                              color: "#aaa",
                              marginRight: "8px",
                              minWidth: "24px",
                            }}
                          >
                            #{index + 1}
                          </span>

                          {film.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
                              alt={`${film.title} poster`}
                              style={{
                                width: "50px",
                                borderRadius: "4px",
                                marginRight: "10px",
                              }}
                            />
                          )}

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
        </Col>
      </Row>
    </Container>
  );
}

export default FourFavoriteFilms;
