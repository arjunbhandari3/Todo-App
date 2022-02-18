const router = require("express").Router();
const authRoutes = require("./auth_route");
const userRoutes = require("./user_route");
const todoRoutes = require("./todo_route");

router.use("/api/auth/", authRoutes);
router.use("/api/user/", userRoutes);
router.use("/api/todos/", todoRoutes);

module.exports = router;
