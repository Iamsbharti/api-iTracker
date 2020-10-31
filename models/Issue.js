const mongoose = require("mongoose");
const Comment = require("./Comment");
const Attachments = require("./Attachments");
const User = require("./User");

const issueSchema = mongoose.Schema({
  issueId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  estimates: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  attachment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachments" }],
});
module.exports = mongoose.model("Issue", issueSchema);
