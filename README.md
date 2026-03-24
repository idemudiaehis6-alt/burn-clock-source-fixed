# Burn Clock

Watch your monthly expenses drain in real time. Per second, per minute, since midnight.

## What was fixed in this version
- Truth lines rewritten — specific and visceral, not meditative
- Icons replaced with emoji (🏠🛒🚌 etc) instead of geometric shapes
- "Observed interval" → "Since you opened this tab"
- "living burn" → "burned today"
- "Begin reading" → "Start the clock"
- "Load breakdown" → "Where it's going"
- Setup copy tightened throughout

## Deploy (takes 2 minutes)

### Netlify (recommended — free)
1. Run `npm install` then `npm run build`
2. Drag the `dist/` folder to netlify.com/drop
3. Done. Live URL instantly.

### Vercel
```
npm install -g vercel
vercel --prod
```

### Any static host
```
npm install
npm run build
```
Upload the `dist/` folder. That's it. No backend, no server, no env vars needed.

## Local dev
```
npm install
npm run dev
```

## Stack
- React 18 + Vite
- No external dependencies beyond React
- localStorage persistence (state survives page refresh)
- Light + dark theme
