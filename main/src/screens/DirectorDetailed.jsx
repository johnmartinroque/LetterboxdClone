import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { fetchDirectorDetail } from "../actions/directorActions";

function DirectorDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info, movies, loading, error } = useSelector(
    (state) => state.directorDetail
  );

  useEffect(() => {
    dispatch(fetchDirectorDetail(id));
  }, [dispatch, id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!info) return null;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h5 style={{ color: "#556678" }}>FILMS DIRECTED BY</h5>
          <h3 style={{ color: "#ffffffff" }}>{info.name}</h3>
          <Row className="g-2">
            {movies.map((movie) => (
              <Col key={movie.id} sm={6} md={4} lg={2} className="mb-4">
                <Card>
                  <Link to={`/film/${movie.id}`}>
                    <Card.Img
                      className="rounded"
                      variant="top"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                    />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img
              src={
                info.profile_path
                  ? `https://image.tmdb.org/t/p/w500${info.profile_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
            />
          </Card>
          <h2 style={{ color: "#556678" }}>{info.name}</h2>
          <p style={{ color: "#556678" }}>
            {info.biography || "No biography available."}
          </p>
          <p style={{ color: "#556678" }}>
            <strong>Birthday:</strong> {info.birthday || "Unknown"}
          </p>
          <p style={{ color: "#556678" }}>
            <strong>Place of Birth:</strong> {info.place_of_birth || "Unknown"}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default DirectorDetailed;
