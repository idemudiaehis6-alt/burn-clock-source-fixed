import ExpenseRow from './ExpenseRow';
import { formatCompactMoney, formatMoney } from '../utils/format';

export default function SetupScreen({
  expenses,
  currency,
  currencyOptions,
  symbol,
  total,
  rates,
  theme,
  onToggleTheme,
  onChangeCurrency,
  onChangeExpense,
  onAddExpense,
  onRemoveExpense,
  onStart
}) {
  const activeExpenses = expenses.filter((item) => item.name?.trim() || Number(item.amount) > 0).length;
  const themeLabel = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <div className="screen setup-screen">
      <div className="page-noise" aria-hidden="true" />

      <header className="app-header app-header--setup">
        <div className="header-topline">
          <div>
            <div className="brand-row">
              <h1>Burn Clock</h1>
              <span className="live-dot">private monitor</span>
            </div>
            <p className="subcopy">
              Enter your monthly expenses. Watch them drain in real time — per second, per minute, since midnight.
            </p>
          </div>

          <button type="button" className="outline-button theme-toggle" onClick={onToggleTheme}>
            <span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '◐' : '◑'}</span>
            <span>{themeLabel} mode</span>
          </button>
        </div>
      </header>

      <main className="screen-body">
        <section className="section-block section-block--intro">
          <div className="mini-stat-grid">
            <div className="mini-stat-card">
              <span className="mini-stat-label">Monthly load</span>
              <strong className={`mini-stat-value ${total > 0 ? 'mini-stat-value--active' : ''}`}>
                {formatCompactMoney(total, symbol)}
              </strong>
            </div>

            <div className="mini-stat-card">
              <span className="mini-stat-label">Active entries</span>
              <strong className="mini-stat-value">{activeExpenses}</strong>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-row">
            <div className="section-label">Currency</div>
            <div className="section-note">Choose the frame of reference.</div>
          </div>

          <div className="currency-grid">
            {currencyOptions.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`pill ${currency === item.code ? 'pill--active' : ''}`}
                onClick={() => onChangeCurrency(item.code)}
              >
                {item.symbol} {item.code}
              </button>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-row">
            <div className="section-label">Monthly expenses</div>
            <div className="section-note">Only the recurring costs. Keep it honest.</div>
          </div>

          <div className="expense-list">
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                symbol={symbol}
                onChange={onChangeExpense}
                onRemove={onRemoveExpense}
              />
            ))}
          </div>

          <button type="button" className="ghost-button" onClick={onAddExpense}>
            + Add entry
          </button>
        </section>
      </main>

      <footer className="sticky-footer">
        <div className="footer-total-row">
          <span>Monthly load</span>
          <span className={`footer-total ${total > 0 ? 'footer-total--active' : ''}`}>
            {formatCompactMoney(total, symbol)}
          </span>
        </div>

        {total > 0 && (
          <div className="footer-rates">
            <span>{formatMoney(rates.perDay, symbol, { medium: 2, small: 2, tiny: 2 })}/day</span>
            <span>·</span>
            <span>{formatMoney(rates.perHour, symbol, { medium: 3, small: 3, tiny: 3 })}/hr</span>
            <span>·</span>
            <span>{formatMoney(rates.perSecond, symbol)}/sec</span>
          </div>
        )}

        <button type="button" className="primary-button" disabled={total <= 0} onClick={onStart}>
          {total > 0 ? 'Start the clock →' : 'Enter at least one expense'}
        </button>
      </footer>
    </div>
  );
}
