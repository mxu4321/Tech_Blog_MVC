const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get the dashboard page
// http://localhost:3001/api/dashboard/:id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      //   include post and comment data for the user
      include: [{ model: Post }],
      include: [{ model: Comment }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
