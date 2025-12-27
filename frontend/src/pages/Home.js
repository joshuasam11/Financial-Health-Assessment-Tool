import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f6f8",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Financial Health Assessment
        </h1>

        <p style={{ color: "#555", marginBottom: "30px" }}>
          Get AI-powered insights into your business finances,
          creditworthiness, and growth readiness.
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link
            to="/login"
            style={{
              padding: "10px 18px",
              background: "#1976D2",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Login
          </Link>

          <Link
            to="/signup"
            style={{
              padding: "10px 18px",
              border: "1px solid #1976D2",
              color: "#1976D2",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
