const router = require("express").Router();
const dashboardRouter = require("./dashboardRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoutes");

router.use("/dashboard", dashboardRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

module.exports = router;