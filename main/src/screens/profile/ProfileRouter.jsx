import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import ProfileSelf from "./ProfileSelf";
import ProfilePublic from "./ProfilePublic";

function ProfileRouter({ currentUser }) {
  const { uid } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwnProfile = currentUser && currentUser.uid === uid;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfileUser({ id: snap.id, ...snap.data() });
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!profileUser) return null;

  return isOwnProfile ? (
    <ProfileSelf user={profileUser} />
  ) : (
    <ProfilePublic user={profileUser} />
  );
}

export default ProfileRouter;
