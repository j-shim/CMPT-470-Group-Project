import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateMostWatchedMovies() {
    const url = CONSTANTS.API_URL + '/movie-list/most-watched';

    return axios.get(url);
}
