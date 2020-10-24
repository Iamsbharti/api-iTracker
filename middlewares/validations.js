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
  });
  let error = registrationSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is"[0])));
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
};
module.exports{
    registrationValidation
}