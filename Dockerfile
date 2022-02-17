FROM node:16.13.2-alpine3.15 as base
WORKDIR /app

FROM base AS backend_prod_dependencies
COPY ./backend .
RUN yarn --production=true

FROM backend_prod_dependencies as backend_builder
RUN yarn --production=false
RUN yarn build

FROM base AS frontend_builder
COPY ./frontend .
RUN yarn --production=false
RUN yarn build

FROM base
ENV DOCKER=true \
    NODE_ENV=production
COPY --from=backend_prod_dependencies /app/node_modules ./backend/node_modules
COPY --from=backend_builder /app/dist ./backend/dist
COPY --from=frontend_builder /app/dist ./frontend/dist

EXPOSE 3000

ENTRYPOINT ["node", "/app/backend/dist/index.js"]
