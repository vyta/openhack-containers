FROM node:8-alpine

COPY . /app

WORKDIR  /app

ENV SQL_USER="adminuser" \
SQL_PASSWORD="changeme" \
SQL_SERVER="changeme.database.windows.net" \
SQL_DBNAME="mydrivingDB"

EXPOSE 8080

RUN npm install

CMD npm start