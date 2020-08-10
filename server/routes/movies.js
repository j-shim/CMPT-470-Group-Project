const express = require("express");
const router = express.Router();

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

      if (startAfter) qb.where("startYear", ">=", startAfter);
      if (endBefore) qb.where("startYear", "<=", endBefore);

      if (type === "movie") {

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

      qb.orderByRaw('rand()')
      qb.limit(numMovies);
    })
    .fetchAll()
    .then(async (results) => {
      return res.status(200).json({
        data: await movieRenderer(results.toJSON()),
      });
    })
    .catch((err) => {
      return next(err);
    });
}

// generateMovies();