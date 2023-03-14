const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// ⏰TODO: fix this route
// create a new post (localhost:3001/api/post/create)
// router.post("/create", async (req, res) => { // --> 🧪 removed withAuth for testing
router.post("/create", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      // user_id: 1
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
router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // ---> ❓ need to add anything for including comment model?
      include: [{ model: Comment }],
    });
    const post = postData.get({ plain: true });
    res.render("edit-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post (localhost:3001/api/post/delete/:id)
router.get("/delete/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    const post = postData.get({ plain: true });
    res.render("delete-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts by user id & display on dashboard (localhost:3001/api/post/user/:id)
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id,
      },
      // ---> ❓ need to add anything for including comment model?
      include: [{ model: Comment }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // ---> ⏰ change the handlebars name as needed
    // res.render("user-post", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post by id (localhost:3001/api/post/:id)
// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       // ---> ❓ need to add anything for including comment model?
//       include: [{ model: Comment }],
//     });
//     const post = postData.get({ plain: true });
//     // ---> ⏰ change the handlebars name as needed
//     res.render("single-post", { post, logged_in: req.session.logged_in });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
