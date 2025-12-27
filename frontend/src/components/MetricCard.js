export default function MetricCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "18px",
        width: "190px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h4
        style={{
          margin: 0,
          marginBottom: "8px",
          color: "#555",
          fontWeight: "500",
        }}
      >
        {title}
      </h4>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#111",
        }}
      >
        {value}
      </div>
    </div>
  );
}
