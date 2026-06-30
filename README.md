# Cultivation Game Backend

Node/Express backend for the cultivation game. It owns the Supabase service key and exposes safe API endpoints for the frontend.

Current backend coverage:

- Supabase connection health checks
- Demo save creation/loading/reset
- Demo actions for cultivation, alchemy, planting, forging, and the first mouse cave battle stub

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Fill `.env` with the real Supabase service role key before checking database health.

## Environment

```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
SUPABASE_URL=https://zpplrhsocohdjyodnmqi.supabase.co
SUPABASE_SERVICE_ROLE_KEY=
```

Do not commit `.env`.

## Health checks

- `GET /health` checks whether required Supabase config is present.
- `GET /health/db` checks whether the Supabase REST endpoint accepts the configured key.

## Demo save table

Run migrations before using the demo save API:

```bash
npm run db:migrate
```

This reads `DATABASE_URL` from `.env` and applies SQL files in `supabase/migrations`.

Demo endpoints:

- `GET /demo/save`
- `POST /demo/action` with `{ "action": "cultivate" }`
- `POST /demo/reset`
