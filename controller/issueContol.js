const Issue = require("../models/Issue");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const shortid = require("shortid");
const EXCLUDE = "-__v -_id";

/**validation functions */
const validateUser = async (userId) => {
  logger.info("Validate user stub");
  let userFound = await User.findOne({ userId: userId });
  return userFound ? true : false;
};
const validateIssue = async (issueId) => {
  logger.info("Validate issue stub");
  let issueFound = await Issue.findOne({ issueId: issueId });
  return issueFound ? true : false;
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
    await Issue.find({ userId: userId })
      .populate("watchList", "name")
      .populate("comments", ["text", "name"])
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
  console.log(userId, option, name, type);

  let queryOption;
  logger.info("Computing status filter options");
  switch (option) {
    case "all":
      //queryOption = { userId: userId };
      break;
    case "reportedByMe":
      queryOption = { reporter: { $regex: new RegExp("^" + name.toLowerCase(), "i") } };
      break;
    case "openIssues":
      queryOption =
          { userId: userId,status:["test","progress"]};
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

  /**time based filters */
  if (isUserValid && type === "time") {
    console.log("Time based filter option");
    if (option.includes("updatedRecent")) {
      console.log("Recently updated");
      filteredIssues = await Issue.find({ userId: userId })
        .select(EXCLUDE)
        .sort({ modifiedDate: "desc" })
        .populate("watchList", "name")
        .populate("comments", ["text", "name"])
        .lean();
      issuesFetchedFlag = filteredIssues ? true : false;
    }

    if (option.includes("resolvedRecent")) {
      console.log("resolved recently");
      filteredIssues = await Issue.find({
        $and: [{ userId: userId }, { status: "done" }],
      })
        .select(EXCLUDE)
        .sort({ modifiedDate: "desc" })
        .populate("watchList", "name")
        .populate("comments", ["text", "name"])
        .lean();
      issuesFetchedFlag = filteredIssues ? true : false;
    }
  } else if (isUserValid && type === "status") {
    console.log("Status bsed filters",queryOption);
    /**status based filters */
    filteredIssues = await Issue.find(queryOption)
      .select(EXCLUDE)
      .populate("watchList", "name")
      .populate("comments", ["text", "name"])
      .lean();
    issuesFetchedFlag = filteredIssues ? true : false;
  } else if (!isUserValid) {
    console.log("invalid user");
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
  /**check for valida user */
  let isUserValid = await validateUser(userId);
  let isIssueValid = await validateIssue(issueId);

  let { watchList } = updates;
  let updateOptions = updates;
  delete updateOptions.watchList;

  if (watchList !== undefined) {
    /** add the unique db id to of the userid to the watchlist */
    updateOptions = { ...updateOptions, $push: { watchList: watchList } };
  }
  /**add modifidied date */
  updateOptions = { ...updateOptions, modifiedDate: Date.now() };
  if (isUserValid && isIssueValid) {
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
    res.status(400).json(formatResponse(false, 400, "Invalid userId", ""));
  } else if (!isIssueValid) {
    res.status(400).json(formatResponse(false, 400, "Invalid IssueId", ""));
  }
};
const addComment = async (req, res) => {
  logger.info("Add Comment Route");
  let { userId, text, issueId, name } = req.query;

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
module.exports = {
  createIssue,
  getAllIssues,
  filterIssues,
  updateIssue,
  addComment,
};
