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

function App() {
  return (
    <div style={{ backgroundColor: "#14171c", minHeight: "300vh" }}>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/film/:id" element={<FilmDetailed />} />
          <Route path="/actor/:id" element={<ActorDetailed />} />
          <Route path="/director/:id" element={<DirectorDetailed />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/new" element={<NewList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
