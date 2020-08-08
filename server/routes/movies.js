const express = require("express");
const router = express.Router();

const uniqueRandomArray = require("unique-random-array");
const movieRenderer = require('../helpers/movieRenderer')

const MovieTitle = require("../models/movieTitle");

router.post("/generate", generateMovies);

module.exports = router;

function generateMovies(req, res, next) {
    // const filter = {
    //     type: "movie",
    //     isAdult: false,
    //     startAfter: 1950,
    //     endBefore: 2000,
    //     runtimeMinutes: {
    //         from: 60,
    //         to: 120,
    //     },
    //     genres: ["Drama", "History"],
    //     averageRating: {
    //         from: 6.0,
    //         to: 8.0,
    //     },
    //     numVotes: 1000,
    //     titleIncludes: null,
    //     numMovies: 10,
    // };

    const filter = {
        type: "movie",
        isAdult: false,
        startAfter: null,
        endBefore: null,
        runtimeMinutes: {
            from: null,
            to: null,
        },
        genres: [],
        averageRating: {
            from: null,
            to: null,
        },
        numVotes: null,
        titleIncludes: null,
        numMovies: 10,
    };

    MovieTitle.query((qb) => {
            //Filter data
            qb.where("titleType", filter.type);
            qb.where("isAdult", filter.isAdult);

            if (filter.startAfter) {
                qb.where(() => {
                    qb.where("startYear", ">=", filter.startAfter);
                    qb.orWhereNull("startYear");
                });
            }
            if (filter.endBefore) {
                qb.where(() => {
                    qb.where("endYear", "<=", filter.endBefore);
                    qb.orWhereNull("endYear");
                });
            }

            if (filter.runtimeMinutes.from)
                qb.where("runtimeMinutes", ">=", filter.runtimeMinutes.from);
            if (filter.runtimeMinutes.to)
                qb.where("runtimeMinutes", "<=", filter.runtimeMinutes.to);

            for (genre of filter.genres) {
                qb.where("genres", "like", "%" + genre + "%");
            }

            if (filter.averageRating.from)
                qb.where("averageRating", ">=", filter.averageRating.from);
            if (filter.averageRating.to)
                qb.where("averageRating", "<=", filter.averageRating.to);

            if (filter.numVotes) qb.where("numVotes", ">=", filter.numVotes);
            if (filter.titleIncludes)
                qb.where("primaryTitle", "like", "%" + filter.titleIncludes + "%");
        })
        .fetchAll()
        .then(async (results) => {
            //Generate movies
            const random = uniqueRandomArray(results.toJSON());

            let randomMovies = [];
            for (i = 0; i < filter.numMovies; i++) {
                randomMovies.push(random());
            }

            randomMovies = await movieRenderer(randomMovies);
            // console.log(randomMovies);

            return res.json({
                movieData: randomMovies
            });
        })
        .catch((err) => {
            return next(err);
        });
}

// generateMovies();