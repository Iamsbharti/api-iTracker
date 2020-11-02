const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const crypto = require("crypto");
const User = require("../models/User");
const EXCLUDE = "-__V -_id -password";
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const issueControl = require("./issueContol");
const Issue = require("../models/Issue");

const mongoURI = process.env.DB_CONNECT;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoURI.toString());

// init db connection
const connection = mongoose.connection;

// init gfs
let gfs;
connection.once("open", () => {
  // init gfs stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("attachments");
});

// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          return reject(err);
        }
        const fileName =
          buffer.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: "attachments",
        };
        console.log("fileInfo::", fileInfo);
        resolve(fileInfo);
      });
    });
  },
});

// filter for incoming files
const fileFilter = (req, file, cb) => {
  // reject
  if (file.mimetype == "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(formatResponse(true, 500, "File Extension Not Allowed", null), false);
  }
};
// validate user and issue id before uploading
const uploadValidation = async (req, res, next) => {
  logger.info("upload i/p validation");
  const userId = req.query.userId;
  const issueId = req.query.issueId;
  console.log(userId, issueId);
  /**check for valid user & issue id */
  let isUserValid = await issueControl.validateUser(userId);
  let isIssueValid = await issueControl.validateIssue(issueId);
  console.log("validity:", isUserValid, isIssueValid);
  if (isUserValid && isIssueValid) {
    console.log("valid ids");
  } else if (!isUserValid) {
    return res
      .status(400)
      .json(formatResponse(true, 400, "Invalid UserId", null));
  } else if (!isIssueValid) {
    return res
      .status(400)
      .json(formatResponse(true, 400, "Invalid IssueId", null));
  }
  next();
};
// fetch attachment for a issueId and UserId
const fetchAttachment = async (req, res) => {
  logger.info("Fetch Attachments");
  // find file name
  logger.info(`Fetch Pictures${req.query.filename}`);
  gfs.files.findOne({ filename: req.query.filename }, (error, file) => {
    /**file existence */
    if (!file || file.length === 0) {
      return res
        .status(404)
        .json(formatResponse(true, 404, "File Not Found", ""));
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
};
// delete attachment route
const deleteAttachment = async (req, res) => {
  logger.info("Delete Attachment");
  const { filename } = req.query;
  gfs.files.deleteOne({ filename: filename }, (err) => {
    if (err) {
      return res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", err.message));
    } else {
      return res
        .status(200)
        .json(formatResponse(false, 200, "Attachment Deleted", ""));
    }
  });
};
module.exports = {
  storage,
  fileFilter,
  fetchAttachment,
  uploadValidation,
  deleteAttachment,
};
