export function formatMoney(value, symbol, options = {}) {
  const {
    tiny = 6,
    small = 4,
    medium = 2,
    large = 2,
    useGrouping = true
  } = options;

  const abs = Math.abs(value);
  let decimals = medium;

  if (abs >= 10000) {
    decimals = large;
  } else if (abs >= 1000) {
    decimals = large;
  } else if (abs >= 10) {
    decimals = small;
  } else if (abs >= 1) {
    decimals = small;
  } else {
    decimals = tiny;
  }

  return `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping
  })}`;
}

export function formatCompactMoney(value, symbol) {
  return `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function splitLiveNumber(formattedValue) {
  const decimalMatch = formattedValue.match(/([.,])(\d+)$/);

  if (!decimalMatch) {
    return { stable: formattedValue, fast: '' };
  }

  const decimalDigits = decimalMatch[2];

  if (decimalDigits.length <= 2) {
    return { stable: formattedValue, fast: '' };
  }

  const splitPoint = formattedValue.length - (decimalDigits.length - 2);

  return {
    stable: formattedValue.slice(0, splitPoint),
    fast: formattedValue.slice(splitPoint)
  };
}

export function formatClock(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function formatDate(date) {
  return date.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}
