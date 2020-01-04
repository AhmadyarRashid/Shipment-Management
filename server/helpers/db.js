const mongoose = require('mongoose');
const config = require("../config/config");

// return promise with connection from db pool
const getDBConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(res => {
        resolve('Connected to db');
      })
      .catch(err => {
        // console.log('DB connection error');
        reject("error getting connection to db");
      })
  });
};


module.exports = { getDBConnection };
