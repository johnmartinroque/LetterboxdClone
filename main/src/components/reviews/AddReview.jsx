import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

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
  const { id, title, releaseDate, posterPath, filmId } = props;
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
          <div className="container">
            <div className="row text-center">
              {/* Watched */}
              <div className="col-4 d-flex flex-column align-items-center">
                <i
                  className="fa-solid fa-eye"
                  style={{
                    fontSize: "3rem",
                    color: watched ? "" : "#47ff37ff",
                    cursor: "pointer",
                  }}
                  onClick={toggleWatched}
                ></i>
                <h5>{watched ? "Watched" : "Watched"}</h5>
              </div>

              {/* Liked */}
              <div className="col-4 d-flex flex-column align-items-center">
                <i
                  className="fa-solid fa-heart"
                  style={{
                    fontSize: "3rem",
                    color: isLiked ? "#ff8000" : "",
                    cursor: "pointer",
                  }}
                  onClick={toggleLiked}
                ></i>
                <h5>{isLiked ? "Liked" : "Remove"}</h5>
              </div>

              {/* Watchlist */}
              <div className="col-4 d-flex flex-column align-items-center">
                <i
                  className="fa-solid fa-plus"
                  style={{ fontSize: "3rem", cursor: "pointer" }}
                ></i>
                <h5>Watchlist</h5>
              </div>
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
