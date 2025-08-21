import React from "react";
import { Container } from "react-bootstrap";

function ProfilePublic({ user }) {
  return (
    <div>
      <Container>
        <h1>{user.username}'s Profile</h1>
        <p>Email: {user.email}</p>
        <p>This is a public view of the user.</p>
        {/* Add lists, reviews, follow button, etc. */}
      </Container>
    </div>
  );
}

export default ProfilePublic;
