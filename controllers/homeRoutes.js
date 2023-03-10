const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// ⏰ get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      // posts,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// withAuth will check if the user is logged in before rendering the page
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  console.log(req.session.user_id);
  const userInfo =  await User.findByPk(req.session.user_id)
  const parsedInfo = userInfo.get({plain: true})
  res.render("dashboard", {
    username: parsedInfo.username
  })
})

// sign up routes
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


module.exports = router;
