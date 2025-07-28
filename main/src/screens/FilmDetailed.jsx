// FilmDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { fetchFilmDetail } from "../actions/filmActions";
import PopularReviews from "../components/reviews/PopularReviews";
import RecentReviews from "../components/reviews/RecentReviews";
import PosterModal from "../components/modals/PosterModal";
import AddReview from "../components/reviews/AddReview";
import Statistics from "../components/film/Statistics";

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
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            WebkitMaskImage: `
            linear-gradient(to top,    transparent 0%, black 20%, black 80%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
            linear-gradient(to left,   transparent 0%, black 20%, black 80%, transparent 100%),
            linear-gradient(to right,  transparent 0%, black 20%, black 80%, transparent 100%)`,
            WebkitMaskComposite: "intersect",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
          }}
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
          <Statistics />
        </Col>
        <Col md={4} style={{ color: "#aaaaaa" }}>
          <h2>
            {detail.title} ({new Date(detail.release_date).getFullYear()}){" "}
            {director ? (
              <Link to={`/director/${director.id}`}>{director.name}</Link>
            ) : (
              "Director unknown"
            )}
          </h2>

          <p>
            <strong>Genres:</strong>{" "}
            {detail.genres.map((g) => g.name).join(", ")}
          </p>

          <h5 style={{ color: "#aaaaaa" }}>
            {detail.tagline.toUpperCase() || "No synopsis available."}
          </h5>
          <p>{detail.overview || "No synopsis available."}</p>
          <p>
            <strong>Cast:</strong>
            {cast.map((actor, index) => (
              <span key={actor.id}>
                <Link to={`/actor/${actor.id}`}>
                  <div
                    style={{
                      backgroundColor: "#7c8ba3",
                      display: "inline-block",
                      color: "white",
                      padding: "0.1rem",
                      borderRadius: "0.2rem",
                    }}
                  >
                    {actor.name}
                  </div>
                </Link>
                {index < cast.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>
            <strong>Crew:</strong>{" "}
            {topCrew.map((crew) => `${crew.name} (${crew.job})`).join(", ")}
          </p>
        </Col>
        <Col md={4}>
          <AddReview />
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
