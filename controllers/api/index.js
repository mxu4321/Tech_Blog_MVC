const router = require("express").Router();
const userRouter = require("./userRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoutes");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

module.exports = router;