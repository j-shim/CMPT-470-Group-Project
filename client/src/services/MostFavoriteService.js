import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateMostFavoriteMovies() {
    const url = CONSTANTS.API_URL + '/movie-list/most-favorite';

    return axios.get(url);
}
