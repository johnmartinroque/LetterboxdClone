import React from "react";

function ProfilePublic({ user }) {
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>This is a public view of the user.</p>
      {/* Add lists, reviews, follow button, etc. */}
    </div>
  );
}

export default ProfilePublic;
