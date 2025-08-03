import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeaturedLists from "../../components/lists/FeaturedLists";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../actions/authenticationActions";

function Lists() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  const startList = () => {
    navigate("/list/new");
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);

  if (loading) return <div>Loading user info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userInfo) return null;

  const { userId, email, username } = userInfo;

  return (
    <div>
      <Row className="mt-5 text-center">
        <Col>
          <h1 style={{ color: "white" }}>
            Collect, curate, and share. Lists are the perfect way to group
            films.
          </h1>
          {email}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Button style={{ width: "10rem" }} onClick={startList}>
          Stat your own list
        </Button>
      </Row>
      <Row>
        <Col>
          <FeaturedLists />
        </Col>
      </Row>
    </div>
  );
}

export default Lists;
