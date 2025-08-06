import React, { useEffect, useState } from "react";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import PopularFIlmsWeek from "../components/film/PopularFIlmsWeek";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { fetchUserInfo } from "../actions/authenticationActions";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!userInfo) return null;

  const { userId, email, username } = userInfo;

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
