const mongoose = require("mongoose");
const Comment = require("./Comment");
const Attachment = require("./Attachment");

const issueSchema = mongoose.Schema({
  bugId: {
    type: String,
    unique: true,
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
  watchList: {
    type: Array,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  attachementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
});
exports.module = mongoose.model("Issues", issueSchema);
