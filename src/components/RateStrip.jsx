export default function RateStrip({ items }) {
  return (
    <div className="rate-strip">
      {items.map((item) => (
        <div key={item.label} className="rate-card">
          <div className="rate-value">{item.value}</div>
          <div className="rate-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
