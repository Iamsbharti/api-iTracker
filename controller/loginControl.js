const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const { generateToken } = require("../library/tokenManager");
const pwdManager = require("../library/managePasswords");

const loginControl = async (req, res) => {
  logger.info("Login Control Init");
  let { loginId, password } = req.body;
  let query;
  if (loginId.includes("@")) {
    query = { email: loginId };
  } else {
    query = { username: loginId };
  }

  /**search for users*/
  let userExists = await User.findOne(query);
  let credMatch = false;

  if (userExists) {
    credMatch = await pwdManager.comparePassword(password, userExists.password);
  }
  logger.info(`credMatch:${credMatch}`);
  if (userExists && credMatch) {
    logger.info(`userexists:${userExists}`);
    let _loginResponse = userExists.toObject();
    delete _loginResponse.password;
    delete _loginResponse._id;
    delete _loginResponse.__v;

    /**generate authToken */
    await generateToken(_loginResponse, (token, error) => {
      logger.info(`generate token${(token, error)}`);
      if (error) {
        res
          .status(500)
          .json(
            formatResponse(true, 500, "Internal Server Error", error.message)
          );
      } else {
        res.header("authToken", token.authToken);
        res.status(200).json(
          formatResponse(false, 200, "User Login Sucess", {
            ..._loginResponse,
            ...token,
          })
        );
      }
    });
  } else if (!userExists) {
    res.status(404).json(formatResponse(true, 404, "User Not Found", null));
  } else if (!credMatch) {
    res
      .status(404)
      .json(formatResponse(true, 400, "Authentication Failed", null));
  }
};
module.exports = {
  loginControl,
};
