FROM node:17.9.1-alpine3.15
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json /opt/app/
RUN npm install --silent && npm i nodemon -g
COPY . /opt/app
RUN export NODE_ENV=production \
  && npm run build
EXPOSE 4000
CMD ["npm", "run", "start:prod"]