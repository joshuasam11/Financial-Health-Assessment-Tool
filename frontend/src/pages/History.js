import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/history").then((res) => setItems(res.data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "20px" }}>
          Past Financial Analyses
        </h2>

        {items.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center",
              color: "#555",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            No past analyses found.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Credit Score:</strong>{" "}
                    {item.credit_score}
                  </div>

                  <div style={{ marginBottom: "6px" }}>
                    <strong>Loan Readiness:</strong>{" "}
                    <span
                      style={{
                        color:
                          item.loan_readiness === "High"
                            ? "green"
                            : item.loan_readiness === "Moderate"
                            ? "orange"
                            : "red",
                        fontWeight: "500",
                      }}
                    >
                      {item.loan_readiness}
                    </span>
                  </div>

                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/history/${item.id}`)}
                  style={{
                    padding: "8px 14px",
                    background: "#1976D2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View Report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
