import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/others/Header";
import { Container } from "react-bootstrap";
import Films from "./screens/Films";
import FilmDetailed from "./screens/FilmDetailed";
import ActorDetailed from "./screens/ActorDetailed";
import "./css/App.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/film/:id" element={<FilmDetailed />} />
          <Route path="/actor/:id" element={<ActorDetailed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
