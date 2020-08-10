const express = require("express");
const router = express.Router();

const uniqueRandomArray = require("unique-random-array");
const pickRandom = require("pick-random");
const movieRenderer = require("../helpers/movieRenderer");

const MovieTitle = require("../models/movieTitle");

router.post("/generate", generateMovies);

module.exports = router;

function generateMovies(req, res, next) {
  // console.log(req.body);

  let {
    type,
    isAdult,
    startAfter,
    endBefore,
    runtimeMinutes,
    genres,
    averageRating,
    numVotes,
    titleIncludes,
    numMovies,
  } = req.body;

  MovieTitle.query((qb) => {
      qb.where("titleType", type);
      if (!isAdult) qb.where("isAdult", isAdult);

      if (type === "tvSeries") {
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
      }

      if (type === "movie") {
        qb.where("startYear", ">=", startAfter);
        qb.where("startYear", "<=", endBefore);

        if (runtimeMinutes.from)
          qb.where("runtimeMinutes", ">=", runtimeMinutes.from);
        if (runtimeMinutes.to)
          qb.where("runtimeMinutes", "<=", runtimeMinutes.to);
      }

      for (genre of genres) {
        qb.where("genres", "like", "%" + genre + "%");
      }

      if (averageRating.from) qb.where("averageRating", ">=", averageRating.from);
      if (averageRating.to) qb.where("averageRating", "<=", averageRating.to);

      if (numVotes) qb.where("numVotes", ">=", numVotes);
      if (titleIncludes)
        qb.where("primaryTitle", "like", "%" + titleIncludes + "%");
    })
    .fetchAll()
    .then(async (results) => {
      if (numMovies > results.length) {
        numMovies = results.length;
      }

      let randomMovies = pickRandom(results.toJSON(), {
        count: numMovies
      });
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