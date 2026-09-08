# 01: Infrastructure (Foundations)

**What to build:** The end-to-end connection between the core technologies. A user can visit the Next.js site and see a "Hello from Backend" message fetched from the Python service, with all three pillars (Next.js, FastAPI, Supabase) communicating.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Initialize Next.js frontend in `packages/frontend`
- [ ] Initialize FastAPI backend in `packages/backend`
- [ ] Implement a simple "Hello World" endpoint in FastAPI
- [ ] Implement a fetch call in Next.js to display the backend message
- [ ] Setup a basic Docker Compose or local dev script to run both services simultaneously
- [ ] Verify connectivity from the browser
