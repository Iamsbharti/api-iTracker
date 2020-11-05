const Issue = require("../models/Issue");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const shortid = require("shortid");
const EXCLUDE = "-__v -_id";

/**validation functions */
const validateUser = async (userId) => {
  logger.info(`Validate user stub",${userId}`);
  let userFound = await User.findOne({ userId: userId });
  console.debug(("user found", userFound));
  return userFound ? true : false;
};
const validateIssue = async (issueId) => {
  logger.info("Validate issue stub:", issueId);
  let issueFound = await Issue.findOne({ issueId: issueId });
  return issueFound ? true : false;
};
const validateComment = async (commentId) => {
  logger.info("Validate comment stub:", commentId);
  let commentFound = await Comment.findOne({ commentId: commentId });
  return commentFound ? true : false;
};
/**controller functions */
const createIssue = async (req, res) => {
  logger.info("Create Issue Control");

  let {
    userId,
    title,
    description,
    status,
    reporter,
    priority,
    estimates,
    watchList,
    assignee,
  } = req.query;

  /**validate user */
  let userExists = await validateUser(userId);
  if (userExists) {
    /** create  new_issue schema*/
    let newIssue = new Issue({
      issueId: shortid.generate(),
      userId: userId,
      title: title,
      description: description,
      status: status,
      reporter: reporter,
      priority: priority,
      estimates: estimates,
      watchList: watchList,
      assignee: assignee,
    });

    await Issue.create(newIssue, (error, createdIssue) => {
      logger.info(error, createdIssue);
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Issue Created", createdIssue));
      }
    });
  } else {
    res.status(400).json(formatResponse(false, 400, "Invalid userId", ""));
  }
};
const getAllIssues = async (req, res) => {
  logger.info("Get All Issues Control");
  let { userId } = req.query;
  /**check for valid userId */
  let isUserValid = await validateUser(userId);

  if (isUserValid) {
    await Issue.find({ assignee: userId })
      .populate("watchList", ["name", "userId"])
      .populate("comments")
      .populate("attachment", ["_id", "filename"])
      .lean()
      .exec((error, allIssues) => {
        if (error) {
          return res
            .status(500)
            .json(formatResponse(true, 500, "Internal Server Error", error));
        } else {
          return res
            .status(200)
            .json(formatResponse(false, 200, "Issues Fetched", allIssues));
        }
      });
  } else {
    res.status(400).json(formatResponse(false, 400, "Invalid userId", ""));
  }
};
const filterIssues = async (req, res) => {
  logger.info("Filter Issues Control");
  let { userId, option, name, type } = req.query;
  console.debug(userId, option, name, type);

  let queryOption;
  logger.info("Computing status filter options");
  switch (option) {
    case "all":
      //queryOption = { userId: userId };
      break;
    case "reportedByMe":
      queryOption = {
        reporter: { $regex: new RegExp("^" + name.toLowerCase(), "i") },
      };
      break;
    case "openIssues":
      queryOption = { userId: userId, status: ["test", "progress"] };
      break;
    case "closedIssues":
      queryOption = {
        $and: [{ userId: userId }, { status: "done" }],
      };
      break;
  }
  /**check for valid userId */
  let isUserValid = await validateUser(userId);

  let issuesFetchedFlag = false;
  let filteredIssues;
  console.debug("query options:", queryOption);
  /**time based filters */
  if (isUserValid && type === "time") {
    console.debug("Time based filter option");
    if (option.includes("updatedRecent")) {
      console.debug("Recently updated");
      filteredIssues = await Issue.find({ userId: userId })
        .select(EXCLUDE)
        .sort({ modifiedDate: "desc" })
        .populate("watchList", ["name", "userId"])
        .populate("comments")
        .populate("attachment", ["_id", "filename"])
        .lean();
      issuesFetchedFlag = filteredIssues ? true : false;
    }

    if (option.includes("resolvedRecent")) {
      console.debug("resolved recently");
      filteredIssues = await Issue.find({
        $and: [{ userId: userId }, { status: "done" }],
      })
        .select(EXCLUDE)
        .sort({ modifiedDate: "desc" })
        .populate("watchList", ["name", "userId"])
        .populate("comments")
        .populate("attachment", ["_id", "filename"])
        .lean();
      issuesFetchedFlag = filteredIssues ? true : false;
    }
  } else if (isUserValid && type === "status") {
    console.debug("Status bsed filters", queryOption);
    /**status based filters */
    filteredIssues = await Issue.find(queryOption)
      .select(EXCLUDE)
      .populate("watchList", ["name", "userId"])
      .populate("comments", ["text", "name", "commentId"])
      .populate("attachment", ["_id", "filename"])
      .lean();
    issuesFetchedFlag = filteredIssues ? true : false;
  } else if (!isUserValid) {
    console.debug("invalid user");
    res.status(404).json(formatResponse(true, 404, "Invalid User", null));
  }

  /**compute final response */
  if (issuesFetchedFlag) {
    res
      .status(200)
      .json(
        formatResponse(false, 200, "Filtered Issues Fectched", filteredIssues)
      );
  } else {
    res
      .status(500)
      .json(formatResponse(true, 500, "Internal Server Error", null));
  }
};
const updateIssue = async (req, res) => {
  logger.info("Update Issue Control");
  let { userId, issueId, updates } = req.body;
  console.debug("userid", userId, req.query.userId);
  /**check for valida user */
  let isUserValid = await validateUser(req.query.userId);
  let isIssueValid = await validateIssue(issueId);

  let { watchList, operation } = updates;
  let updateOptions = updates;
  delete updateOptions.watchList;
  let updateWatchListOptions = {};
  if (watchList !== undefined) {
    /** add the unique db id to of the userid to the watchlist */
    /**add watcher**/
    if (operation === "watch") {
      updateWatchListOptions = {
        $push: { watchList: watchList },
        modifiedDate: Date.now(),
      };
      updateOptions = updateWatchListOptions;
    } else if (operation === "unwatch") {
      updateWatchListOptions = {
        $pull: { watchList: watchList },
        modifiedDate: Date.now(),
      };
      updateOptions = updateWatchListOptions;
    }
  }
  if (isUserValid && isIssueValid) {
    console.debug("final update options:", updateOptions);
    await Issue.updateOne(
      { issueId: issueId },
      updateOptions,
      (error, updatedIssue) => {
        if (error) {
          res
            .status(500)
            .json(formatResponse(true, 500, "Internal Server Error", error));
        } else {
          let { n } = updatedIssue;
          res
            .status(200)
            .json(
              formatResponse(false, 200, "Issue Updated", `${n} issue updated`)
            );
        }
      }
    );
  } else if (!isUserValid) {
    console.debug("user id not found");
    res.status(400).json(formatResponse(false, 400, "Invalid userId", ""));
  } else if (!isIssueValid) {
    res.status(400).json(formatResponse(false, 400, "Invalid IssueId", ""));
  }
};
const addComment = async (req, res) => {
  logger.info("Add Comment Route");
  let { userId, issueId, name } = req.query;
  let { text } = req.body;
  /**validate userid and issueid */
  let isUserValid = await validateUser(userId);
  let isIssueValid = await validateIssue(issueId);

  if (isUserValid && isIssueValid) {
    let newComment = new Comment({
      commentId: shortid.generate(),
      userId: userId,
      text: text,
      issueId: issueId,
      name: name,
    });

    /**save comment */
    let savedComment = await Comment.create(newComment);
    let unique_db_comment_id = savedComment._id;

    /**populate the issues comment attribute */
    let updatedIssue = await Issue.updateOne(
      { issueId: issueId },
      { $push: { comments: unique_db_comment_id } }
    );

    if (savedComment && updateIssue) {
      res
        .status(200)
        .json(formatResponse(false, 200, "Comments Added", savedComment));
    } else {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", null));
    }
  } else if (!isUserValid) {
    res.status(400).json(formatResponse(false, 400, "Invalid userId", ""));
  } else if (!isIssueValid) {
    res.status(400).json(formatResponse(false, 400, "Invalid IssueId", ""));
  }
};

