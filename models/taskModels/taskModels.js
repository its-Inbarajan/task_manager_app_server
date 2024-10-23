const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    task_title: {
      type: String,
      required: [true, "Task title must not be empty!"],
    },

    task_description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed"],
    },
    due_date: {
      type: String,
      default: "",
    },
    associated_category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("tasks", taskSchema);
