import { CATEGORY_ICONS } from '../data/defaultExpenses';

function nextIcon(currentIcon) {
  const index = CATEGORY_ICONS.indexOf(currentIcon);
  if (index === -1) return CATEGORY_ICONS[0];
  return CATEGORY_ICONS[(index + 1) % CATEGORY_ICONS.length];
}

export default function ExpenseRow({ expense, symbol, onChange, onRemove }) {
  return (
    <div className="expense-row">
      <button
        type="button"
        className="icon-button"
        onClick={() => onChange(expense.id, 'icon', nextIcon(expense.icon))}
        aria-label={`Change icon for ${expense.name || 'expense'}`}
      >
        {expense.icon}
      </button>

      <input
        className="expense-name"
        value={expense.name}
        onChange={(event) => onChange(expense.id, 'name', event.target.value)}
        placeholder="Expense name"
      />

      <label className="amount-field">
        <span>{symbol}</span>
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={expense.amount}
          onChange={(event) => onChange(expense.id, 'amount', event.target.value)}
          placeholder="0"
        />
      </label>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(expense.id)}
        aria-label={`Remove ${expense.name || 'expense'}`}
      >
        ✕
      </button>
    </div>
  );
}
