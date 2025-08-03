import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { auth, db } from "../../firebase";

function AddReview(props) {
  const { id } = props;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const movieReviewsRef = collection(db, "reviews");

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
    // you can add more logic here
  };

  const addReviewHandler = () => {
    addReview();
  };

  const fetchUsername = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || "");
        } else {
          console.error("user document not found");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsername();
  });

  return (
    <div>
      <Card style={{ height: "40rem", padding: "1rem" }}>
        <Card.Title style={{ color: "black" }}>Add Your Review</Card.Title>
        <Card.Body>
          <Card.Text>
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-heart" style={{ color: "#ff8000" }}></i>
            <i class="fa-solid fa-plus"></i>
          </Card.Text>
          <Card.Text>
            <Rating
              onClick={handleRating}
              allowFraction
              initialValue={rating}
              ratingValue={rating}
              maxValue={5}
              size={30} // optional: controls star size
              transition // smooth transitions
              fillColor="#ffe601ff" // optional: star color
              emptyColor="#ccc" // optional: empty star color
            />
            <div style={{ marginTop: "1rem" }}>
              Selected Rating: {rating} / 6
            </div>
          </Card.Text>
        </Card.Body>
        <Button onClick={addReviewHandler}>Submit Review</Button>
      </Card>
    </div>
  );
}

export default AddReview;
