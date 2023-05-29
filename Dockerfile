FROM node:18-alpine AS builder

ENV NODE_ENV=production

RUN mkdir -p /app
WORKDIR /app

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# COPY ./package.json yarn.lock ./.yarn ./node_modules ./

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ./.yarn ./.yarn

RUN yarn

COPY . .

RUN yarn build


FROM node:18-alpine

WORKDIR /app

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

ENV NODE_ENV=production

COPY --from=builder /app ./

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["doppler", "run", "--", "yarn", "start:prod"]
