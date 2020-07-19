# CMPT 470 Group Project

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
mysql -u root
set names 'utf8mb4';
source /path/to/project/server/db_init.sql
source /path/to/project/server/data/title_with_ratings.sql
```

Testing Bookshelf/Knex:

```bash
cd server/public/scripts
node test_movie_titles.js
```
