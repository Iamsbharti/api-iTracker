const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  issueId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
  },
});
exports.module = mongoose.model("Comment", commentsSchema);
