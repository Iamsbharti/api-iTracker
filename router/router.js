const router = require("express").Router();
const registration = require("../controller/registrationControl");
const login = require("../controller/loginControl");
const validations = require("../middlewares/validations");
const issues = require("../controller/issueContol");
const { isAuthorized } = require("../middlewares/authHandler");

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

router.post("/user/login", validations.loginValidations, login.loginControl);

/**Issue Control */
router.post(
  "/issue/create",
  isAuthorized,
  validations.createIssueValidations,
  issues.createIssue
);
router.get(
  "/issue/allIssues",
  isAuthorized,
  validations.getAllIssuesValidations,
  issues.getAllIssues
);
router.get(
  "/issue/filter",
  isAuthorized,
  validations.filterIssuesValidation,
  issues.filterIssues
);
router.put(
  "/issue/update",
  isAuthorized,
  validations.updateIssueValidations,
  issues.updateIssue
);
module.exports = router;
