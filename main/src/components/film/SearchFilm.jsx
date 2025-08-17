import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilms } from "../../actions/filmActions";
import { Form, Spinner, Button, Image } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FourFavoriteFilms = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState([]);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { films, loading, error } = useSelector((state) => state.searchFilms);

  // Debounce search input
  useEffect(() => {
    if (query.trim() === "") {
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(searchFilms(query));
      setShowDropdown(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectFilm = (film) => {
    if (selectedFilms.find((f) => f.id === film.id)) return;
    if (selectedFilms.length >= 4) return;

    setSelectedFilms((prev) => [...prev, film]);
    setQuery("");
    setShowDropdown(false);
  };

  const handleRemoveFilm = (filmId) => {
    setSelectedFilms((prev) => prev.filter((f) => f.id !== filmId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(selectedFilms);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedFilms(reordered);
  };

  return (
    <div>
      <h5>Your 4 Favorite Films</h5>

      {/* SEARCH INPUT */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Form.Label>Find a film</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
            disabled={selectedFilms.length >= 4}
          />
          {loading && (
            <Spinner
              animation="border"
              size="sm"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
          )}
        </Form.Group>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              maxHeight: "250px",
              overflowY: "auto",
              zIndex: 1000,
              backgroundColor: "#556678",
            }}
          >
            {error && (
              <div style={{ padding: "10px", color: "red" }}>{error}</div>
            )}
            {films && films.length > 0
              ? films.map((film) => (
                  <div
                    key={film.id}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => handleSelectFilm(film)}
                  >
                    <strong style={{ color: "white" }}>{film.title}</strong>{" "}
                    <span style={{ color: "white" }}>
                      {film.release_date &&
                        `(${film.release_date.slice(0, 4)})`}
                    </span>
                    <br />
                    <small style={{ color: "#dadadaff" }}>
                      Director: {film.director}
                    </small>
                  </div>
                ))
              : !loading &&
                query && (
                  <div style={{ padding: "10px", color: "#aaa" }}>
                    No results found
                  </div>
                )}
          </div>
        )}
      </div>

      {/* SELECTED FILMS WITH DRAG-AND-DROP */}
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
                      className="d-flex align-items-center p-2 my-2 bg-light border rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span className="me-2 text-muted">#{index + 1}</span>
                      {film.poster_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
                          alt={film.title}
                          thumbnail
                          style={{ width: "50px", marginRight: "10px" }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <div>
                          <strong>{film.title}</strong>{" "}
                          {film.release_date &&
                            `(${film.release_date.slice(0, 4)})`}
                        </div>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveFilm(film.id)}
                      >
                        ✕
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {selectedFilms.length === 0 && (
                <p className="text-muted">No favorite films selected yet.</p>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FourFavoriteFilms;
