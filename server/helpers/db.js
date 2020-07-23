const mysql = require('mysql')
const knex = require('../config/knexfile')

const db = mysql.createConnection(knex.development.connection)

db.connect(err => {
  if (err) {
    console.error('MySQL connection error')
    console.error(err.stack)
  } else {
    console.log('MySQL connection successful')
    console.log('Connection ID ' + db.threadId)
  }
})

db.query('DROP TABLE IF EXISTS `user`', (err, results, fields) => {
  if (err) throw err
  console.log('Results:')
  console.log(results)
  console.log('Fields:')
  console.log(fields)
})

db.query('CREATE TABLE IF NOT EXISTS `user` (\
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  `firstname` VARCHAR(255) NOT NULL,\
  `lastname` VARCHAR(255) NOT NULL,\
  `username` VARCHAR(255) NOT NULL,\
  `hash` VARCHAR(255) NOT NULL\
  )',
  (err, results, fields) => {
    if (err) throw err
    console.log('Results:')
    console.log(results)
    console.log('Fields:')
    console.log(fields)
  }
)

module.exports = db