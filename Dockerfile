FROM node:9-alpine

ENV UPDATED 2018-07-05

WORKDIR /app
ADD package.json /app
RUN npm install
ADD . /app
EXPOSE 3000
CMD ["node", "server.js"]
