const express = require("express");
const router = express.Router();

router.get('/trending', getTrending);
router.get('/most-watched', getMostWatched)
router.get('/most-favorite', getMostFavorite)

module.exports = router;

function getTrending(res, req, next) {
    // to be implemented
    res.status(200).json({})
}

function getMostWatched(res, req, next) {
    // to be implemented
    res.status(200).json({})
}

function getMostFavorite(res, req, next) {
    // to be implemented
    res.status(200).json({})
}