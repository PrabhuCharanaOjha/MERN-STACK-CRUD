import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/partial/Navbar";
import { Home } from "./components/Home.js";
import { Edit } from "./components/Edit.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
