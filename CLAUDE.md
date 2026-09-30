# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Atelier Store: a Next.js 16 (App Router) eCommerce app, currently at the scaffold stage. Stack: TypeScript, Tailwind CSS v4, Better Auth, Drizzle ORM, Postgres on Neon. Package manager is **pnpm**.

Next.js 16 differs from older versions. Check `node_modules/next/dist/docs/` (`01-app/` covers the App Router) before using any Next.js API.

## Commands

```bash
pnpm dev             # dev server (also regenerates AGENTS.md)
pnpm build           # production build
pnpm lint            # ESLint (flat config: next core-web-vitals + typescript)
pnpm typecheck       # `next typegen` then `tsc --noEmit`
pnpm auth:generate   # regenerate Better Auth tables into src/db/schema.ts
pnpm db:push         # push schema to the DB directly (dev)
pnpm db:generate     # generate SQL migrations into drizzle/
pnpm db:migrate      # apply migrations
pnpm db:studio       # Drizzle Studio
```

There is no test framework yet.

## Setup

Copy `.env.example` to `.env.local` and set `DATABASE_URL` (use Neon's pooled URL) and `BETTER_AUTH_SECRET`. `drizzle.config.ts` loads `.env.local` itself through `dotenv`. Next.js loads it for the app.

## Architecture

- **DB client** (`src/db/index.ts`): Drizzle on the Neon **HTTP** driver (`drizzle-orm/neon-http`), with the whole schema passed in so the relational query API (`db.query.*`) works. The module throws at import time if `DATABASE_URL` is missing. The HTTP driver has no interactive transactions, so use `db.batch([...])` for atomic multi-statement writes.
- **Schema** (`src/db/schema.ts`): the single schema file for both drizzle-kit and Better Auth. `pnpm auth:generate` writes to this file and can overwrite it. Once you add app tables (products, orders, etc.), either move them into separate modules that `schema.ts` re-exports, or review the diff after every regeneration.
- **Auth**: `src/lib/auth.ts` is the server instance (Drizzle adapter, `pg` provider, `nextCookies()` plugin so Server Actions can set cookies). It is mounted as a catch-all at `src/app/api/auth/[...all]/route.ts`. `src/lib/auth-client.ts` is the React client and reads `NEXT_PUBLIC_APP_URL`. Rerun `pnpm auth:generate` after adding Better Auth plugins that need new tables.
- **Types**: `LayoutProps<"/">` and `PageProps` are global route types that `next typegen` generates. Run `pnpm typecheck` (not bare `tsc`) so they exist.
- Import alias: `@/*` → `src/*`.

## Design

Use the design system (`src\app\globals.css`) when building store front pages.
