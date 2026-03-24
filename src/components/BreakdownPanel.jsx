export default function BreakdownPanel({ items, monthlyTotalLabel }) {
  if (!items.length) return null;

  return (
    <section className="panel">
      <div className="panel-head">
        <span>Where it's going</span>
      </div>

      <div className="panel-body">
        {items.map((item) => (
          <div className="breakdown-row" key={item.id}>
            <div className="breakdown-top">
              <div className="breakdown-name-wrap">
                <span className="breakdown-icon">{item.icon}</span>
                <span className="breakdown-name">{item.name || 'Untitled expense'}</span>
              </div>
              <span className="breakdown-burn">{item.burnedToday}</span>
            </div>

            <div className="breakdown-bar">
              <div className="breakdown-bar-fill" style={{ width: `${item.share}%` }} />
            </div>

            <div className="breakdown-meta">
              <span>{item.monthly} / mo</span>
              <span>{item.daily} / day</span>
              <span>{item.share}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="panel-total">
        <span>Monthly load</span>
        <span>{monthlyTotalLabel}</span>
      </div>
    </section>
  );
}
