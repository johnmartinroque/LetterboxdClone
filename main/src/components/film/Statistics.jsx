import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Statistics({ filmId }) {
  const [likes, setLikes] = useState(0);
  const [watched, setWatched] = useState(0);
  const [hearts, setHearts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(
          collection(db, "statistics"),
          where("filmId", "==", Number(filmId))
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          console.log("✅ Found doc:", doc);

          setLikes(doc.likes || 0);
          setWatched(doc.watched || 0);
        } else {
          console.warn("⚠️ No stats found for filmId:", filmId);
        }
      } catch (error) {
        console.error("❌ Error fetching statistics:", error);
      }
    };

    if (filmId) {
      fetchStats();
    }
  }, [filmId]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-eye" style={{ color: "#00e054" }}></i>
      <p className="mb-0 mx-2">{likes}</p>

      <i className="fa-solid fa-list" style={{ color: "#40bcf4" }}></i>
      <p className="mb-0 mx-2">{watched}</p>
    </div>
  );
}

export default Statistics;
