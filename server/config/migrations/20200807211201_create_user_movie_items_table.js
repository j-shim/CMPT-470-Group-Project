exports.up = function (knex) {
    return knex.schema.createTable('user_movie_items', (t) => {
        t.increments('id').unsigned().primary();
        t.integer('userId').notNull().references('id').inTable('users');
        t.string('tconst').notNull();
        t.boolean('isWatched');
        t.boolean('isFavorite');
    }).then(() => {
        console.log('Successfully created user_movie_items table')
        // return knex('user_movie_items').columnInfo().then((info) => {
        //     console.log(info);
        // })
    }).catch(err => {
        console.error(err)
    })
};

exports.down = function (knex) {
    return knex.raw('DROP table user_movie_items').then(() => {
        console.log("Successfully dropped user_movie_items table")
    }).catch(err => {
      console.error(err)
    })
};