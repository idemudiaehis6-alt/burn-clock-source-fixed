import BreakdownPanel from './BreakdownPanel';
import ProgressBar from './ProgressBar';
import RateStrip from './RateStrip';
import {
  formatClock,
  formatCompactMoney,
  formatDate,
  formatMoney,
  splitLiveNumber
} from '../utils/format';

const TRUTH_LINES = [
  { limit: 0.01, text: 'The meter started at midnight. You were asleep.' },
  { limit: 1,    text: 'Not even a cup of tea. The clock started without asking.' },
  { limit: 3,    text: 'A bus ride. Already spent before you checked your phone.' },
  { limit: 8,    text: 'A coffee and a half. Just existing.' },
  { limit: 15,   text: 'A decent lunch. Your morning already cost that much.' },
  { limit: 30,   text: 'Enough for a full tank of petrol. Before noon.' },
  { limit: 60,   text: 'Your streaming subscriptions — for the month — already covered. Today.' },
  { limit: 100,  text: 'A very good dinner for two. Burned while you worked.' },
  { limit: 200,  text: 'A short-haul flight worth of money. Just today.' },
  { limit: 400,  text: 'The cost of existing is not trivial. This is just Tuesday.' },
  { limit: Infinity, text: 'You have expensive taste in being alive. The clock agrees.' }
];

function getTruthLine(value) {
  return TRUTH_LINES.find((item) => value < item.limit)?.text ?? TRUTH_LINES.at(-1).text;
}

export default function ClockScreen({
  symbol,
  currentDate,
  rates,
  spentToday,
  spentOpen,
  secondsOpen,
  dayProgress,
  breakdownItems,
  theme,
  onToggleTheme,
  onSettings
}) {
  const liveValue = formatMoney(spentToday, symbol, {
    tiny: 6,
    small: 4,
    medium: 4,
    large: 2
  });
  const liveSplit = splitLiveNumber(liveValue);
  const themeLabel = theme === 'dark' ? 'Dark' : 'Light';

  const rateItems = [
    { label: 'second', value: formatMoney(rates.perSecond, symbol) },
    { label: 'minute', value: formatMoney(rates.perMinute, symbol, { tiny: 4, small: 4, medium: 4 }) },
    { label: 'hour', value: formatMoney(rates.perHour, symbol, { tiny: 2, small: 2, medium: 2 }) },
    { label: 'day', value: formatMoney(rates.perDay, symbol, { tiny: 2, small: 2, medium: 2 }) }
  ];

  const formattedBreakdown = breakdownItems.map((item) => ({
    ...item,
    monthly: formatCompactMoney(item.monthly, symbol),
    daily: formatCompactMoney(item.daily, symbol),
    burnedToday: formatMoney(item.burnedToday, symbol, { tiny: 4, small: 4, medium: 4 }),
    share: item.share.toFixed(1)
  }));

  return (
    <div className="screen clock-screen">
      <div className="page-noise" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      <header className="app-header">
        <div>
          <div className="brand-row brand-row--small">
            <h1>Burn Clock</h1>
            <span className="live-dot">private monitor</span>
          </div>
          <div className="date-line">{formatDate(currentDate)}</div>
        </div>

        <div className="header-actions">
          <button type="button" className="outline-button theme-toggle" onClick={onToggleTheme}>
            <span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '◐' : '◑'}</span>
            <span>{themeLabel} mode</span>
          </button>
          <button type="button" className="outline-button" onClick={onSettings}>
            Adjust
          </button>
        </div>
      </header>

      <main className="clock-main">
        <div className="clock-time">{formatClock(currentDate)}</div>

        <div className="hero-shell">
          <div className="hero-kicker">burned today</div>
          <div className="hero-number" aria-live="polite">
            <span className="hero-number-stable">{liveSplit.stable}</span>
            <span className="hero-number-fast">{liveSplit.fast}</span>
          </div>
          <div className="hero-label">since midnight · live</div>
        </div>

        <div className="truth-line">{getTruthLine(spentToday)}</div>

        <RateStrip items={rateItems} />

        <ProgressBar
          progress={dayProgress}
          dailyTotal={formatMoney(rates.perDay, symbol, { tiny: 2, small: 2, medium: 2 })}
        />

        <div className="opened-card">
          <div className="opened-label">Since you opened this tab</div>
          <div className="opened-value">
            {formatMoney(spentOpen, symbol, { tiny: 6, small: 4, medium: 4, large: 2 })}
          </div>
          <div className="opened-meta">
            {Math.floor(secondsOpen / 60)}m {Math.floor(secondsOpen % 60)}s and counting
          </div>
        </div>

        <BreakdownPanel
          items={formattedBreakdown}
          monthlyTotalLabel={formatCompactMoney(rates.monthly, symbol)}
        />
      </main>
    </div>
  );
}
