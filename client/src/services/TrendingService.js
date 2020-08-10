import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateTrendingMovies() {
    console.log("Im in trending service");

    const url = CONSTANTS.API_URL + '/movie-list/trending';

    return axios.get(url);
}
