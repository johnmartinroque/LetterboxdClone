import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner, Row, Col, Card } from "react-bootstrap";

function FavoriteFilms() {
  const { uid } = useParams(); // 👈 user ID from URL
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const profileRef = doc(db, "profile", uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setFavoriteFilms(data.favoriteFilms || []);
        }
      } catch (err) {
        console.error("Error fetching favorite films:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [uid]);

  if (loading) return <Spinner animation="border" />;

  if (favoriteFilms.length === 0) {
    return <p style={{ color: "#ccc" }}>No favorite films yet.</p>;
  }

  return (
    <div>
      <h3 style={{ color: "white" }}>Favorite Films</h3>
      <Row>
        {favoriteFilms.map((film, index) => (
          <Col key={film.id} xs={6} md={3} className="mb-3">
            <Card bg="dark" text="white" className="h-100">
              {film.poster_path && (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                  alt={film.title}
                />
              )}
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>
                  #{index + 1} {film.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoriteFilms;
