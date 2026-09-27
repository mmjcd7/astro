import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';
import { github } from 'emdash/auth/providers/github';

// Public origin. Set EMDASH_SITE_URL at runtime (the k8s Deployment does).
const siteUrl = process.env.EMDASH_SITE_URL || 'http://astro.192.168.1.222.nip.io';
const host = new URL(siteUrl).hostname;
const dbPath = process.env.DATABASE_PATH || './data/emdash.db';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  site: siteUrl,
  security: {
    allowedDomains: [
      { hostname: host, protocol: 'http' },
      { hostname: host, protocol: 'https' },
    ],
  },
  vite: { server: { allowedHosts: [host] } },
  integrations: [
    react(),
    emdash({
      database: sqlite({ url: `file:${dbPath}` }),
      storage: local({
        directory: process.env.UPLOADS_DIR || './data/uploads',
        baseUrl: '/_emdash/api/media/file',
      }),
      // GitHub OAuth login: passkeys need HTTPS, this site is plain HTTP.
      // Needs EMDASH_OAUTH_GITHUB_CLIENT_ID / EMDASH_OAUTH_GITHUB_CLIENT_SECRET at runtime.
      authProviders: [github()],
      siteUrl,
    }),
  ],
});
