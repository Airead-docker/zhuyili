FROM node:9-alpine

WORKDIR /app
ADD package.json /app
RUN npm install
ADD . /app
EXPOSE 3000
CMD ["node", "server.js"]
