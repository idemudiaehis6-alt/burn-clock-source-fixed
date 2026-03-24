export default function ProgressBar({ progress, dailyTotal }) {
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>Day progress</span>
        <span>{progress.toFixed(1)}% of today gone</span>
      </div>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="progress-foot">
        <span>00:00</span>
        <span>daily load {dailyTotal}</span>
        <span>24:00</span>
      </div>
    </div>
  );
}
