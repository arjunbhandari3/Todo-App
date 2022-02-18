const { check } = require("express-validator");

const title = check("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required.");
const description = check("description")
  .trim()
  .notEmpty()
  .withMessage("Description is required.");

const todoValidation = [title, description];

module.exports = { todoValidation };
