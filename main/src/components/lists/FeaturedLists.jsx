import React, { useEffect } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedLists } from "../../actions/listActions";
import { Link } from "react-router-dom";

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
      <h3 style={{ color: "white" }}>Featured Lists</h3>
      {lists.slice(0, 3).map((list) => (
        <div key={list.id} style={{ color: "white", marginBottom: "2rem" }}>
          <h5>
            <Link to={`/list/${list.id}`} style={{ color: "#fff" }}>
              {list.name}
            </Link>
          </h5>
          <p>{list.description}</p>
          <p>
            <strong>By:</strong> {list.username}
          </p>
          <p>
            <strong>Tags:</strong> {list.tags?.join(", ")}
          </p>
          <p>
            <strong>Ranked:</strong> {list.isRanked ? "Yes" : "No"}
          </p>
          <Row
            style={{ position: "relative", height: "200px", marginTop: "1rem" }}
          >
            <div style={{ display: "flex", position: "relative" }}>
              {list.films?.slice(0, 4).map((film, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    zIndex: idx,
                    marginLeft: idx === 0 ? 0 : "-40px", // overlap
                    transition: "transform 0.2s",
                  }}
                >
                  {film.posterPath && (
                    <Link to={`/list/${list.id}`}>
                      <img
                        src={film.posterPath}
                        alt={film.title}
                        style={{
                          width: "120px",
                          borderRadius: "6px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default FeaturedLists;
