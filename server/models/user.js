const bookshelf = require("../config/bookshelf")

module.exports = bookshelf.model("User", {
    tableName: "users",
})