import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Movies from "./Movies";
import EmployeeDashboard from "./Employee";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;