const searchRoute = async (req, res) => {
  logger.error("Search Route Control");
  const { search } = req.query;
  const queryOptions = {
    $or: [
      { title: { $regex: new RegExp(search.toLowerCase(), "i") } },
      { description: { $regex: new RegExp(search.toLowerCase(), "i") } },
      { reporter: { $regex: new RegExp(search.toLowerCase(), "i") } },
      { name: { $regex: new RegExp(search.toLowerCase(), "i") } },
    ],
  };
  //console.debug("queryoptions:", queryOptions);
  Issue.find(queryOptions)
    .select(EXCLUDE)
    .populate("watchList", ["name", "userId"])
    .populate("comments")
    .populate("attachment", ["_id", "filename"])
    .sort({ title: "asc" })
    .lean()
    .exec((error, issues) => {
      if (error) {
        logger.error("Error Searching Issues", error.message);
        res
          .status(500)
          .json(
            formatResponse(true, 500, "Internal Server Error", error.message)
          );
      } else {
        logger.info("Issue Fetched");
        res
          .status(200)
          .json(formatResponse(false, 200, "Issues Fetched", issues));
      }
    });
};
const uploadAttachment = async (req, res) => {
  logger.info("Attachment upload control");
  const issueId = req.query.issueId;
  console.debug("file", req.file.id);
  /**update the issue's attachment list with uploaded file id*/
  const updateQuery = { issueId: issueId };
  let attachmentUpdateOption = { $push: { attachment: req.file.id } };

  let updatedIssue = await Issue.updateOne(updateQuery, attachmentUpdateOption);
  if (updatedIssue) {
    res
      .status(200)
      .json(formatResponse(false, 200, "Attachment Uploaded", req.file));
  } else {
    res
      .status(500)
      .json(formatResponse(true, 500, "Internal Server Error", null));
  }
};
const updateComment = async (req, res) => {
  logger.info("update comment control");
  const { commentId, text } = req.body;
  // validate comment
  let isCommentValid = await validateComment(commentId);

  if (isCommentValid) {
    let updatedComment = await Comment.updateOne(
      { commentId: commentId },
      { text: text }
    );
    if (updateComment) {
      let { n } = updatedComment;
      res
        .status(200)
        .json(
          formatResponse(false, 200, "Comment updated", `${n} comment updated`)
        );
    } else {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", null));
    }
  } else {
    res.status(400).json(formatResponse(true, 500, "Invalid Comment", null));
  }
};
const deleteComment = async (req, res) => {
  logger.info("Delete comment control");
  let { commentId } = req.query;
  // validate comment
  let isCommentValid = await validateComment(commentId);
  if (isCommentValid) {
    let deletedComment = await Comment.deleteOne({ commentId: commentId });

    if (deleteComment) {
      let { n } = deletedComment;
      res
        .status(200)
        .json(
          formatResponse(false, 200, "Comment Deleted", `${n} comment deleted`)
        );
    } else {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", null));
    }
  } else {
    res.status(400).json(formatResponse(true, 500, "Invalid Comment", null));
  }
};
module.exports = {
  validateUser,
  validateIssue,
  createIssue,
  getAllIssues,
  filterIssues,
  updateIssue,
  addComment,
  searchRoute,
  uploadAttachment,
  updateComment,
  deleteComment,
};
