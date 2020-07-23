const MovieTitle = require("../models/movieTitle")

const Promise = require("bluebird")

Promise.try(() => {
  return MovieTitle.query(qb => {
    qb.where('averageRating', '>', 8.0)
    qb.andWhere('numVotes', '>', 100000)
  })
    .fetchAll()
    .then(result => {
      console.log(result.toJSON())
    })
})

// async function fetchMovie() {
//     return MovieTitle.query(qb => {
//             qb.where('tconst', 'tt0000675')
//         })
//         .fetch()
//         .then(result => {
//             console.log(result.toJSON());
//         })
// }

// fetchMovie();