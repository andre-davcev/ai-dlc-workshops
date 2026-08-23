FROM node:20-alpine AS deps
WORKDIR /app
# better-sqlite3 is a native module and needs a build toolchain on Alpine
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV SQLITE_DB_PATH=/app/data/tasks.db
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Mount point for the persistent EBS-backed volume holding the SQLite file
# (see aidlc-docs/construction/backend/infrastructure-design/)
VOLUME ["/app/data"]

EXPOSE 3000
CMD ["node", "server.js"]
