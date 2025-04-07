import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Menu from "./Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
