import React from "react";

function ProfileSelf({ user }) {
  return (
    <div>
      <h1>Your Profile</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>This view is editable.</p>
      {/* Add edit buttons, settings, etc. */}
    </div>
  );
}

export default ProfileSelf;
