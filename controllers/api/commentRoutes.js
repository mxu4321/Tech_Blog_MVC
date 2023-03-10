const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// create a new comment (localhost:3000/api/comment/create)
router.post("/create", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      // user_id: req.session.user_id,
      // post_id: req.body.post_id,
    });
    // ---> ⏰ change to render the create a comment page
    res.status(200).json({
      message: `comment created: ${commentData.comment_text}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    res.render("single-post", { comments, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --> 🧪 for insomnia testing
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

// ---> ❓ routes below needed?
// update a comment (localhost:3000/api/comment/update/:id)
// router.put("/update/:id", async (req, res) => {
//   try {
//     const commentData = await Comment.update(
//       { comment_text: req.body.comment_text },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(400).json(err);
//     // console.log(err);
//   }
// });

// delete a comment (localhost:3000/api/comment/delete/:id)
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     // ---> ❓ correct to put if here?
//     if (!commentData) {
//       res.status(404).json({ message: "No comment found with this id!" });
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
