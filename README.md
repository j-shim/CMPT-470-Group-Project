# CMPT 470 Group Project

## Checkpoint

For the checkpoint, we have worked on:

- Set up the back-end environment
- Set up the MySQL environment with some data
- Implemented a login/register system for our movie web application
- Created a simple UI of our dashboard with moies displaying after user logs in
- Created a simple "Trending" filter for now that displays different movie selections depending on the filter applied


## Running Dev Server

### React Frontend on http://localhost:3000/:

```bash
cd client
npm install
npm start
```

### Express Backend on http://localhost:3001/:

```bash
cd server
npm install
npm run dev
```

### Database Setup

**Steps 1 and 2 in a single script** (Unix/Linux):

```bash
server/scripts/db_setup_linux.sh
```

**Step 1.** Populating database:

```bash
mysql -u root
source full/path/to/project/server/scripts/db_init.sql
source full/path/to/project/server/scripts/title_with_ratings.sql
```

**Step 2.** Knex migration:

```bash
npm i knex -g
cd server/config
knex migrate:latest

# knex migrate:rollback (nuke all tables)
```

**Optional.** Testing Bookshelf/Knex:

```bash
cd server/scripts
node test_movie_titles.js
```
