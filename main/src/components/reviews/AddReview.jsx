import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
import "../../css/FilmDetailed.css";
import { fetchRecentReviews } from "../../actions/reviewActions";

function AddReview(props) {
  const { id, title, releaseDate, posterPath, filmId } = props;
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [watched, setWatched] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  const getOrCreateStatsDoc = async () => {
    const statsRef = doc(db, "statistics", String(filmId));
    const snapshot = await getDoc(statsRef);

    if (!snapshot.exists()) {
      await setDoc(statsRef, {
        filmId: Number(filmId),
        likers: [],
        watchers: [],
      });
    }

    return statsRef;
  };

  const refreshReviews = () => {
    dispatch(fetchRecentReviews(filmId));
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);
  const { userId, email, username } = userInfo || [];

  const toggleWatched = async () => {
    try {
      const statsRef = await getOrCreateStatsDoc();

      if (watched) {
        await updateDoc(statsRef, {
          watchers: arrayRemove(userId),
        });
      } else {
        await updateDoc(statsRef, {
          watchers: arrayUnion(userId),
        });
      }

      setWatched((prev) => !prev);
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
  };

  const toggleLiked = async () => {
    try {
      const statsRef = await getOrCreateStatsDoc();

      if (isLiked) {
        await updateDoc(statsRef, {
          likers: arrayRemove(userId),
        });
      } else {
        await updateDoc(statsRef, {
          likers: arrayUnion(userId),
        });
      }

      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error updating liked status:", error);
    }
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!userId || !filmId) return;

      const statsRef = doc(db, "statistics", String(filmId));
      const snapshot = await getDoc(statsRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsLiked(data.likers?.includes(userId));
        setWatched(data.watchers?.includes(userId));
      }
    };

    fetchUserStats();
  }, [userId, filmId]);

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
              <div
                className={`col-4 d-flex flex-column align-items-center watched-icon ${
                  watched ? "active" : ""
                }`}
              >
                <i
                  className="fa-solid fa-eye"
                  style={{
                    fontSize: "3rem",
                    color: watched ? "#47ff37ff" : "",
                    cursor: "pointer",
                  }}
                  onClick={toggleWatched}
                ></i>
                <h5 className="label">
                  {watched ? "Watched" : "Watched"}
                  <span className="hover-label">Remove</span>
                </h5>
              </div>

              {/* Liked */}
              <div
                className={`col-4 d-flex flex-column align-items-center liked-icon ${
                  isLiked ? "active" : ""
                }`}
              >
                <i
                  className="fa-solid fa-heart"
                  style={{
                    fontSize: "3rem",
                    color: isLiked ? "#ff8000" : "",
                    cursor: "pointer",
                  }}
                  onClick={toggleLiked}
                ></i>
                <h5 className="label">
                  {isLiked ? "Liked" : "Liked"}
                  <span className="hover-label">Remove</span>
                </h5>
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
        onReviewAdded={refreshReviews}
      />
    </div>
  );
}

export default AddReview;
