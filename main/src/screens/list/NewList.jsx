import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SearchFilmNewList from "../../components/lists/SearchFilmNewlist";
import Form from "react-bootstrap/Form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListedFilmModal from "../../components/modals/ListedFilmModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../actions/authenticationActions";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function NewList() {
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [isRanked, setIsRanked] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeFilm, setActiveFilm] = useState(null);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!userInfo) return null;

  const { userId, email, username } = userInfo;

  const handleAddFilm = (film) => {
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
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

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

  const handleSaveList = async () => {
    if (!name.trim()) {
      alert("List name is required!");
      return;
    }
    if (selectedFilms.length === 0) {
      alert("Please add at least one film!");
      return;
    }

    try {
      const filmsData = selectedFilms.map((film, index) => ({
        id: film.id,
        title: film.title,
        notes: film.notes || "",
        rank: isRanked ? index + 1 : null,
      }));

      await addDoc(collection(db, "lists"), {
        username,
        uid: userId,
        name: name.trim(),
        description: description.trim(),
        tags,
        films: filmsData,
        isRanked,
        createdAt: serverTimestamp(),
      });

      alert("List saved successfully!");
      setName("");
      setDescription("");
      setTags([]);
      setSelectedFilms([]);
    } catch (err) {
      console.error("Error saving list:", err);
      alert("Failed to save list.");
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
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
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
                    setTagInput("");
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
            <textarea
              style={{ height: "15rem" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
            <Button variant="success" onClick={handleSaveList}>
              Save
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={8}>
            <h5 style={{ color: "white" }}>Your List</h5>
            {selectedFilms.length === 0 && (
              <p style={{ color: "#bbb" }}>No films added yet</p>
            )}

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
                            </strong>
                            <span style={{ color: "#ccc", marginLeft: "6px" }}>
                              {film.release_date &&
                                `(${film.release_date.slice(0, 4)})`}
                            </span>
                            <Button
                              variant="outline-light"
                              size="sm"
                              onClick={() => handleOpenModal(film)}
                            >
                              Add Notes
                            </Button>
                            {film.notes && (
                              <div
                                style={{
                                  marginTop: "4px",
                                  paddingLeft: isRanked ? "32px" : "58px", // indent to align with title
                                  color: "#ddd",
                                  fontSize: "0.85rem",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {film.notes}
                              </div>
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
      <ListedFilmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        film={activeFilm}
        onUpdate={handleUpdateFilm}
      />
    </div>
  );
}

export default NewList;
