const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// create a new post (localhost:3001/api/post/create)
// router.post("/create", async (req, res) => { // --> 🧪 removed withAuth for testing
router.post("/create", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id,
    });
    res.status(200).json({
      message: `post created: ${postData.title}; ${postData.contents}`,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post (localhost:3001/api/post/update/:id)
router.put("/update/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        contents: req.body.contents
      },
      {
        where: {
          id: req.params.id
      }
    }
    );
    // const post = postData.get({ plain: true });
    res.status(200).json({
      message: `post updated: ${postData.title}; ${postData.contents}`,
      logged_in: req.session.logged_in,
    });
    // res.render("edit-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post (localhost:3001/api/post/delete/:id)
router.delete("/delete/:id", async (req, res) => {
  try {
    const postData = Post.destroy({
      where: {
        id: req.params.id
      },
    })
    // const post = postData.get({ plain: true });
    res.status(200).json({
      message: `post deleted: ${postData.title}; ${postData.contents}`,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //----- 🧪 insomnia test routes-----
// get all posts by user id & display on dashboard  (localhost:3001/api/post/user/:id)
router.get("/user/:id", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: Comment }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- 🧪 localhost:3001/api/post ----
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    // Query configuration
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
