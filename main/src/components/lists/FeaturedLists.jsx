import React, { useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedLists } from "../../actions/listActions";
import { Link } from "react-router-dom";
import "../../css/List.css";
function FeaturedLists() {
  const dispatch = useDispatch();
  const { loading, lists, error } = useSelector((state) => state.featuredLists);

  useEffect(() => {
    dispatch(fetchFeaturedLists());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <Container>
      <h5 style={{ color: "white" }}>FEATURED LISTS</h5>
      <hr style={{ borderTop: "2px solid white", marginTop: "0.5rem" }} />
      <Row>
        {lists.slice(0, 3).map((list, index) => (
          <Col key={list.id} md={4} style={{ marginBottom: "2rem" }}>
            <div style={{ color: "white" }}>
              <div
                style={{
                  position: "relative",

                  marginTop: "1rem",
                  backgroundColor: "red",
                }}
                className="poster-wrapper"
              >
                <div style={{ display: "flex", position: "relative" }}>
                  {Array.from({ length: 4 }).map((_, idx) => {
                    const film = list.films?.[idx];
                    return (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          zIndex: 4 - idx,
                          marginLeft: idx === 0 ? 0 : "-40px",
                          transition: "transform 0.2s",
                        }}
                      >
                        {film?.posterPath ? (
                          <Link to={`/list/${list.id}`}>
                            <img
                              src={film.posterPath}
                              alt={film.title}
                              style={{
                                width: "120px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                              }}
                            />
                          </Link>
                        ) : (
                          <div
                            style={{
                              width: "120px",
                              height: "180px",
                              backgroundColor: "#000000ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#bbb",
                              fontSize: "0.9rem",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                              border: "0.1px solid #949494cb",
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>
                <Link
                  to={`/list/${list.id}`}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  {list.name}
                </Link>
              </h5>
              <p>
                <strong>Created By:</strong>{" "}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/user/${list.uid}`}
                >
                  {list.username}
                </Link>
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeaturedLists;
