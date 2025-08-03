import { addDoc, collection, Timestamp, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { auth, db } from "../../firebase";

function AddReview(props) {
  const { id } = props;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const movieReviewsRef = collection(db, "reviews");

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || "");
        } else {
          console.error("User document not found");
        }
      }
    };

    fetchUsername();
  }, []);

  const addReview = async () => {
    try {
      await addDoc(movieReviewsRef, {
        filmId: id,
        createdAt: Timestamp.now(),
        rating: rating,
        text: text,
        username: username,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    console.log("Selected Rating:", rate);
  };

  const click = () => {
    addReview(); // Call the addReview function here
  };

  return (
    <div>
      <Card
        style={{ height: "40rem", padding: "1rem", backgroundColor: "#556678" }}
      >
        <Card.Title style={{ color: "black" }}>Add Your Review</Card.Title>
        <Card.Body>
          <Card.Text>
            <Rating
              onClick={handleRating}
              allowFraction
              initialValue={rating}
              ratingValue={rating}
              maxValue={5}
              size={30}
              transition
              fillColor="#ffe601ff"
              emptyColor="#ccc"
            />
            <div style={{ marginTop: "1rem" }}>
              Selected Rating: {rating} / 5
            </div>
          </Card.Text>
        </Card.Body>
        <Button onClick={click}>Submit Review</Button>
      </Card>
    </div>
  );
}

export default AddReview;
