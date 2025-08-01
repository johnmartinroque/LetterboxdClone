import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, signInUser } from "../../actions/authenticationActions";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, user } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(signInUser(username, password));
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  const names = ["john", "kobe", "martin"];

  useEffect(() => {
    if (user) {
      console.log("User details:", {
        email: user.email,
        username: user.displayName,
        userId: user.uid,
      });
      console.log(names);
    }
  }, [user]);
  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: "50rem" }}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Error handling */}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
}
export default SignIn;
