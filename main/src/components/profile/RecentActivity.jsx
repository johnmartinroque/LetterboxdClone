import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner, Row, Col, Image, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function RecentActivity() {
  const { uid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilmDetails = async (filmId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${filmId}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch film details");
        const data = await response.json();
        return {
          title: data.title,
          poster: data.poster_path
            ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
            : null,
        };
      } catch (err) {
        console.error("TMDB fetch error for filmId:", filmId, err);
        return { title: "Unknown Title", poster: null };
      }
    };

    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const reviewsRef = collection(db, "reviews");
        const q = query(
          reviewsRef,
          where("userId", "==", uid),
          orderBy("createdAt", "desc"),
          limit(4)
        );

        const snap = await getDocs(q);
        const rawReviews = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch film data for each review
        const enrichedReviews = await Promise.all(
          rawReviews.map(async (review) => {
            const filmData = await fetchFilmDetails(review.filmId);
            return {
              ...review,
              title: filmData.title,
              poster: filmData.poster,
            };
          })
        );

        setReviews(enrichedReviews);
      } catch (err) {
        console.error("Error fetching user reviews:", err);
        setError("Failed to load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [uid]);

  if (loading) return <Spinner animation="border" style={{ color: "white" }} />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0)
    return <p style={{ color: "#ccc" }}>No recent activity.</p>;

  return (
    <div>
      <h4 style={{ color: "white" }}>Recent Activity</h4>
      <Row>
        {reviews.map((review) => (
          <Col key={review.id} xs={6} md={3} className="mb-3">
            <Card bg="dark" text="white" className="h-100">
              {review.poster && (
                <Link to={`/film/${review.filmId}`}>
                  <Card.Img
                    variant="top"
                    src={review.poster}
                    alt={review.title}
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

export default RecentActivity;
