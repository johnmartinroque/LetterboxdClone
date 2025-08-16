import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchListDetails } from "../../actions/listActions";
import { Link, useParams } from "react-router-dom";

function ListDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, list, error } = useSelector((state) => state.listDetails);

  useEffect(() => {
    dispatch(fetchListDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container style={{ color: "white" }}>
      <Row className="mb-4">
        <Card.Img
          src={
            list.firstMovieBackdrop
              ? list.firstMovieBackdrop
              : "https://via.placeholder.com/1280x720?text=No+Image"
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

      <p>
        <strong>By:</strong> {list.username}
      </p>

      <p>
        <strong>Ranked:</strong> {list.isRanked ? "Yes" : "No"}
      </p>

      <Row>
        <Row>
          <Col>
            <h1>{list.name}</h1>
            <p>{list.description}</p>
          </Col>
          <Col>
            <p>
              <strong>Tagged</strong>
            </p>
            <div>
              {list.tags?.map((tag, index) => (
                <span
                  key={index}
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
                  {tag}
                </span>
              ))}
            </div>
          </Col>
        </Row>
        {list.films?.map((film, idx) => (
          <Col key={idx} xs={6} md={2} className="mb-4 text-center">
            {film.posterPath && (
              <Link to={`/film/${film.id}`}>
                <img
                  src={film.posterPath}
                  alt={film.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </Link>
            )}
            <div style={{ marginTop: "0.5rem" }}>
              {list.isRanked && film.rank && (
                <div>
                  <strong>#{film.rank}</strong>
                </div>
              )}
              <div>
                <strong>{film.title}</strong>
              </div>
              {film.notes && (
                <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                  Notes: {film.notes}
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListDetailed;
