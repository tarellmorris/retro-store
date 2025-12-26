FROM node:20.19.6-alpine3.22 AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app


FROM base AS builder

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npx", "next", "build"]

FROM base AS development
WORKDIR /app

ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

WORKDIR /app/src/main/js

CMD ["npx", "next", "dev"]


FROM base AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/src/main/js/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src/main/js/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/src/main/js/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "src/main/js/server.js"]