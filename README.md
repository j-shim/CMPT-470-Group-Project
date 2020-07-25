# CMPT 470 Group Project

## Checkpoint

For the checkpoint, we have worked on: <br />
-Set up the back-end environment <br />
-Set up the MySQL environment with some data <br />
-Implemented a login/register system for our movie web application <br />
-Created a simple UI of our dashboard with moies displaying after user logs in <br />
-Created a simple "Trending" filter for now that displays different movie selections depending on the filter applied

## Running Dev Server

For React on http://localhost:3000/:

```bash
cd client
npm install
npm start
```

For Express on http://localhost:3001/:

```bash
cd server
npm install
npm run dev
```

Populating database:

```bash
sudo mysql -u root
set names 'utf8mb4';
source full/path/to/project/server/data/db_init.sql
source full/path/to/project/server/data/title_with_ratings.sql
```

Testing Bookshelf/Knex:

```bash
cd server/scripts
node test_movie_titles.js
```

Knex migration:

```bash
npm i knex -g
cd config
knex migrate:latest
knex migrate:rollback (nuke all tables)
```
