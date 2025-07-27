// FilmDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { fetchFilmDetail } from "../actions/filmActions";
import PopularReviews from "../components/reviews/PopularReviews";
import RecentReviews from "../components/reviews/RecentReviews";
import PosterModal from "../components/modals/PosterModal";

function FilmDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const { detail, credits, loading, error } = useSelector(
    (state) => state.filmDetail
  );

  useEffect(() => {
    dispatch(fetchFilmDetail(id));
  }, [dispatch, id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!detail || !credits) return null;

  const director = credits.crew.find((person) => person.job === "Director");
  const cast = credits.cast.slice(0, 15);
  const topCrew = credits.crew.slice(0, 5);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Card.Img
          src={
            detail.backdrop_path
              ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
        />
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              src={
                detail.poster_path
                  ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              onClick={() =>
                handleImageClick(
                  `https://image.tmdb.org/t/p/original${detail.poster_path}`
                )
              }
              style={{ cursor: "pointer" }}
            />
          </Card>
        </Col>
        <Col md={8}>
          <h2>
            {detail.title} ({new Date(detail.release_date).getFullYear()})
          </h2>
          <p>
            <strong>Genres:</strong>{" "}
            {detail.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Director:</strong> {director?.name || "N/A"}
          </p>
          <p>
            <strong>Synopsis:</strong>{" "}
            {detail.overview || "No synopsis available."}
          </p>
          <p>
            <strong>Cast:</strong>
            {cast.map((actor, index) => (
              <span key={actor.id}>
                <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
                {index < cast.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>
            <strong>Crew:</strong>{" "}
            {topCrew.map((crew) => `${crew.name} (${crew.job})`).join(", ")}
          </p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <PopularReviews />
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <RecentReviews />
        </Col>
      </Row>
      <PosterModal
        show={showModal}
        imageUrl={modalImage}
        onClose={handleCloseModal}
      />
    </Container>
  );
}

export default FilmDetailed;
