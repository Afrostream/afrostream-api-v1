FROM node:6.11
MAINTAINER Marc Dassonneville <marcdassonneville@afrostream.tv>

WORKDIR /usr/app

# installing dependencies
COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock
RUN yarn

# we add our code
COPY . .

EXPOSE 3002

# best practice: call node directly.
CMD ["node", "server.js"]
