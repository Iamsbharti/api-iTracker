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
    status: joi.string().min(2).required(),
    reporter: joi.string().min(2).required(),
    priority: joi.string().min(2).required(),
    estimates: joi.string().min(2).required(),
    watchList: joi.string().min(2).optional(),
    assignee: joi.string().min(2).optional(),
    description: joi.string().optional(),
  });
  let { error } = issueSchema.validate(req.body, options);
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
const getAllIssuesValidations = (req, res, next) => {
  logger.info("Get All Issues Validations");
  let getIssueSchema = joi.object({
    userId: joi.string().min(3).required(),
  });
  let { error } = getIssueSchema.validate(req.query);
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
const filterIssuesValidation = (req, res, next) => {
  // let { userId, option, name, type } = req.query;
  logger.info("Filter user validations");
  let filterSchema = joi.object({
    userId: joi.string().min(3).required(),
    name: joi.string().min(3).required(),
    option: joi.string().required(),
    type: joi.valid("time", "status").required(),
  });

  let { error } = filterSchema.validate(req.query);
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
const updateIssueValidations = (req, res, next) => {
  //let { userId, issueId, updates } = req.query;
  logger.info("Update issue validations");
  let updateSchema = joi.object({
    userId: joi.string().min(3).required(),
    issueId: joi.string().min(3).required(),
    updates: joi.object().required(),
  });
  let { error } = updateSchema.validate(req.body);
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
const addCommentValidations = (req, res, next) => {
  logger.info("Add comment validations");
  //let { userId, text, issueId } = req.query;
  let addCommentSchema = joi.object({
    userId: joi.string().min(3).required(),
    issueId: joi.string().min(3).required(),
    text: joi.string().optional(),
    name: joi.string().min(3).required(),
  });
  let { error } = addCommentSchema.validate(req.query);
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
const searchRouteValidation = (req, res, next) => {
  logger.info("Search Route Validation");
  const searchParam = joi.object({
    search: joi.string().min(1).required(),
    userId: joi.string().min(2).required(),
  });
  let { error } = searchParam.validate(req.query);
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
const updateCommentValidation = (req, res, next) => {
  logger.info("update comment Validation");
  const updateCommentParam = joi.object({
    commentId: joi.string().min(1).required(),
    text: joi.string().required(),
  });
  let { error } = updateCommentParam.validate(req.body);
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
const deleteCommentValidation = (req, res, next) => {
  logger.info("delete comment Validation");
  const deleteCommentParam = joi.object({
    commentId: joi.string().min(1).required(),
    userId: joi.string().min(1).required(),
  });
  let { error } = deleteCommentParam.validate(req.query);
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
const getImageValidation = (req, res, next) => {
  logger.info("Get Image Validation");
  const getImageParam = joi.object({
    filename: joi.string().min(1).required(),
    userId: joi.string().min(1).required(),
    authToken: joi.string().required(),
  });
  let { error } = getImageParam.validate(req.query);
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
const deleteImgValidation = (req, res, next) => {
  logger.info("Get Image Validation");
  const deleteImgParam = joi.object({
    filename: joi.string().min(1).required(),
    userId: joi.string().min(1).required(),
  });
  let { error } = deleteImgParam.validate(req.query);
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
  getAllIssuesValidations,
  filterIssuesValidation,
  updateIssueValidations,
  addCommentValidations,
  searchRouteValidation,
  updateCommentValidation,
  deleteCommentValidation,
  getImageValidation,
  deleteImgValidation,
};
