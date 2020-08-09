#!/usr/bin/env bash

# make sure current working directory is project's root folder
echo 'Enter MySQL root password (should prompt twice)'
mysql -u root -p < server/scripts/db_init.sql
echo 'Running "source db_init.sql" ... Done.'
mysql -u root -p testdb < server/scripts/title_with_ratings.sql
echo 'Running "source title_with_ratings.sql" ... Done.'

knex --version &> /dev/null
if [ $? -eq 127 ]; then
  echo 'knex not installed. Running "npm install -g knex" ...'
  npm install -g knex
fi

cd server/config
knex migrate:rollback
knex migrate:latest

cd ../..