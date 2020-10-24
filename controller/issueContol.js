const Issue = require("../models/Issue");
const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const shortid = require("shortid");

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
  /**check for valid userId */
};
module.exports = {
  createIssue,
};
