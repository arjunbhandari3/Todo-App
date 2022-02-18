const Todo = require("../models/todo");

const getMyTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }
    console.log(todo, req.user._id);
    if (todo && todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized to do.",
      });
    }

    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ title: req.body.title });
    if (todo) {
      return res.status(400).json({
        success: false,
        message: "Todo already exists.",
      });
    }
    const newTodo = await Todo.create({ ...req.body, user: req.user._id });
    return res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }
    if (todo && todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    if (req.body.title !== todo.title) {
      const duplicateTitle = await Todo.findOne({ title: req.body.title });
      if (duplicateTitle) {
        return res.status(400).json({
          success: false,
          message: "Todo with this title already exists.",
        });
      }
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    if (todo && todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      data: deletedTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getMyTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
