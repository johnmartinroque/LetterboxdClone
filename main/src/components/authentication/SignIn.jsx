import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../actions/authenticationActions"; // Updated import

function SignIn() {
  const [email, setEmail] = useState(""); // Changed to handle email instead of username
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, error, user } = userSignIn;

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(signInUser(email, password)); // Dispatch signIn action with email and password
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("user", { email: user.email });
    }
  }, [user]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: "50rem" }}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
