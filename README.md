# astro

Sample marketing site inspired by unifi.com.my. Astro 7 (server output, Node adapter) with
[EmDash CMS](https://docs.emdashcms.com) managing the hero, fibre plans and mobile plans.

- `npm run dev` — dev server; admin at http://localhost:4321/_emdash/admin/
- `npm run build && npm start` — production server on port 4321
- `seed/seed.json` — content model plus starter content, applied on first start of an empty database
- Pushing to `main` builds the image and pushes it to `ghcr.io/mmjcd7/astro:latest` (GitHub Actions)
- Deployed to the local k3s cluster by ArgoCD from `mmjcd7/claude-gitops` (`apps/astro/`)

## Runtime environment

| Variable | Purpose |
|---|---|
| `EMDASH_SITE_URL` | Public origin, e.g. `http://astro.192.168.1.222.nip.io` |
| `DATABASE_PATH` | SQLite file, on a persistent volume |
| `UPLOADS_DIR` | Media uploads, on a persistent volume |
| `EMDASH_ENCRYPTION_KEY` | From `npx emdash secrets generate` |
| `EMDASH_OAUTH_GITHUB_CLIENT_ID` / `EMDASH_OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth app; callback `<site>/_emdash/api/auth/oauth/github/callback` |

Admin login uses GitHub because passkeys need HTTPS and this site is served over plain HTTP.
