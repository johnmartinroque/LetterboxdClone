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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import RatingsBarChart from "../components/reviews/RatingsBarChart";
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
  const allCrew = credits.crew.slice(0, 20);
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  const groupedCrew = allCrew.reduce((acc, crew) => {
    if (!acc[crew.job]) {
      acc[crew.job] = [];
    }
    if (!acc[crew.job].includes(crew.name)) {
      acc[crew.job].push(crew.name);
    }
    return acc;
  }, {});

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
                  ? `https://image.tmdb.org/t/p/w780${detail.poster_path}`
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
          <Statistics filmId={id} />
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
          <Tabs defaultActiveKey="cast" id="cast-crew-tabs" className="mb-3">
            <Tab eventKey="cast" title="Cast">
              <p>
                {cast.map((actor, index) => (
                  <span key={actor.id}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top-${actor.id}`}>
                          {actor.character}
                        </Tooltip>
                      }
                    >
                      <Link
                        to={`/actor/${actor.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#7c8ba3",
                            display: "inline-block",
                            color: "white",
                            padding: "0.1rem 0.4rem",
                            borderRadius: "0.2rem",
                            cursor: "pointer",
                            marginRight: "0.3rem",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {actor.name}
                        </div>
                      </Link>
                    </OverlayTrigger>
                    {index < cast.length - 1 && ""}
                  </span>
                ))}
              </p>
            </Tab>

            <Tab eventKey="crew" title="Crew">
              <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                {Object.entries(groupedCrew)
                  .sort((a, b) => a[0].localeCompare(b[0])) // Optional: sort alphabetically
                  .map(([job, names]) => (
                    <div key={job} style={{ marginBottom: "0.5em" }}>
                      <div>
                        <strong>{job.toUpperCase()}</strong>
                        {".".repeat(Math.max(20 - job.length, 5))}
                        {names.slice(0, 2).join(" ")}
                      </div>
                      {names.length > 2 &&
                        names.slice(2).map((name, i) => (
                          <div
                            key={i}
                            style={{
                              paddingLeft: "22ch",
                            }}
                          >
                            {name}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </Tab>
          </Tabs>
        </Col>
        <Col md={4}>
          <AddReview
            id={id}
            title={detail.title}
            releaseDate={detail.release_date}
            posterPath={detail.poster_path}
          />
          <RatingsBarChart filmId={id} />
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={4}></Col>
        <Col md={8}>
          <PopularReviews filmId={id} />
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={4}></Col>
        <Col md={8}>
          <RecentReviews filmId={id} />
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
