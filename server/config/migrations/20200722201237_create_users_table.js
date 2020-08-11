exports.up = function (knex) {
    return knex.raw('CREATE TABLE IF NOT EXISTS `users` (\
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        `firstname` VARCHAR(255) NOT NULL,\
        `lastname` VARCHAR(255) NOT NULL,\
        `username` VARCHAR(255) NOT NULL,\
        `hash` VARCHAR(255) NOT NULL\
    )')
        .then(() => {
            console.log("Successfully created users table")
            // return knex('users').columnInfo().then((info) => {
            //     console.log(info);
            // })
        }).catch(err => {
            console.error(err)
        })
};

exports.down = function (knex) {
    return knex.raw('DROP TABLE IF EXISTS `users`')
        .then(() => {
            console.log("Successfully dropped users table")
        }).catch(err => {
            console.error(err)
        })
};