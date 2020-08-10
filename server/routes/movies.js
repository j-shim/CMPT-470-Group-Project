const express = require("express");
const router = express.Router();

const uniqueRandomArray = require("unique-random-array");
const movieRenderer = require("../helpers/movieRenderer");

const MovieTitle = require("../models/movieTitle");

router.post("/generate", generateMovies);

module.exports = router;

function generateMovies(req, res, next) {
  console.log(req.body);

  const {
    type,
    isAdult,
    startAfter,
    endBefore,
    runtimeMinutes,
    genres,
    averageRating,
    numVotes,
    titleIncludes,
    numMovies
  } = req.body;

  MovieTitle.query((qb) => {
      // data
      qb.where("titleType", type);
      if (!isAdult) qb.where("isAdult", isAdult);

      if (startAfter) {
        qb.where(() => {
          qb.where("startYear", ">=", startAfter);
          qb.orWhereNull("startYear");
        });
      }
      if (endBefore) {
        qb.where(() => {
          qb.where("endYear", "<=", endBefore);
          qb.orWhereNull("endYear");
        });
      }

      if (type === 'movie') {
        if (runtimeMinutes.from)
          qb.where("runtimeMinutes", ">=", runtimeMinutes.from);
        if (runtimeMinutes.to)
          qb.where("runtimeMinutes", "<=", runtimeMinutes.to);
      }

      for (genre of genres) {
        qb.where("genres", "like", "%" + genre + "%");
      }

      if (averageRating.from)
        qb.where("averageRating", ">=", averageRating.from);
      if (averageRating.to)
        qb.where("averageRating", "<=", averageRating.to);

      if (numVotes) qb.where("numVotes", ">=", numVotes);
      if (titleIncludes)
        qb.where("primaryTitle", "like", "%" + titleIncludes + "%");
    })
    .fetchAll()
    .then(async (results) => {
      //Generate movies
      const random = uniqueRandomArray(results.toJSON());

      let randomMovies = [];
      for (i = 0; i < numMovies; i++) {
        randomMovies.push(random());
      }

      randomMovies = await movieRenderer(randomMovies);
      // console.log(randomMovies);

      return res.status(200).json({
        data: randomMovies,
      });
    })
    .catch((err) => {
      return next(err);
    });
}

// generateMovies();