# The server bundle includes its dependencies (ssr.noExternal in vite.config.ts), so dist/ is all it needs
FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY dist ./dist

USER node
EXPOSE 3000

CMD ["node", "dist/server/main.js"]
