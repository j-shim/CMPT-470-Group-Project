exports.up = function (knex) {
  return knex.raw('INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `hash`) VALUES\
    (1, "test", "user", "test1", "$2a$10$1DAgUNkv1wPcdx18ALl8qu4ViTi6KVso13uR0iHlb597CL0SaXxLm"),\
    (2, "test", "user", "test2", "$2a$10$AYwVaZW9OOEVeyAZjxkyVui1yZgHhvX4Cmu9.B.5Xl7b8/kH0acOe"),\
    (3, "test", "user", "test3", "$2a$10$TVNMwaRDktQ3cwVOha3Wt.2cxoO8uTs30D8Mt8pr7i9u0gByFMPFC"),\
    (4, "test", "user", "test4", "$2a$10$IyC7qiWnH0qP0YMpQe6gPe.fxWFBM2gorvan3Rg2YHFTAD9OYQITq"),\
    (5, "test", "user", "test5", "$2a$10$SOYQTP3h6C05fDVhDrk4fO6lzjZjytEczdaN9pxeBTZ1JzLvc4OCu");'
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