import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateTrendingMovies() {
    const url = CONSTANTS.API_URL + '/movie-list/trending';

    return axios.get(url);
}
