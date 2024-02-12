const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    taskName: { type: String, required: true },
    category: { type: String, required: true },
    label: [String],
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PLANNING", "TODO", "ONGOING", "COMPLETED", "DELAYED"],
      default: "PLANNING",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Tasks", taskSchema);

exports.createTask = (obj) => {};
