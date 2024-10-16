import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AtlasSearch from "./Atlas/SearchEngine/AtlasSearch";
import About from "./Atlas/About/About";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<AtlasSearch />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
