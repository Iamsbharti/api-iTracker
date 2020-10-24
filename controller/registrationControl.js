const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const managePwd = require("../library/managePasswords");
const shortid = require("shortid");

const registerUserControl = async (req, res) => {
  logger.info("User Registration Control");

  let { name, email, username, password } = req.body;
  /**check for existing user */
  let userExists = await User.findOne({ username: username });

  if (userExists) {
    return res
      .status(400)
      .json(formatResponse(true, 400, "we already have you", null));
  }

  /**Create a new user */
  /**hash password */
  let hashedPwd = await managePwd.hashPassword(password);
  logger.info(`hashed pwd${hashedPwd}`);

  /**new userSchema */
  let newUser = new User({
    userId: shortid.generate(),
    name: name,
    email: email,
    username: username,
    password: hashedPwd,
  });

  logger.info(`USerschema:${newUser}`);

  let userCreated = await User.create(newUser);

  if (userCreated) {
    let userInfo = userCreated.toObject();
    delete userInfo.password;
    delete userInfo._id;

    res
      .status(200)
      .json(formatResponse(false, 200, "User Created Success", userInfo));
  } else {
    res
      .status(500)
      .json(formatResponse(true, 500, "Internal Server Eroor", null));
  }
};

module.exports = {
  registerUserControl,
};
