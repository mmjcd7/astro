# astro

Sample marketing site inspired by unifi.com.my, built with Astro and served by nginx.

- `npm run dev` — local dev server
- `npm run build` — static output in `dist/`
- Pushing to `main` builds the image and pushes it to `ghcr.io/mmjcd7/astro:latest` (GitHub Actions)
- Deployed to the local k3s cluster by ArgoCD from `mmjcd7/claude-gitops` (`apps/astro/`)
