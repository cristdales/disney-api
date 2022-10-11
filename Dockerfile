FROM node:14

ARG script=start

ENV script=$script

EXPOSE 4000

WORKDIR /challenge

RUN npm install i npm@latest -g

COPY package.json package.lock*.json ./

RUN npm install

COPY . . 

CMD npm run $script

