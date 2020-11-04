const socketio = require("socket.io");
const mongoose = require("mongoose");
const events = require("events");
const jwt = require("jsonwebtoken");
const Issue = require("../models/Issue");
const User = require("../models/User");
const logger = require("../library/logger");

// EventEmitter
const eventEmitter = new events.EventEmitter();

exports.setSocketServer = (server) => {
  logger.info("SOCKET SERVER INIT");

  let io = socketio.listen(server);

  // cors
  io.origins("*:*");
  let myio = io.of("/issue/notify");

  myio.on("connection", (socket) => {
    logger.info("Emit On Connection");
    socket.emit("authenticate", "");

    // authrorize the user
    socket.on("auth", (authDetails) => {
      logger.info("Authenticating User");
      const { verificationUserId, authToken } = authDetails;
      if (authToken) {
        jwt.verify(authToken, process.env.TOKEN_SECRET, (error, decoded) => {
          if (error != null) {
            logger.error("authError");
            socket.emit("authStatus", error);
          } else {
            logger.info("Verify USERId");
            const { userId } = decoded.data;
            if (!userId === verificationUserId) {
              socket.emit("authStatus", "Invalid Token/UserId");
            }else{
              socket.emit("authStatus", "Notification System Online");
            }
          }
        });
      }
    }); // on-connection-end

    // listen to issueupdates
    socket.on("issue-updates-client", (issueDetails) => {
      const { issueId, field, watchList, userId } = issueDetails;
      logger.info("issue update socket listener:", issueId, field, watchList);
      // update notification for watchList and emit notification for toast
      setTimeout(
        () => eventEmitter.emit("update-notification", issueDetails),
        100
      );
    });
  });

  // standalone eventemitters
  eventEmitter.on("update-notification", (issueDetails) => {
    // update notification table for watchlists users
    logger.info("server is emiiting issue updates");
    myio.emit("issue-updates-server", issueDetails);
  });
};
