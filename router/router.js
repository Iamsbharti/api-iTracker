const router = require("express").Router();
const registration = require("../controller/registrationControl");
const validations = require("../middlewares/validations");

router.get("/ping", (req, res) => {
  console.log("Welcome to iTracker API");
  res.status(200).send("Welcome to iTracker API");
});

/**users control route */
router.post(
  "/user/register",
  validations.registrationValidation,
  registration.registerUserControl
);

module.exports = router;
