# Use official Node.js LTS image
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY config.env ./

EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
