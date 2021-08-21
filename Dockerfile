FROM node:14

WORKDIR /usr/src/app

COPY server/package*.json yarn.lock ./
RUN yarn install --production

COPY server/ ./
COPY client/public ./public

EXPOSE 3000
CMD [ "node", "bin/app.js" ]