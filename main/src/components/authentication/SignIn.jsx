import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../actions/authenticationActions"; // Updated import
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState(""); // Changed to handle email instead of username
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, error, user } = userSignIn;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(email, password));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const getFriendlyErrorMessage = (error) => {
    if (!error) return null;

    if (error.includes("auth/invalid-credential")) {
      return "Invalid email or password. Please check your credentials.";
    }

    if (error.includes("auth/user-not-found")) {
      return "No account found with this email address.";
    }

    if (error.includes("auth/wrong-password")) {
      return "Incorrect password. Please try again.";
    }

    if (error.includes("auth/too-many-requests")) {
      return "Too many failed attempts. Please try again later.";
    }

    // Default fallback
    return "An unexpected error occurred. Please try again.";
  };

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
            {getFriendlyErrorMessage(error)}
          </Alert>
        )}
      </Form>
    </Container>
  );
}

export default SignIn;
