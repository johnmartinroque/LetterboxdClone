import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authenticationActions";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, user } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (check1 && check2) {
      try {
        dispatch(registerUser(email, username, password));
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please accept the terms and privacy policy.");
    }
  };

  useEffect(() => {});

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: "50rem" }}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
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

        <Form.Group controlId="formCheck">
          <Form.Check
            type="checkbox"
            label="I'm at least 16 years old and accept the Terms of Use."
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId="formCheck">
          <Form.Check
            type="checkbox"
            label="
I accept the Privacy Policy and consent to the processing of my personal information in accordance with it."
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default CreateAccount;
