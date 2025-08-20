import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Profile({ currentUser }) {
  const { uid } = useParams(); // UID from URL
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwnProfile = currentUser && currentUser.uid === uid;

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
      <h1>
        {isOwnProfile ? "Your Profile" : `${profileUser.username}'s Profile`}
      </h1>
      <p>Email: {profileUser.email}</p>

      {isOwnProfile ? (
        <div>
          <p>This is your personal profile. You can edit your info here.</p>
          {/* Add settings, edit buttons, etc. */}
        </div>
      ) : (
        <div>
          <p>This is a public view of {profileUser.username}'s profile.</p>
          {/* Show public-facing info like their lists, films, etc. */}
        </div>
      )}
    </div>
  );
}

export default Profile;
