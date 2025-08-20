import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/others/Header";
import Films from "./screens/Films";
import FilmDetailed from "./screens/FilmDetailed";
import ActorDetailed from "./screens/ActorDetailed";
import "./css/App.css";
import DirectorDetailed from "./screens/DirectorDetailed";
import Lists from "./screens/list/Lists";
import NewList from "./screens/list/NewList";
import Settings from "./screens/Settings";
import SignIn from "./components/authentication/SignIn";
import CreateAccount from "./components/authentication/CreateAccount";
import HeaderUser from "./components/others/HeaderUser";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import UserHome from "./screens/UserHome";
import "../src/css/App.css";

import ListDetailed from "./screens/list/ListDetailed";
import FilmReviews from "./screens/review/FilmReviews";
import ProfileRouter from "./screens/profile/ProfileRouter";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import AllFeaturedLists from "./screens/list/AllFeaturedLists";
import Footer from "./components/others/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Logged in user:", user?.uid);
      setCurrentUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  return (
    <div id="root">
      <div className="App">
        <Router>
          {currentUser ? <HeaderUser /> : <Header />}

          <Routes>
            <Route path="/" element={currentUser ? <UserHome /> : <Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/film/:id" element={<FilmDetailed />} />
            <Route path="/actor/:id" element={<ActorDetailed />} />
            <Route path="/director/:id" element={<DirectorDetailed />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/lists/featured" element={<AllFeaturedLists />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/user/:uid"
              element={<ProfileRouter currentUser={currentUser} />}
            />

            <Route path="/list/:id" element={<ListDetailed />} />
            <Route path="/film/:id/reviews" element={<FilmReviews />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute user={currentUser}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
