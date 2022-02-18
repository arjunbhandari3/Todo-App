const router = require("express").Router();
const userController = require("../controllers/user_controller");
const auth = require("../middlewares/auth");

router.get("/userProfile", auth, userController.getUser);
router.get("/logout", auth, userController.logOut);
module.exports = router;
