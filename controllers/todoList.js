const ErrorResponse = require("../helper/ErrorResponse");
const todo = require("../models/Todo");

exports.getAllTodo = async (req, res) => {
  const todos = await todo.find({}).sort({ createdAt: -1 });
  return res.status(200).json(todos);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ErrorResponse("Todo name cannot be empty", 400);
  }
  let todoData = await todo.create({ title });
  return res
    .status(200)
    .json({ data: todoData, message: "Added successfully" });
};

exports.updateTodo = async (req, res) => {
  const { title, content } = req.body;
  const { todoId } = req.params;
  if (!title) {
    throw new ErrorResponse("Todo name cannot be empty", 400);
  }
  const exitingTodo = await todo.findOne({ _id: todoId });
  if (!exitingTodo) {
    throw new ErrorResponse("Todo not found", 404);
  }

  await todo.findOneAndUpdate(
    { _id: todoId },
    { title: title, detail: content }
  );
  const updatedTodo = await todo.findOne({ _id: todoId });
  return res
    .status(200)
    .json({ data: updatedTodo, message: "Updated successfully" });
};

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  const exitingTodo = await todo.findOne({ _id: todoId });
  if (!exitingTodo) {
    throw new ErrorResponse("Todo not found", 404);
  }
  await todo.findOneAndDelete({ _id: todoId });
  return res.status(200).json({ message: "Todo deleted successfully" });
};

exports.markAsDone = async (req, res) => {
  const { isDone, todoId } = req.params;
  const exitingTodo = await todo.findOne({ _id: todoId });
  if (!exitingTodo) {
    throw new ErrorResponse("Todo not found", 404);
  }
  await todo.findOneAndUpdate({ _id: todoId }, { done: isDone === "done" });
  return res.status(200).json({
    message: `status changed successfully to ${
      isDone === "done" ? "done" : "not done"
    }`,
  });
};
