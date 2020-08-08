import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateMovies(filters) {
    const options = {
        headers: { 'Content-Type': 'application/json' }
    }

    const url = CONSTANTS.API_URL + '/movies/generate';

    return axios.post(url, filters, options)
}
