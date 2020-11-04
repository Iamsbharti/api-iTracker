const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./library/logger");
const { notFound, handleError } = require("./middlewares/errorHandles");
const { initdb } = require("./initdb");
const router = require("./router/router");
const path = require("path");
const methodOverride = require("method-override");
const { setSocketServer } = require("./library/socketInit");

/**configure envoirnment variables */
dotenv.config();

let port = process.env.API_PORT;

/**init express app */
const app = express();

/**add middlewares */

app.use(httpLogger);
app.use(cors());
app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authToken, access-control-allow-origin"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/**init db */
initdb();

/**add router */
app.use(process.env.API_VERSION, router);

/**Global Error handlers middlewares */
app.use(notFound);
app.use(handleError);

/**listen to server */
let server = app.listen(port, () =>
  logger.info(`API SERVER Running at:${port}`)
);

/**Init Socket */
logger.info(`SERVER__HEALTH ${server.listening}`);
let setSocketServerInit = setSocketServer(server);
