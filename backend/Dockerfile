
FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3333


CMD ["sh", "-c", "node seeding.js && node src/index.js"]  
