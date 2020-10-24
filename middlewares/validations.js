const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const options = { abortEarly: false };

const registrationValidation = (req, res, next) => {
  logger.info("Regestration Parameter validation");
  let registrationSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(4).email().required(),
    username: joi.string().min(3).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });
  let { error } = registrationSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const loginValidations = (req, res, next) => {
  logger.info("Login Param Validations");
  let loginSchema = joi.object({
    loginId: joi.string().min(3).required(),
    password: joi.string().required(),
  });

  let { error } = loginSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const createIssueValidations = (req, res, next) => {
  logger.info("Create Issue Validation");
  let issueSchema = joi.object({
    title: joi.string().min(2).required(),
    userId: joi.string().min(2).required(),
    description: joi.string().min(2).required(),
    status: joi.string().min(2).required(),
    reporter: joi.string().min(2).required(),
    priority: joi.string().min(2).required(),
    estimates: joi.string().min(2).required(),
    watchList: joi.string().min(2).optional(),
  });
  let { error } = issueSchema.validate(req.query, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
module.exports = {
  registrationValidation,
  loginValidations,
  createIssueValidations,
};
