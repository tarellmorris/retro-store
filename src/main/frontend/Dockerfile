FROM node:25-slim AS base

FROM base AS builder

COPY . ./frontend
WORKDIR /frontend
RUN rm -rf node_modules package-lock.json && npm i

CMD ["npx", "next", "build"]

FROM builder AS development
CMD ["npx", "next", "dev", "--webpack"]


FROM base AS production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]