FROM node:23-alpine
COPY package.json /app/
COPY src /app/
COPY package-lock.json /app/
WORKDIR /app

CMD ["node", "server.js"]