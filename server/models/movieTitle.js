const bookshelf = require("../config/bookshelf")

module.exports = bookshelf.model("MovieTitle", {
  tableName: "title_with_ratings",
})