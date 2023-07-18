FROM node:18

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json 

RUN npm ci

RUN npm install pm2@5.3.0 -g

COPY . .

RUN mkdir logs

ENTRYPOINT ["/bin/sh", "start.sh"]