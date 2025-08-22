import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { auth, db } from "../../firebase";
import ReviewModal from "../modals/ReviewModal";
import ListGroup from "react-bootstrap/ListGroup";
import "../../css/Reviews.css";
import { fetchUserInfo } from "../../actions/authenticationActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddReview(props) {
  const { filmId } = useParams();

  const { id, title, releaseDate, posterPath } = props;
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [watched, setWatched] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);
  const { userId, email, username } = userInfo || [];

  const toggleWatched = () => {
    setWatched((prev) => !prev);
  };

  const toggleLiked = () => {
    setIsLiked((prev) => !prev);
  };

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

  const handleRating = (rate) => {
    setRating(rate);
    console.log("Selected Rating:", rate);
    // you can add more logic here
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
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
              {watched ? (
                <>
                  <i
                    className="fa-solid fa-eye"
                    style={{ fontSize: "3rem" }}
                    onClick={toggleWatched}
                  ></i>
                  <h4>Watched</h4>
                </>
              ) : (
                <>
                  <i
                    className="fa-solid fa-eye"
                    style={{ fontSize: "3rem", color: "#47ff37ff" }}
                    onClick={toggleWatched}
                  ></i>
                  <h4>Watched</h4>
                </>
              )}
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
              {isLiked ? (
                <>
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: "#ff8000", fontSize: "3rem" }}
                    onClick={toggleLiked}
                  ></i>
                  <h4>Liked</h4>
                </>
              ) : (
                <>
                  <i
                    className="fa-solid fa-heart"
                    style={{ fontSize: "3rem" }}
                    onClick={toggleLiked}
                  ></i>
                  <h4>Remove</h4>
                </>
              )}
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
        userId={userId}
      />
    </div>
  );
}

export default AddReview;
