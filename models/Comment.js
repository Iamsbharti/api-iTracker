const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
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
  name: {
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
module.exports = mongoose.model("Comment", commentsSchema);
