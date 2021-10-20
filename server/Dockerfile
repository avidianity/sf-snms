FROM node:16

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

RUN npm install -g @nestjs/cli

COPY . .

CMD [ "yarn", "start:dev" ]