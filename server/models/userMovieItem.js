const bookshelf = require("../config/bookshelf")

module.exports = bookshelf.model("UserMovieItem", {
    tableName: "user_movie_items",
    user() {
        return this.belongsTo("User", "userId");
    },
})