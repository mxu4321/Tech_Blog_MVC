const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});
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

// router.get("/testing", (req,res) => {
//     const obj = [
//         {
//             title: "post - 1",
//             contents: "content - 1",
//         },
//         {
//             title: "post - 2",
//             contents: "content - 2",
//         },
//     ]
//     res.render("profile", {
//         posts: obj,
//         logged_in: req.session.logged_in
//     })
// })

module.exports = router;
