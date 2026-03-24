import { useEffect, useMemo, useRef, useState } from 'react';
import ClockScreen from './components/ClockScreen';
import SetupScreen from './components/SetupScreen';
import { CURRENCIES } from './data/currencies';
import { CATEGORY_ICONS, DEFAULT_EXPENSES } from './data/defaultExpenses';
import {
  buildRates,
  getBreakdownItems,
  getDayStats,
  getMonthlyTotal,
  toAmount
} from './utils/calculations';
import { loadState, saveState } from './utils/storage';

function sanitizeExpenses(expenses) {
  return expenses
    .map((item, index) => ({
      id: item.id ?? Date.now() + index,
      name: typeof item.name === 'string' ? item.name.trimStart() : '',
      amount: typeof item.amount === 'string' ? item.amount : String(item.amount ?? ''),
      icon: CATEGORY_ICONS.includes(item.icon) ? item.icon : CATEGORY_ICONS[index % CATEGORY_ICONS.length]
    }))
    .filter((item) => item.name || toAmount(item.amount) > 0);
}

function getInitialTheme(savedTheme) {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export default function App() {
  const [savedState] = useState(() => (typeof window !== 'undefined' ? loadState() : null));
  const [view, setView] = useState(savedState?.view === 'clock' ? 'clock' : 'setup');
  const [theme, setTheme] = useState(() => getInitialTheme(savedState?.theme));
  const [currency, setCurrency] = useState(savedState?.currency || 'USD');
  const [expenses, setExpenses] = useState(() =>
    sanitizeExpenses(savedState?.expenses?.length ? savedState.expenses : DEFAULT_EXPENSES)
  );
  const [tick, setTick] = useState(0);
  const loadTimeRef = useRef(Date.now());
  const nextIdRef = useRef(
    Math.max(100, ...expenses.map((item) => Number(item.id) || 0)) + 1
  );

  useEffect(() => {
    if (view !== 'clock') return undefined;
    const timer = window.setInterval(() => setTick((value) => value + 1), 100);
    return () => window.clearInterval(timer);
  }, [view]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    saveState({ view, theme, currency, expenses });
  }, [view, theme, currency, expenses]);

  const currentCurrency = useMemo(
    () => CURRENCIES.find((item) => item.code === currency) || CURRENCIES[0],
    [currency]
  );

  const monthlyTotal = useMemo(() => getMonthlyTotal(expenses), [expenses]);
  const rates = useMemo(() => buildRates(monthlyTotal), [monthlyTotal]);
  const currentDate = useMemo(() => new Date(), [tick]);
  const dayStats = useMemo(() => getDayStats(currentDate), [currentDate]);

  const spentToday = dayStats.secondsSinceMidnight * rates.perSecond;
  const secondsOpen = (Date.now() - loadTimeRef.current) / 1000;
  const spentOpen = secondsOpen * rates.perSecond;

  const breakdownItems = useMemo(
    () => getBreakdownItems(expenses, monthlyTotal, dayStats.secondsSinceMidnight),
    [expenses, monthlyTotal, dayStats.secondsSinceMidnight]
  );

  function handleChangeExpense(id, field, value) {
    setExpenses((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function handleAddExpense() {
    const icon = CATEGORY_ICONS[(nextIdRef.current - 100) % CATEGORY_ICONS.length];
    setExpenses((current) => [
      ...current,
      { id: nextIdRef.current++, name: '', amount: '', icon }
    ]);
  }

  function handleRemoveExpense(id) {
    setExpenses((current) => current.filter((item) => item.id !== id));
  }

  function handleStart() {
    loadTimeRef.current = Date.now();
    setView('clock');
  }

  function handleSettings() {
    setView('setup');
  }

  function handleToggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  return view === 'setup' ? (
    <SetupScreen
      expenses={expenses}
      currency={currency}
      currencyOptions={CURRENCIES}
      symbol={currentCurrency.symbol}
      total={monthlyTotal}
      rates={rates}
      theme={theme}
      onToggleTheme={handleToggleTheme}
      onChangeCurrency={setCurrency}
      onChangeExpense={handleChangeExpense}
      onAddExpense={handleAddExpense}
      onRemoveExpense={handleRemoveExpense}
      onStart={handleStart}
    />
  ) : (
    <ClockScreen
      symbol={currentCurrency.symbol}
      currentDate={currentDate}
      rates={rates}
      spentToday={spentToday}
      spentOpen={spentOpen}
      secondsOpen={secondsOpen}
      dayProgress={dayStats.dayProgress}
      breakdownItems={breakdownItems}
      theme={theme}
      onToggleTheme={handleToggleTheme}
      onSettings={handleSettings}
    />
  );
}
