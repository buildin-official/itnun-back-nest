FROM node:18 AS builder

ENV NODE_ENV=production

RUN mkdir -p /vapp
WORKDIR /app

# COPY ./package.json yarn.lock ./.yarn ./node_modules ./

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ./.yarn ./.yarn

RUN yarn

COPY . .

RUN yarn build


FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

CMD [ "yarn", "start:prod" ]