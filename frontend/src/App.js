import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import EmployeeDashboard from "./Employee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
