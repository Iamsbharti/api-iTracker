const mongoose = require("mongoose");
const Comment = require("./Comment");
const Attachment = require("./Attachment");

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
    default: Date.now(),
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
  watchList: {
    type: Array,
    default: [],
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  attachmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
});
module.exports = mongoose.model("Issue", issueSchema);
