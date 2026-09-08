# Project Guidelines for Claude Code

Stack: Python Backend (FastAPI/Uvicorn), Next.js Frontend (App Router, TypeScript), Supabase (Auth, Postgres, Storage), Vercel.

---

## 1. Development & Build Commands

### Frontend (`/frontend`)
- Install deps: `pnpm install` (or `npm install`)
- Dev server: `pnpm dev`
- Build check: `pnpm build`
- Lint & format: `pnpm lint` / `pnpm prettier --write .`
- Run tests: `pnpm test`
- Run single test: `pnpm test path/to/file.test.tsx`

### Backend (`/backend`)
- Activate env: `source .venv/bin/activate`
- Run dev server: `uvicorn main:app --reload --port 8000`
- Lint & format: `ruff check --fix .` && `ruff format .` (or `black .` + `flake8`)
- Run tests: `pytest`
- Run single test: `pytest tests/test_endpoint.py::test_case_name`

### Database & Supabase
- Supabase local dev: `npx supabase start`
- Generate TS types: `npx supabase gen types typescript --local > ../frontend/types/supabase.ts`
- Create migration: `npx supabase migration new <migration_name>`

---

## 2. Architecture & Code Style

### Next.js (Frontend)
- Use **Next.js App Router** with strict TypeScript.
- Default to **React Server Components (RSC)**; only add `'use client'` when state, event handlers, or browser APIs are required.
- Do not make direct database queries on the client side; interact via Server Actions, Supabase client with RLS, or the Python API.
- Tailwind CSS for styling. Avoid inline styles.

### Python (Backend)
- Use type hints everywhere (`typing` / Python 3.10+ native pipe syntax `str | None`).
- Use Pydantic v2 for request validation and response schemas.
- Keep business logic isolated in service layers; keep router functions thin.
- Handle asynchronous I/O with `async`/`await` for DB/network calls.

### Supabase & Auth
- Security: Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend or client-facing responses. Use only `SUPABASE_ANON_KEY` on client.
- Auth: Always verify JWT / Session tokens on the Python backend using Supabase JWT secret or JWKS public key.
- Database: Enforce **Row Level Security (RLS)** on all tables created in Supabase. Never leave a table public without explicit RLS policies.
- Storage: Upload client files directly using signed URLs generated from the backend or authenticated Supabase Storage client.

---

## 3. Workflow & Deployment Rules (Vercel)

- Ensure `pnpm build` passes before pushing frontend changes to prevent Vercel preview/production build failures.
- Do not commit `.env`, `.env.local`, or secret credentials.
- Conventional commit format required: `feat:`, `fix:`, `refactor:`, `chore:`.