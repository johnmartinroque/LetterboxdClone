import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../actions/authenticationActions";
import { Spinner } from "react-bootstrap";

function Profile() {
  const { username } = useParams(); // URL parameter
  const dispatch = useDispatch();

  const { userInfo, loading, error } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  if (!userInfo) return null;

  // Compare the URL username to the logged-in user's username
  if (username !== userInfo.username) {
    return <div>Profile not found or unauthorized.</div>;
  }

  return (
    <div>
      <h1>{userInfo.username}'s Profile</h1>
      <p>Email: {userInfo.email}</p>
      {/* Add more profile info here if needed */}
    </div>
  );
}

export default Profile;
