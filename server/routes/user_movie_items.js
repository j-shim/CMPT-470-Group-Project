const express = require("express");
const router = express.Router();

const Promise = require("bluebird");

const movieRenderer = require('../helpers/movieRenderer');
const UserMovieItem = require("../models/userMovieItem");


router.get('/list', getMovieItems);
router.post('/add', addMovieItem);
router.delete('/remove', removeMovieItem);
router.put('/update', updateMovieItem);

module.exports = router;

function getMovieItems(req, res, next) {
    //Verify username and get userId

    const userId = 1;

    UserMovieItem.query(qb => {
            qb.where('userId', userId);
            qb.leftJoin('title_with_ratings', 'user_movie_items.tconst', '=', 'title_with_ratings.tconst')
            qb.select('*')
        }).fetchAll()
        .then(async (results) => {
            console.log(results.toJSON());
            // return res.json({
            //     data: await movieRenderer(results.toJSON())
            // })
        }).catch(err => {
            return next(err);
        })
}

function addMovieItem(req, res, next) {
    //Verify username and get userId

    const userId = 1;
    const tconst = 'tt0270803';

    Promise.try(() => {
        return UserMovieItem.where({
            userId: userId,
            tconst: tconst
        }).fetchAll()
    }).then(results => {
        if (results.length > 0) {
            console.log('duplicated')

            // return res.status(409).json({
            //     message: 'Duplicate movie item'
            // })
        } else {
            return UserMovieItem.forge({
                    userId: userId,
                    tconst: tconst
                }).save()
                .then(() => {
                    console.log('created')

                    // return res.status(201).json({
                    //     message: 'Successfully created movie item'
                    // })
                });
        }
    }).catch((err) => {
        return next(err);
    })
}

function removeMovieItem(req, res, next) {
    //Verify username and get userId

    const userId = 1;
    const tconst = 'tt0270803';

    Promise.try(() => {
        return UserMovieItem.where({
            userId: userId,
            tconst: tconst
        }).fetchAll()
    }).then(results => {
        if (results.length === 0) {
            console.log('not found')
            // return res.status(204).json({
            //     message: 'Movie item not found'
            // })
        } else {
            return UserMovieItem.where({
                    userId: userId,
                    tconst: tconst
                }).destroy()
                .then(() => {
                    console.log('deleted')
                    // return res.status(200).json({
                    //     message: 'Successfully deleted movie item'
                    // })
                });
        }
    }).catch(err => {
        return next(err);
    })
}

function updateMovieItem(req, res, next) {
    //Verify username and get userId

    const userId = 1;
    //req.body
    obj = {
        tconst: 'tt0270803',
        isFavorite: false
    }

    let column;
    for (key in obj) {
        if (key === 'isWatched' || key === 'isFavorite') {
            column = key;
            break;
        }
    }

    Promise.try(() => {
        return UserMovieItem.where({
            userId: userId,
            tconst: obj.tconst
        }).fetchAll()
    }).then(results => {
        if (results.length === 0) {
            console.log('not found')
            // return res.status(204).json({
            //     message: 'Movie item not found'
            // })
        } else {
            return UserMovieItem.where({
                    userId: userId,
                    tconst: obj.tconst
                }).save(column, obj[column], {
                    method: 'update'
                })
                .then(() => {
                    console.log('updated')
                    // return res.status(200).json({
                    //     message: 'Successfully updated movie item'
                    // })
                });
        }
    }).catch(err => {
        return next(err);
    })
}

// getMovieItems();
// addMovieItem();
// removeMovieItem();
// updateMovieItem();