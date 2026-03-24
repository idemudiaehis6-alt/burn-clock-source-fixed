export const DAYS_PER_MONTH = 30.44;
export const SECONDS_PER_DAY = 86400;

export function toAmount(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) && num > 0 ? num : 0;
}

export function getMonthlyTotal(expenses) {
  return expenses.reduce((sum, item) => sum + toAmount(item.amount), 0);
}

export function buildRates(monthlyTotal) {
  const perDay = monthlyTotal / DAYS_PER_MONTH;
  const perHour = perDay / 24;
  const perMinute = perHour / 60;
  const perSecond = perMinute / 60;

  return {
    monthly: monthlyTotal,
    perDay,
    perHour,
    perMinute,
    perSecond
  };
}

export function getDayStats(now = new Date()) {
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);

  const secondsSinceMidnight = (now.getTime() - midnight.getTime()) / 1000;
  const dayProgress = Math.min((secondsSinceMidnight / SECONDS_PER_DAY) * 100, 100);

  return {
    now,
    midnight,
    secondsSinceMidnight,
    dayProgress
  };
}

export function getBreakdownItems(expenses, monthlyTotal, secondsSinceMidnight) {
  return expenses
    .map((item) => {
      const monthly = toAmount(item.amount);
      const daily = monthly / DAYS_PER_MONTH;
      const share = monthlyTotal > 0 ? (monthly / monthlyTotal) * 100 : 0;
      const burnedToday = (secondsSinceMidnight / SECONDS_PER_DAY) * daily;

      return {
        ...item,
        monthly,
        daily,
        share,
        burnedToday
      };
    })
    .filter((item) => item.monthly > 0);
}
