import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import PopularFIlmsWeek from "../components/film/PopularFIlmsWeek";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [username, setUsername] = useState("");
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
      <Row className="text-center mt-5">
        <Col>
          <h2 style={{ color: "white" }}>
            Welcome back, {username} Here’s what we’ve been watching…
          </h2>
          <h5 style={{ color: "white" }}>
            This homepage will become customized as you follow active members on
            Letterboxd.
          </h5>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <PopularFIlmsWeek />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
