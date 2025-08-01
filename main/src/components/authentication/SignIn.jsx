import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authenticationActions";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, user } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(registerUser(username, password));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {});
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
          {loading ? "Signing In" : "Sign"}
        </Button>
      </Form>
    </Container>
  );
}
export default SignIn;
