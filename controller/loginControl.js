const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const { generateToken } = require("../library/tokenManager");
const pwdManager = require("../library/managePasswords");
const shortid = require("shortid");

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
const getAllUser = async (req, res) => {
  const EXCLUDE = "-__v -password";
  logger.info("Get All users for watchlist");

  User.find()
    .select(EXCLUDE)
    .lean()
    .exec((error, allUsers) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", null));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Users Fetched", allUsers));
      }
    });
};
const tokenGen = async (userDetails) => {
  console.debug("generating auth toekn");
  /**generate authToken */
  await generateToken(userDetails, (token, error) => {
    logger.info(`generate token${(token, error)}`);
    if (error) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", null));
    } else {
      console.debug("token genrated:");
      return token.authToken;
    }
  });
};
const verifySocialLogin = async (req, res) => {
  logger.info("verify social response control");
  const { email, name } = req.query;

  // check if email is present on not
  let userExists = await User.findOne({ email: email });

  if (userExists) {
    let userInfo = userExists.toObject();

    delete userInfo.password;
    delete userInfo._id;
    delete userInfo.__v;

    //const token = await tokenGen(userInfo);
    let tokenauth;
    await generateToken(userInfo, (token, error) => {
      logger.info(`generate token${(token, error)}`);
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", null));
      } else {
        console.debug("token genrated:");
        tokenauth = token;
      }
    });

    console.debug("token genrated:", tokenauth);
    res.status(200).json(
      formatResponse(false, 200, "User Verification Success", {
        ...userInfo,
        ...tokenauth,
      })
    );
  } else {
    // store user

    /**new userSchema */
    let newUser = new User({
      userId: shortid.generate(),
      name: name,
      email: email,
      username: email,
      password: "dummy",
    });

    let userCreated = await User.create(newUser);

    if (userCreated) {
      let userInfo = userCreated.toObject();
      delete userInfo.password;
      delete userInfo._id;
      delete userInfo.__v;

      let tokenauth;
      await generateToken(userInfo, (token, error) => {
        logger.info(`generate token${(token, error)}`);
        if (error) {
          res
            .status(500)
            .json(formatResponse(true, 500, "Internal Server Error", null));
        } else {
          tokenauth = token;
        }
      });

      res.status(200).json(
        formatResponse(false, 200, "User Verification Success", {
          ...userInfo,
          ...tokenauth,
        })
      );
    } else {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Eroor", null));
    }
  }
};
module.exports = {
  loginControl,
  getAllUser,
  verifySocialLogin,
};
