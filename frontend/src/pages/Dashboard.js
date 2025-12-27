import { useState } from "react";
import MetricCard from "../components/MetricCard";
import InsightList from "../components/InsightList";
import MetricsChart from "../components/MetricsChart";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { downloadPDF } from "../utils/downloadPDF";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("analysis"));
  const [expanded, setExpanded] = useState(false);

  if (!data) {
    return (
      <div style={{ padding: "40px", color: "#555" }}>
        No analysis data found.
      </div>
    );
  }

  const { metrics, forecast, ai_insights } = data;


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ================= HEADER ================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ margin: 0 }}>Financial Health Dashboard</h2>

          <button
            onClick={() => navigate("/history")}
            style={{
              padding: "8px 14px",
              background: "#1976D2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            View Past Activity
          </button>
        </div>

        {/* ================= METRIC CARDS ================= */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <MetricCard title="Credit Score" value={metrics.credit_score} />
          <MetricCard title="Profit" value={`₹${metrics.profit}`} />
          <MetricCard title="Cash Flow" value={`₹${metrics.cash_flow}`} />
          <MetricCard title="Debt Ratio" value={metrics.debt_ratio} />
          {metrics.leverage_ratio !== null && (
            <MetricCard
              title="Leverage Ratio"
              value={metrics.leverage_ratio}
            />
          )}
        </div>

        {/* ================= CHARTS ================= */}
        <div style={{ marginBottom: "30px" }}>
          <MetricsChart metrics={metrics} />
        </div>

        {/* ================= LOAN READINESS ================= */}
        <h3 style={{ marginBottom: "10px" }}>
          Loan Readiness:{" "}
          <span
            style={{
              fontWeight: "bold",
              color:
                metrics.loan_readiness === "High"
                  ? "green"
                  : metrics.loan_readiness === "Moderate"
                  ? "orange"
                  : "red",
            }}
          >
            {metrics.loan_readiness}
          </span>
        </h3>

        {/* ================= RULE-BASED INSIGHTS ================= */}
        <InsightList
          title="Health Summary"
          items={metrics.health_summary}
          color="green"
        />

        <InsightList
          title="Risk Flags"
          items={metrics.risk_flags}
          color="red"
          emptyText="No major financial risks detected."
        />

        <InsightList
          title="Recommendations"
          items={metrics.recommendations}
          color="blue"
        />
        {/* ================= FORECAST ================= */}
{forecast && (
  <>
    <h3 style={{ marginTop: "40px", marginBottom: "10px" }}>
      Next Month Forecast (Predicted)
    </h3>

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "10px",
      }}
    >
      <MetricCard
        title="Predicted Revenue"
        value={`₹${forecast.revenue}`}
      />
      <MetricCard
        title="Predicted Expenses"
        value={`₹${forecast.expenses}`}
      />
      <MetricCard
        title="Predicted Cash Flow"
        value={`₹${forecast.cash_in - forecast.cash_out}`}
      />
    </div>

    <p style={{ fontSize: "13px", color: "#777" }}>
      Forecasts are indicative and based on historical trends.
    </p>
  </>
)}

        {/* ================= AI TL;DR ================= */}
        <div
          style={{
            background: "#E3F2FD",
            padding: "15px",
            marginTop: "30px",
            borderRadius: "6px",
          }}
        >
          <strong>AI Summary:</strong>{" "}
          {ai_insights
            ? ai_insights.split("\n")[0]
            : "AI insights unavailable. Showing rule-based analysis."}
        </div>

        {/* ================= AI REPORT ================= */}
        <h3 style={{ marginTop: "35px" }}>
          AI Financial Advisor Report
        </h3>

        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              padding: "8px 14px",
              borderRadius: "4px",
              border: "1px solid #1976D2",
              background: "white",
              color: "#1976D2",
              cursor: "pointer",
            }}
          >
            {expanded ? "Collapse Report" : "Expand Full Report"}
          </button>

          <button
            onClick={downloadPDF}
            style={{
              marginLeft: "10px",
              padding: "8px 14px",
              borderRadius: "4px",
              border: "none",
              background: "#1976D2",
              color: "white",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>

        {expanded && (
          <div
            id="ai-report"
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "8px",
              maxHeight: "600px",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {ai_insights}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
