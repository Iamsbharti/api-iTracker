const jwt = require("jsonwebtoken");
const { format } = require("winston");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");

exports.isAuthorized = async (req, res, next) => {
  logger.info("Authorizing...");

  let reqUserId = req.query.userId;

  let authTokenQuery = req.query.authToken;
  let authTokenBody = req.body.authToken;
  let authTokenHeader = req.header("authToken");
  console.log(authTokenBody, authTokenHeader, authTokenQuery);
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

    logger.info(`Decoded Info:${decodedInfo.data}`);
    logger.info(`userId,${reqUserId}`);
    let { userId } = decodedInfo.data;

    if (userId !== reqUserId) {
      return res
        .status(400)
        .json(formatResponse(true, 400, "Invalid Token", null));
    }
  } else {
    /**auth token missing */
    res.status(400).json(formatResponse(true, 400, "AuthToken Missing", null));
  }
  next();
};