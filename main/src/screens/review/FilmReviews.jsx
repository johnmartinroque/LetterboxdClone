import React, { useEffect } from "react";
import { Spinner, Row, Col, Container } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchRecentReviews } from "../../actions/reviewActions";
import Statistics from "../../components/film/Statistics";
import { fetchFilmDetail } from "../../actions/filmActions";

function FilmReviews() {
  const { id: filmId } = useParams();
  const dispatch = useDispatch();
  const { loading, reviews, error } = useSelector(
    (state) => state.recentReviews
  );

  const {
    detail,
    credits,
    loading: filmLoading,
  } = useSelector((state) => state.filmDetail);

  const posterUrl = detail?.poster_path
    ? `https://image.tmdb.org/t/p/w300${detail.poster_path}`
    : null;
  useEffect(() => {
    if (filmId) {
      dispatch(fetchRecentReviews(filmId));
      dispatch(fetchFilmDetail(filmId));
    }
  }, [dispatch, filmId]);

  if (loading) return <Spinner animation="border" style={{ color: "white" }} />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews yet for this film.</p>;

  return (
    <Container>
      <div style={{ width: "50rem" }}>
        <h4>All Reviews</h4>

        {loading ? (
          <Spinner animation="border" style={{ color: "white" }} />
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet for this film.</p>
        ) : (
          <ul className="list-unstyled">
            {reviews.map((review) => (
              <li
                key={review.id}
                style={{
                  borderTop: "1px solid #ffff",
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <Row>
                  <Col className="d-flex text-start gap-2">
                    <span>Review by</span>
                    <Link to={`/user/${review.userId}`}>{review.username}</Link>
                    <Rating
                      readonly
                      allowFraction
                      initialValue={review.rating}
                      size={20}
                      fillColor="#ffe601ff"
                      emptyColor="#ccc"
                    />
                  </Col>
                </Row>

                {/* Watched / Rewatched Date */}
                <Row className="mb-2">
                  <Col className="text-start">
                    {review.watchedBefore
                      ? `Rewatched on ${
                          review.createdAt
                            ?.toDate()
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }) ?? "N/A"
                        }`
                      : `Watched on ${
                          review.createdAt
                            ?.toDate()
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }) ?? "N/A"
                        }`}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-start">
                    <strong
                      style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                        display: "inline-block",
                      }}
                    >
                      {review.reviewText}
                    </strong>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-start">
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "#ff8000" }}
                    ></i>{" "}
                    {review.likes} likes
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Row className="mb-4">
        <Col className="text-center">
          {posterUrl && (
            <img
              src={posterUrl}
              alt="Film Poster"
              style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Statistics filmId={filmId} />
        </Col>
      </Row>
    </Container>
  );
}

export default FilmReviews;
