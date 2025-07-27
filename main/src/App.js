import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/others/Header";
import { Container } from "react-bootstrap";
import Films from "./screens/Films";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
