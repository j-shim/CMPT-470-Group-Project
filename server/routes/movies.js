const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const uniqueRandomArray = require("unique-random-array");

const MovieTitle = require("../models/movieTitle");

const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "2eee6eebccdf970062dbd4c43dac66a6";

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
                console.log(genre);
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

            randomMovies = [];
            for (i = 0; i < filter.numMovies; i++) {
                randomMovie = random();

                let url = "".concat(
                    baseURL,
                    "search/movie?api_key=",
                    apiKey,
                    "&query=",
                    randomMovie.primaryTitle,
                    "&page=1&year=",
                    randomMovie.startYear
                );

                data = await fetch(encodeURI(url));
                dataJSON = await data.json();

                if (dataJSON.results.length > 0) {
                    randomMovie.overview = dataJSON.results[0].overview;
                    randomMovie.posterPath = dataJSON.results[0].poster_path;
                }

                randomMovies.push(randomMovie);
            }

            // console.log(randomMovies);
        })
        .catch((err) => {
            return next(err);
        });
}

// generateMovies();