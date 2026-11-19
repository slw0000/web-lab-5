FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . . 
RUN npm run build


FROM node:24-alpine AS runtime

WORKDIR /app

COPY --from=build --chown=node:node /app/.output ./.output
COPY --from=build --chown=node:node /app/package.json ./

USER node
EXPOSE 3000

CMD ["npm", "run", "start"]