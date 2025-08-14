import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

function FeaturedLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const q = query(collection(db, "lists"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const listsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // includes username, name, description, tags, films, isRanked, createdAt
        }));

        setLists(listsData);
      } catch (err) {
        console.error("Error fetching lists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <h3 style={{ color: "white" }}>Featured Lists</h3>
        {lists.map((list) => (
          <div key={list.id} style={{ color: "white", marginBottom: "15px" }}>
            <h5>{list.name}</h5>
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
            <p>
              <strong>Films:</strong>
            </p>
            <ul>
              {list.films?.map((film, idx) => (
                <li key={idx}>
                  {list.isRanked && `#${film.rank} `}
                  {film.title} {film.notes && ` - Notes: ${film.notes}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default FeaturedLists;
