const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// login route (localhost:3001/api/user/login)
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(404)
        .json({ message: "No user found with this email address" });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: "Password is incorrect" });
      return;
    }
    // save session data and redirect to dashboard page
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ 
      message: `${userData.username} is logged in; id: ${userData.id}; email: ${userData.email}`
      });
    });
  } catch (err) {
    res.status(500).json(err);
    // console.log(err);
  }
});

// signup route (localhost:3001/api/user/signup)
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout route (localhost:3001/api/user/logout)
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//----- 🧪 insomnia test routes-----
// get all user info (localhost:3001/api/user/)
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
