const router = require("express").Router();
const registration = require("../controller/registrationControl");
const users = require("../controller/loginControl");
const validations = require("../middlewares/validations");
const issues = require("../controller/issueContol");
const { isAuthorized } = require("../middlewares/authHandler");
const User = require("../models/User");
const uploadControl = require("../controller/uploadControl");
const multer = require("multer");

/**Init upload */
const upload = multer({
  storage: uploadControl.storage,
  limits: 1024 * 1024 * 6,
  fileFilter: uploadControl.fileFilter,
});

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

router.post("/user/login", validations.loginValidations, users.loginControl);
router.get(
  "/user/all",
  isAuthorized,
  validations.getAllIssuesValidations,
  users.getAllUser
);

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
router.post(
  "/issue/comment",
  isAuthorized,
  validations.addCommentValidations,
  issues.addComment
);
router.get(
  "/issue/search",
  isAuthorized,
  validations.searchRouteValidation,
  issues.searchRoute
);
router.post(
  "/issue/upload",
  isAuthorized,
  uploadControl.uploadValidation,
  upload.single("file"),
  issues.uploadAttachment
);
router.post(
  "/issue/edit/comment",
  isAuthorized,
  validations.updateCommentValidation,
  issues.updateComment
);
router.delete(
  "/issue/delete/comment",
  isAuthorized,
  validations.deleteCommentValidation,
  issues.deleteComment
);
module.exports = router;
