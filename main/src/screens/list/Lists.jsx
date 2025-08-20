import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FeaturedLists from "../../components/lists/FeaturedLists";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../actions/authenticationActions";

function Lists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  const startList = () => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      navigate("/list/new");
    }
  };

  useEffect(() => {
    dispatch(fetchUserInfo()); // Try to fetch user info, but don't block rendering
  }, [dispatch]);

  return (
    <div>
      <Row className="mt-5 text-center">
        <Col>
          <h1 style={{ color: "white" }}>
            Collect, curate, and share. Lists are the perfect way to group
            films.
          </h1>
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
          <Link to={`/lists/featured/`}>All</Link>
        </Col>
      </Row>
    </div>
  );
}

export default Lists;
