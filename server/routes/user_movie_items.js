const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const Promise = require("bluebird");

const movieRenderer = require('../helpers/movieRenderer');
const UserMovieItem = require("../models/userMovieItem");
const User = require('../models/user')

router.get('/list', getMovieItems);
router.post('/add', addMovieItem);
router.delete('/remove', removeMovieItem);
router.put('/update', updateMovieItem);

module.exports = router;

async function getUserIdFromUsername(username) {
    const result = await User.query(qb => {
        qb.where('username', username)
    }).fetch()

    return result.toJSON()['id'];
}

function getMovieItems(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) return next(err);
        const username = decoded.sub
        const userId = await getUserIdFromUsername(username);

        UserMovieItem.query(qb => {
                qb.where('userId', userId);
                qb.leftJoin('title_with_ratings', 'user_movie_items.tconst', '=', 'title_with_ratings.tconst')
                qb.select('*')
            }).fetchAll()
            .then(async (results) => {
                // console.log(results.toJSON());
                results = await movieRenderer(results.toJSON());

                return res.status(200).json({
                    data: results.sort((a, b) => b.averageRating - a.averageRating)
                })
            }).catch(err => {
                return next(err);
            })
    })
}

function addMovieItem(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) return next(err);
        const username = decoded.sub
        const userId = await getUserIdFromUsername(username);
        const {
            tconst
        } = req.body;

        Promise.try(() => {
            return UserMovieItem.where({
                userId: userId,
                tconst: tconst
            }).fetchAll()
        }).then(results => {
            if (results.length > 0) {
                // console.log('duplicated')

                return res.status(201).json({
                    message: 'Duplicated movie item'
                })
            } else {
                return UserMovieItem.forge({
                        userId: userId,
                        tconst: tconst
                    }).save()
                    .then(() => {
                        // console.log('created')

                        return res.status(201).json({
                            message: 'Movie added to list'
                        })
                    });
            }
        }).catch((err) => {
            return next(err);
        })
    })
}

function removeMovieItem(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) return next(err);
        const username = decoded.sub
        const userId = await getUserIdFromUsername(username);
        const {
            tconst
        } = req.body;

        Promise.try(() => {
            return UserMovieItem.where({
                userId: userId,
                tconst: tconst
            }).fetchAll()
        }).then(results => {
            if (results.length === 0) {
                // console.log('not found')
                return res.status(204).json({
                    message: 'Movie item not found'
                })
            } else {
                return UserMovieItem.where({
                        userId: userId,
                        tconst: tconst
                    }).destroy()
                    .then(() => {
                        // console.log('deleted')
                        return res.status(200).json({
                            message: 'Successfully deleted movie item'
                        })
                    });
            }
        }).catch(err => {
            return next(err);
        })
    })
}

function updateMovieItem(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) return next(err);
        const username = decoded.sub
        const userId = await getUserIdFromUsername(username);
        const obj = req.body;

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
                // console.log('not found')
                return res.status(204).json({
                    message: 'Movie item not found'
                })
            } else {
                return UserMovieItem.where({
                        userId: userId,
                        tconst: obj.tconst
                    }).save(column, obj[column], {
                        method: 'update'
                    })
                    .then(() => {
                        // console.log('updated')
                        return res.status(200).json({
                            message: 'Successfully updated movie item'
                        })
                    });
            }
        }).catch(err => {
            return next(err);
        })
    })
}


// getMovieItems();
// addMovieItem();
// removeMovieItem();
// updateMovieItem();