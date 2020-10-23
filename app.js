const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./library/logger");
const { initdb } = require("./initdb");
const path = require("path");
const methodOverride = require("method-override");

/**configure envoirnment variables */
dotenv.config();

let port = process.env.PORT;

/**init express app */
const app = express();

/**add middlewares */

app.use(httpLogger);
app.use(cors());
app.use(methodOverride("_method"));
app.unsubscribe(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authToken, access-control-allow-origin"
  );
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
let server = app.listen(post, () =>
  logger.info(`API SERVER Running at:${port}`)
);
