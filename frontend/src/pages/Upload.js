import UploadBox from "../components/UploadBox";

export default function Upload() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          Upload Financial Data
        </h2>

        <p style={{ color: "#555", marginBottom: "30px" }}>
          Upload your financial CSV file to receive a detailed
          financial health analysis, insights, and recommendations.
        </p>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <UploadBox />
        </div>
      </div>
    </div>
  );
}
