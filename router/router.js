const router = require("express").Router();

router.get("ping", (req, res) => {
  console.log("Welcome to iTracker API");
  res.status(200).send("Welcome to iTracker API");
});

module.exports = router;
