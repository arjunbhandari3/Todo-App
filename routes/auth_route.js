const router = require("express").Router();
const authController = require("../controllers/auth_controller");
const {
  loginValidation,
  registerValidation,
} = require("../utils/validators/user_validator");
const { validator } = require("../middlewares/validator");

router.post(
  "/register",
  registerValidation,
  validator,
  authController.register
);
router.post("/login", loginValidation, validator, authController.login);

module.exports = router;
