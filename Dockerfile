# ── ÉTAPE 1 : Builder (installation complète) ────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ── ÉTAPE 2 : Runner (production uniquement) ─────────────
FROM node:22-alpine AS runner

LABEL org.opencontainers.image.title="healthAI-api"
LABEL org.opencontainers.image.description="Backend API pour le projet healthAI"
LABEL org.opencontainers.image.vendor="MSPR Team"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/TEAM-MSPR-EPSI/healthAI-backend-API"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.created="2026-06-16T12:00:00+02:00"

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app .

EXPOSE 5000

CMD ["npm", "start"]