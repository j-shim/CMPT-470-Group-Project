// export const apiUrl = 'http://localhost:3001/'

const API_URL_DEV = 'http://localhost:3001'
const API_URL_PROD = '/api'

export default {
  TOKEN_KEY: '470userjwt',
  API_URL: process.env.NODE_ENV === 'production' ? API_URL_PROD : API_URL_DEV
}