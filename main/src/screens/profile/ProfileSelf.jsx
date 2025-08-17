import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ProfileSelf({ user }) {
  const navigate = useNavigate("");

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>This view is editable.</p>
      {/* Add edit buttons, settings, etc. */}
      <Link to={`/settings`}>Edit Profile</Link>
    </div>
  );
}

export default ProfileSelf;
