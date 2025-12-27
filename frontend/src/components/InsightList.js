export default function InsightList({
  title,
  items,
  color,
  emptyText = "No data available",
}) {
  return (
    <div style={{ marginTop: "25px" }}>
      <h3 style={{ marginBottom: "10px" }}>
        {title}
      </h3>

      {items && items.length > 0 ? (
        <ul
          style={{
            paddingLeft: "18px",
            margin: 0,
          }}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              style={{
                color,
                marginBottom: "8px",
                lineHeight: "1.5",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            color: "#777",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {emptyText}
        </p>
      )}
    </div>
  );
}
