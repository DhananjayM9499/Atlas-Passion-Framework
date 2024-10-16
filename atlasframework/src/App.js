import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AtlasSearch from "./Atlas/SearchEngine/AtlasSearch";
import About from "./Atlas/Component/About";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AtlasSearch />} />
          <Route path="/aboutUs" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
