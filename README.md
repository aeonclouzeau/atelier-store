# Atelier Store

Next.js (App Router) eCommerce app.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS v4
- Better Auth
- Drizzle ORM
- Postgres on Neon (`@neondatabase/serverless`, HTTP driver)

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
pnpm auth:generate           # write the Better Auth tables into src/db/schema.ts
pnpm db:push                 # or: pnpm db:generate && pnpm db:migrate
pnpm dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts  Better Auth route handler
  db/index.ts                     Drizzle client (Neon)
  db/schema.ts                    Drizzle schema
  lib/auth.ts                     Better Auth server instance
  lib/auth-client.ts              Better Auth React client
drizzle/                          Generated migrations
drizzle.config.ts                 drizzle-kit config (reads .env.local)
```

## Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `pnpm dev`           | Start dev server                         |
| `pnpm build`         | Production build                         |
| `pnpm lint`          | ESLint                                   |
| `pnpm typecheck`     | Generate route types and run `tsc`       |
| `pnpm auth:generate` | Generate Better Auth tables for Drizzle  |
| `pnpm db:generate`   | Generate SQL migrations from the schema  |
| `pnpm db:migrate`    | Apply migrations                         |
| `pnpm db:push`       | Push the schema directly (dev)           |
| `pnpm db:studio`     | Open Drizzle Studio                      |
