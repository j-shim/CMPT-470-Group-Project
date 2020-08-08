const bookshelf = require('../config/bookshelf')

const User = bookshelf.model('User', {
  tableName: 'users',
  movieItems() {
    return this.hasMany("UserMovieItem", "userId");
  },
})

// Test-run MySQL connection with dummy query
User.query(qb => {
    qb.where('username', 'test')
  })
  .fetchAll()
  .then(results => {
    console.log('MySQL connection successful')
  })
  .catch(err => {
    console.error('MySQL connection error')
    console.error(err)
  })

module.exports = User