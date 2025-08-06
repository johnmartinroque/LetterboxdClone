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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true); // Ready to render after auth check
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Router>
        {currentUser ? <HeaderUser /> : <Header />}

        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <UserHome />} />
          <Route path="/films" element={<Films />} />
          <Route path="/film/:id" element={<FilmDetailed />} />
          <Route path="/actor/:id" element={<ActorDetailed />} />
          <Route path="/director/:id" element={<DirectorDetailed />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/new" element={<NewList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
