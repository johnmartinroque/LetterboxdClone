import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";

import { logoutUser } from "../../actions/authenticationActions";
import { useDispatch, useSelector } from "react-redux";

function HeaderUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const { userInfo } = useSelector((state) => state.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "transparent" }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/image/watchlog.png"
            className="d-inline-block"
            alt="React Bootstrap logo"
            style={{
              maxHeight: "40px", // controls max height relative to navbar
              height: "auto",
              width: "auto",
            }}
          />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/">
          Watchlog
        </Navbar.Brand>
        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="user-navbar-nav" />

        {/* Collapsible nav links */}
        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/`}>
                Home
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={`/user/${userInfo?.userId || ""}`}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Films</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Diary</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Reviews</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Watchlist</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Lists</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Likes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Tags</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/films">
              Films
            </Nav.Link>
            <Nav.Link as={Link} to="/lists">
              Lists
            </Nav.Link>
            <Nav.Link as={Link} to="/journal">
              Journal
            </Nav.Link>
            {userInfo && (
              <Nav.Link as={Link} to={`/user/${userInfo.userId}`}>
                Profile
              </Nav.Link>
            )}
          </Nav>

          <Button variant="outline-light" onClick={handleLogout}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderUser;
