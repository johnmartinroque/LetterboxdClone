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
  const [listCount, setListCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRef = doc(db, "statistics", String(filmId));
        const snapshot = await getDoc(statsRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setLikes(data.likers?.length || 0);
          setWatched(data.watchers?.length || 0);
        } else {
          console.warn("⚠️ No stats found for filmId:", filmId);
        }

        const listsRef = collection(db, "lists");
        const allListsSnapshot = await getDocs(listsRef);

        let count = 0;

        allListsSnapshot.forEach((doc) => {
          const films = doc.data().films || [];

          if (films.some((film) => String(film.id) === String(filmId))) {
            count++;
          }
        });

        setListCount(count);
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
      <i class="fa-solid fa-eye" style={{ color: "	#00e054" }}></i>
      <p className="mb-0 mx-2">{watched}</p>
      <i class="fa-solid fa-list" style={{ color: "#40bcf4" }}></i>
      <p className="mb-0 mx-2">{listCount}</p>
      <i class="fa-solid fa-heart" style={{ color: "	#ff8000" }}></i>
      <p className="mb-0 mx-2">{likes}</p>
    </div>
  );
}

export default Statistics;
