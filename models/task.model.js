const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("task", taskSchema);
