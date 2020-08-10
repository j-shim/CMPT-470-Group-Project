import axios from 'axios'

import CONSTANTS from '../constants/constants'

export default {
  login,
  register,
  getCurrentUser,
  editProfile
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

function getCurrentUser() {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = CONSTANTS.API_URL + '/users/current-user'

  return axios.post(url, {}, options)
}

function editProfile(payload) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = CONSTANTS.API_URL + '/users/edit-profile'

  return axios.post(url, payload, options)
}