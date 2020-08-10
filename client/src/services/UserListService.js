import axios from 'axios'
import CONSTANTS from '../constants/constants'

export function generateUserList() {
  const options = {
      headers: { 'Content-Type': 'application/json' }
  }

  const url = CONSTANTS.API_URL + '/user-movie-items/list';

  return axios.get(url, options)
}
