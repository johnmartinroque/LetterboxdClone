import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Something from "./Something";

function Statistics({ filmId }) {
  const [likes, setLikes] = useState(0);
  const [watched, setWatched] = useState(0);
  const [hearts, setHearts] = useState(0);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-eye" style={{ color: "#00e054" }}></i>
      <p className="mb-0 mx-2">{likes}</p>

      <i className="fa-solid fa-list" style={{ color: "#40bcf4" }}></i>
      <p className="mb-0 mx-2">{watched}</p>

      <i className="fa-solid fa-heart" style={{ color: "#ff8000" }}></i>
      <p className="mb-0 mx-2">{hearts}</p>
      <Something filmId={filmId} />
    </div>
  );
}

export default Statistics;
