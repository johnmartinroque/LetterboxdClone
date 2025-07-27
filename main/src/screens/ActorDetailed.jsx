import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { fetchActorDetail } from "../actions/actorActions";

function ActorDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info, movies, loading, error } = useSelector(
    (state) => state.actorDetail
  );

  useEffect(() => {
    dispatch(fetchActorDetail(id));
  }, [dispatch, id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!info) return null;

  return (
    <Container className="mt-4">
      <Row>
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
        </Col>
        <Col md={8}>
          <h2>{info.name}</h2>
          <p>
            <strong>Biography:</strong>{" "}
            {info.biography || "No biography available."}
          </p>
          <p>
            <strong>Birthday:</strong> {info.birthday}
          </p>
          <p>
            <strong>Place of Birth:</strong> {info.place_of_birth}
          </p>
        </Col>
      </Row>

      <h3 className="mt-5">Known For</h3>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Link to={`/film/${movie.id}`}>
                <Card.Img
                  variant="top"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                />
              </Link>
              <Card.Body>
                <Card.Title className="fs-6">{movie.title}</Card.Title>
                <Card.Text className="text-muted">
                  {movie.release_date?.slice(0, 4)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ActorDetailed;
