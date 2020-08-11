exports.up = function (knex) {
  return knex.raw('INSERT INTO `user_movie_items` (`id`, `userId`, `tconst`, `isWatched`, `isFavorite`) VALUES\
    (1, 1, "tt5816682", 0, 0),\
    (2, 2, "tt0073114", 1, 0),\
    (3, 3, "tt0354595", 0, 1),\
    (4, 4, "tt6324614", 1, 1),\
    (5, 5, "tt5540992", 0, 0),\
    (6, 5, "tt4173170", 0, 1);'
  )
    .then(() => {
      console.log("Successfully inserted into user_movie_items table")
      // return knex('user_movie_items').columnInfo().then((info) => {
      //   console.log(info)
      // })
    }).catch(err => {
      console.error(err)
    })
}

exports.down = function (knex) {
  return knex.raw('DELETE FROM `user_movie_items`;')
    .then(() => {
      console.log("Successfully deleted from user_movie_items table")
    }).catch(err => {
      console.error(err)
    })
}