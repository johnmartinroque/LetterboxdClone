import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "../../actions/profileActions";
import { Col, Row } from "react-bootstrap";

function Watchlist() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const { loading, films, error } = useSelector((state) => state.watchlist);

  useEffect(() => {
    if (uid) dispatch(fetchWatchlist(uid));
  }, [dispatch, uid]);

  if (loading) return <div>Loading watchlist...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!films || films.length === 0) return <div>No films in watchlist.</div>;

  return (
    <div>
      <Row>
        {films.map((film) => (
          <Col key={film.id} xs={12} sm={6} md={3} className="mb-4">
            <Link to={`/film/${film.filmId}`}>
              {film.filmPoster ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${film.filmPoster}`}
                  alt={film.filmTitle}
                  className="img-fluid rounded"
                />
              ) : (
                <div>No Poster</div>
              )}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Watchlist;
