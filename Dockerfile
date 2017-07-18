FROM node:6.11
MAINTAINER Marc Dassonneville <marcdassonneville@afrostream.tv>

# use changes to package.json to force Docker not to use the cache
# @see https://stackoverflow.com/questions/35774714/how-to-cache-the-run-npm-install-instruction-when-docker-build-a-dockerfile
RUN mkdir -p /tmp/api-v1
COPY package.json /tmp/api-v1/package.json
COPY yarn.lock /tmp/api-v1/yarn.lock
RUN cd /tmp/api-v1 && yarn
RUN mkdir -p /opt/api-v1 && cp -a /tmp/api-v1/node_modules /opt/api-v1

# here, we add our code
WORKDIR /opt/api-v1
COPY . /opt/api-v1

EXPOSE 3002

# best practice: call node directly.
CMD ["node", "server.js"]
