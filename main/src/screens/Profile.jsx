import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Update with your actual Firebase config path

function Profile() {
  const { uid } = useParams(); // UID from URL
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserByUID = async () => {
      try {
        setLoading(true);
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfileUser(userSnap.data());
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Error loading user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserByUID();
  }, [uid]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!profileUser) return null;

  return (
    <div>
      <h1>{profileUser.username}'s Profile</h1>
      <p>Email: {profileUser.email}</p>
      {/* Add more user profile fields here */}
    </div>
  );
}

export default Profile;
