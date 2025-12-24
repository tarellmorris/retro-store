FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./

FROM base AS development
RUN npm ci
COPY . .
CMD ["npx", "next", "dev", "src/main/js"]


FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f package-lock.json ]; then npm run build:next; \
  else echo "Lockfile not found in build step." && exit 1; \
  fi

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/src/main/js/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src/main/js/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/src/main/js/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "src/main/js/server.js"]