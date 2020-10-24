const jwt = require("jsonwebtoken");
const { format } = require("winston");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");

exports.isAuthorized = async (req, res, next) => {
  logger.info("Authorizing...");

  let reqUserId = req.query.userId;

  let authTokenQuery = req.query.authToken;
  let authTokenBody = req.body.authToken;
  let authTokenHeader = req.header.authToken;

  /**check for token in req */
  if (
    authTokenBody !== undefined ||
    authTokenHeader !== undefined ||
    authTokenQuery !== undefined
  ) {
    /**validate the token */
    let decodedInfo = jwt.verify(
      authTokenQuery || authTokenHeader || authTokenBody,
      process.env.TOKEN_SECRET
    );

    logger.info(`Decoded Info:${decodedInfo}`);

    let { userId } = decodedInfo.data;

    if (userId !== reqUserId) {
      res.status(400);
      throw new Error(`Not Valid Token ${req.originalUrl}`);
    }
  } else {
    /**auth token missing */
    res.status(400).json(formatResponse(true, 400, "AuthToken Missing", null));
  }
  next();
};
