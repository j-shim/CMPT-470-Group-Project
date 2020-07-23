const MovieTitle = require("../models/movieTitle")

const Promise = require("bluebird")

// Promise.try(() => {
//   return MovieTitle.query(qb => {
//       qb.where('averageRating', '>', 8.0)
//       qb.andWhere('numVotes', '>', 100000)
//     })
//     .fetchAll()
//     .then(results => {
//       console.log(results.toJSON())
//     })
// })

async function fetchMovie() {
  const results = await MovieTitle.query(qb => {
    qb.where('tconst', 'tt0000675')
  }).fetchAll();

  console.log(results.toJSON());
}

fetchMovie();