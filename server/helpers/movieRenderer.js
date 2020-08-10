const fetch = require("node-fetch");

const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "2eee6eebccdf970062dbd4c43dac66a6";

module.exports = async function (movies) {
    let results = [];
    for (movie of movies) {
        const type = movie.titleType === 'movie' ? 'movie': 'tv'
        let url = "".concat(
            baseURL,
            "search/",
            type,
            "?api_key=",
            apiKey,
            "&query=",
            movie.primaryTitle,
            "&page=1&year=",
            movie.startYear
        );

        let data = await fetch(encodeURI(url));
        let dataJSON = await data.json();

        if (dataJSON.results.length > 0) {
            movie.overview = dataJSON.results[0].overview;
            movie.posterPath = dataJSON.results[0].poster_path;
        }

        results.push(movie);
    }

    return results;
}