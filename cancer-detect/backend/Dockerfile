FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=5000

ENV ENV MODEL_URL=https://storage.googleapis.com/sub-mlgc1/model-prod/model.json

CMD [ "npm", "start" ]
