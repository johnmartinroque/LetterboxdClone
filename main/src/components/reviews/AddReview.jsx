import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { auth, db } from "../../firebase";
import ReviewModal from "../modals/ReviewModal";
import ListGroup from "react-bootstrap/ListGroup";
import "../../css/Reviews.css";

function AddReview(props) {
  const { id, title, releaseDate, posterPath } = props;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const movieReviewsRef = collection(db, "reviews");

  {
    /* 
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


    const addReviewHandler = () => {
    addReview();
  };
  */
  }
  const handleRating = (rate) => {
    setRating(rate);
    console.log("Selected Rating:", rate);
    // you can add more logic here
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

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      {/*
      <Card style={{ height: "40rem", padding: "1rem" }}>
        <Card.Title style={{ color: "black" }}>Add Your Review</Card.Title>
        <Card.Body>
          <Card.Text
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-eye" style={{ fontSize: "3rem" }}></i>
              <h4>Watched</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "green",
              }}
            >
              <i
                className="fa-solid fa-heart"
                style={{ color: "#ff8000", fontSize: "3rem" }}
              ></i>
              <h4>Liked</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-plus" style={{ fontSize: "3rem" }}></i>
              <h4>Watchlist</h4>
            </div>
          </Card.Text>
          <Card.Text className="text-center">
            <div style={{ marginTop: "1rem" }}>Rate</div>
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
          </Card.Text>
          <div className="text-center">
            <Card.Text>
              <h3>Show your activity</h3>
            </Card.Text>
            <Card.Text>
              <h3>Edit entry or add review…</h3>
            </Card.Text>
            <Card.Text>
              <h3>Log this film again…</h3>
            </Card.Text>
            <Card.Text>
              <h3>Add this film to lists…</h3>
            </Card.Text>
            <Card.Text>
              <h3>something</h3>
            </Card.Text>
          </div>
        </Card.Body>
        <Button onClick={addReviewHandler}>Submit Review</Button>
      </Card>
      */}
      <Button onClick={toggleModal}>Show Review Modal</Button>

      <ListGroup as="ol">
        <ListGroup.Item as="li" style={{ backgroundColor: "#556678" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {/* Watched */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-eye" style={{ fontSize: "3rem" }}></i>
              <h4>Watched</h4>
            </div>

            {/* Liked */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                padding: "0.5rem", // optional
                borderRadius: "0.5rem", // optional
              }}
            >
              <i
                className="fa-solid fa-heart"
                style={{ color: "#ff8000", fontSize: "3rem" }}
              ></i>
              <h4>Liked</h4>
            </div>

            {/* Watchlist */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-plus" style={{ fontSize: "3rem" }}></i>
              <h4>Watchlist</h4>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" style={{ backgroundColor: "#556678" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>Rated</div>
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
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#556678",
          }}
        >
          {" "}
          <h3>Show your activity</h3>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#556678",
          }}
        >
          {" "}
          <h3 onClick={toggleModal} className="hoverable-text">
            Add a review
          </h3>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#556678",
          }}
        >
          {" "}
          <h3>Log this film again…</h3>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#556678",
          }}
        >
          <h3>Add this film to lists…</h3>
        </ListGroup.Item>
      </ListGroup>

      <ReviewModal
        show={showModal}
        onHide={toggleModal}
        title={title}
        releaseDate={releaseDate}
        posterPath={posterPath}
        rating={rating}
        id={id}
        username={username}
      />
    </div>
  );
}

export default AddReview;
