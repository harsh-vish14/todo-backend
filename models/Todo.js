const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Pleas provide a todo name"],
      trim: true,
    },
    detail: {
      type: String,
      trim: true,
      default: "",
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
