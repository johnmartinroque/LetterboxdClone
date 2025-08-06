import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authenticationActions";

function HeaderUser() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
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
          MyApp
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="user-navbar-nav" />

        {/* Collapsible nav links */}
        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/films">
              Films
            </Nav.Link>
            <Nav.Link as={Link} to="/lists">
              Lists
            </Nav.Link>
            <Nav.Link as={Link} to="/journal">
              Journal
            </Nav.Link>
          </Nav>

          {/* Search and logout */}
          <Form className="d-flex me-2">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Button variant="outline-light" onClick={handleLogout}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderUser;
