const { check } = require("express-validator");

const name = check("name").trim().notEmpty().withMessage("Name is required.");
const email = check("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .normalizeEmail()
  .withMessage("Email is invalid.");
const password = check("password")
  .trim()
  .notEmpty()
  .withMessage("Password is required.")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long.");

const registerValidation = [name, email, password];
const loginValidation = [email, password];

module.exports = { loginValidation, registerValidation };
