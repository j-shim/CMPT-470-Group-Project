const fetch = require("node-fetch");

const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "2eee6eebccdf970062dbd4c43dac66a6";

const Promise = require("bluebird")

module.exports = async function (movies) {
    let results = [];

    await Promise.map(movies, movie => {
        const type = movie.titleType === 'movie' ? 'movie' : 'tv'
        let url = "".concat(
            baseURL,
            "search/",
            type,
            "?api_key=",
            apiKey,
            "&query=",
            movie.originalTitle,
            "&page=1&year=",
            movie.startYear
        );

        return fetch(encodeURI(url)).then(data => {
            return data.json();
        }).then(dataJSON => {
            if (dataJSON.results && dataJSON.results.length > 0) {
                movie.overview = dataJSON.results[0].overview;
                movie.posterPath = dataJSON.results[0].poster_path;
            }

            results.push(movie);
        })
    });

    return results;
}