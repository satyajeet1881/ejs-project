# Check out https://hub.docker.com/_/node to select a new base image
FROM mhart/alpine-node as EJS_PROJECT


WORKDIR /usr/src/app

COPY . .



RUN mkdir -p "yarn" \
    && mkdir -p "yarn-offline-mirror" \
    && yarn config set cache-folder "yarn" \
    && yarn config set yarn-offline-mirror "yarn-offline-mirror" \
    && yarn config set yarn-offline-mirror-pruning true

RUN yarn install --pure-lockfile --link-duplicates --ignore-scripts --prefer-offline \
    && rm -f .npmrc \
    && rm -f .yarnrc

# RUN cd client && yarn install --pure-lockfile --link-duplicates --ignore-scripts --prefer-offline
# RUN cd client && yarn run build    

RUN yarn build

FROM mhart/alpine-node:latest

# RUN addgroup -g 1000 node \
#     && adduser -u 1000 -G node -s /bin/sh -D node \
#     && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set to a non-root built-in user `node`
##USER node

WORKDIR /usr/src/app

COPY  --from=EJS_PROJECT /usr/src/app/package.json /usr/src/app/package.json
COPY  --from=EJS_PROJECT /usr/src/app/pm2.json /usr/src/app/pm2.json
COPY  --from=EJS_PROJECT /usr/src/app/node_modules /usr/src/app/node_modules
COPY  --from=EJS_PROJECT /usr/src/app/dist /usr/src/app/dist
COPY  --from=EJS_PROJECT /usr/src/app/build /usr/src/app/build

# Start Server
ENTRYPOINT ./node_modules/.bin/pm2-runtime start ./pm2.json --env $NODE_ENV

EXPOSE ${PORT}
