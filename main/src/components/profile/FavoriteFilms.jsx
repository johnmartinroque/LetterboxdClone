import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteFilms } from "../../actions/filmActions";

function FavoriteFilms() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const { loading, favoriteFilms, error } = useSelector(
    (state) => state.favoriteFilms
  );

  useEffect(() => {
    if (uid) {
      dispatch(fetchFavoriteFilms(uid));
    }
  }, [dispatch, uid]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (favoriteFilms.length === 0) {
    return <p style={{ color: "#ccc" }}>No favorite films yet.</p>;
  }

  return (
    <div>
      <h3 style={{ color: "white" }}>Favorite Films</h3>
      <Row>
        {favoriteFilms.map((film) => (
          <Col key={film.id} xs={6} md={3} className="mb-3">
            <Card className="h-100 border-0 shadow-none bg-transparent">
              {film.poster_path && (
                <Link to={`/film/${film.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                    alt={film.title}
                    fluid
                  />
                </Link>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoriteFilms;
