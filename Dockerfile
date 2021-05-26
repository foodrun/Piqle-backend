FROM node:16

COPY . ./app

WORKDIR /app

RUN npm update --force
RUN npm install
RUN npm run build

CMD ["node", "build/server.js"]
