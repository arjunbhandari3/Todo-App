const router = require("express").Router();
const todoController = require("../controllers/todo_controller");
const auth = require("../middlewares/auth");
const { validator } = require("../middlewares/validator");
const { todoValidation } = require("../utils/validators/todo_validator");

router.get("/", auth, todoController.getMyTodos);
router.post("/", auth, todoValidation, validator, todoController.createTodo);
router.get("/:id", auth, todoController.getTodo);
router.put("/:id", auth, todoValidation, validator, todoController.updateTodo);
router.delete("/:id", auth, todoController.deleteTodo);

module.exports = router;
