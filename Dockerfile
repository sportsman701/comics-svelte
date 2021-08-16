FROM node:14

WORKDIR /usr/src/app

COPY server/package*.json yarn.lock ./
RUN yarn install --production

COPY server/ ./
RUN pwd
RUN ls -lha .
RUN ls -lha ./bin/

EXPOSE 3000
CMD [ "node", "bin/app.js" ]