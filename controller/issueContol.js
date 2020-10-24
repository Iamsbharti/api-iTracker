const Issue = require("../models/Issue");
const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const shortid = require("shortid");
const { options } = require("@hapi/joi");
const EXCLUDE = "-__v -_id";
/**validation functions */
const validateUser = async (userId) => {
  logger.info("Validate user stub");
  let userFound = await User.findOne({ userId: userId });
  return userFound
    ? true
    : res.status(404).json(formatResponse(true, 404, "Invalid User", null));
};
const validateIssue = async (issueId) => {};

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
  }
};
const getAllIssues = async (req, res) => {
  logger.info("Get All Issues Control");
  let { userId } = req.query;
  /**check for valid userId */
  let isUserValid = await validateUser(userId);

  if (isUserValid) {
    await Issue.find({ userId: userId }, (error, allIssues) => {
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
      queryOption = { userId: userId };
      break;
    case "reportedByMe":
      queryOption = { reporter: name };
      break;
    case "openIssues":
      queryOption = {
        $and: [
          { userId: userId },
          { status: "in-progress" },
          { status: "in-test" },
        ],
      };
      break;
    case "doneIssues":
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
        .lean();
      issuesFetchedFlag = filteredIssues ? true : false;
    }
  } else if (isUserValid && type === "status") {
    console.log("Status bsed filters");
    /**status based filters */
    filteredIssues = await Issue.find(queryOption).select(EXCLUDE).lean();
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
module.exports = {
  createIssue,
  getAllIssues,
  filterIssues,
};
