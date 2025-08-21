import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import ProfileSelf from "./ProfileSelf";
import ProfilePublic from "./ProfilePublic";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FavoriteFilms from "../../components/profile/FavoriteFilms";
import Activity from "../../components/profile/Activity";
import FilmsWatched from "../../components/profile/FilmsWatched";
import UserReviews from "../../components/profile/UserReviews";
import Diary from "../../components/profile/Diary";
import Watchlist from "../../components/profile/Watchlist";
import RecentActivity from "../../components/profile/RecentActivity";
import "../../css/Profile.css";
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

  return (
    <>
      {isOwnProfile ? (
        <ProfileSelf user={profileUser} />
      ) : (
        <ProfilePublic user={profileUser} />
      )}

      <ProfileTabs />
    </>
  );
}

function ProfileTabs() {
  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile" tabClassName="tab-content">
          <FavoriteFilms />
          <RecentActivity />
        </Tab>
        <Tab eventKey="activity" title="Activity">
          <Activity />
        </Tab>
        <Tab eventKey="films" title="Films">
          <FilmsWatched />
        </Tab>
        <Tab eventKey="diary" title="Diary">
          <Diary />
        </Tab>
        <Tab eventKey="userReviews" title="Reviews">
          <UserReviews />
        </Tab>
        <Tab eventKey="watchlist" title="Watchlist">
          <Watchlist />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ProfileRouter;
