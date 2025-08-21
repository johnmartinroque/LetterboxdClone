import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import ProfileSelf from "./ProfileSelf";
import ProfilePublic from "./ProfilePublic";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../css/Profile.css";

const FavoriteFilms = lazy(() =>
  import("../../components/profile/FavoriteFilms")
);
const Activity = lazy(() => import("../../components/profile/Activity"));
const FilmsWatched = lazy(() =>
  import("../../components/profile/FilmsWatched")
);
const UserReviews = lazy(() => import("../../components/profile/UserReviews"));
const Diary = lazy(() => import("../../components/profile/Diary"));
const Watchlist = lazy(() => import("../../components/profile/Watchlist"));
const RecentActivity = lazy(() =>
  import("../../components/profile/RecentActivity")
);

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
  const [activeKey, setActiveKey] = useState("profile");

  const renderTabContent = (key) => {
    switch (key) {
      case "profile":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <FavoriteFilms />
              <RecentActivity />
            </Suspense>
          </div>
        );
      case "activity":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <Activity />
            </Suspense>
          </div>
        );
      case "films":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <FilmsWatched />
            </Suspense>
          </div>
        );
      case "diary":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <Diary />
            </Suspense>
          </div>
        );
      case "userReviews":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <UserReviews />
            </Suspense>
          </div>
        );
      case "watchlist":
        return (
          <div className="tab-content">
            <Suspense fallback={<Spinner />}>
              <Watchlist />
            </Suspense>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        id="profile-tabs"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile" tabClassName="tab-content" />
        <Tab eventKey="activity" title="Activity" tabClassName="tab-content" />
        <Tab eventKey="films" title="Films" tabClassName="tab-content" />
        <Tab eventKey="diary" title="Diary" tabClassName="tab-content" />
        <Tab
          eventKey="userReviews"
          title="Reviews"
          tabClassName="tab-content"
        />
        <Tab
          eventKey="watchlist"
          title="Watchlist"
          tabClassName="tab-content"
        />
      </Tabs>

      {/* Render content inside div with the same class to apply scroll style */}
      {renderTabContent(activeKey)}
    </Container>
  );
}

export default ProfileRouter;
