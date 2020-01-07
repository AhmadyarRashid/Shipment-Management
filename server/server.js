const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./helpers/error-handler");
const { getDBConnection } = require('./helpers/db');

// config, helpers & middleware
const config = require("./config/config");

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* connection with db*/
getDBConnection().then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

// import models
require('./models/user');
require('./models/ship');
require('./config/passport');

/* registering routes */
app.use("/api", require("./routes/index"));

/* global error handler*/
app.use(errorHandler);

/* creating server */
app.listen(config.server_port, () =>
  console.log(`Server listening on port ${config.server_port}`)
);
