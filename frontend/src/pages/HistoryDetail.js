import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/history/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#555" }}>
        Loading analysis...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Past Financial Analysis</h2>

          <button
            onClick={() => navigate("/history")}
            style={{
              padding: "8px 14px",
              background: "#1976D2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to History
          </button>
        </div>

        {/* Content Card */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.ai_insights}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
