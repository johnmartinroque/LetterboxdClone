import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
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
      <ul>
        {list.films?.map((film, idx) => (
          <li key={idx}>
            {list.isRanked && film.rank ? `#${film.rank} ` : ""}
            {film.title} {film.notes && ` - Notes: ${film.notes}`}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default ListDetailed;
