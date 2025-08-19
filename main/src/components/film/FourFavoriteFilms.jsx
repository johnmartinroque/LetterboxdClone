import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 use firebase auth
import SearchFilmNewList from "../../components/lists/SearchFilmNewlist";

function FourFavoriteFilms() {
  const [selectedFilms, setSelectedFilms] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // 👈 get logged-in user

  // fetch saved favorite films
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      const profileRef = doc(db, "profile", userId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        if (data.favoriteFilms) {
          setSelectedFilms(data.favoriteFilms);
        }
      }
    };
    fetchFavorites();
  }, [userId]);

  const saveFavorites = async (films) => {
    if (!userId) return;
    const profileRef = doc(db, "profile", userId);
    await setDoc(
      profileRef,
      {
        favoriteFilms: films.map((f) => ({
          id: f.id,
          title: f.title,
          poster_path: f.poster_path,
        })),
      },
      { merge: true }
    );
  };

  const handleAddFilm = (film) => {
    if (selectedFilms.length >= 4) {
      alert("You can only choose up to 4 films.");
      return;
    }
    if (!selectedFilms.find((f) => f.id === film.id)) {
      const updated = [...selectedFilms, film];
      setSelectedFilms(updated);
      saveFavorites(updated);
    }
  };

  const handleRemoveFilm = (filmId) => {
    const updated = selectedFilms.filter((film) => film.id !== filmId);
    setSelectedFilms(updated);
    saveFavorites(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(selectedFilms);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedFilms(reordered);
    saveFavorites(reordered);
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

                          <span style={{ color: "white" }}>{film.title}</span>

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
