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
          <Row>
            {list.films?.slice(0, 4).map((film, idx) => (
              <Col xs={6} md={3} key={idx} className="mb-3 text-center">
                {film.posterPath && (
                  <img
                    src={film.posterPath}
                    alt={film.title}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                )}
                <div style={{ marginTop: "0.5rem" }}>
                  {list.isRanked && film.rank && (
                    <div>
                      <strong>#{film.rank}</strong>
                    </div>
                  )}
                  <strong>{film.title}</strong>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default FeaturedLists;
