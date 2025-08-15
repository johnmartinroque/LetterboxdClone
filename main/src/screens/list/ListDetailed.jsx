import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchListDetails } from "../../actions/listActions";
import { useParams } from "react-router-dom";

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
      <h2>{list.name}</h2>
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

      <h4>Films</h4>
      <Row>
        {list.films?.map((film, idx) => (
          <Col key={idx} xs={6} md={2} className="mb-4 text-center">
            {film.posterPath && (
              <img
                src={film.posterPath}
                alt={film.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
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
