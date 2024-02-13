const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);

exports.createUser = (obj) => {};

exports.getUser = (id) => {};

exports.getUsers = () => {};
