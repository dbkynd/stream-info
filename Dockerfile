FROM node:lts-alpine3.18 as base
RUN apk add --no-cache graphicsmagick git
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./

FROM base AS yarn
RUN corepack enable && \
    corepack prepare yarn@stable --activate && \
    yarn plugin import workspace-tools

FROM yarn AS yarn_cache
COPY ./backend/package.json ./backend/
COPY ./frontend/package.json ./frontend/
RUN yarn

FROM yarn_cache AS backend_production_dependencies
WORKDIR /app/backend
COPY ./backend/package.json .
RUN yarn workspaces focus --production

FROM backend_production_dependencies as backend_development_dependencies
RUN yarn workspaces focus --all

FROM backend_development_dependencies AS backend_builder
COPY ./backend .
RUN yarn prettier && \
    yarn lint && \
    yarn test && \
    yarn build

#FROM yarn_cache as frontend_dependencies
#WORKDIR /app/frontend
#COPY ./frontend/package.json .
#RUN yarn workspaces focus --all

#FROM frontend_dependencies AS frontend_builder
#COPY ./frontend .
#RUN yarn prettier && \
#    yarn lint && \
#    yarn build

#FROM base
#ENV DOCKER=true \
#    NODE_ENV=production
#COPY --from=backend_production_dependencies /app/node_modules ./backend/node_modules
#COPY --from=backend_builder /app/dist ./backend/dist
#COPY --from=frontend /app/dist ./frontend/dist

#EXPOSE 3000

#ENTRYPOINT ["node", "/app/backend/dist/index.js"]
