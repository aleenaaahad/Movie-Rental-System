
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Movies from "./Movies";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;
