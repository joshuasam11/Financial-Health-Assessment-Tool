import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.warn("Logout API failed (safe to ignore)");
    } finally {
      // 🔥 IMPORTANT: Clear token no matter what
      localStorage.removeItem("token");
      localStorage.removeItem("analysis");
      navigate("/login");
    }
  };

  if (!token) return null;

  return (
    <div
      style={{
        padding: "12px 24px",
        background: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* App Title */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "16px",
          color: "#1976D2",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Financial Health Tool
      </div>

      {/* Actions */}
      <button
        onClick={logout}
        style={{
          padding: "6px 14px",
          background: "white",
          color: "#d32f2f",
          border: "1px solid #d32f2f",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Logout
      </button>
    </div>
  );
}
