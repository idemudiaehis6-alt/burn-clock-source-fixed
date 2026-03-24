# Burn Clock

Your monthly expenses, running in real time. Per second. Since midnight.

Not a budget app. Not a tracker. Just a clock that makes the abstract feel physical.

-----

## What it does

You enter your fixed monthly costs — rent, food, transport, subscriptions. The clock converts that number into a live drain rate and runs it against the current time of day.

By 3pm you’ve already burned 62.5% of today’s load. The clock shows you that. In money. Updating every 100ms.

-----

## Stack

React 18 + Vite. No other dependencies.

-----

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

Works offline after install. The only internet dependency is Google Fonts — falls back to system fonts if you’re offline.

-----

## Deploy

```bash
npm run build
```

Drag the `dist/` folder to [netlify.com/drop](https://netlify.com/drop). Done. No backend, no env vars, no config.

-----

## How it saves state

localStorage. Your expenses and currency survive a page refresh. Nothing leaves your device.

-----

## Project structure

```
src/
  App.jsx                  — state, timer, view routing
  components/
    SetupScreen.jsx        — expense entry, currency select
    ClockScreen.jsx        — the live clock view
    BreakdownPanel.jsx     — per-expense burn since midnight
    ProgressBar.jsx        — day progress bar
    RateStrip.jsx          — per-second / minute / hour / day rates
    ExpenseRow.jsx         — single editable expense row
  data/
    currencies.js          — supported currency list
    defaultExpenses.js     — starter expenses + icon set
  utils/
    calculations.js        — rate math, day stats, breakdown
    format.js              — money formatting, number splitting
    storage.js             — localStorage read/write
  styles/
    globals.css            — resets and base
    theme.css              — dark + light CSS variables
    app.css                — component styles
```

-----

Built by I.G. Ehis
