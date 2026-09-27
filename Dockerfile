# Stage 1: install deps and build the server bundle (seed is inlined at build time)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321 \
    DATABASE_PATH=/app/data/emdash.db UPLOADS_DIR=/app/data/uploads
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
