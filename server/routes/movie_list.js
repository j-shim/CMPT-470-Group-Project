const express = require("express");
const {
    knex
} = require("../config/bookshelf");
const router = express.Router();

const MovieTitle = require('../models/movieTitle')
const movieRenderer = require('../helpers/movieRenderer')

router.get('/trending', getTrending);
router.get('/most-watched', getMostWatched)
router.get('/most-favorite', getMostFavorite)

module.exports = router;

function getTrending(req, res, next) {
    let movieItems = knex.select('tconst')
        .count('* as count')
        .from('user_movie_items')
        .groupBy('tconst')
        .as('movie_items')

    // let results = knex.select('*')
    //     .from('title_with_ratings')
    //     .rightJoin(movieItems, 'movie_items.tconst', 'title_with_ratings.tconst')
    //     .orderBy('count', 'desc')

    // console.log(results.toString());

    MovieTitle.query(qb => {
        qb.rightJoin(movieItems, 'movie_items.tconst', 'title_with_ratings.tconst')
        qb.orderBy('count', 'desc')
        qb.select('*')
    }).fetchAll().then(async (results) => {
        // console.log(results.toJSON())

        res.status(200).json({
            data: await movieRenderer(results.toJSON().slice(0, 50))
        })
    }).catch(err => {
        return next(err);
    })
}

function getMostWatched(req, res, next) {
    let movieItems = knex.select('tconst')
        .count('* as count')
        .from('user_movie_items')
        .groupBy('tconst')
        .where('isWatched', true)
        .as('movie_items')

    MovieTitle.query(qb => {
        qb.rightJoin(movieItems, 'movie_items.tconst', 'title_with_ratings.tconst')
        qb.orderBy('count', 'desc')
        qb.select('*')
    }).fetchAll().then(async (results) => {
        // console.log(results.toJSON())

        res.status(200).json({
            data: await movieRenderer(results.toJSON().slice(0, 50))
        })
    }).catch(err => {
        return next(err);
    })
}

function getMostFavorite(req, res, next) {
    let movieItems = knex.select('tconst')
        .count('* as count')
        .from('user_movie_items')
        .groupBy('tconst')
        .where('isFavorite', true)
        .as('movie_items')

    MovieTitle.query(qb => {
        qb.rightJoin(movieItems, 'movie_items.tconst', 'title_with_ratings.tconst')
        qb.orderBy('count', 'desc')
        qb.select('*')
    }).fetchAll().then(async (results) => {
        // console.log(results.toJSON())

        res.status(200).json({
            data: await movieRenderer(results.toJSON().slice(0, 50))
        })
    }).catch(err => {
        return next(err);
    })
}

// getTrending();
// getMostWatched();
// getMostFavorite();