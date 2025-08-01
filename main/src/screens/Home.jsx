import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import PopularFIlmsWeek from "../components/film/PopularFIlmsWeek";

function Home() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  return (
    <div>
      <Row className="text-center mt-5">
        <Col>
          <h2 style={{ color: "white" }}>
            Welcome back, jmabc. Here’s what we’ve been watching…
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
