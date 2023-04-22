FROM node:18-slim

RUN apt update && apt upgrade -y

COPY . /app
WORKDIR /app

RUN rm -rf node_modules \
  && npm install

EXPOSE 9100

CMD [ "node", "prometheus-exporter.js" ]
