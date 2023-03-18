const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// create a new comment by post id (localhost:3000/api/comment/create/post/:id)
router.post("/create", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,

      // //----- 🧪 insomnia test-----
      // user_id: req.body.user_id,
    });
    res.status(200).json({
      message: `comment created: '${commentData.comment_text}'`,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//----- 🧪 insomnia test routes-----
// get all comments by post id (localhost:3000/api/comment/post/:id)
router.get("/post/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [{ model: User }],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // res.status(200).json(comments);
    res.render("single-post", { comments, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

//----- 🧪 insomnia test routes-----
// get all comments by user id (localhost:3000/api/comment/user/:id)
router.get("/user/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: User }],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("profile", { comments, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ----- 🚀 routes below maybe needed for future development -----
// update a comment (localhost:3000/api/comment/update/:id)
router.put("/update/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(
      { comment_text: req.body.comment_text },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
    // console.log(err);
  }
});

// ----- 🚀 routes below maybe needed for future development -----
// delete a comment (localhost:3000/api/comment/delete/:id)
router.delete("/delete/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
