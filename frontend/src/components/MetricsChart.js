import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function MetricsChart({ metrics }) {
  const barData = {
    labels: ["Profit", "Cash Flow"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [metrics.profit, metrics.cash_flow],
        backgroundColor: ["#4CAF50", "#2196F3"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Debt", "Assets"],
    datasets: [
      {
        data: [
          metrics.debt_ratio,
          1 - metrics.debt_ratio,
        ],
        backgroundColor: ["#F44336", "#4CAF50"],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        marginTop: "30px",
        flexWrap: "wrap",
      }}
    >
      {/* ===== Bar Chart Card ===== */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "320px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>
          Profit vs Cash Flow
        </h4>
        <Bar data={barData} />
      </div>

      {/* ===== Doughnut Chart Card ===== */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "320px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>
          Debt Composition
        </h4>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
}
