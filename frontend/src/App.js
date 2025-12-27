import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/NavBar";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
// 🔒 Auth guard
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with Navbar */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Upload />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
  path="/history"
  element={
    <PrivateRoute>
      <History />
    </PrivateRoute>
  }
/>
<Route path="/history/:id" element={<PrivateRoute><HistoryDetail /></PrivateRoute>} />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Reports />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
