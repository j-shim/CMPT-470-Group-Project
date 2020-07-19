const bookshelf = require("../bookshelf");

module.exports = bookshelf.model("MovieTitle", {
    tableName: "title_with_ratings",
});