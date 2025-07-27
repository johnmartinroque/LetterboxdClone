import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingFilms } from "../actions/filmActions";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Films() {
  const dispatch = useDispatch();

  const {
    films = [],
    loading,
    error,
  } = useSelector((state) => state.filmTrending || {});

  useEffect(() => {
    dispatch(fetchTrendingFilms());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Popular Films This Week</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {films.map((film) => (
            <Col key={film.id} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Link to={`/film/${film.id}`}>
                  <Card.Img
                    variant="top"
                    className="rounded"
                    src={
                      film.poster_path
                        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                  />
                </Link>
                <Card.Body>
                  <Card.Title className="fs-6">{film.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {film.release_date}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Films;
