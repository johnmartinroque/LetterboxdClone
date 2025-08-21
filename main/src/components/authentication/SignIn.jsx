import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../actions/authenticationActions"; // Updated import
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50rem" }}
    >
      <Form
        onSubmit={handleSubmit}
        style={{ width: "50rem", backgroundColor: "#556678", padding: "2rem" }}
      >
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", background: "white" }}
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </InputGroup.Text>
          </InputGroup>
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
