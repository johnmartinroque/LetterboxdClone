import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/App.css";
import { fetchTrendingFilms } from "../../actions/filmActions";

function PopularFIlmsWeek() {
  const dispatch = useDispatch();

  const {
    films = [],
    loading,
    error,
  } = useSelector((state) => state.filmTrending || {});

  useEffect(() => {
    dispatch(fetchTrendingFilms());
  }, [dispatch]);

  // Take only the first 10 films
  const topTenFilms = films.slice(0, 6);

  return (
    <Container className="mt-4">
      <h2 className="mb-4" style={{ color: "white" }}>
        Popular Films This Week
      </h2>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="g-2">
          {topTenFilms.map((film) => (
            <Col key={film.id} sm={6} md={2} lg={2} className="mb-4">
              <Card className="hover-card" style={{ border: "none" }}>
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
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default PopularFIlmsWeek;
