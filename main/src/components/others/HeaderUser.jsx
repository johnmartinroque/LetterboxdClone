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
    <div>
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "transparent" }}
      >
        <Container className="justify-content-center">
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <div
              className="d-flex align-items-center flex-wrap justify-content-center w-100 gap-3"
              style={{ gap: "1rem" }}
            >
              <Nav className="d-flex flex-row align-items-center text-center">
                <Navbar.Brand as={Link} to="/" style={{ color: "#ffffff" }}>
                  Navbar
                </Navbar.Brand>

                <Nav.Link as={Link} to="/films" style={{ color: "#ffffff" }}>
                  Films
                </Nav.Link>
                <Nav.Link as={Link} to="/lists" style={{ color: "#ffffff" }}>
                  Lists
                </Nav.Link>
                <Nav.Link as={Link} to="/journal" style={{ color: "#ffffff" }}>
                  Journal
                </Nav.Link>
              </Nav>

              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Button onClick={handleLogout}>Log Out</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderUser;
