FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ build-essential
RUN ln -sf python3 /usr/bin/python
ENV PYTHON=/usr/bin/python3

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod"]
