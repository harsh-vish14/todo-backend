const express = require("express");
const {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
  markAsDone,
} = require("../../controllers/todoList");
const router = express.Router();
router.route("/").get(getAllTodo);
router.route("/").post(createTodo);
router.route("/:todoId").put(updateTodo);
router.route("/:todoId").delete(deleteTodo);
router.route("/:isDone/:todoId").patch(markAsDone);

module.exports = router;
