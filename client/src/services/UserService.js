import axios from 'axios'

import CONSTANTS from '../constants/constants'

export default {
  login,
  register
}

function login(payload) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = CONSTANTS.API_URL + '/users/authenticate'

  return axios.post(url, payload, options)
}

function register(payload) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = CONSTANTS.API_URL + '/users/register'

  return axios.post(url, payload, options)
}