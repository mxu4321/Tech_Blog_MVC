const router = express.Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts for homepage display
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // include: [{ model: Comment }], // --> ❓needed for homepage?
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // ---- ❓render homepage or post page?
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post by id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    const post = postData.get({ plain: true });
    // ---> ⏰ change the handlebars name as needed
    res.render("single-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts by user id
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: Comment }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // ---> ⏰ change the handlebars name as needed
    res.render("user-post", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new post
router.get("/create", withAuth, (req, res) => {
  try {
    res.render("new-post", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
