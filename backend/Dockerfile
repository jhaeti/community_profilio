FROM node:18-alpine3.15

WORKDIR /backend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]