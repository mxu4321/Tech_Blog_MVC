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

    // -----⏰ Try to display comments under posts on homepage ---- not necessary
    // const commentData = await Comment.findAll({
    //   where: {post_id: req.params.id },
    //   include: [{ model: User }],
    // })
    // const comments = commentData.map((post) => post.get({ plain: true }));

// -----⏰ Try to display username under posts on homepage
    // const userInfo = await User.findByPk(req.session.user_id, {
    //   include: [Post],
    // });
    // const parsedInfo = userInfo.get({ plain: true });

    res.render("homepage", {
      posts,
      // comments,
      // username: parsedInfo.username,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

// withAuth will check if the user is logged in before rendering the page
router.get("/dashboard", withAuth, async (req, res) => {
  // console.log(req.session.user_id);
  const userInfo = await User.findByPk(req.session.user_id, {
    include: [Post],
  });
  const parsedInfo = userInfo.get({ plain: true });
  // console.log(parsedInfo);
  res.render("dashboard", {
    logged_in: req.session.logged_in,
    username: parsedInfo.username,
    posts: parsedInfo.posts,
  });
});

// sign up routes
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// render new post page (after user logged in)
router.get("/newpost", async (req, res) => {
  res.render("new-post");
});

// render a single post & displaying all related comments
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (postData) {
      const post = postData.get({ plain: true });
      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// ----- display comments under a single post
//     const commentData = await Comment.findAll({
//       // where: { post_id: req.params.id },
//       // include: [{ model: User }],
//     });
//     const comments = commentData.map((post) => post.get({ plain: true }));
//     res.render("single-post", { posts, comments });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
