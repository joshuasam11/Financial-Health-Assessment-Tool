import { useState } from "react";
import { uploadFinancials } from "../api";
import { useNavigate } from "react-router-dom";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const upload = async () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    try {
      setLoading(true);
      const res = await uploadFinancials(file);
      localStorage.setItem("analysis", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to analyze file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "flex-start",
      }}
    >
      {/* File input */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* File name preview */}
      {file && (
        <div style={{ fontSize: "14px", color: "#555" }}>
          Selected file: <strong>{file.name}</strong>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={upload}
        disabled={loading}
        style={{
          padding: "10px 18px",
          background: loading ? "#aaa" : "#1976D2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "500",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Financial Data"}
      </button>

      {/* Helper text */}
      <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
        Upload a CSV file containing revenue, expenses, cash flow,
        and balance sheet data.
      </p>
    </div>
  );
}
