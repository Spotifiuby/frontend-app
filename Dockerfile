FROM node:16

EXPOSE 19000 19002 19006

WORKDIR /opt/spotifiuby-mobile-app

COPY package.json yarn.lock ./

RUN yarn ci

CMD ["yarn", "web"]
