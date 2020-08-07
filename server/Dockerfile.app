FROM node:lts
WORKDIR /code
# COPY wait.sh wait.sh
# RUN chmod +x wait.sh
COPY package*.json ./
RUN npm ci --only=production

# work around https://github.com/sass/node-sass/issues/1579
# RUN rm -rf node_modules/node-sass && npm install node-sass
COPY . .
RUN chmod +x wait.sh

RUN npm install -g knex
# RUN cd config && knex migrate:latest

# CMD ./wait.sh mongo 27017 \
#   && node populatedb mongodb://mongo/470e8 \
#   && npm run start:prod
CMD ./wait.sh db 3306 \
  && cd config && knex migrate:latest \
  && cd .. && npm start