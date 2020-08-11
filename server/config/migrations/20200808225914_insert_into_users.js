exports.up = function (knex) {
  return knex.raw('INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `hash`) VALUES\
    (1, "test", "user", "test1", "$2a$10$Hm5o6Sec13.BwVVMO2yxoO9bf5Lo5h33RLnBNfQdJAR07rDkM4T1e"),\
    (2, "test", "user", "test2", "$2a$10$oIEAAsTHqXZPJFUwQc1I4evik7L7nPDjRI99nud6JqeYTh07ru/Gq"),\
    (3, "test", "user", "test3", "$2a$10$pFwfijadnZGyLsKLbyasNuwi7vLnpPJXorUP0Re6u.VbZsT4EqwLm"),\
    (4, "test", "user", "test4", "$2a$10$ciMzBuChwrLind9XP77x2OkW2EP6V71rr/o.Hkcam7o1JcdOxMzDO"),\
    (5, "test", "user", "test5", "$2a$10$nQCNkUbwgOUtxf8MQT305eVeeEJiddbbLluq1thS8WLNg3w0/wWaG");'
  )
    .then(() => {
      console.log("Successfully inserted into users table")
      // return knex('users').columnInfo().then((info) => {
      //   console.log(info)
      // })
    }).catch(err => {
      console.error(err)
    })
}

exports.down = function (knex) {
  return knex.raw('DELETE FROM `users`;')
    .then(() => {
      console.log("Successfully deleted from users table")
    }).catch(err => {
      console.error(err)
    })
}