const user = require("./User");
const post = require("./Post");
const comment = require("./Comment");

// ------------user related----------------
// user has many posts
user.hasMany(post, {
    foreignKey: "user_id",
});

// user has many comments
user.hasMany(comment, {
    foreignKey: "user_id",
});


// ------------post related----------------
// post has many comments, comments deleted when post is deleted
post.hasMany(comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    hooks: true,
});

// posts belong to user
post.belongsTo(user, {
    foreignKey: "user_id",
});

// ------------comment related----------------
// comments belong to user
comment.belongsTo(user, {
    foreignKey: "user_id",
});

// comments belong to post
comment.belongsTo(post, {
    foreignKey: "post_id",
});

module.exports = { user, post, comment };