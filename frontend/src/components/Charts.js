export default function Charts({ data }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginTop: "20px",
        maxWidth: "400px",
      }}
    >
      <h4 style={{ marginBottom: "10px" }}>
        Cash Flow Overview
      </h4>

      <p style={{ margin: 0, color: "#555" }}>
        Net Cash Flow
      </p>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginTop: "5px",
          color: data.cash_flow >= 0 ? "green" : "red",
        }}
      >
        ₹{data.cash_flow}
      </p>

      <p style={{ fontSize: "13px", color: "#777", marginTop: "10px" }}>
        Represents the difference between total cash inflows and outflows
        for the selected period.
      </p>
    </div>
  );
}
