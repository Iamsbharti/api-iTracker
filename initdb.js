const mongoose = require("mongoose");
const logger = require("./library/logger");

exports.initdb = () => {
  /**init db connection */
  mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  /**listen to db-connection error */
  mongoose.connection.on("error", (error) => {
    logger.error(`Error connecting DB:${error.message}`);
  });

  /**Sucess Connection */
  mongoose.connection.on("open", (error) => {
    error
      ? logger.error(`Error Connecting DB:${error}`)
      : logger.info("DB Conenction Sucess");
  });
};
