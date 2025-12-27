import { useState } from "react";
import { signupUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("User already exists");
      } else {
        alert("Signup failed. Backend error.");
        console.error(err);
      }
    }
  };

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
          padding: "35px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Create an account
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={submit}
            style={{
              padding: "10px",
              background: "#1976D2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Signup
          </button>
        </div>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#1976D2", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
