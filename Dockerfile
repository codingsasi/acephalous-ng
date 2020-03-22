FROM node:alpine AS frontend

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY --from=frontend /app/dist/ng/* /usr/share/nginx/html/