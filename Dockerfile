FROM node:lts-alpine3.18 as base
RUN apk add --no-cache graphicsmagick git
WORKDIR /app

FROM base AS yarn
RUN corepack enable
RUN corepack prepare yarn@stable --activate

FROM yarn as backend
COPY ./backend .
RUN yarn
RUN yarn prettier
RUN yarn lint
RUN yarn test
RUN yarn build

FROM yarn AS frontend
COPY ./frontend .
RUN yarn
RUN yarn prettier
RUN yarn lint
RUN yarn build

FROM base
ENV DOCKER=true \
    NODE_ENV=production
COPY --from=backend /app/node_modules ./backend/node_modules
COPY --from=backend /app/dist ./backend/dist
COPY --from=frontend /app/dist ./frontend/dist

EXPOSE 3000

ENTRYPOINT ["node", "/app/backend/dist/index.js"]
