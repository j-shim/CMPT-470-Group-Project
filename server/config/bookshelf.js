const config = require("./knexfile.js")

let knex
if (process.env.NODE_ENV === 'production') {
  knex = require('knex')(config.production)
} else {
  knex = require('knex')(config.development)
}

module.exports = require('bookshelf')(knex)